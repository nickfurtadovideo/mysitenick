(()=>{document.documentElement.dataset.theme='dark';try{localStorage.removeItem('nk-theme')}catch{}})();
// Gate is progressive: failure to load its controller never blocks the site.
document.documentElement.classList.add('intro-pending');
setTimeout(()=>{if(!window.nkIntroReady){document.documentElement.classList.remove('intro-pending');document.querySelectorAll('[data-intro-inert]').forEach(el=>{el.inert=false;el.removeAttribute('data-intro-inert')})}},8000);
