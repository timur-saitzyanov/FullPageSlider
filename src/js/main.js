import '../style/style.scss';
import './custom-scroll-bar';
// window.addEventListener('resize', ()=>{
//  document.location.reload();
// });
function initSlider(){
  let slider = document.querySelector('.slider');
  let currentSlide = 0;
  const countSlides = 3;
  const slide2Animation = document.querySelector('.slide-2_bg-image');
  let widthSlider = Number.parseFloat(getComputedStyle(slider, null).width) ;
  let oneSlideWidth = (widthSlider / countSlides);

  let x1 = 0;
  let x2 = 0;
  window.addEventListener('mousedown',(e)=>{
    x1 = e.screenX;
  });
  window.addEventListener('touchstart', (e)=>{
    x1 = e.changedTouches[0].screenX
  })
  window.addEventListener('mouseup',(e)=>{
    x2 = e.screenX;
    if (x2 - x1 > 80){
      nextSlide();
    }else if (x2 - x1 < -80){
      nextSlide('prev');
    }
  });
window.addEventListener('touchend',(e)=>{
  x2 = e.changedTouches[0].screenX ;
  if (x2 - x1 > 80){
      nextSlide();
    }else if (x2 - x1 < -80){
      nextSlide('prev');
    }
})

  function nextSlide(prev){
    let sliderStyleTransform = +getComputedStyle(slider,null).transform.split(', ')[4];

    currentSlide = prev ? currentSlide -1 : currentSlide + 1;


    if (currentSlide > 2){
      slider.setAttribute('style', `
    transition:${0.5}s transform cubic-bezier(0,2,0,-1.51);
    transform:translate3d(${0}px,0px,0px);`);
      currentSlide = 0;
    }else if (currentSlide === -1){
      slider.setAttribute('style', `
    transition:${0.5}s transform cubic-bezier(0,2,0,-1.51);
    transform:translate3d(${-2*oneSlideWidth}px,0px,0px);`);
      currentSlide = 2;
    }
    else {
      slider.setAttribute('style', `
    transition:${0.5}s transform cubic-bezier(0,2,0,-1.51);
    transform:translate3d(${sliderStyleTransform + (prev ? oneSlideWidth : -oneSlideWidth)}px,0px,0px);`);

    }
    if (currentSlide === 1){
      slide2Animation.classList.add('active-2');
    }else{
      slide2Animation.classList.remove('active-2');
    }
  }

  const goHome = document.querySelectorAll('.gohome');
  goHome.forEach(el=>{
    el.addEventListener('click', ()=>{
      slider.setAttribute('style', `
  transition:0.8s transform cubic-bezier(0,2,0,-1.51);
  transform:translate3d(${0}px,0px,0px);`);
      currentSlide = 0;
      setTimeout(()=>{
        slide2Animation.classList.remove('active-2')
      },100)
    })
  })
  let whatLaterBtn = document.querySelector('.slide-1__button-go');
  whatLaterBtn.addEventListener('click', ()=>nextSlide())

  const slide3MoreInformationBtn = document.querySelector('.slade-3_button');
  const modal = document.querySelector('.wrapPopup');
  if (slide3MoreInformationBtn){
    slide3MoreInformationBtn.addEventListener('click', function (){
      modal.classList.add('open');
    })
  }
  const btnClose = document.querySelector('button.close');
  btnClose.addEventListener('click', function (){
    modal.classList.remove('open');
  });
  const modalSliderLeftArrow = document.querySelector('.toLeftArrow');
  const modalSliderRightArrow = document.querySelector('.toRightArrow');
  const contentSliderWrap = document.querySelector('.inner-slider__content');

  modalSliderLeftArrow.addEventListener('click', (e)=> slideModalChange(e, true))
  modalSliderRightArrow.addEventListener('click', (e)=>slideModalChange(e));
  function slideModalChange(e,left){
    e.preventDefault();
    const sliderDots = document.querySelectorAll('.slider-dots');
    if (sliderDots[left ? 0 : 1  ].classList.contains('active-dot')){
      contentSliderWrap.style = `transform:translateX(${left ? -100 : 0}%)`;
      sliderDots[left ? 0 : 1].classList.remove('active-dot');
      sliderDots[left ? 1 : 0].classList.add('active-dot');
    }else {
      contentSliderWrap.style = `transform:translateX(${left ? 0 : -100}%)`;
      sliderDots[left ? 1 : 0].classList.remove('active-dot');
      sliderDots[left ? 0 : 1].classList.add('active-dot');
    }
  }
}
initSlider();