(()=>{
  var sec=document.getElementById('posts'); if(!sec) return;
  var grid=document.getElementById('postsGrid'), filters=document.getElementById('postsFilters');
  var dlg=document.getElementById('postDialog'), dImg=document.getElementById('pdImg'), dTitle=document.getElementById('pdTitle'), dDesc=document.getElementById('pdDesc'), dLink=document.getElementById('pdLink');
  var items=[], visible=[], idx=0, opener=null;
  function safe(u){return typeof u==='string'&&/^(\/|\.\/|https?:\/\/|data:image\/(?:webp|png|jpeg|gif);base64,)/.test(u)&&!/^\/\//.test(u)?u:''}
  (window.__POSTS__ ? Promise.resolve({ok:true,json:()=>Promise.resolve(window.__POSTS__)}) : fetch('./posts.json',{cache:'no-cache'})).then(function(r){return r.ok?r.json():[]}).catch(function(){return []}).then(function(list){
    if(!Array.isArray(list)) list=[];
    items=list.map(function(p){return {t:String(p.titulo||'Post'),c:String(p.categoria||''),d:String(p.descricao||''),img:safe(p.imagem),thumb:safe(p.miniatura)||safe(p.imagem),w:+p.largura||0,h:+p.altura||0,link:safe(p.link)}}).filter(function(p){return p.img});
    if(!items.length) return;
    build(); sec.hidden=false;
  });
  function addNav(){
    document.querySelectorAll('.nav-links,.drawer-inner').forEach(function(box){
      var ref=box.querySelector('a[href="#trabalhos"]'); if(!ref) return;
      var a=document.createElement('a'); a.href='#posts'; a.textContent='Posts'; if(ref.className) a.className=ref.className;
      box.insertBefore(a,ref);
    });
  }
  function build(){
    var cats=[]; items.forEach(function(p){if(p.c&&cats.indexOf(p.c)<0) cats.push(p.c)});
    if(cats.length>1){
      ['Todos'].concat(cats).forEach(function(c,i){
        var b=document.createElement('button'); b.type='button'; b.textContent=c; b.setAttribute('aria-pressed',i===0?'true':'false');
        b.addEventListener('click',function(){filter(i===0?'':c)}); filters.appendChild(b);
      });
    } else filters.hidden=true;
    items.forEach(function(p,i){
      var b=document.createElement('button'); b.type='button'; b.className='post-item'; b.dataset.cat=p.c; b.setAttribute('aria-label','Ampliar: '+p.t);
      var im=document.createElement('img'); im.src=p.thumb; im.alt=p.t+(p.c?' — '+p.c:''); im.loading='lazy'; im.decoding='async';
      if(p.w&&p.h){im.width=p.w;im.height=p.h}
      var cap=document.createElement('span'); cap.className='post-cap'; cap.textContent=p.t;
      b.appendChild(im); b.appendChild(cap); b.addEventListener('click',function(){open(i,b)}); grid.appendChild(b); p.el=b;
    });
  }
  function filter(c){
    filters.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-pressed',String((b.textContent==='Todos'&&!c)||b.textContent===c))});
    items.forEach(function(p){p.el.hidden=!!c&&p.c!==c});
  }
  function show(i){
    visible=items.filter(function(p){return !p.el.hidden}); var cur=items[i]; idx=visible.indexOf(cur); if(idx<0){idx=0;cur=visible[0]}
    dImg.src=cur.img; dImg.alt=cur.t; dTitle.textContent=cur.t; dDesc.textContent=cur.d; dDesc.hidden=!cur.d;
    dLink.hidden=!cur.link; if(cur.link) dLink.href=cur.link;
  }
  function step(n){ if(!visible.length) return; idx=(idx+n+visible.length)%visible.length; show(items.indexOf(visible[idx])) }
  function open(i,btn){ opener=btn; show(i); document.documentElement.classList.add("lock"); if(dlg.showModal) dlg.showModal(); else dlg.setAttribute('open','') }
  document.getElementById('pdClose').addEventListener('click',function(){dlg.close()});
  document.getElementById('pdPrev').addEventListener('click',function(){step(-1)});
  document.getElementById('pdNext').addEventListener('click',function(){step(1)});
  dlg.addEventListener('click',function(e){if(e.target===dlg) dlg.close()});
  dlg.addEventListener('keydown',function(e){if(e.key==='ArrowLeft') step(-1); else if(e.key==='ArrowRight') step(1)});
  dlg.addEventListener('close',function(){document.documentElement.classList.remove("lock");dImg.removeAttribute('src'); if(opener) opener.focus()});
})();
