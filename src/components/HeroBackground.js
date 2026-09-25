import React, { useRef, useEffect } from "react";
import prefersReducedMotion from "../utils/prefersReducedMotion";

const VERT = `
attribute vec2 a_position;
void main(){
  gl_Position=vec4(a_position,0.0,1.0);
}`;

const FRAG = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;

vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=i-floor(i*(1.0/289.0))*289.0;
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 105.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

float fbm(vec3 p){
  return 0.6667*snoise(p)+0.3333*snoise(p*2.0);
}

float warp(vec2 p,float t){
  float st=t*0.028;
  vec2 q=vec2(
    fbm(vec3(p,st)),
    fbm(vec3(p+vec2(5.2,1.3),st*1.1))
  );
  vec2 r=vec2(
    fbm(vec3(p+0.6*q+vec2(1.7,9.2),st*0.7)),
    fbm(vec3(p+0.6*q+vec2(8.3,2.8),st*0.7))
  );
  return fbm(vec3(p+0.5*r,st*0.5));
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution;
  vec2 sUV=vec2(uv.x,1.0-uv.y);
  float aspect=u_resolution.x/u_resolution.y;

  vec2 nUV=vec2(sUV.x*aspect,sUV.y);
  vec2 ctr=vec2(0.46*aspect,0.66);
  vec2 p=(nUV-ctr)*0.8;

  float n=warp(p,u_time);
  n=n*0.5+0.5;
  n=smoothstep(0.3,0.7,n);
  n=pow(n,5.0)*0.65;
  n*=1.0+0.06*sin(u_time*0.6283);
  n=clamp(n,0.0,1.0);

  vec3 c0=vec3(0.016,0.016,0.016);
  vec3 c1=vec3(0.098,0.098,0.102);
  vec3 c2=vec3(0.153,0.153,0.149);
  vec3 c3=vec3(0.424,0.412,0.396);
  vec3 c4=vec3(0.608,0.573,0.549);

  vec3 col=c0;
  col=mix(col,c1,smoothstep(0.0,0.15,n));
  col=mix(col,c2,smoothstep(0.15,0.35,n));
  col=mix(col,c3,smoothstep(0.35,0.65,n));
  col=mix(col,c4,smoothstep(0.65,1.0,n));

  float lum=dot(col,vec3(0.299,0.587,0.114));
  float grain=fract(sin(dot(floor(gl_FragCoord.xy),vec2(127.1,311.7)))*43758.5453)-0.5;
  col+=grain*mix(0.08,0.35,smoothstep(0.01,0.25,lum));

  float scrim=smoothstep(0.0,0.42,sUV.x);
  col=mix(c1,col,mix(0.04,1.0,scrim));

  gl_FragColor=vec4(col,1.0);
}`;

function HeroBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: true,
    });
    if (!gl) return;

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const posLoc = gl.getAttribLocation(prog, "a_position");
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uTime = gl.getUniformLocation(prog, "u_time");

    function resize() {
      const r = canvas.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    function draw(t) {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    function cleanup() {
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    }

    const reduced = prefersReducedMotion();

    if (reduced) {
      resize();
      draw(0);
      const ro = new ResizeObserver(() => {
        resize();
        draw(0);
      });
      ro.observe(canvas);
      return () => {
        ro.disconnect();
        cleanup();
      };
    }

    const INTERVAL = 1000 / 15;
    let last = 0;
    const t0 = performance.now();

    function frame(now) {
      rafRef.current = requestAnimationFrame(frame);
      if (now - last < INTERVAL) return;
      last = now;
      resize();
      draw((now - t0) / 1000);
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cleanup();
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="hero-shader-bg" aria-hidden="true" />
  );
}

export default HeroBackground;
