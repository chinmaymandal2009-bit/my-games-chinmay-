/* My Games: new touch-first arcade games.
   AI mode runs locally. Online multiplayer needs a deployed Socket.IO server. */
function gameBattleArena(a){
 const {c,x,w,h}=canvas(a,800,520);
 let player={x:400,y:390,r:16,hp:5}, bots=[],score=0,frame=0,raf=0,alive=true,keys={},touch={x:0,y:0},mode='cpu';
 function reset(){player={x:400,y:390,r:16,hp:5};bots=[];for(let i=0;i<4;i++)bots.push({x:100+i*190,y:70+(i%2)*55,r:15,alive:true,stun:0});score=0;frame=0;alive=true;a.message.textContent='AI Arena: বটদের এড়িয়ে ট্যাগ করো।';}
 function move(dx,dy){touch.x=dx;touch.y=dy}
 const keydown=e=>{keys[e.key.toLowerCase()]=true;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key))e.preventDefault()};
 const keyup=e=>{keys[e.key.toLowerCase()]=false};
 window.addEventListener('keydown',keydown);window.addEventListener('keyup',keyup);
 button('◀',()=>move(-1,0));button('▲',()=>move(0,-1));button('▼',()=>move(0,1));button('▶',()=>move(1,0));button('STOP',()=>move(0,0));
 button('Online Multiplayer',()=>{a.message.textContent='Online mode চালু করতে multiplayer server deploy ও connect করতে হবে। আপাতত AI mode চলছে।'});
 button('Restart',reset);
 function draw(){raf=requestAnimationFrame(draw);frame++;x.fillStyle='#10233a';x.fillRect(0,0,w,h);x.strokeStyle='#244866';for(let i=0;i<w;i+=40){x.beginPath();x.moveTo(i,0);x.lineTo(i,h);x.stroke()}for(let i=0;i<h;i+=40){x.beginPath();x.moveTo(0,i);x.lineTo(w,i);x.stroke()}
 if(alive){let dx=(touch.x||((keys.arrowright||keys.d)?1:0)-((keys.arrowleft||keys.a)?1:0)),dy=(touch.y||((keys.arrowdown||keys.s)?1:0)-((keys.arrowup||keys.w)?1:0));const len=Math.hypot(dx,dy)||1;player.x=Math.max(24,Math.min(w-24,player.x+dx/len*4));player.y=Math.max(24,Math.min(h-24,player.y+dy/len*4));
 bots.forEach(b=>{if(!b.alive)return;let vx=player.x-b.x,vy=player.y-b.y,d=Math.hypot(vx,vy)||1;b.x+=vx/d*(1.1+Math.min(score*.02,.8));b.y+=vy/d*(1.1+Math.min(score*.02,.8));if(d<player.r+b.r){player.hp--;b.x=Math.random()*w;b.y=Math.random()*h;if(player.hp<=0){alive=false;a.message.textContent='Arena শেষ! Score: '+score+' — Restart চাপো।'}}});
 if(frame%210===0){let b=bots.find(q=>!q.alive);if(b){b.alive=true;b.x=Math.random()*w;b.y=20;}}
 x.fillStyle='#31e6b0';x.beginPath();x.arc(player.x,player.y,player.r,0,Math.PI*2);x.fill();x.fillStyle='#fff';x.fillText('YOU',player.x-14,player.y-24);
 bots.forEach(b=>{if(!b.alive)return;x.fillStyle='#ff647c';x.beginPath();x.arc(b.x,b.y,b.r,0,Math.PI*2);x.fill();x.fillStyle='#fff';x.fillRect(b.x-5,b.y-3,3,3);x.fillRect(b.x+3,b.y-3,3,3)});
 x.fillStyle='#fff';x.font='bold 20px system-ui';x.fillText('❤️ '+player.hp+'     SCORE '+score,18,30);
 if(frame%90===0){score++;a.best(score)}
 }else{x.fillStyle='#fff';x.font='bold 28px system-ui';x.fillText('GAME OVER',w/2-80,h/2)}
 }
 reset();draw();a.setCleanup(()=>{cancelAnimationFrame(raf);window.removeEventListener('keydown',keydown);window.removeEventListener('keyup',keyup)});
}
function gameCarRacing(a){
 const {c,x,w,h}=canvas(a,800,520);let lane=1,traffic=[],score=0,frame=0,raf=0,alive=true,steer=0,mode='cpu';
 function reset(){lane=1;traffic=[];score=0;frame=0;alive=true;steer=0;a.message.textContent='Touch ◀ ▶ করে গাড়ি চালাও; অন্য গাড়ি এড়িয়ে চলো।'}
 button('◀ LEFT',()=>{lane=Math.max(0,lane-1)});button('RIGHT ▶',()=>{lane=Math.min(2,lane+1)});button('Online Multiplayer',()=>{a.message.textContent='Online race-এর জন্য multiplayer server deploy করে connect করতে হবে। আপাতত AI racers চলছে।'});button('Restart',reset);
 function draw(){raf=requestAnimationFrame(draw);frame++;x.fillStyle='#17643c';x.fillRect(0,0,w,h);x.fillStyle='#333c4b';x.fillRect(150,0,500,h);x.strokeStyle='#f6f2b2';x.lineWidth=5;x.setLineDash([28,25]);x.beginPath();x.moveTo(316,0);x.lineTo(316,h);x.moveTo(483,0);x.lineTo(483,h);x.stroke();x.setLineDash([]);
 if(alive){if(frame%58===0)traffic.push({lane:Math.floor(Math.random()*3),y:-65,speed:3+Math.random()*2});traffic.forEach(t=>t.y+=t.speed+Math.min(score*.03,2));traffic=traffic.filter(t=>t.y<h+70);const px=233+lane*167,py=420;
 traffic.forEach(t=>{const tx=233+t.lane*167;if(t.lane===lane&&Math.abs(t.y-py)<62){alive=false;a.message.textContent='Crash! Distance: '+score+' — Restart চাপো।'}x.fillStyle='#f97362';x.fillRect(tx-27,t.y-36,54,72);x.fillStyle='#fbd3c8';x.fillRect(tx-18,t.y-26,36,15)});
 x.fillStyle='#5ba7ff';x.fillRect(px-29,py-40,58,82);x.fillStyle='#d9f0ff';x.fillRect(px-19,py-28,38,20);x.fillStyle='#0b1220';x.fillRect(px-34,py-26,7,20);x.fillRect(px+27,py-26,7,20);x.fillRect(px-34,py+25,7,20);x.fillRect(px+27,py+25,7,20);
 if(frame%20===0){score++;a.best(score)}x.fillStyle='white';x.font='bold 20px system-ui';x.fillText('DISTANCE '+score,18,30);
 }else{x.fillStyle='white';x.font='bold 28px system-ui';x.fillText('RACE OVER',w/2-75,h/2)}}
 reset();draw();a.setCleanup(()=>cancelAnimationFrame(raf));
}
function gameFootball(a){
 const {c,x,w,h}=canvas(a,800,520);let p={x:400,y:365},ball={x:400,y:330,vx:0,vy:0},keeper={x:400,y:62},score=0,frame=0,raf=0,keys={},touch={x:0,y:0},shoot=0;
 const kd=e=>{keys[e.key.toLowerCase()]=true;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key))e.preventDefault()},ku=e=>keys[e.key.toLowerCase()]=false;window.addEventListener('keydown',kd);window.addEventListener('keyup',ku);
 function reset(){p={x:400,y:365};ball={x:400,y:330,vx:0,vy:0};keeper={x:400,y:62};score=0;frame=0;a.message.textContent='প্লেয়ারকে বলের কাছে নাও, তারপর SHOOT চাপো।'}
 function move(dx,dy){touch={x:dx,y:dy}}
 button('◀',()=>move(-1,0));button('▲',()=>move(0,-1));button('▼',()=>move(0,1));button('▶',()=>move(1,0));button('SHOOT ⚽',()=>{const d=Math.hypot(ball.x-p.x,ball.y-p.y);if(d<62){ball.vx=(400-ball.x)*.045;ball.vy=-8;shoot=12;a.message.textContent='শট! গোল করার চেষ্টা করো।'}else a.message.textContent='বলটার আরও কাছে যাও।'});
 button('Online 1v1',()=>{a.message.textContent='Online 1v1-এর জন্য multiplayer server deploy করে connect করতে হবে। আপাতত AI goalkeeper-এর বিরুদ্ধে খেলো।'});button('Restart',reset);
 function draw(){raf=requestAnimationFrame(draw);frame++;x.fillStyle='#16804a';x.fillRect(0,0,w,h);x.strokeStyle='#e2ffe9';x.lineWidth=3;x.strokeRect(18,18,w-36,h-36);x.beginPath();x.moveTo(18,h/2);x.lineTo(w-18,h/2);x.stroke();x.beginPath();x.arc(w/2,h/2,70,0,Math.PI*2);x.stroke();x.strokeRect(300,18,200,72);x.fillStyle='#e9f4ff';x.fillRect(350,12,100,18);
 let dx=(touch.x||((keys.arrowright||keys.d)?1:0)-((keys.arrowleft||keys.a)?1:0)),dy=(touch.y||((keys.arrowdown||keys.s)?1:0)-((keys.arrowup||keys.w)?1:0));const len=Math.hypot(dx,dy)||1;p.x=Math.max(35,Math.min(w-35,p.x+dx/len*3.5));p.y=Math.max(110,Math.min(h-35,p.y+dy/len*3.5));
 keeper.x=400+Math.sin(frame*.025)*120;ball.x+=ball.vx;ball.y+=ball.vy;ball.vx*=.985;ball.vy*=.985;
 if(ball.y<34&&ball.x>350&&ball.x<450){score++;a.best(score);ball={x:400,y:330,vx:0,vy:0};a.message.textContent='GOAL! '+score+' গোল। আবার SHOOT করো।'}
 if(ball.y<105&&ball.y>35&&Math.abs(ball.x-keeper.x)<48){ball.vy=Math.abs(ball.vy)*.8;ball.vx+=(ball.x-keeper.x)*.08}
 if(ball.y>h-25||ball.x<25||ball.x>w-25){ball={x:400,y:330,vx:0,vy:0}}
 x.fillStyle='#facc15';x.beginPath();x.arc(keeper.x,54,22,0,Math.PI*2);x.fill();x.fillStyle='#38bdf8';x.beginPath();x.arc(p.x,p.y,18,0,Math.PI*2);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(ball.x,ball.y,10,0,Math.PI*2);x.fill();x.strokeStyle='#172033';x.stroke();x.fillStyle='#fff';x.font='bold 20px system-ui';x.fillText('GOALS '+score,20,42)}
 reset();draw();a.setCleanup(()=>{cancelAnimationFrame(raf);window.removeEventListener('keydown',kd);window.removeEventListener('keyup',ku)});
}
function gameZombieSurvival(a){
 const {c,x,w,h}=canvas(a,800,520);let p={x:400,y:260,hp:5},zombies=[],gems=[],score=0,frame=0,raf=0,alive=true,touch={x:0,y:0},keys={};
 const kd=e=>{keys[e.key.toLowerCase()]=true;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))e.preventDefault()},ku=e=>keys[e.key.toLowerCase()]=false;window.addEventListener('keydown',kd);window.addEventListener('keyup',ku);
 function reset(){p={x:400,y:260,hp:5};zombies=[];gems=[];for(let i=0;i<5;i++)zombies.push({x:Math.random()*w,y:Math.random()*h});for(let i=0;i<5;i++)gems.push({x:40+Math.random()*(w-80),y:40+Math.random()*(h-80),got:false});score=0;frame=0;alive=true;a.message.textContent='জম্বিদের এড়িয়ে সবুজ energy orb সংগ্রহ করো।'}
 function move(dx,dy){touch={x:dx,y:dy}}
 button('◀',()=>move(-1,0));button('▲',()=>move(0,-1));button('▼',()=>move(0,1));button('▶',()=>move(1,0));button('DASH',()=>{p.x=Math.max(20,Math.min(w-20,p.x+(touch.x||1)*65));p.y=Math.max(20,Math.min(h-20,p.y+(touch.y||0)*65))});
 button('Online Co-op',()=>{a.message.textContent='Online co-op-এর জন্য multiplayer server deploy করে connect করতে হবে। আপাতত AI survival চলছে।'});button('Restart',reset);
 function draw(){raf=requestAnimationFrame(draw);frame++;x.fillStyle='#101b24';x.fillRect(0,0,w,h);for(let i=0;i<45;i++){x.fillStyle='#1b342d';x.fillRect((i*137)%w,(i*71)%h,3,3)}
 if(alive){let dx=(touch.x||((keys.arrowright||keys.d)?1:0)-((keys.arrowleft||keys.a)?1:0)),dy=(touch.y||((keys.arrowdown||keys.s)?1:0)-((keys.arrowup||keys.w)?1:0));const len=Math.hypot(dx,dy)||1;p.x=Math.max(18,Math.min(w-18,p.x+dx/len*3.5));p.y=Math.max(18,Math.min(h-18,p.y+dy/len*3.5));
 zombies.forEach(z=>{const vx=p.x-z.x,vy=p.y-z.y,d=Math.hypot(vx,vy)||1;z.x+=vx/d*1.1;z.y+=vy/d*1.1;if(d<28&&frame%35===0){p.hp--;if(p.hp<=0){alive=false;a.message.textContent='Survival শেষ! Score: '+score+' — Restart চাপো।'}}x.fillStyle='#9bd36b';x.beginPath();x.arc(z.x,z.y,15,0,Math.PI*2);x.fill();x.fillStyle='#263b22';x.fillRect(z.x-6,z.y-4,4,4);x.fillRect(z.x+3,z.y-4,4,4)});
 gems.forEach(g=>{if(g.got)return;x.fillStyle='#38f2c1';x.beginPath();x.arc(g.x,g.y,9,0,Math.PI*2);x.fill();if(Math.hypot(g.x-p.x,g.y-p.y)<24){g.got=true;score++;a.best(score);let ng=gems.find(q=>q.got);if(gems.every(q=>q.got)){gems.forEach(q=>{q.got=false;q.x=30+Math.random()*(w-60);q.y=30+Math.random()*(h-60)})}}});
 x.fillStyle='#60a5fa';x.beginPath();x.arc(p.x,p.y,16,0,Math.PI*2);x.fill();x.fillStyle='#fff';x.font='bold 20px system-ui';x.fillText('❤️ '+p.hp+'   ENERGY '+score,18,30);
 }else{x.fillStyle='#fff';x.font='bold 28px system-ui';x.fillText('SURVIVAL OVER',w/2-105,h/2)}}
 reset();draw();a.setCleanup(()=>{cancelAnimationFrame(raf);window.removeEventListener('keydown',kd);window.removeEventListener('keyup',ku)});
}


