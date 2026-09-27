/* eslint-disable */
// "Pixels en tránsito" — design → adapt → test → iterate → distribute.
// Rendered to a low-res buffer, then upscaled as lit cells separated by a black mesh.
// createDevicesAnimation(canvas, { reduced, focusEl }) returns a destroy() function.
// focusEl marks where the main story beats are framed; the wide "distribute" shot
// still fills the whole canvas. Without it the camera frames the canvas centre.

export default function createDevicesAnimation(cv, { reduced = false, focusEl = null } = {}) {
const getFocus = () => {
  if (!focusEl || !focusEl.offsetParent) return null;   // hidden focus box -> centre
  const f = focusEl.getBoundingClientRect(), c = cv.getBoundingClientRect();
  return { x: f.left - c.left, y: f.top - c.top, width: f.width, height: f.height };
};
/* ---------- setup ---------- */
const OFF = 4, LOOP = 23 + OFF;   // OFF = wireframe intro before the main timeline
const buf = document.createElement('canvas');
const b = buf.getContext('2d');
const ctx = cv.getContext('2d');
// buffer matches the canvas; S = device px per buffer cell. F* = focus rect in buffer px
let W = 1, H = 1, S = 3, DPR = 1, FX = 0, FY = 0, FW = 1, FH = 1;
function resize(){
  DPR = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.max(1, Math.round(cv.clientWidth*DPR)), h = Math.max(1, Math.round(cv.clientHeight*DPR));
  if (cv.width !== w || cv.height !== h){ cv.width = w; cv.height = h; }
  S = DPR >= 1.75 ? 4 : 3;
  W = Math.ceil(w/S); H = Math.ceil(h/S);
  if (buf.width !== W || buf.height !== H){ buf.width = W; buf.height = H; }
  measureFocus();
}
function measureFocus(){
  const r = getFocus(), k = DPR/S;
  if (r && r.width > 0 && r.height > 0){ FX = (r.x + r.width/2)*k; FY = (r.y + r.height/2)*k; FW = r.width*k; FH = r.height*k; }
  else { FX = W/2; FY = H/2; FW = W*.6; FH = H*.7; }
}
resize();

let seed = 11; const rnd = () => (seed = (seed*16807) % 2147483647, (seed-1)/2147483646);
const R = Math.random;
const clamp = (x,a=0,c=1) => Math.max(a, Math.min(c, x));
const lerp = (a,c,t) => a + (c-a)*t;
const ss = t => (t = clamp(t), t*t*(3-2*t));
const ease = t => (t = clamp(t), t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2);
const seg = (t,a,c) => clamp((t-a)/(c-a));

const ACC    = ['#12b857','#1bd967','#21f770','#0f9e4b','#3dfc86'];
const ACC_HI = ['#8cffb8','#b3ffd0','#6ef7a2'];
const C = {bg:'#0b0b0e', pan:'#121217', sur:'#1a1a20', sur2:'#23232b', ln:'#2d2d35', tx:'#3c3c46', hi:'#555561', wh:'#6c6c78'};

/* ---------- UI drawing helpers (units of k) ---------- */
let k = 1;
const f  = (x,y,w,h,c) => { b.fillStyle=c; b.fillRect(x*k,y*k,w*k,h*k); };
const p  = (x,y,w,h,r,c) => { b.fillStyle=c; b.beginPath(); b.roundRect(x*k,y*k,Math.max(0,w*k),Math.max(0,h*k),r*k); b.fill(); };
const o  = (x,y,r,c) => { b.fillStyle=c; b.beginPath(); b.arc(x*k,y*k,r*k,0,6.2832); b.fill(); };
const pl = (pts,c,th) => { b.strokeStyle=c; b.lineWidth=th*k; b.lineJoin='round'; b.beginPath();
  pts.forEach(([x,y],i)=> i?b.lineTo(x*k,y*k):b.moveTo(x*k,y*k)); b.stroke(); };
const arc = (x,y,r,a0,a1,c,th) => { b.strokeStyle=c; b.lineWidth=th*k; b.beginPath(); b.arc(x*k,y*k,r*k,a0,a1); b.stroke(); };

/* desktop UI: one dashboard, with a "design state" (w* = wireframe amount per region) */
const DONE = {wS:0,wC:0,wG:0,wH:0,cardH:13,line:1};
const sr = (x,y,w,h) => { b.strokeStyle=C.hi; b.lineWidth=.45*k; b.strokeRect(x*k,y*k,w*k,h*k); };
function dash(WK,HK,t,st,a){
  const X=21, Y=8, CW=WK-X-3;
  const on = w => (b.globalAlpha=a*(1-w)), wf = w => (b.globalAlpha=a*w*.9);
  b.globalAlpha=a;
  f(0,0,WK,5,C.pan); o(2.5,2.5,.8,C.ln); o(5,2.5,.8,C.ln); o(7.5,2.5,.8,C.ln);
  p(WK/2-16,1.3,32,2.4,1.2,C.sur); f(WK/2-6,2.1,12,.8,C.tx);
  // sidebar
  if (st.wS<1){ on(st.wS); f(0,5,18,HK-5,C.pan); p(2,7.5,3,3,.8,C.hi); f(6,8.5,8,1.1,C.tx);
    for (let i=0;i<7;i++){ const y=14+i*5.2; if (!i) p(1,y-1.5,16,4.2,1,C.sur2);
      f(2.6,y-.3,2.1,2.1,!i?C.hi:C.tx); f(6,y+.2,5+(i*3%5),1.1,!i?C.hi:C.tx); }
    o(4,HK-4,1.8,C.tx); f(7,HK-4.5,7,1,C.tx); }
  if (st.wS>0){ wf(st.wS); sr(.6,5.6,16.8,HK-6.2); sr(2,7.5,3,3); for (let i=0;i<7;i++) sr(2.4,13.6+i*5.2,12,2.2); }
  // header
  if (st.wH<1){ on(st.wH); f(X,Y,22,2,C.hi); f(X,Y+3.2,14,1.1,C.tx); p(X+CW-12,Y-.3,12,3.6,1.8,C.sur2); f(X+CW-9.5,Y+1.2,7,.9,C.hi); }
  if (st.wH>0){ wf(st.wH); sr(X,Y,22,2); sr(X,Y+3.2,14,1.1); sr(X+CW-12,Y-.3,12,3.6); }
  // KPI cards
  const cw=(CW-4)/3, cy=Y+7, ch=st.cardH;
  for (let j=0;j<3;j++){ const cx=X+j*(cw+2);
    if (st.wC<1){ on(st.wC); p(cx,cy,cw,ch,1.5,C.sur); f(cx+2,cy+2,cw*.4,1,C.tx); f(cx+2,cy+4.6,cw*.38,3,C.hi);
      const amp=clamp((ch-9)/4)*1.6; if (amp>.1){ const pts=[];
        for (let q=0;q<9;q++) pts.push([cx+2+q*(cw-4)/8, cy+ch-2-amp*(1+Math.sin(t*1.3+q*.9+j*2))]); pl(pts,C.tx,.5); } }
    if (st.wC>0){ wf(st.wC); sr(cx,cy,cw,ch); sr(cx+2,cy+2,cw*.4,1); sr(cx+2,cy+4.6,cw*.38,3); } }
  // chart panel
  const y2=cy+ch+2, h2=HK-y2-3;
  if (st.wG<1){ on(st.wG); p(X,y2,CW,h2,1.5,C.sur); f(X+2,y2+2,16,1.1,C.tx); f(X+CW-14,y2+2,4,1,C.tx); f(X+CW-8,y2+2,4,1,C.hi);
    for (let g=0;g<4;g++) f(X+6,y2+6+g*(h2-9)/3,CW-8,.3,C.ln);
    for (let g=0;g<4;g++) f(X+2,y2+5.6+g*(h2-9)/3,2.5,.8,C.tx);
    const n=15*st.line;
    for (const [s0,c] of [[0,C.wh],[2.1,C.tx]]){ const pts=[];
      for (let q=0;q<=Math.ceil(n);q++){ const qq=Math.min(q,n), v=.5+.28*Math.sin(qq*.7+t*.9+s0)+.15*Math.sin(qq*1.9+s0*3);
        pts.push([X+6+qq*(CW-8)/15, y2+6+(1-v)*(h2-9)]); }
      if (pts.length>1) pl(pts,c,.7); } }
  if (st.wG>0){ wf(st.wG); sr(X,y2,CW,h2); sr(X+2,y2+2,16,1.1);
    pl([[X+6,y2+6],[X+CW-2,y2+h2-3]],C.ln,.35); pl([[X+CW-2,y2+6],[X+6,y2+h2-3]],C.ln,.35); }
  b.globalAlpha=a;
}
/* mobile apps */
function mobileApp(i,WK,HK,t){
  f(3,2,5,1.3,C.hi); for (let q=0;q<3;q++) f(WK-13+q*1.3,3.3-q*.6,.9,q*.6+.5,C.tx); p(WK-7.5,1.9,4.5,1.7,.4,C.tx);
  const tab = act => { f(0,HK-8,WK,8,C.pan); for (let q=0;q<4;q++){ const x=WK*(q+.5)/4; p(x-1.5,HK-6.4,3,3,.8,q===act?C.hi:C.tx); } };
  if (i===3){ // chat
    f(0,5,WK,6.5,C.pan); pl([[4,7],[3,8.2],[4,9.4]],C.hi,.5); o(8.5,8.2,2,C.tx); f(12,7.4,11,1.1,C.hi); f(12,9.2,6,.8,C.tx);
    const msgs=[[0,20,2],[1,16,1],[0,24,3],[1,20,2],[0,14,1]];
    let y=14; for (const [r,w,n] of msgs){ const h=2+n*2; if (y+h>HK-9) break;
      const x=r?WK-3-w:6.5; p(x,y,w,h,1.6,r?C.sur2:C.sur);
      for (let q=0;q<n;q++) f(x+1.5,y+1.4+q*2,w-3-(q==n-1?w*.3:0),.9,r?C.hi:C.tx);
      if (!r) o(3.8,y+h-1.3,1.3,C.tx); y+=h+2; }
    p(3,HK-6.6,WK-11,4.2,2.1,C.sur); f(5.5,HK-5,10,.9,C.tx); o(WK-5,HK-4.5,2.2,C.hi);
    return;
  }
  f(3,6.5,14,2.2,C.hi); o(WK-5,7.6,2,C.tx);
  if (i===0){ // feed
    for (let q=0;q<5;q++){ const x=5+q*((WK-8)/4.2); o(x,14,2.6,C.ln); o(x,14,2,C.tx); }
    let y=19; for (let c=0;c<2;c++){ p(3,y,WK-6,24,2,C.sur); p(3,y,WK-6,14,2,C.sur2);
      pl([[6,y+11],[12,y+6],[16,y+9],[21,y+4.5],[WK-6,y+11]],C.ln,.7);
      o(6,y+17,1.6,C.tx); f(9,y+16.2,10,1,C.hi); f(9,y+18,6,.8,C.tx); f(4.5,y+21,WK-12,.8,C.tx); y+=27; }
    tab(0);
  } else if (i===1){ // list
    p(3,11,WK-6,3.4,1.7,C.sur); f(5.5,12.3,8,.8,C.tx);
    for (let q=0;q<7;q++){ const y=17.5+q*6.2; if (y>HK-12) break;
      o(6,y+2,2.2,C.tx); f(10,y+.6,11+(q%3)*2,1.1,C.hi); f(10,y+2.8,WK-17-(q%2)*5,.9,C.tx);
      f(WK-7,y+.6,4,.8,C.tx); if (q<2) o(WK-5,y+3.2,.9,C.wh); f(10,y+5.3,WK-12,.25,C.ln); }
    tab(1);
  } else { // stats
    f(3,12,8,1,C.tx); f(3,14.5,16,4,C.wh); p(WK-11,15,8,2.4,1.2,C.sur2);
    p(3,21,WK-6,19,2,C.sur); f(5,23,10,1,C.tx);
    for (let q=0;q<8;q++){ const hh=(.3+.6*(.5+.5*Math.sin(t*1.5+q)))*11; p(5.5+q*(WK-11)/8,38-hh,(WK-11)/8*.6,hh,.4,q===5?C.hi:C.tx); }
    const cw=(WK-8)/2;
    for (let c=0;c<2;c++){ const x=3+c*(cw+2); p(x,42,cw,HK-51,2,C.sur);
      arc(x+cw/2,48.5,3.4,0,6.2832,C.ln,1.3); arc(x+cw/2,48.5,3.4,-1.57,-1.57+(c?3.4:4.6),C.hi,1.3);
      f(x+2,HK-12.5,cw-4,.9,C.tx); }
    tab(2);
  }
}
function drawUI(sx,sy,sw,sh,mob,a,t,st){
  if (a <= .01) return;
  b.save(); b.translate(sx,sy);
  if (mob < .99){ k=Math.min(sw/120,sh/70); dash(sw/k,sh/k,t,st,a*(1-mob)); }
  if (mob > .01){ b.globalAlpha=a*mob; k=Math.min(sw/36,sh/68); mobileApp(2,sw/k,sh/k,t); }
  b.restore(); b.globalAlpha=1;
}

/* ---------- devices ---------- */
const TPL = {
  monitor:{sw:120,sh:70,b:3.5,stand:1,base:0,r:1.5,chin:7,isl:0,btn:0,home:0,cam:1},
  laptop: {sw:112,sh:70,b:3.5,stand:0,base:1,r:2,  chin:0,isl:0,btn:0,home:0,cam:1},
  phone:  {sw:36, sh:68,b:2.5,stand:0,base:0,r:6,  chin:0,isl:1,btn:1,home:1,cam:0},
  tablet: {sw:74, sh:98,b:4,  stand:0,base:0,r:6,  chin:0,isl:0,btn:.6,home:1,cam:1},
};
const mixT = (a,c,t) => { const r = {}; for (const q in a) r[q] = lerp(a[q], c[q], t); return r; };
function geom(d){
  if (d.type !== 'morph') return TPL[d.type];
  return d.m <= 1 ? mixT(TPL.monitor, TPL.laptop, d.m) : mixT(TPL.laptop, TPL.phone, d.m-1);
}
function makeDev(x,y,type,appOff=0){ return {x,y,type,m:0,alpha:0,parts:[],acc:0,act:1,pulse:0,appOff,ph:R()*100}; }
const rr = (x,y,w,h,r) => { b.beginPath(); b.roundRect(x,y,w,h,r); b.fill(); };

function spawnP(d,u,v,burst){
  const hi = R() < clamp((d.act-1)/4)*.75;
  let vu, vv; const m = R();
  if (burst){ const a=R()*6.283, s=.3+R()*1.1; vu=Math.cos(a)*s; vv=Math.sin(a)*s; }
  else if (m < .55){ vu=(R()<.5?-1:1)*(.15+R()*.45); vv=0; }
  else if (m < .8){ vu=0; vv=-(.1+R()*.3); }
  else { vu=(R()-.5)*.1; vv=(R()-.5)*.1; }
  d.parts.push({u:u??R(), v:v??R(), vu, vv, age:0, life:burst?.4+R()*.6:.5+R()*1.3,
                a:.55+R()*.45, c:(hi||burst)?ACC_HI[R()*3|0]:ACC[R()*5|0]});
}
function updDev(d,dt){
  const g = geom(d), area = (g.sw*g.sh)/(120*70);
  d.pulse *= Math.exp(-dt*2.2);
  if (d.alpha > .02){ d.acc += (5 + 20*d.act)*Math.max(.35, area)*dt; while (d.acc > 1){ d.acc--; spawnP(d); } }
  const sp = .6 + .35*d.act;
  for (const q of d.parts){ q.age += dt; q.u += q.vu*dt*sp; q.v += q.vv*dt*sp; }
  d.parts = d.parts.filter(q => q.age < q.life && q.u > -.1 && q.u < 1.1 && q.v > -.1 && q.v < 1.1);
  if (d.parts.length > 240) d.parts.splice(0, d.parts.length-240);
}
function drawDevice(d,z,t){
  if (d.alpha <= .01) return;
  const g = geom(d), sw=g.sw, sh=g.sh;
  const bw = sw+2*g.b, top = d.y-sh/2-g.b, bot = d.y+sh/2+g.b+g.chin, left = d.x-bw/2;
  b.globalAlpha = d.alpha;
  // monitor stand
  if (g.stand > .01){
    const nh=20*g.stand, s=g.stand;
    b.fillStyle='#17171c'; b.beginPath();
    b.moveTo(d.x-6*s,bot); b.lineTo(d.x+6*s,bot); b.lineTo(d.x+8*s,bot+nh); b.lineTo(d.x-8*s,bot+nh); b.fill();
    b.fillStyle='#1f1f25'; b.fillRect(d.x-1*s,bot,2*s,nh*.8);
    b.fillStyle='#1c1c22'; rr(d.x-28*s,bot+nh-1,56*s,4.5*s,2*s);
    b.fillStyle='#2e2e36'; b.fillRect(d.x-27*s,bot+nh-1,54*s,.8);
  }
  // laptop keyboard deck
  if (g.base > .01){
    const s=g.base, h=17*s, ex=14*s, ty=bot;
    b.fillStyle='#1a1a1f'; b.beginPath();
    b.moveTo(left,ty); b.lineTo(left+bw,ty); b.lineTo(left+bw+ex,ty+h); b.lineTo(left-ex,ty+h); b.fill();
    b.fillStyle='#26262d'; rr(left-ex,ty+h-.5,bw+2*ex,2.2*s,1*s);
    b.fillStyle='#0e0e11'; b.fillRect(left+2,ty,bw-4,1.3*s);
    if (s > .3){
      b.globalAlpha = d.alpha*ss((s-.3)/.5);
      for (let r=0;r<4;r++){ const f0=(2.2+r*2.3)/17, yy=ty+h*f0, wr=bw-10+ex*2*f0, n=15-(r===3?4:0);
        const kw=wr/15, x0=d.x-wr/2;
        b.fillStyle='#24242b';
        if (r===3){ for (let q=0;q<n;q++){ const w = q===5 ? kw*5-.6 : kw-.6; const xx = x0 + (q>5? (q+4)*kw : q*kw); b.fillRect(xx,yy,w,1.5*s); } }
        else for (let q=0;q<n;q++) b.fillRect(x0+q*kw,yy,kw-.6,1.5*s); }
      b.fillStyle='#212127'; rr(d.x-15,ty+h*.72,30,h*.2,1);
      b.globalAlpha = d.alpha;
    }
  }
  // body / bezel
  b.fillStyle='#2b2b33'; rr(left-.8, top-.8, bw+1.6, bot-top+1.6, g.r+.8);
  b.fillStyle='#141418'; rr(left, top, bw, bot-top, g.r);
  b.fillStyle='#202026'; b.fillRect(left+g.r, top+.3, bw-2*g.r, .6);
  if (g.btn > .01){ b.globalAlpha=d.alpha*g.btn; b.fillStyle='#26262d';
    b.fillRect(left-1.8, top+sh*.2, 1.2, sh*.1); b.fillRect(left-1.8, top+sh*.33, 1.2, sh*.1);
    b.fillRect(left+bw+.6, top+sh*.26, 1.2, sh*.16); b.globalAlpha=d.alpha; }
  if (g.cam > .01){ b.globalAlpha=d.alpha*g.cam; b.fillStyle='#2e2e37'; b.beginPath(); b.arc(d.x, top+g.b/2, .9, 0, 6.3); b.fill(); b.globalAlpha=d.alpha; }
  if (g.chin > 1){ b.globalAlpha=d.alpha*clamp(g.chin/7);
    b.fillStyle='#1b1b21'; b.fillRect(left+2, d.y+sh/2+g.b+.5, bw-4, .5);
    b.fillStyle='#1bd967'; b.fillRect(left+bw-7, bot-g.chin/2-.6, 1.4, 1.2); b.globalAlpha=d.alpha; }
  // screen
  const sx=d.x-sw/2, sy=d.y-sh/2, sr=Math.max(0,g.r-g.b*.6);
  b.save(); b.beginPath(); b.roundRect(sx,sy,sw,sh,sr); b.clip();
  b.fillStyle=C.bg; b.fillRect(sx,sy,sw,sh);
  const mob = d.mob ?? (d.type==='tablet'||d.type==='phone' ? 1 : 0);
  drawUI(sx,sy,sw,sh, mob, d.alpha*(d.uiA??1), t+d.appOff, d.st||DONE);
  if (d.cols > .01){ b.globalAlpha=d.alpha*d.cols*.09; b.fillStyle='#21f770';
    for (let q=0;q<12;q++) b.fillRect(sx+21+q*8.17, sy+5, 6.2, sh-5); }
  b.globalAlpha = d.alpha*clamp(.03*d.act, 0, .2); b.fillStyle='#1fd96a'; b.fillRect(sx,sy,sw,sh);
  const ps = Math.max(2, 1.4/z);
  for (const q of d.parts){
    b.globalAlpha = d.alpha*q.a*Math.sin(Math.PI*clamp(q.age/q.life));
    b.fillStyle = q.c;
    b.fillRect(sx+Math.floor(q.u*sw/ps)*ps, sy+Math.floor(q.v*sh/ps)*ps, ps, ps);
  }
  b.globalAlpha = d.alpha;
  if (g.isl > .01){ b.globalAlpha=d.alpha*g.isl; b.fillStyle='#000'; rr(d.x-5.5*g.isl, sy+1.8, 11*g.isl, 3.2, 1.6); }
  if (g.home > .01){ b.globalAlpha=d.alpha*g.home; b.fillStyle='#4a4a55'; rr(d.x-sw*.17, sy+sh-1.6, sw*.34, .8, .4); }
  b.restore(); b.globalAlpha = 1;
}
const screenPt = d => { const g=geom(d); return [d.x+(R()-.5)*g.sw*.8, d.y+(R()-.5)*g.sh*.8]; };

/* ---------- scene ---------- */
// design -> adapt -> test -> iterate -> distribute
// layout: rows with equal gaps between device edges, devices bottom-aligned per row
const EXT={monitor:{w:127,bot:69},laptop:{w:147,bot:57.5},tablet:{w:82,bot:53},phone:{w:41,bot:36.5}};
const GAP=55, PITCH=165, XMIN=-2400, XMAX=2400;   // wide enough to fill the hero from an off-centre anchor
const TOP={monitor:38.5,laptop:38.5,tablet:53,phone:36.5};          // centre -> top edge
// trio as a triangle that belongs to the grid: monitor on row 0, tablet + phone on row 1,
// all spaced by the same GAP as every other device
const TRI_BASE = 69 + PITCH;                                       // row 1 baseline
const PAIR = EXT.tablet.w + GAP + EXT.phone.w;                     // tablet + phone, centred under the monitor
const D0 = makeDev(0,69-EXT.monitor.bot,'monitor'); D0.alpha=1;   // design happens here
const D1 = makeDev(-PAIR/2+EXT.tablet.w/2,TRI_BASE-EXT.tablet.bot,'tablet',.7);   // adapted: tablet
const D2 = makeDev(PAIR/2-EXT.phone.w/2,TRI_BASE-EXT.phone.bot,'phone',1.4);      // adapted: phone (fails, then iterates)
const CX = 0, CY = (69-EXT.monitor.bot-TOP.monitor + TRI_BASE)/2;  // trio centre
const grid = []; const types = ['monitor','laptop','phone','tablet','laptop','phone'];
function fillRow(base, edge, dir){
  while (edge > XMIN && edge < XMAX){
    const ty=types[rnd()*types.length|0], w=EXT[ty].w, x=edge+dir*w/2, y=base-EXT[ty].bot;
    const d=makeDev(x, y, ty, rnd()*5.5); d.dist=Math.min(1500, Math.hypot(x-CX, y-CY)); d.out=rnd()*.6; grid.push(d);
    edge += dir*(w+GAP);
  }
}
for (let r=-5;r<=5;r++){
  const base=69+r*PITCH;
  if (r===0){ fillRow(base, EXT.monitor.w/2+GAP, 1); fillRow(base, -EXT.monitor.w/2-GAP, -1); }
  else if (r===1){ fillRow(base, PAIR/2+GAP, 1); fillRow(base, -PAIR/2-GAP, -1); }
  else { const x0=(rnd()-.5)*140; fillRow(base, x0, 1); fillRow(base, x0-GAP, -1); }
}
const tgt = grid.filter(d=>d.type==='monitor').reduce((a,d)=>{ const s=Math.hypot(d.x-560,d.y+300); return s<a.s?{d,s}:a; },{s:1e9}).d;
tgt.appOff=0; tgt.isTarget=true;
const trio = [D0,D1,D2];
const all = [...grid, ...trio];

// shots: the world area (w×h) each one frames inside the focus rect; 'wide' fills the whole canvas
const SHOT = {
  design: {x:0,        y:12,       w:135, h:150},
  trio:   {x:CX,       y:CY,       w:210, h:300},
  phone:  {x:D2.x,     y:D2.y-6,   w:100, h:150},   // phone + its test glyph on top
  wide:   {x:CX,       y:CY,       wide:true},
  target: {x:tgt.x,    y:tgt.y+12, w:135, h:150},
};
const zoomOf = s => s.wide ? .84*DPR/S : Math.min(FW/s.w, FH/s.h);   // buffer px per world unit
const KF = [
  [0,'design'],[4.8,'design'],
  [6.6,'trio'],[9.4,'trio'],
  [10.6,'phone'],[12.9,'phone'],
  [14.0,'trio'],[14.5,'trio'],
  [18.8,'wide'],[19.6,'wide'],
  [22.4,'target','focus'],[23,'target']
];
function cam(t){
  for (let i=0;i<KF.length-1;i++){
    const a=KF[i], c=KF[i+1];
    if (t>=a[0] && t<=c[0]){
      const A=SHOT[a[1]], B=SHOT[c[1]], za=zoomOf(A), zc=zoomOf(B);
      const e=ease((t-a[0])/(c[0]-a[0]));
      const z=Math.exp(lerp(Math.log(za),Math.log(zc),e));
      if (c[2]==='focus'){ const r=za/zc, q=(za/z-r)/(1-r); return [B.x+(A.x-B.x)*q, B.y+(A.y-B.y)*q, z]; }
      return [lerp(A.x,B.x,e), lerp(A.y,B.y,e), z];
    }
  }
  return [SHOT.design.x, SHOT.design.y, zoomOf(SHOT.design)];
}

/* design state of the first monitor: wireframe -> built + adjusted */
function designState(t){
  return { wS:1-ss(seg(t,1.0,1.4)), wC:1-ss(seg(t,1.65,2.0)), cardH:9+4*ease(seg(t,1.8,2.5)),
           wG:1-ss(seg(t,3.05,3.4)), line:ss(seg(t,3.1,3.9)), wH:1-ss(seg(t,4.1,4.4)) };
}
function revertState(t){ const r=ss(seg(t,21.0,22.4));
  return {wS:r,wC:r,wG:r,wH:r,cardH:13-4*r,line:1-r}; }

/* cursor */
const CP=[[0.1,30,22],[0.9,-51,-5],[1.2,-51,-5],[1.55,9,-11],[1.8,9,-11],[2.5,9,-7],[2.95,30,15],[3.2,30,15],[3.95,51,-25.5],[4.25,51,-25.5],[4.9,72,12]];
const CLICKS=[1.0,1.65,3.05,4.1];
function cursorPos(t){
  if (t<=CP[0][0]) return [CP[0][1],CP[0][2]];
  for (let i=0;i<CP.length-1;i++){ const a=CP[i], c=CP[i+1];
    if (t<=c[0]){ const e=ease((t-a[0])/(c[0]-a[0])); return [lerp(a[1],c[1],e), lerp(a[2],c[2],e)]; } }
  const l=CP[CP.length-1]; return [l[1],l[2]];
}
const ARROW=["1","11","121","1221","12221","122221","1222221","12222221","122211111","1211221","11 1221","1   11"];
function drawCursor(x,y,a,press){
  if (a<=.01) return; const c=.8*(press?.85:1);
  b.globalAlpha=a;
  ARROW.forEach((row,j)=>{ for (let i=0;i<row.length;i++){ const ch=row[i]; if (ch===' ') continue;
    b.fillStyle = ch==='1' ? '#e8e8f0' : '#8e8e9b'; b.fillRect(x+i*c, y+j*c, c, c); } });
  b.globalAlpha=1;
}
function drawSel(x,y,w,h,a){
  if (a<=.01) return; b.globalAlpha=a;
  b.strokeStyle='#21f770'; b.lineWidth=.6; b.strokeRect(x,y,w,h);
  b.fillStyle='#b3ffd0'; for (const [hx,hy] of [[x,y],[x+w,y],[x,y+h],[x+w,y+h],[x+w/2,y+h]]) b.fillRect(hx-.9,hy-.9,1.8,1.8);
  b.globalAlpha=1;
}
const winA = (t,a,c) => ss(seg(t,a,a+.12))*(1-ss(seg(t,c-.12,c)));

/* test glyphs (check / x) made of pixels */
const GX=[[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[6,0],[5,1],[4,2],[2,4],[1,5],[0,6],[3,3]];
const GV=[[0,3],[1,4],[2,5],[3,4],[4,3],[5,2],[6,1],[0,4],[1,5],[2,6],[3,5],[4,4],[5,3],[6,2]];
const GOFF=GX.map(()=>[(R()-.5)*14,(R()-.5)*14]);
// each glyph is pinned to its device: monitor's upper-right corner, tablet/phone top edge
const glyphs=[ {d:D0,t0:7.4,x:false,gx:D0.x+63.5,       gy:D0.y-22},
               {d:D1,t0:7.8,x:false,gx:D1.x+22,         gy:D1.y-TOP.tablet},
               {d:D2,t0:8.3,x:true, gx:D2.x,            gy:D2.y-TOP.phone} ];
const GS=3.2;
function drawGlyph(g,t){
  const a0 = ss(seg(t,g.t0,g.t0+.25))*(1-ss(seg(t,14.6,15.3)))*g.d.alpha; if (a0<=.01) return;
  const pop = seg(t,g.t0,g.t0+.35), sc = pop<1 ? 1+Math.sin(pop*Math.PI)*.35 - (1-pop)*.6 : 1;
  const m = g.x ? ease(seg(t,12.3,12.8)) : 1;
  for (let i=0;i<14;i++){
    const [ax,ay]=GX[i], [vx,vy]=GV[i], bump=Math.sin(Math.PI*m);
    const cx=lerp(ax,vx,m)+GOFF[i][0]*bump*.3, cy=lerp(ay,vy,m)+GOFF[i][1]*bump*.3;
    b.globalAlpha=a0; b.fillStyle = m>.5 ? (i%3?'#8cffb8':'#d4ffe4') : (i%3?'#e5097d':'#ff5aa9');
    b.fillRect(g.gx+(cx-3.5)*GS*sc, g.gy+(cy-3.5)*GS*sc, GS*sc*.92, GS*sc*.92);
  }
  b.globalAlpha=1;
}

/* world particles: streams + free sparks */
let WP = [];
function stream(a, dst, n, lift){
  for (let i=0;i<n;i++){
    const [bx,by] = screenPt(dst);
    WP.push({k:'s', ax:a[0]+(R()-.5)*4, ay:a[1]+(R()-.5)*4, bx, by,
      cx:(a[0]+bx)/2+(R()-.5)*40, cy:Math.min(a[1],by)-lift*(.7+R()*.6),
      s:-R()*.25, dur:.8+R()*.6, j:(R()-.5)*18, c:ACC_HI[R()*3|0], dst});
  }
}
function sparks(x,y,n,col){
  for (let i=0;i<n;i++){ const a=R()*6.283, s=10+R()*35;
    WP.push({k:'f', x, y, vx:Math.cos(a)*s, vy:Math.sin(a)*s, age:0, life:.35+R()*.6, c:col||ACC_HI[R()*3|0]}); }
}
function bez(q,s){ const u=1-s, x=u*u*q.ax+2*u*s*q.cx+s*s*q.bx, y=u*u*q.ay+2*u*s*q.cy+s*s*q.by, w=Math.sin(Math.PI*s)*q.j;
  return [x+w*.3, y+w]; }

let RIP=[];
function drawRipples(t){
  for (const r of RIP){ const q=(T-r.t0)/.6; if (q<0||q>1) continue;
    b.globalAlpha=(1-q)*.9; b.strokeStyle=ACC_HI[1]; b.lineWidth=.6;
    b.beginPath(); b.arc(r.x,r.y,1.5+q*7,0,6.3); b.stroke(); }
  RIP=RIP.filter(r=>T-r.t0<.6); b.globalAlpha=1;
}


/* ---------- intro: wireframe drawn on an artboard, then the monitor forms around it ---------- */
// rects in monitor-screen units (screen origin at world -60,-35), with drag times [t0,t1]
const cw3=(96-4)/3;
const IR=[ [.6,5.6,16.8,63.8,.55,1.0], [21,8,22,2,1.15,1.35], [105,7.7,12,3.6,1.45,1.62],
  [21,15,cw3,9,1.75,1.95], [21+cw3+2,15,cw3,9,2.05,2.25], [21+2*(cw3+2),15,cw3,9,2.35,2.55], [21,26,96,41,2.7,3.1] ];
const IDET=[[2,7.5,3,3], ...Array.from({length:7},(_,i)=>[2.4,13.6+i*5.2,12,2.2]), [21,11.2,14,1.1],
  ...[0,1,2].flatMap(j=>{ const cx=21+j*(cw3+2); return [[cx+2,17,cw3*.4,1],[cx+2,19.6,cw3*.38,3]]; }), [23,28,16,1.1]];
const IC=(()=>{ const k=[[.3,40,30]]; for (const r of IR){ k.push([r[4]-.02,r[0]-60,r[1]-35]); k.push([r[5],r[0]+r[2]-60,r[1]+r[3]-35]); }
  k.push([3.2,57,6]); k.push([3.85,30,22]); return k; })();
function introCursor(u){
  if (u<=IC[0][0]) return [IC[0][1],IC[0][2]];
  for (let i=0;i<IC.length-1;i++){ const a=IC[i], c=IC[i+1];
    if (u<=c[0]){ const e=ease((u-a[0])/(c[0]-a[0])); return [lerp(a[1],c[1],e), lerp(a[2],c[2],e)]; } }
  const l=IC[IC.length-1]; return [l[1],l[2]];
}
function drawIntro(u){
  const board = ss(seg(u,0,.4)) * (1-ss(seg(u,3.25,4)));
  const wire = 1-ss(seg(u,3.25,4));          // hands over to the monitor's own wireframe
  if (board>.01){
    b.globalAlpha=board*.8; b.fillStyle='#22222b';
    for (let x=-96;x<=96;x+=6) for (let y=-66;y<=72;y+=6) b.fillRect(x-.3,y-.3,.6,.6);
    b.globalAlpha=board; b.strokeStyle=C.ln; b.lineWidth=.5; b.strokeRect(-60,-35,120,70);
    b.fillStyle=C.tx; b.fillRect(-60,-39.2,14,1.6); b.fillStyle=C.ln; b.fillRect(-44,-39.2,6,1.6);
  }
  if (wire<=.01) return;
  b.lineWidth=.45;
  for (const [x,y,w,h,t0,t1] of IR){ const e=ease(seg(u,t0,t1)); if (e<=0) continue;
    const drawing = e<1;
    b.globalAlpha=wire; b.strokeStyle = drawing ? '#3dfc86' : C.hi;
    b.strokeRect(x-60,y-35,w*e,h*e);
    if (drawing){ b.fillStyle='#b3ffd0'; b.fillRect(x-60-.8,y-35-.8,1.6,1.6); b.fillRect(x-60+w*e-.8,y-35+h*e-.8,1.6,1.6); }
    else if (u<t1+.3){ b.globalAlpha=wire*(1-(u-t1)/.3)*.25; b.fillStyle='#21f770'; b.fillRect(x-60,y-35,w,h); } }
  IDET.forEach(([x,y,w,h],i)=>{ const a=ss(seg(u,3.05+i*.012,3.2+i*.012)); if (a<=0) return;
    b.globalAlpha=wire*a; b.strokeStyle=C.hi; b.strokeRect(x-60,y-35,w,h); });
  { const a=ss(seg(u,3.1,3.25)); if (a>0){ b.globalAlpha=wire*a; b.strokeStyle=C.ln; b.lineWidth=.35;
    b.beginPath(); b.moveTo(-33,-3); b.lineTo(55,29); b.moveTo(55,-3); b.lineTo(-33,29); b.stroke(); } }
  b.globalAlpha=1;
}

/* black grid between cells: gap scales with cell size */
let meshKey='', mesh=null;
function meshPattern(s,ox,oy){
  const key=s+'|'+ox+'|'+oy; if (key===meshKey) return mesh;
  const g=Math.max(1,Math.round(s*.22)), pc=document.createElement('canvas'); pc.width=pc.height=s;
  const pctx=pc.getContext('2d'); pctx.fillStyle='#000'; pctx.fillRect(0,0,s,s); pctx.clearRect(0,0,s-g,s-g);
  mesh=ctx.createPattern(pc,'repeat'); mesh.setTransform(new DOMMatrix().translate(ox,oy)); meshKey=key; return mesh;
}

/* ---------- loop ---------- */
let T=0, last=performance.now(), prevT=-OFF, prevAbs=0, xferAcc=0, sAcc=0;
const crossed = (a,tc,t) => a < tc && t >= tc;
const uvOf = (d,x,y) => { const g=geom(d); return [clamp((x-d.x)/g.sw+.5), clamp((y-d.y)/g.sh+.5)]; };

function tick(dt, draw){
  T += dt; const tAbs = T % LOOP, t = tAbs - OFF;       // t < 0 during the wireframe intro
  if (tAbs < prevAbs){ D0.parts = tgt.parts.map(q=>({...q})); D0.pulse=0; D1.parts=[]; D2.parts=[]; WP=[]; }
  const pt = prevT; prevT = t; prevAbs = tAbs;

  const out = s => 1-ss(seg(t,19.7+s,21+s*.5));
  // 1. design on the monitor
  D0.st = designState(t); D0.cols = ss(seg(t,.2,.6))*(1-ss(seg(t,4.4,4.9)));
  D0.alpha = ss(seg(t,-.75,0))*out(0); D0.act = 1 + D0.pulse;
  // 2. adapt to tablet + phone
  for (const d of [D1,D2]){ d.alpha = ss(seg(t,5.3,6.1))*out(.1); d.uiA = ss(seg(t,6.2,7.0)); d.act = .3+.7*d.uiA + d.pulse; }
  // 4. phone iterates: squeezed desktop layout -> proper mobile layout
  D2.mob = ss(seg(t,11.1,12.0));
  if (t>11.1) D2.act += 3*Math.exp(-(t-11.1)*1.2);
  for (const d of grid){
    const inA = ss(seg(t, 14.6+d.dist/1300*3, 15.4+d.dist/1300*3));
    d.alpha = d.isTarget ? inA*(1-ss(seg(t,22.3,22.9))) : inA*out(d.out);
    d.act = d.isTarget && t>19.6 ? lerp(.6+d.pulse, 1, seg(t,19.6,21.5)) : .6 + .5*Math.max(0,Math.sin(t*.9+d.ph)) + d.pulse;
  }
  tgt.st = t>20 ? revertState(t) : DONE;

  if (dt>0){
    if (crossed(pt,-.75,t)) for (let i=0;i<50;i++){ const g=geom(D0), e=R()*4|0, bw=g.sw+7, bh=g.sh+14;
      const x = e<2 ? (R()-.5)*bw : (e==2?-1:1)*bw/2, y = e<2 ? (e?1:-1)*bh/2+3.5 : (R()-.5)*bh+3.5; sparks(x,y,1); }
    if (crossed(pt,22.3,t)) for (let i=0;i<40;i++){ const [x,y]=screenPt(tgt); sparks(x,y,1); }
    for (const tc of CLICKS) if (crossed(pt,tc,t)){ const [x,y]=cursorPos(t), [u,v]=uvOf(D0,x,y);
      for (let i=0;i<30;i++) spawnP(D0,u,v,true); D0.pulse+=1.2; RIP.push({x,y,t0:T}); }
    if (t>5.8 && t<6.9){ sAcc+=70*dt; while(sAcc>1){ sAcc--; stream(screenPt(D0), R()<.5?D1:D2, 1, 20); } }
    for (const g of glyphs) if (crossed(pt,g.t0,t)) sparks(g.gx,g.gy,16,g.x?'#ff5aa9':ACC_HI[0]);
    for (const tc of [11.1,11.55]) if (crossed(pt,tc,t)){ for (let i=0;i<40;i++) spawnP(D2,R(),R(),true); D2.pulse+=1.5; }
    if (crossed(pt,12.3,t)) sparks(glyphs[2].gx,glyphs[2].gy,26,ACC_HI[0]);
    // 5. distribute: trio -> many devices, then network chatter
    if (t>15.2 && t<19.6){ xferAcc+=dt; const step = t<16.8 ? .05 : .16;
      while(xferAcc>step){ xferAcc-=step;
        const vis = all.filter(d=>d.alpha>.6 && !d.isTarget);
        if (t<16.8){ const g=vis.filter(d=>!trio.includes(d)); if (g.length){ const src=trio[R()*3|0]; stream(screenPt(src), g[R()*g.length|0], 5, 60+R()*100); src.pulse+=.6; } }
        else if (vis.length>2){ const a=vis[R()*vis.length|0];
          const nb = vis.filter(d=>d!==a && Math.hypot(d.x-a.x,d.y-a.y)<560);
          if (nb.length){ const dst=nb[R()*nb.length|0]; a.pulse+=2.5; stream(screenPt(a),dst,12,80+R()*120); } } } }
    for (const d of all) updDev(d,dt);
    for (const q of WP){
      if (q.k==='s'){ q.s += dt/q.dur;
        if (q.s>=1 && !q.done){ q.done=true; q.dst.pulse+=.18; const [u,v]=uvOf(q.dst,q.bx,q.by); spawnP(q.dst,u,v,true); } }
      else { q.age+=dt; q.x+=q.vx*dt; q.y+=q.vy*dt; }
    }
    WP = WP.filter(q => q.k==='s' ? q.s<1 : q.age<q.life);
  }

  if (draw) render(t);
}

function render(t){
  measureFocus();
  /* render to low-res buffer */
  const [cx,cy,z] = cam(t);
  b.setTransform(1,0,0,1,0,0); b.globalAlpha=1; b.fillStyle='#000'; b.fillRect(0,0,W,H);
  b.setTransform(z,0,0,z,FX-cx*z,FY-cy*z);   // camera target sits on the focus rect
  for (const d of grid) drawDevice(d,z,t);
  for (const d of trio) drawDevice(d,z,t);
  // selection boxes while editing (monitor screen origin = -60,-35)
  const st=D0.st, sx=-60, sy=-35;
  drawSel(sx+.6,sy+5.6,16.8,63.8, winA(t,1.0,1.6));
  drawSel(sx+21,sy+15,96,st.cardH, winA(t,1.65,2.75));
  drawSel(sx+21,sy+17+st.cardH,96,70-(20+st.cardH), winA(t,3.05,3.9));
  drawSel(sx+21,sy+7.4,96,4.2, winA(t,4.1,4.6));
  { const g=geom(D2); drawSel(D2.x-g.sw/2-1,D2.y-g.sh/2-1,g.sw+2,g.sh+2, winA(t,10.9,12.2)*D2.alpha); }
  drawRipples(t);
  if (t < 0) drawIntro(t+OFF);
  const [kx,ky] = t<0 ? introCursor(t+OFF) : cursorPos(t);
  const ca = t<0 ? ss(seg(t+OFF,.25,.5)) : 1-ss(seg(t,4.5,4.9));
  drawCursor(kx,ky, ca, t<0 ? IR.some(r=>t+OFF>r[4]&&t+OFF<r[5]) : CLICKS.some(c=>t>c-.05&&t<c+.12) || (t>1.8&&t<2.5));
  for (const g of glyphs) drawGlyph(g,t);
  const qs = Math.max(2, 1.4/z);
  for (const q of WP){
    if (q.k==='s'){ if (q.s<0) continue;
      for (let i=0;i<3;i++){ const s=q.s-i*.035; if (s<0) break; const [x,y]=bez(q,s);
        b.globalAlpha=(1-i*.35)*Math.min(1,q.s*6); b.fillStyle=i?ACC[i+1]:q.c;
        b.fillRect(Math.floor(x/qs)*qs, Math.floor(y/qs)*qs, qs, qs); } }
    else { b.globalAlpha=1-q.age/q.life; b.fillStyle=q.c; b.fillRect(Math.floor(q.x/qs)*qs, Math.floor(q.y/qs)*qs, qs, qs); }
  }
  b.globalAlpha=1;

  /* upscale: each buffer pixel becomes a screen cell separated by a black mesh */
  const s = S, dw=W*s, dh=H*s, ox=0, oy=0;
  ctx.setTransform(1,0,0,1,0,0); ctx.globalCompositeOperation='source-over'; ctx.globalAlpha=1;
  ctx.fillStyle='#000'; ctx.fillRect(0,0,cv.width,cv.height);
  ctx.imageSmoothingEnabled=false;
  { const g=Math.max(1,Math.round(s*.22)), fill=((s-g)/s)**2; ctx.filter=`brightness(${Math.min(2.4,.8/Math.pow(fill,.8)).toFixed(2)})`; } ctx.drawImage(buf,ox,oy,dw,dh); ctx.filter='none';
  ctx.fillStyle=meshPattern(s,ox,oy); ctx.fillRect(0,0,cv.width,cv.height);
  // faint glow of lit cells bleeding over the mesh, like a real panel
  ctx.globalCompositeOperation='lighter';
  ctx.filter=`blur(${s*2}px)`; ctx.globalAlpha=.18; ctx.drawImage(buf,ox,oy,dw,dh);
  ctx.filter='none'; ctx.globalCompositeOperation='source-over'; ctx.globalAlpha=1;
  const vx=FX*s, vy=FY*s;
  const vg=ctx.createRadialGradient(vx,vy,Math.min(cv.width,cv.height)*.35,vx,vy,Math.max(cv.width,cv.height)*.85);
  vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,.7)');
  ctx.fillStyle=vg; ctx.fillRect(0,0,cv.width,cv.height);
}

/* ---------- lifecycle ---------- */
let raf = 0, visible = true, destroyed = false;

if (reduced){
  // static poster: fast-forward to the "distributed" network of devices
  const STILL = OFF + 17.5;
  while (T + .05 < STILL) tick(.05, false);
  tick(STILL - T, true);
  const redraw = () => { if (destroyed) return; resize(); render(prevT); };
  const ro = new ResizeObserver(redraw);
  ro.observe(cv); if (focusEl) ro.observe(focusEl);
  document.fonts?.ready.then(redraw);
  return () => { destroyed = true; ro.disconnect(); };
}

function frame(now){
  if (destroyed) return;
  const dt = Math.min(.05, (now-last)/1000); last = now;
  tick(dt, true);
  raf = requestAnimationFrame(frame);
}
function start(){
  if (raf || destroyed || !visible || document.hidden) return;
  last = performance.now();
  raf = requestAnimationFrame(frame);
}
function stop(){ if (raf){ cancelAnimationFrame(raf); raf = 0; } }

const ro = new ResizeObserver(resize);
ro.observe(cv); if (focusEl) ro.observe(focusEl);
document.fonts?.ready.then(() => { if (!destroyed) resize(); });   // text reflow can move the focus box
const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); });
io.observe(cv);
const onVis = () => (document.hidden ? stop() : start());
document.addEventListener('visibilitychange', onVis);
start();

return () => {
  destroyed = true; stop();
  ro.disconnect(); io.disconnect();
  document.removeEventListener('visibilitychange', onVis);
};
}
