
let slider = document.querySelector('.slider'),
  sliderList = slider.querySelector('.slider-list'),
  sliderTrack = slider.querySelector('.slider-track'),
  slides = slider.querySelectorAll('.slide'),
  // arrows = slider.querySelector('.slider-arrows'),
  // prev = arrows.children[0],
  // next = arrows.children[1],
  home = document.querySelector('.slider-track'),
  goNext = document.querySelector('.slide-1__button-go');


slideWidth = slides[0].offsetWidth,
  slideIndex = 0,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  posY1 = 0,
  posY2 = 0,
  posFinal = 0,
  isSwipe = false,
  isScroll = false,
  allowSwipe = true,
  transition = true,
  nextTrf = 0,
  prevTrf = 0,
  slidesLength = slides.length,

  lastTrf = --slidesLength * slideWidth,


  posThreshold = slides[0].offsetWidth * 0.35,
  trfRegExp = /([-0-9.]+(?=px))/;

let bgSlide2 = document.querySelector('.slide-2_bg-image');   /////////////////////////
// -------------------------------------=======================
home.addEventListener('click', (e) => {
  let elem = e.target;
  // console.log(`${elem.parentElement.localName}`);

  if (elem.parentElement.localName === 'a' && elem.parentElement.className === "gohome") {
    swipeStart();
    sliderTrack.style.transition = 'transform .5s';

    slideIndex = 0;
    sliderTrack.style.transform = `translate3d(-${0 * slideWidth}px, 0px, 0px)`;

  }
  e.preventDefault();

});
goNext.addEventListener('click', () => {
  bgSlide2.classList.add('active-2');
  swipeStart();
  sliderTrack.style.transition = 'transform .5s';
  slideIndex = 1;
  sliderTrack.style.transform = `translate3d(-${1 * slideWidth}px, 0px, 0px)`;

})

// -------------------------------------------------------=========================


let getEvent = function () {
  return (event.type.search('touch') !== -1) ? event.touches[0] : event;
},
  slide = function () {
    if (transition) {
      sliderTrack.style.transition = 'transform .5s';
    }
    // -------------------------------------------------------------------==============
    if (((slideIndex * slideWidth) > 1000) && ((slideIndex * slideWidth) < 2000)) {
      console.log(`Это второй слайд`);
      bgSlide2.classList.add('active-2');
    } if (((slideIndex * slideWidth) < 1000) || ((slideIndex * slideWidth) > 2000)) {
      console.log(`Это другой слайд`);

      bgSlide2.classList.remove('active-2');

    } // -------------------------------------------------------------------================

    sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

    // prev.classList.toggle('disabled', slideIndex === 0);
    // next.classList.toggle('disabled', slideIndex === --slides.length);
  },
  swipeStart = function () {
    let evt = getEvent();

    if (allowSwipe) {

      transition = true;

      nextTrf = (slideIndex + 1) * -slideWidth;
      prevTrf = (slideIndex - 1) * -slideWidth;

      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;

      sliderTrack.style.transition = '';

      document.addEventListener('touchmove', swipeAction);
      document.addEventListener('mousemove', swipeAction);
      document.addEventListener('touchend', swipeEnd);
      document.addEventListener('mouseup', swipeEnd);

      sliderList.classList.remove('grab');
      sliderList.classList.add('grabbing');
    }
  },
  swipeAction = function () {

    let evt = getEvent(),
      style = sliderTrack.style.transform,
      transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    // определение действия свайп или скролл
    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      // запрет ухода влево на первом слайде
      if (slideIndex === 0) {
        if (posInit < posX1) {
          setTransform(transform, 0);
          return;
        } else {
          allowSwipe = true;
        }
      }

      // запрет ухода вправо на последнем слайде
      if (slideIndex === slidesLength) {  // удаляю здесь два минуса --
        if (posInit > posX1) {
          setTransform(transform, lastTrf);
          return;
        } else {
          allowSwipe = true;
        }
      }



      // запрет протаскивания дальше одного слайда
      if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
        reachEdge();
        return;
      }

      // двигаем слайд
      sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }

  },
  swipeEnd = function () {
    posFinal = posInit - posX1;

    isScroll = false;
    isSwipe = false;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    sliderList.classList.add('grab');
    sliderList.classList.remove('grabbing');

    if (allowSwipe) {
      if (Math.abs(posFinal) > posThreshold) {
        if (posInit < posX1) {
          slideIndex--;
        } else if (posInit > posX1) {
          slideIndex++;
        }
      }

      if (posInit !== posX1) {

        allowSwipe = false;
        slide();
      } else {
        allowSwipe = true;
      }

    } else {
      allowSwipe = true;
    }

  },
  setTransform = function (transform, comapreTransform) {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    allowSwipe = false;
  },
  reachEdge = function () {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  };


sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
sliderList.classList.add('grab');

sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);
// arrows.addEventListener('click', function () {
//   let target = event.target;

//   if (target.classList.contains('next')) {
//     slideIndex++;
//   } else if (target.classList.contains('prev')) {
//     slideIndex--;
//   } else {
//     return;
//   }

//   slide();
// });