async async function gameBattleRoyale(a){
 a.message.textContent='3D Battle Royale loading…';
 let renderer,raf,disposed=false,scene,camera,player,zone,health=100,score=0,frame=0,move={x:0,z:0},enemies=[],radius=42,shoot=()=>{};
 const addBtn=(label,fn)=>button(label,fn,a.controls);
 addBtn('◀',()=>{move.x=-1;move.z=0});addBtn('▲',()=>{move.x=0;move.z=-1});addBtn('▼',()=>{move.x=0;move.z=1});addBtn('▶',()=>{move.x=1;move.z=0});addBtn('STOP',()=>{move={x:0,z:0}});
 addBtn('FIRE 🎯',()=>shoot());addBtn('ONLINE',()=>{a.message.textContent='Online Battle Royale-এর জন্য multiplayer server deploy ও connect করতে হবে। এখন AI prototype চলছে।'});
 addBtn('RESTART',()=>{if(player){health=100;score=0;radius=42;player.position.set(0,0,0);enemies.forEach((e,i)=>{e.position.set((i%2?1:-1)*(8+i*2),0,12+i*5);e.userData.hp=2});a.message.textContent='নতুন ম্যাচ শুরু! AI opponents-কে ট্যাগ করো।'}});
 try{
  const THREE=await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');if(disposed)return;
  scene=new THREE.Scene();scene.background=new THREE.Color(0x9dd9ff);scene.fog=new THREE.Fog(0x9dd9ff,45,110);
  camera=new THREE.PerspectiveCamera(65,800/520,.1,300);
  renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));renderer.setSize(800,520);renderer.domElement.style.width='100%';renderer.domElement.style.maxHeight='68vh';renderer.domElement.style.display='block';renderer.domElement.style.borderRadius='14px';a.wrap.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xffffff,0x41633b,2));const sun=new THREE.DirectionalLight(0xffffff,2);sun.position.set(20,35,10);scene.add(sun);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(140,140),new THREE.MeshStandardMaterial({color:0x5a9b58,roughness:1}));ground.rotation.x=-Math.PI/2;scene.add(ground);
  for(let i=0;i<38;i++){const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.18,.28,1.5,6),new THREE.MeshStandardMaterial({color:0x795235}));const crown=new THREE.Mesh(new THREE.ConeGeometry(1.2,3,7),new THREE.MeshStandardMaterial({color:0x236b46}));let tx=(Math.random()-.5)*100,tz=(Math.random()-.5)*100;if(Math.hypot(tx,tz)<10){tx+=20;tz+=20}trunk.position.set(tx,.75,tz);crown.position.set(tx,2.6,tz);scene.add(trunk,crown)}
  function makeCharacter(color){const g=new THREE.Group();const body=new THREE.Mesh(new THREE.CapsuleGeometry(.42,.8,4,8),new THREE.MeshStandardMaterial({color}));body.position.y=.85;g.add(body);const head=new THREE.Mesh(new THREE.SphereGeometry(.28,12,10),new THREE.MeshStandardMaterial({color:0xffd4aa}));head.position.y=1.65;g.add(head);const pack=new THREE.Mesh(new THREE.BoxGeometry(.48,.52,.22),new THREE.MeshStandardMaterial({color:0x334155}));pack.position.set(0,1,.38);g.add(pack);return g}
  player=makeCharacter(0x2498ff);scene.add(player);
  for(let i=0;i<7;i++){const e=makeCharacter([0xef476f,0xf97316,0xa855f7][i%3]);e.position.set((i%2?1:-1)*(8+i*2),0,12+i*5);e.userData.hp=2;scene.add(e);enemies.push(e)}
  zone=new THREE.Mesh(new THREE.RingGeometry(radius-.35,radius,96),new THREE.MeshBasicMaterial({color:0x38bdf8,side:THREE.DoubleSide,transparent:true,opacity:.9}));zone.rotation.x=-Math.PI/2;zone.position.y=.08;scene.add(zone);
  shoot=function(){if(disposed||!player||health<=0)return;let target=null,best=24;for(const e of enemies){if(e.userData.hp<=0)continue;const d=player.position.distanceTo(e.position);if(d<best){best=d;target=e}}if(target){target.userData.hp--;if(target.userData.hp<=0){target.position.y=-8;score++;a.best(score);a.message.textContent='Opponent tag হয়েছে! Score: '+score;if(enemies.every(q=>q.userData.hp<=0))a.message.textContent='🏆 VICTORY! সব AI opponent-কে হারিয়েছ! RESTART চাপো.'}}else a.message.textContent='কাছাকাছি AI opponent নেই—আরও কাছে যাও।'}
  const keydown=e=>{const k=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright',' '].includes(k))e.preventDefault();if(k==='w'||k==='arrowup')move.z=-1;if(k==='s'||k==='arrowdown')move.z=1;if(k==='a'||k==='arrowleft')move.x=-1;if(k==='d'||k==='arrowright')move.x=1;if(k===' ')shoot()};
  const keyup=e=>{if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright'].includes(e.key.toLowerCase()))move={x:0,z:0}};
  window.addEventListener('keydown',keydown);window.addEventListener('keyup',keyup);
  let last=0;function animate(t){if(disposed)return;raf=requestAnimationFrame(animate);frame++;const dt=Math.min((t-last)/16.67||1,2);last=t;
   const dx=move.x,dz=move.z,len=Math.hypot(dx,dz)||1;player.position.x+=dx/len*.16*dt;player.position.z+=dz/len*.16*dt;player.position.x=Math.max(-radius,Math.min(radius,player.position.x));player.position.z=Math.max(-radius,Math.min(radius,player.position.z));if(Math.abs(dx)+Math.abs(dz)>0)player.rotation.y=Math.atan2(dx,dz);
   enemies.forEach(e=>{if(e.userData.hp<=0)return;const vx=player.position.x-e.position.x,vz=player.position.z-e.position.z,d=Math.hypot(vx,vz)||1;if(d>1.7){e.position.x+=vx/d*.025*dt;e.position.z+=vz/d*.025*dt}if(d<1.7&&frame%45===0){health=Math.max(0,health-10);a.message.textContent='AI opponent কাছে এসেছে! Health: '+health;if(health<=0)a.message.textContent='MATCH OVER — Score: '+score+'. RESTART চাপো.'}});
   if(frame%360===0&&radius>12){radius-=2;zone.geometry.dispose();zone.geometry=new THREE.RingGeometry(radius-.35,radius,96);a.message.textContent='Safe zone ছোট হচ্ছে! Score: '+score+' · Health: '+health}
   camera.position.set(player.position.x,player.position.y+7,player.position.z+10);camera.lookAt(player.position.x,player.position.y+1,player.position.z);renderer.render(scene,camera);
  }
  a.message.textContent='3D Battle Royale শুরু! টাচ বাটন বা WASD ব্যবহার করো। FIRE চাপলে কাছের AI opponent-কে ট্যাগ করবে।';animate(0);
  a.setCleanup(()=>{disposed=true;cancelAnimationFrame(raf);window.removeEventListener('keydown',keydown);window.removeEventListener('keyup',keyup);if(renderer){renderer.dispose();renderer.domElement.remove()}});
 }catch(e){console.error(e);a.message.textContent='3D গেম লোড হয়নি। Internet connection পরীক্ষা করে পেজ refresh করো।'}
}
