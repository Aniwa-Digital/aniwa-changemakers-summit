// CosmicScene — three.js starfield + nebula light-beam + atmosphere glow + bloom.
// Rendered OPAQUE black and composited via mix-blend-mode:screen on its wrapper
// div (the [data-cine-cosmic] layer in Prophecy) so only light adds over the
// dark field behind it. The wrapper's opacity (driven by scroll-choreography's
// prophecy pin) fades the cosmos in; the camera holds a fixed, gently-floating
// viewpoint while the starfield/nebula drift on their own clock.
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { dprCap, observeVisibility, starBudget } from '../../lib/render-budget';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default function CosmicScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let raf = 0;
    let W = mount.clientWidth || window.innerWidth;
    let H = mount.clientHeight || window.innerHeight;
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.00025);

    const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 2000);
    camera.position.set(0, 20, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap()));
    renderer.setClearColor(0x000000, 1); // opaque black; screen-blended by the wrapper
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.7;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(W, H), 0.85, 0.4, 0.82));

    // ---- Starfield (3 rotating layers) ----
    const stars: THREE.Points[] = [];
    const starVert = `
      attribute float size; attribute vec3 color; varying vec3 vColor;
      uniform float time; uniform float depth;
      void main(){ vColor = color; vec3 pos = position;
        float angle = time * 0.05 * (1.0 - depth * 0.3);
        mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        pos.xy = rot * pos.xy;
        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (300.0 / -mv.z);
        gl_Position = projectionMatrix * mv; }`;
    const starFrag = `
      varying vec3 vColor;
      void main(){ float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float o = 1.0 - smoothstep(0.0, 0.5, d);
        gl_FragColor = vec4(vColor, o); }`;
    for (let i = 0; i < 3; i++) {
      const n = starBudget();
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(n * 3);
      const col = new Float32Array(n * 3);
      const siz = new Float32Array(n);
      for (let j = 0; j < n; j++) {
        const r = 200 + Math.random() * 800;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(Math.random() * 2 - 1);
        pos[j * 3] = r * Math.sin(ph) * Math.cos(th);
        pos[j * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
        pos[j * 3 + 2] = r * Math.cos(ph);
        const c = new THREE.Color();
        const ch = Math.random();
        if (ch < 0.7) c.setHSL(0, 0, 0.8 + Math.random() * 0.2);
        else if (ch < 0.9) c.setHSL(0.08, 0.5, 0.8);
        else c.setHSL(0.6, 0.5, 0.8);
        col[j * 3] = c.r;
        col[j * 3 + 1] = c.g;
        col[j * 3 + 2] = c.b;
        siz[j] = Math.random() * 2 + 0.5;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      geo.setAttribute('size', new THREE.BufferAttribute(siz, 1));
      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: i } },
        vertexShader: starVert,
        fragmentShader: starFrag,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      stars.push(pts);
    }

    // ---- Nebula (the "light beam" when edge-on) ----
    const nebGeo = new THREE.PlaneGeometry(8000, 4000, 100, 100);
    const nebMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x7c2a2a) },
        color2: { value: new THREE.Color(0xb8945c) },
        opacity: { value: 0.32 },
      },
      vertexShader: `
        varying vec2 vUv; varying float vE; uniform float time;
        void main(){ vUv = uv; vec3 pos = position;
          float e = sin(pos.x*0.01+time)*cos(pos.y*0.01+time)*20.0; pos.z += e; vE = e;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0); }`,
      fragmentShader: `
        uniform vec3 color1; uniform vec3 color2; uniform float opacity; uniform float time;
        varying vec2 vUv; varying float vE;
        void main(){ float m = sin(vUv.x*10.0+time)*cos(vUv.y*10.0+time);
          vec3 c = mix(color1, color2, m*0.5+0.5);
          float a = opacity * (1.0 - length(vUv-0.5)*2.0); a *= 1.0 + vE*0.01;
          gl_FragColor = vec4(c, a); }`,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const nebula = new THREE.Mesh(nebGeo, nebMat);
    nebula.position.z = -1050;
    scene.add(nebula);

    // ---- Atmosphere glow ----
    const atmMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader:
        'varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: `
        varying vec3 vN; uniform float time;
        void main(){ float i = pow(0.7 - dot(vN, vec3(0.0,0.0,1.0)), 2.0);
          vec3 a = vec3(0.63,0.29,0.16) * i; float pulse = sin(time*2.0)*0.1+0.9; a *= pulse;
          gl_FragColor = vec4(a, i*0.25); }`,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(600, 32, 32), atmMat);
    scene.add(atmosphere);

    // The reveal (a gentle fly-in + nebula spin-up) is mapped to scroll through
    // the prophecy pin, so the whole animation must be scrolled through — it
    // plays start-to-finish before the next section can be reached. Park far out.
    const smooth = { z: 260, y: 10 };
    const host = document.getElementById('prophecy');

    // The prophecy pin is 300vh; once it has scrolled past, stop rendering.
    let visible = true;
    const stopVisibility = observeVisibility(mount, (v) => {
      if (v === visible) return;
      visible = v;
      if (v) raf = requestAnimationFrame(animate);
    });

    function animate() {
      if (!visible) return;
      raf = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      stars.forEach((s) => {
        (s.material as THREE.ShaderMaterial).uniforms.time.value = t;
      });
      nebMat.uniforms.time.value = t * 0.5;
      atmMat.uniforms.time.value = t;

      // Scroll-driven reveal: map the fly-in to progress through the prophecy
      // pin so it plays fully as you scroll and can't be skipped. The intro
      // window (0.56 -> 0.98) sits after the cosmos fades in and runs almost to
      // the end of the pin so the motion fills the whole scroll (no dead scroll
      // after it lands) before the section unpins into the next block.
      let pp = 0;
      if (host) {
        const total = host.offsetHeight - window.innerHeight;
        const passed = -host.getBoundingClientRect().top;
        pp = Math.max(0, Math.min(1, passed / Math.max(total, 1)));
      }
      const intro = reduce ? 1 : Math.max(0, Math.min(1, (pp - 0.56) / 0.42));
      const e = intro * intro * (4.5 - 2 * intro);
      nebula.rotation.z = e * 2.2 + t * 0.05;
      const targetZ = 260 - e * 410;
      const targetY = 10 + e * 30;
      smooth.z += (targetZ - smooth.z) * 0.06;
      smooth.y += (targetY - smooth.y) * 0.06;
      const fx = reduce ? 0 : Math.sin(t * 0.1) * 2;
      const fy = reduce ? 0 : Math.cos(t * 0.15) * 1;
      camera.position.set(fx, smooth.y + fy, smooth.z);
      camera.lookAt(0, 10, -600);
      composer.render();
    }
    animate();

    const onResize = () => {
      if (!mountRef.current) return;
      W = mount.clientWidth;
      H = mount.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
      composer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    return () => {
      visible = false;
      cancelAnimationFrame(raf);
      stopVisibility();
      window.removeEventListener('resize', onResize);
      stars.forEach((s) => {
        s.geometry.dispose();
        (s.material as THREE.Material).dispose();
      });
      nebGeo.dispose();
      nebMat.dispose();
      atmMat.dispose();
      composer.dispose();
      renderer.dispose();
      scene.clear();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }} />;
}
