document.addEventListener('DOMContentLoaded',function(){
  const navbar=document.querySelector('.navbar');
  let lastScroll=0;
  window.addEventListener('scroll',function(){
    const current=window.pageYOffset||document.documentElement.scrollTop;
    if(current>60) navbar.classList.add('shadow-sm'); else navbar.classList.remove('shadow-sm');
    if(current>lastScroll && current>120) navbar.style.transform='translateY(-100%)'; else navbar.style.transform='translateY(0)';
    lastScroll=current<=0?0:current;
  });
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      e.preventDefault();
      const sel=this.getAttribute('href');
      if(!sel) return;
      const target=document.querySelector(sel);
      if(!target) return;
      const rect=target.getBoundingClientRect();
      const top=rect.top+window.pageYOffset-80;
      window.scrollTo({top:top,behavior:'smooth'});
    });
  });
  const observer=new IntersectionObserver((entries,obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        if(entry.target.classList.contains('progress')){
          const bar=entry.target.querySelector('.progress-bar');
          if(bar){
            const w=bar.getAttribute('data-width')||bar.style.width;
            bar.style.width=w;
          }
        }
        obs.unobserve(entry.target);
      }
    });
  },{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.scale-in').forEach(el=>observer.observe(el));
  document.querySelectorAll('.progress').forEach(el=>observer.observe(el));
  initParticles();
  function initParticles(){
    const layer=document.querySelector('.particle-layer');
    if(!layer) return;
    const count=18;
    for(let i=0;i<count;i++){
      const p=document.createElement('div');
      p.style.position='absolute';
      p.style.width='6px';
      p.style.height='6px';
      p.style.borderRadius='50%';
      p.style.background='rgba(108,117,125,0.18)';
      p.style.left=Math.random()*100+'%';
      p.style.top=Math.random()*100+'%';
      p.style.pointerEvents='none';
      p.style.opacity=0.8;
      p.style.transform='translateY(0)';
      p.style.animation=`float ${(3+Math.random()*3).toFixed(2)}s ease-in-out ${Math.random()*2}s infinite`;
      layer.appendChild(p);
    }
  }
});
