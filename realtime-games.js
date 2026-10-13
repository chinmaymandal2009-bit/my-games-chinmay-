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
