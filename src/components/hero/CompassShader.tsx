// Hero WebGL2 shader: 9 layered arcs sweep in a circle as a soft full-spectrum
// rainbow glow (desaturated, gently warmed toward orange). The compass line-art
// lives in a separate <CompassOverlay/> component.
import { useEffect, useRef } from 'react';
import { dprCap, observeVisibility } from '../../lib/render-budget';

const SHADER_SRC = `#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 v_uv;

uniform vec3  iResolution;   // (width, height, dpr)
uniform float iTime;         // seconds

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2  r  = iResolution.xy;
    float t  = iTime * 2.0;      // 2x: rainbow swirl sweeps + fades out twice as fast
    vec4  o  = vec4(0.0);

    vec2 p = fragCoord - r * 0.5;

    // 9 layered arcs sweeping in a circle
    for (float i, a; i++ < 9.0; )
    {
        a = (i * i) / 320.0 - length(p) / r.y;
        float denom = max(a, -a * 3.0) + 2.0 / r.y;

        a = cos(i - t);
        float edge0 = a;
        float edge1 = 2.0;
        a = atan(p.y, p.x) + a + i * i;
        float sm = smoothstep(edge0, edge1, cos(a));

        o += 0.058 / denom * sm * (1.2 + sin(a + i + vec4(0.0, 2.0, 4.0, 0.0)));
    }

    o = tanh(o);
    o.rgb = pow(max(o.rgb, vec3(0.0)), vec3(0.84)) * 1.05;

    // Soft full-spectrum rainbow from the arc loop, desaturated with a gentle
    // orange warmth — closer to the original look, just muted and slightly warmer.
    float lum = dot(o.rgb, vec3(0.3333));
    vec3 col = mix(vec3(lum), o.rgb, 0.68);
    col = mix(col, vec3(0.96, 0.70, 0.44), 0.10 * clamp(lum, 0.0, 1.0));
    float swirl = pow(clamp(lum, 0.0, 1.0), 0.78) * 1.15;
    float swirlA = clamp(swirl * 0.58, 0.0, 0.58);

    fragColor = vec4(col, swirlA);
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

export default function CompassShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2', { premultipliedAlpha: false, alpha: true });
    if (!gl) return;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

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

    const getDpr = () => Math.max(1, Math.min(dprCap(), window.devicePixelRatio || 1));

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

    // Pause the render loop while the hero is scrolled out of view.
    let visible = true;
    const stopVisibility = observeVisibility(canvas, (v) => {
      if (v === visible) return;
      visible = v;
      if (v && !disposed) raf = requestAnimationFrame(tick);
    });

    const tick = (now: number) => {
      if (disposed || !visible) return;
      if (gl.isContextLost()) {
        raf = requestAnimationFrame(tick);
        return;
      }
      gl.useProgram(program);
      if (resizeScheduled) applySize();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const t = (now - start) / 1000;

      gl.uniform3f(uResolution, canvas.width, canvas.height, getDpr());
      gl.uniform1f(uTime, t);

      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      stopVisibility();
      ro.disconnect();
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
