/* Each section plays once per journey. Only returning to the top resets it. */
(()=>{
'use strict';
const preference=matchMedia('(prefers-reduced-motion: reduce)'),sections=[...document.querySelectorAll('main > section')],played=new Set(),active=new Set();let started=!document.documentElement.classList.contains('intro-pending'),armed=false,pending=0;
function play(section){if(!started||played.has(section))return;played.add(section);section.dataset.revealCycle=String(Number(section.dataset.revealCycle||0)+1);if(preference.matches||!section.animate)return;
const anim=section.animate([{opacity:.35,translate:'0 36px'},{opacity:1,translate:'0 0'}],{duration:1000,easing:'cubic-bezier(.22,1,.36,1)'});active.add(anim);anim.onfinish=()=>active.delete(anim)}
function visible(){sections.forEach(section=>{const box=section.getBoundingClientRect();if(box.top<innerHeight*.92&&box.bottom>0)play(section)})}
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)play(entry.target)})},{threshold:0,rootMargin:'0px 0px -8% 0px'});sections.forEach(s=>observer.observe(s));
function update(){pending=0;if(!started)return;if(scrollY>120)armed=true;if(scrollY<=3&&armed){armed=false;played.clear();active.forEach(a=>a.cancel());active.clear();visible()}
if(!preference.matches){document.querySelectorAll('.ambient-orb').forEach(el=>{const box=el.parentElement.getBoundingClientRect();if(box.bottom<0||box.top>innerHeight)return;el.style.transform=`translate3d(0,${Math.max(-24,Math.min(24,(innerHeight/2-box.top-box.height/2)*.035))}px,0)`})}}
addEventListener('scroll',()=>{if(!pending)pending=requestAnimationFrame(update)},{passive:true});
document.addEventListener('nk-intro-complete',()=>{started=true;played.add(document.querySelector('#hero'));visible()});
preference.addEventListener('change',()=>{if(preference.matches){active.forEach(a=>a.cancel());active.clear()}});if(started)visible();
})();
