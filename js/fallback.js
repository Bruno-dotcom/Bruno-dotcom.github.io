/* Animated Canvas alternative for browsers without WebGL. */
if (document.body.classList.contains('no-webgl')) {
 const old=document.getElementById('space'), canvas=document.createElement('canvas'); canvas.id='space'; old.replaceWith(canvas);
 const ctx=canvas.getContext('2d'), reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const stars=Array.from({length:1050},()=>({x:Math.random(),y:Math.random(),s:Math.random()*1.25+.2,a:Math.random()*.65+.2}));
 let w=innerWidth,h=innerHeight,angle=-.6,zoom=1,drag=false,lastX=0,focused=null,points=[],last=performance.now(),moved=false;
 const colors=['#ffb34b','#aaa29b','#dcc593','#5dabe4','#de7951','#d9a36d','#e5cba0','#8edce5','#487bea'];
 let labelLanguage='en';
 const S=window.Space; S.ready=true; S.paused=false;
 S.setLabels=next=>{labelLanguage=next==='pt'?'pt':'en';}; S.focus=i=>{focused=i;};
 function resize(){w=innerWidth;h=innerHeight;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);}
 addEventListener('resize',resize);resize();
 canvas.addEventListener('pointerdown',e=>{drag=true;moved=false;lastX=e.clientX;canvas.setPointerCapture(e.pointerId);});
 canvas.addEventListener('pointermove',e=>{if(drag){const d=e.clientX-lastX;angle+=d*.005;moved ||=Math.abs(d)>2;lastX=e.clientX;}else canvas.style.cursor=points.some(p=>Math.hypot(e.clientX-p.x,e.clientY-p.y)<Math.max(p.r,20))?'pointer':'grab';});
 canvas.addEventListener('pointerup',e=>{drag=false;if(moved)return;const p=points.find(p=>Math.hypot(e.clientX-p.x,e.clientY-p.y)<Math.max(p.r,20));if(p)S.onSelect(p.i);});
 canvas.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(.65,Math.min(2,zoom*(e.deltaY>0?.92:1.08)));},{passive:false});
 function draw(now){requestAnimationFrame(draw);const dt=Math.min((now-last)/1000,.05);last=now;if(!S.paused&&!reduced&&!drag)angle+=dt*.025;
 ctx.fillStyle='#04050a';ctx.fillRect(0,0,w,h);
 for(const s of stars){let x=((s.x+angle*.015)%1+1)%1*w;ctx.globalAlpha=s.a;ctx.fillStyle=s.s>1.1?'#b9d9ff':'#fff';ctx.beginPath();ctx.arc(x,s.y*h,s.s,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
 const mobile=w<720,active=focused!==null,cx=mobile?w*.5:active?w*.28:w*.73,cy=mobile?active?h*.24:h*.36:h*.48;
 const max=mobile?w*.42:active?w*.26:w*.24, scale=max/9*zoom;
 const neb=ctx.createRadialGradient(cx,cy,0,cx,cy,max*1.9);neb.addColorStop(0,'rgba(48,64,110,.2)');neb.addColorStop(1,'transparent');ctx.fillStyle=neb;ctx.fillRect(0,0,w,h);
 points=[];
 for(let i=8;i>=1;i--){ctx.strokeStyle='rgba(160,182,238,.14)';ctx.lineWidth=.6;ctx.beginPath();ctx.ellipse(cx,cy,scale*(i+1),scale*(i+1)*.48,-.25,0,Math.PI*2);ctx.stroke();}
 for(let i=0;i<9;i++){
 const a=angle+(i*2.399),rad=i?scale*(i+1):0,x=cx+Math.cos(a)*rad,y=cy+Math.sin(a)*rad*.48-Math.cos(a)*rad*.18;
 const r=i===0?Math.max(18,scale*.68):Math.max(4,scale*([0,.14,.22,.24,.19,.42,.36,.3,.3][i]));
 points.push({i,x,y,r});
 if(i===0){const g=ctx.createRadialGradient(x,y,r*.2,x,y,r*3.8);g.addColorStop(0,'rgba(255,153,46,.6)');g.addColorStop(.3,'rgba(255,119,30,.14)');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r*3.8,0,Math.PI*2);ctx.fill();}
 if(i===6){ctx.strokeStyle='#b5a17c';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(x,y,r*1.8,r*.5,-.4,0,Math.PI*2);ctx.stroke();}
 const g=ctx.createRadialGradient(x-r*.4,y-r*.4,0,x,y,r);g.addColorStop(0,colors[i]);g.addColorStop(.6,colors[i]);g.addColorStop(1,i===0?'#e75c18':'#0c1020');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
 if(!mobile||active){ctx.fillStyle=focused===i?'#fff':'#adb3ca';ctx.font='10px ui-monospace, monospace';ctx.textAlign='center';ctx.fillText(SECTIONS[i].name[labelLanguage],x,y+r+17);}
 }
 }
 requestAnimationFrame(draw);
}
