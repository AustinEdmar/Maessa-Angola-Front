
  /* VIDEO MODAL */
  const playBtn = document.getElementById('play-btn');
  const videoModal = document.getElementById('video-modal');
  const closeVideoBtn = document.getElementById('close-video');
  const modalVideo = document.getElementById('modal-video');

  function openVideo() {
    videoModal.classList.remove('opacity-0', 'pointer-events-none');
    videoModal.classList.add('opacity-100', 'pointer-events-auto');
    modalVideo.play();
  }

  function closeVideoModal() {
    videoModal.classList.remove('opacity-100', 'pointer-events-auto');
    videoModal.classList.add('opacity-0', 'pointer-events-none');
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }

  playBtn.addEventListener('click', (e) => { e.stopPropagation(); openVideo(); });
  closeVideoBtn.addEventListener('click', (e) => { e.stopPropagation(); closeVideoModal(); });
  videoModal.addEventListener('click', (e) => { if (!e.target.closest('#modal-video')) closeVideoModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVideoModal(); });

  /* Mobile menu */
  function toggleMenu() {
    const m = document.getElementById('mob-menu');
    m.classList.toggle('hidden');
    m.classList.toggle('flex');
  }

  /* Navbar scroll */
  const navbar  = document.getElementById('navbar');
  const logoMain = document.getElementById('logo-main');

  function setNavSolid(solid) {
    const navLinks = document.querySelectorAll('.nav-item');
    const socLinks = document.querySelectorAll('.soc-link');
    const isMobile = window.innerWidth < 768;
    if (solid) {
      navbar.classList.add('bg-white', 'shadow-md');
      logoMain.src = './assets/image/logo-black.png';
      if (isMobile) {
        navLinks.forEach(el => { el.classList.remove('text-navy'); el.classList.add('text-white'); });
      } else {
        navLinks.forEach(el => { el.classList.remove('text-white'); el.classList.add('text-navy'); });
      }
      socLinks.forEach(el => { el.classList.remove('text-white'); el.classList.add('text-navy'); });
      document.getElementById('ham-icon').classList.remove('text-white');
      document.getElementById('ham-icon').classList.add('text-navy');
    } else {
      navbar.classList.remove('bg-white', 'shadow-md');
      logoMain.src = './assets/image/logo.png';
      navLinks.forEach(el => { el.classList.remove('text-navy'); el.classList.add('text-white'); });
      socLinks.forEach(el => { el.classList.remove('text-navy'); el.classList.add('text-white'); });
      document.getElementById('ham-icon').classList.remove('text-navy');
      document.getElementById('ham-icon').classList.add('text-white');
    }
  }

  window.addEventListener('scroll', () => setNavSolid(window.scrollY > 60), { passive: true });

  /* GSAP */
  gsap.registerPlugin(ScrollTrigger);

  gsap.set('#htitle1, #htitle2', { y: 80, opacity: 0 });
  gsap.set('#play-btn', { scale: 0, opacity: 0 });
  gsap.set('#saiba-wrap', { y: 30, opacity: 0 });
  gsap.set('#p-title', { y: 40, opacity: 0 });
  gsap.set('.p-logo', { y: 50, opacity: 0 });
  gsap.set('#cta-l', { x: -70, opacity: 0 });
  gsap.set('#cta-r', { x: 70, opacity: 0 });
  gsap.set('#footer-sec', { y: 40, opacity: 0 });

  const heroTl = gsap.timeline({ delay: 0.15 });
  heroTl
    .to('#htitle1',    { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' })
    .to('#htitle2',    { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }, '-=0.6')
    .to('#play-btn',   { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(2)' }, '-=0.5')
    .to('#saiba-wrap', { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }, '-=0.35');

  gsap.to('#hero-bg', {
    yPercent: 28, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  gsap.to('#p-title', {
    y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: '#parceiros', start: 'top 85%', once: true }
  });

  gsap.to('.p-logo', {
    y: 0, opacity: 1, duration: 0.65, stagger: 0.13, ease: 'power2.out',
    scrollTrigger: { trigger: '#parceiros', start: 'top 82%', once: true }
  });

  gsap.to('#cta-l', {
    x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
    scrollTrigger: { trigger: '#cta-sec', start: 'top 80%', once: true }
  });

  gsap.to('#cta-r', {
    x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
    scrollTrigger: { trigger: '#cta-sec', start: 'top 80%', once: true }
  });

  gsap.to('#footer-sec', {
    y: 0, opacity: 1, duration: 0.75, ease: 'power2.out',
    scrollTrigger: { trigger: '#footer-sec', start: 'top 92%', once: true }
  });

  /* VIDEO CAROUSEL */
  const slides = document.querySelectorAll('.video-slide');
  let current = 0;

  function playSlide(index) {
    slides.forEach((slide) => {
      slide.classList.remove('opacity-100');
      slide.classList.add('opacity-0');
      const video = slide.querySelector('video');
      video.pause();
      video.currentTime = 0;
    });
    const activeSlide = slides[index];
    const activeVideo = activeSlide.querySelector('video');
    activeSlide.classList.remove('opacity-0');
    activeSlide.classList.add('opacity-100');
    activeVideo.play();
    activeVideo.onended = () => nextSlide();
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    playSlide(current);
  }

  playSlide(current);


  //js caroussell
   /* Animations */
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.fade-up').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  var fadeObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='none'; }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(function(el) { fadeObs.observe(el); });

  document.querySelectorAll('.stat-num').forEach(function(el) {
    var final = parseInt(el.textContent);
    ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: function() {
      var n=0, step=Math.ceil(final/55);
      var t=setInterval(function(){
        n=Math.min(n+step,final);
        el.innerHTML=n+'<span class="text-gold">+</span>';
        if(n>=final) clearInterval(t);
      },18);
    }});
  });
  gsap.from('h1',{y:40,opacity:0,duration:.9,ease:'power3.out'});

  /* ── Generic Carousel Factory ── */
  function makeCarousel(cfg) {
    var trackEl  = document.getElementById(cfg.trackId);
    var innerEl  = document.getElementById(cfg.innerId);
    var prevBtn  = document.getElementById(cfg.prevId);
    var nextBtn  = document.getElementById(cfg.nextId);
    var dotsWrap = document.getElementById(cfg.dotsId);
    var slides   = innerEl.querySelectorAll('.'+cfg.slideClass);
    var total    = slides.length;
    var current  = 0;
    var GAP      = 3;

    function visCount() {
      var w = window.innerWidth;
      if (cfg.slideClass === 'team-slide') return w < 640 ? 1 : w < 1024 ? 2 : 4;
      return w < 640 ? 1 : w < 1024 ? 2 : 3;
    }

    function setSizes() {
      var vis = visCount();
      var slideW = (trackEl.offsetWidth - GAP*(vis-1)) / vis;
      slides.forEach(function(s){ s.style.width = slideW+'px'; });
    }

    function maxIdx() { return Math.max(0, total - visCount()); }

    function buildDots() {
      dotsWrap.innerHTML = '';
      var pages = maxIdx()+1;
      for (var i=0; i<pages; i++) {
        (function(idx){
          var btn = document.createElement('button');
          btn.style.cssText = 'height:8px;border-radius:99px;border:none;cursor:pointer;transition:all .3s;';
          btn.addEventListener('click', function(){ goTo(idx); });
          dotsWrap.appendChild(btn);
        })(i);
      }
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, maxIdx()));
      var slideW = slides[0].offsetWidth;
      innerEl.style.transform = 'translateX(-'+(current*(slideW+GAP))+'px)';
      dotsWrap.querySelectorAll('button').forEach(function(d,i){
        d.style.width      = i===current ? '24px' : '8px';
        d.style.background = i===current ? cfg.activeColor : cfg.inactiveColor;
      });
    }

    setSizes(); buildDots(); goTo(0);

    prevBtn.addEventListener('click', function(){ goTo(current-1); });
    nextBtn.addEventListener('click', function(){ goTo(current+1); });

    /* swipe */
    var startX=0;
    innerEl.addEventListener('touchstart',function(e){ startX=e.touches[0].clientX; },{passive:true});
    innerEl.addEventListener('touchend',function(e){
      var diff=startX-e.changedTouches[0].clientX;
      if(Math.abs(diff)>40) goTo(current+(diff>0?1:-1));
    });

    window.addEventListener('resize',function(){ setSizes(); buildDots(); goTo(Math.min(current,maxIdx())); });
  }

  makeCarousel({
    trackId:'serv-track', innerId:'serv-inner', prevId:'serv-prev', nextId:'serv-next', dotsId:'serv-dots',
    slideClass:'serv-slide', activeColor:'#1a1a6e', inactiveColor:'rgba(26,26,110,0.2)'
  });

  makeCarousel({
    trackId:'team-track', innerId:'team-inner', prevId:'team-prev', nextId:'team-next', dotsId:'team-dots',
    slideClass:'team-slide', activeColor:'#F5C518', inactiveColor:'rgba(255,255,255,0.25)'
  });



  