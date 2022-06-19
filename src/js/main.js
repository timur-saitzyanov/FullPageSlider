import '../style/style.scss';
import './custom-scroll-bar';

let slider = document.querySelector('.slider');
let currentSlide = 0;
const countSlides = 3;
const slide2Animation = document.querySelector('.slide-2_bg-image');
let widthSlider = Number.parseInt(getComputedStyle(slider, null).width) ;
let oneSlideWidth = Math.floor(widthSlider / countSlides);
let  mouseDown = false;
window.addEventListener('resize', ()=>{
   widthSlider = Number.parseInt(getComputedStyle(slider, null).width) ;
   oneSlideWidth = Math.floor(widthSlider / countSlides);
});
let x1 = 0;
let x2 = 0;
window.addEventListener('mousedown',(e)=>{
  x1 = e.screenX;
});
window.addEventListener('mouseup',(e)=>{
  x2 = e.screenX;
  if (x2 - x1 > 80){
    nextSlide();
    slide2Animation.classList.toggle('active-2')
  }else if (x2 - x1 < -80){

    nextSlide('prev');
    // slide2Animation.classList.toggle('active-2')
  }
});


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

  slide2Animation.classList.toggle('active-2');
  console.log(currentSlide)
}

const goHome = document.querySelectorAll('.gohome');
goHome.forEach(el=>{
  el.addEventListener('click', ()=>{
  slider.setAttribute('style', `
  transition:0.8s transform cubic-bezier(0,2,0,-1.51);
  transform:translate3d(${0}px,0px,0px);`);
  currentSlide = 0;
  setTimeout(()=>{
    slide2Animation.classList.toggle('active-2')
  },300)
  })
})
let whatLaterBtn = document.querySelector('.slide-1__button-go');
whatLaterBtn.addEventListener('click', ()=>nextSlide())
