// Hero WebGL2 shader: 18 layered rainbow arcs sweep in a circle and reveal the
// cream compass line-art, then fade out leaving the compass, which spins with
// scroll (window.scrollY on purpose — upright at page top). Ported from the
// handoff's CompassShader.jsx.
import { useEffect, useRef } from 'react';

const SHADER_SRC = `#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 v_uv;

uniform vec3  iResolution;   // (width, height, dpr)
uniform float iTime;         // seconds
uniform sampler2D iCompass;  // compass line-art (alpha = lines)
uniform float iCompassAspect;// compass width / height
uniform float iRotate;       // scroll-driven compass rotation (radians)

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2  r  = iResolution.xy;
    float t  = iTime * 2.0;      // 2x: rainbow swirl sweeps + fades out twice as fast
    vec4  o  = vec4(0.0);

    vec2 p = fragCoord - r * 0.5;

    // 18 layered arcs sweeping in a circle
    for (float i, a; i++ < 18.0; )
    {
        a = (i * i) / 320.0 - length(p) / r.y;
        float denom = max(a, -a * 3.0) + 2.0 / r.y;

        a = cos(i - t);
        float edge0 = a;
        float edge1 = 2.0;
        a = atan(p.y, p.x) + a + i * i;
        float sm = smoothstep(edge0, edge1, cos(a));

        o += 0.022 / denom * sm * (1.2 + sin(a + i + vec4(0.0, 2.0, 4.0, 0.0)));
    }

    o = tanh(o);

    // ---- reveal the compass with the circular motion ----
    vec2 uvc = (fragCoord - 0.5 * r) / r.y;
    float compassH = 0.972;                    // compass height in y-normalized units
    float shiftY = 0.07 * compassH;            // hub on the canvas centre

    // scroll-driven spin about the compass's TRUE centre (hub at tex y=0.57)
    vec2 rc = uvc - vec2(0.0, shiftY);
    const float COMPASS_CY = 0.57;
    vec2 pivot = vec2(0.0, (0.5 - COMPASS_CY) * compassH);
    vec2 d2 = rc - pivot;
    float cr = cos(iRotate), sr = sin(iRotate);
    d2 = vec2(d2.x * cr - d2.y * sr, d2.x * sr + d2.y * cr);
    rc = pivot + d2;
    vec2 tex;
    tex.x = rc.x / (compassH * iCompassAspect) + 0.5;
    tex.y = 0.5 - rc.y / compassH;             // flip Y
    float ca = 0.0;
    if (tex.x > 0.0 && tex.x < 1.0 && tex.y > 0.0 && tex.y < 1.0) {
        ca = texture(iCompass, tex).a;
    }

    float lum = dot(o.rgb, vec3(0.3333));
    float reveal = smoothstep(0.03, 0.42, lum);
    vec3 cream = vec3(0.957, 0.945, 0.855);

    float swirlFade = 1.0 - smoothstep(2.0, 4.0, t);   // backdrop 1 -> 0
    float settle    = smoothstep(1.5, 4.0, t);         // compass locks fully in
    float compassLit = mix(reveal, 1.0, settle);

    float op = 0.25;                             // compass opacity
    vec3 col = o.rgb * 0.40 * swirlFade;
    col += cream * ca * (0.07 + 0.85 * compassLit) * op;
    col += o.rgb * ca * reveal * 1.35 * op * swirlFade;

    fragColor = vec4(col, 1.0);
}

void main(){
  mainImage(fragColor, gl_FragCoord.xy);
}
`;

const VERT_SRC = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
out vec2 v_uv;
void main(){
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const SPIN_RATE = 0.0032; // radians per scrolled pixel
const FALLBACK_ASPECT = 0.611; // 547.73 / 896.57
const TEXTURE_WIDTH = 768;

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader | null {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

interface CompassShaderProps {
  compassSrc?: string;
}

export default function CompassShader({ compassSrc = '/assets/compass/compass.svg' }: CompassShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2', { premultipliedAlpha: false });
    if (!gl) return;

    let disposed = false;
    let raf = 0;

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, SHADER_SRC);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    const uResolution = gl.getUniformLocation(program, 'iResolution');
    const uTime = gl.getUniformLocation(program, 'iTime');
    const uCompass = gl.getUniformLocation(program, 'iCompass');
    const uCompassAspect = gl.getUniformLocation(program, 'iCompassAspect');
    const uRotate = gl.getUniformLocation(program, 'iRotate');

    // ---- compass line-art texture (alpha is the reveal mask) ----
    let compassAspect = FALLBACK_ASPECT;
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (disposed) return;
      compassAspect = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : compassAspect;
      const cw = TEXTURE_WIDTH;
      const ch = Math.round(cw / compassAspect);
      const oc = document.createElement('canvas');
      oc.width = cw;
      oc.height = ch;
      const octx = oc.getContext('2d');
      if (!octx) return;
      octx.drawImage(img, 0, 0, cw, ch);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, oc);
    };
    img.src = compassSrc;

    const getDpr = () => Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    let resizeScheduled = false;
    const applySize = () => {
      resizeScheduled = false;
      if (disposed) return;
      const dpr = getDpr();
      const w = Math.max(1, Math.floor(Math.max(1, canvas.clientWidth | 0) * dpr));
      const h = Math.max(1, Math.floor(Math.max(1, canvas.clientHeight | 0) * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const scheduleSize = () => {
      if (resizeScheduled) return;
      resizeScheduled = true;
      requestAnimationFrame(applySize);
    };
    const ro = new ResizeObserver(scheduleSize);
    ro.observe(canvas);
    scheduleSize();

    const start = performance.now();

    const tick = (now: number) => {
      if (disposed) return;
      if (gl.isContextLost()) {
        raf = requestAnimationFrame(tick);
        return;
      }
      gl.useProgram(program);
      if (resizeScheduled) applySize();
      const t = (now - start) / 1000;

      gl.uniform3f(uResolution, canvas.width, canvas.height, getDpr());
      gl.uniform1f(uTime, t);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform1i(uCompass, 0);
      gl.uniform1f(uCompassAspect, compassAspect);
      // Rotation from scrollY (NOT rect.top) so the canvas's CSS top offset
      // never seeds a crooked initial angle.
      const sy = window.scrollY || window.pageYOffset || 0;
      gl.uniform1f(uRotate, Math.max(0, sy) * SPIN_RATE);

      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
      gl.deleteTexture(tex);
      gl.deleteProgram(program);
    };
  }, [compassSrc]);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
