const $=(s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>[...c.querySelectorAll(s)];
const header=$('#siteHeader');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>20),{passive:true});
const menu=$('.menu-toggle'),nav=$('.nav');
function toggleMobileMenu(e){
  if(e){e.preventDefault();e.stopPropagation();}
  if(!menu||!nav)return;
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
  menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
}
if(menu&&nav){
  menu.addEventListener('click',toggleMobileMenu);
  menu.addEventListener('touchend',e=>{if(e.cancelable)e.preventDefault();toggleMobileMenu(e);},{passive:false});
}
$$('.nav a').forEach(a=>a.addEventListener('click',()=>{
  nav?.classList.remove('open');
  menu?.setAttribute('aria-expanded','false');
  menu?.setAttribute('aria-label','Open navigation');
}));
$$('.view-more').forEach(btn=>btn.addEventListener('click',()=>{const section=btn.closest('section');section.classList.toggle('expanded');const open=section.classList.contains('expanded');btn.innerHTML=open?'View Less <span>↑</span>':btn.dataset.target==='portfolio'?'View More Work <span>↓</span>':btn.dataset.target==='knowledge'?'View More Topics <span>↓</span>':'View More Services <span>↓</span>';}));
$$('.filters button').forEach(btn=>btn.addEventListener('click',()=>{$$('.filters button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;$$('.project').forEach(p=>p.classList.toggle('is-hidden',f!=='all'&&p.dataset.category!==f));}));
const modal=$('.modal'),media=$('.modal-media'),msmall=$('.modal-copy small'),mh2=$('.modal-copy h2'),mp=$('.modal-copy p');
$$('.project-open').forEach(b=>b.addEventListener('click',()=>{const p=b.closest('.project'),img=b.querySelector('img');media.innerHTML=img?`<img src="${img.src}" alt="${img.alt}">`:'';msmall.textContent=(p.dataset.category||'').toUpperCase();mh2.textContent=p.dataset.title;mp.textContent=p.dataset.desc;modal.classList.add('open');modal.setAttribute('aria-hidden','false')}));
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
$('.modal-close')?.addEventListener('click',closeModal);
modal?.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
/* =========================================================
   EMMYS TECHNOLOGY
   AUTOMATIC HERO WIPE SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const slider = document.querySelector(".hero-slider");

  if (!slider) return;


  const slides = Array.from(
    slider.querySelectorAll(".hero-slide")
  );


  const dots = Array.from(
    slider.querySelectorAll(".hero-dot")
  );


  const nextButton =
    slider.querySelector(".hero-next");


  const prevButton =
    slider.querySelector(".hero-prev");


  let currentSlide = 0;

  let isAnimating = false;

  let autoPlay;


  /* ==========================================
     CHANGE SLIDE
  ========================================== */

  function goToSlide(newIndex) {

    if (isAnimating) return;

    if (newIndex === currentSlide) return;


    isAnimating = true;


    const oldSlide = slides[currentSlide];

    const newSlide =
      slides[
        (newIndex + slides.length) % slides.length
      ];


    /* New slide starts from the right */

    newSlide.classList.remove("previous");

    newSlide.classList.add("next");

    newSlide.style.visibility = "visible";

    newSlide.style.opacity = "1";


    /*
       Force browser to register
       starting position before moving.
    */

    void newSlide.offsetWidth;


    /* Start wipe */

    slider.classList.add("wiping");


    /* Old slide leaves left */

    oldSlide.classList.add("previous");


    /* New slide moves into position */

    newSlide.classList.remove("next");

    newSlide.classList.add("active");


    /* Old slide is no longer active */

    oldSlide.classList.remove("active");


    /* Update dots */

    dots.forEach((dot, index) => {

      dot.classList.toggle(
        "active",
        index === newIndex
      );

    });


    currentSlide =
      (newIndex + slides.length) % slides.length;


    /* Finish animation */

    setTimeout(() => {

      slides.forEach((slide, index) => {

        if (index !== currentSlide) {

          slide.classList.remove(
            "active",
            "previous",
            "next"
          );

          slide.style.visibility = "hidden";

          slide.style.opacity = "0";

        }

      });


      slider.classList.remove("wiping");

      isAnimating = false;

    }, 1100);

  }


  /* ==========================================
     NEXT
  ========================================== */

  function nextSlide() {

    goToSlide(
      currentSlide + 1
    );

  }


  /* ==========================================
     PREVIOUS
  ========================================== */

  function previousSlide() {

    goToSlide(
      currentSlide - 1
    );

  }


  /* ==========================================
     ARROWS
  ========================================== */

  if (nextButton) {

    nextButton.addEventListener(
      "click",
      () => {

        nextSlide();

        restartAutoPlay();

      }
    );

  }


  if (prevButton) {

    prevButton.addEventListener(
      "click",
      () => {

        previousSlide();

        restartAutoPlay();

      }
    );

  }


  /* ==========================================
     DOTS
  ========================================== */

  dots.forEach((dot, index) => {

    dot.addEventListener(
      "click",
      () => {

        goToSlide(index);

        restartAutoPlay();

      }
    );

  });


  /* ==========================================
     AUTOMATIC SLIDING
  ========================================== */

  function startAutoPlay() {

    clearInterval(autoPlay);

    autoPlay = setInterval(
      () => {

        nextSlide();

      },
      7000
    );

  }


  function restartAutoPlay() {

    clearInterval(autoPlay);

    startAutoPlay();

  }


  /* ==========================================
     INITIAL STATE
  ========================================== */

  slides.forEach((slide, index) => {

    slide.classList.remove(
      "active",
      "previous",
      "next"
    );

    if (index === 0) {

      slide.classList.add("active");

      slide.style.visibility = "visible";

      slide.style.opacity = "1";

      slide.style.transform =
        "translateX(0)";

    } else {

      slide.style.visibility = "hidden";

      slide.style.opacity = "0";

    }

  });


  if (dots[0]) {

    dots[0].classList.add("active");

  }


  /* Start automatic slider */

  startAutoPlay();

});


/* COLORFUL SCROLL DISPLAY / FLOAT-IN */
(()=>{const root=document.documentElement;root.classList.add("js-reveal");const reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;[".about-grid",".service-grid",".portfolio-grid",".process-line",".partner-card",".content-grid",".pricing-grid",".contact-grid",".footer-top",".footer-bottom",".contact-item",".marquee"].forEach(s=>document.querySelectorAll(s).forEach(e=>e.classList.add("reveal")));const items=[...document.querySelectorAll(".reveal")];if(!items.length)return;if(reduce||!("IntersectionObserver"in window)){items.forEach(e=>e.classList.add("is-visible"));return;}[".service-grid",".portfolio-grid",".process-line",".content-grid",".pricing-grid",".contact-grid"].forEach(s=>document.querySelectorAll(s).forEach(g=>[...g.children].filter(e=>e.classList.contains("reveal")).forEach((e,i)=>{e.classList.add("reveal-stagger");e.style.setProperty("--reveal-delay",`${Math.min(i*90,360)}ms`)})));const obs=new IntersectionObserver((entries,o)=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add("is-visible");o.unobserve(x.target)}}),{threshold:.12,rootMargin:"0px 0px -55px 0px"});items.forEach(e=>obs.observe(e));})();
