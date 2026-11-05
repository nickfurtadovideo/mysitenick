/* Pausa animações CSS contínuas quando a seção está fora da tela ou a aba está oculta. */
(()=>{'use strict';
const targets=[...document.querySelectorAll('.home-mosaic,.logo-ribbon')];if(!targets.length||!('IntersectionObserver'in window))return;
const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('is-paused',!e.isIntersecting)),{rootMargin:'120px'});
targets.forEach(t=>io.observe(t));
document.addEventListener('visibilitychange',()=>targets.forEach(t=>t.classList.toggle('is-tab-hidden',document.hidden)));
})();
