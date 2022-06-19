const deviceHasTouchscreen = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);
let thumbPosition = 0;
const thumb = document.querySelector('.slide-2_thumb');
const thumpInitialPosition = thumb.getBoundingClientRect().top.toFixed();
let downY = 0;
let upY = 0;
let mouseDown = false;
thumb.addEventListener(deviceHasTouchscreen ? 'touchstart' : 'mousedown', function (e) {
  mouseDown = true;
  if(deviceHasTouchscreen){
     downY = e.changedTouches[0].clientY - thumpInitialPosition;
  }
});

thumb.addEventListener(deviceHasTouchscreen ? 'touchend' : 'mouseup', function (e) {
  mouseDown = false;
  if(deviceHasTouchscreen){
    upY = e.changedTouches[0].clientY -thumpInitialPosition;
  }
});
const scrollParent = document.querySelector('.slide-2__scroll-bar');
const thumbLine = document.querySelector('.slide-2_line');
const thumbLineHeight = Number.parseInt(getComputedStyle(thumbLine, null).height);
const scrollText = document.querySelector('.slide-2__text p');
const scrollTextHeight = Number.parseInt(getComputedStyle(scrollText, null).height);
const coefficient = (scrollTextHeight - scrollText.getBoundingClientRect().top) / thumbLineHeight;

thumb
  .addEventListener( 'touchmove' , function (e) {
    if (e.cancelable) e.preventDefault();
    e.stopPropagation()
    if (mouseDown) {

      const toTopStyle = e.touches[0].clientY.toFixed() - thumpInitialPosition;
      thumb.setAttribute('style', `
      top: ${toTopStyle < 0 ? 0 : toTopStyle > thumbLineHeight - thumb.clientHeight + 3 ? thumbLineHeight- thumb.clientHeight + 3 : toTopStyle}px`);

      document.querySelector('.slide-2__text').scrollTo({
        top: toTopStyle * coefficient,
      });

    }
  })
scrollParent.addEventListener("focusout", (e) => {
  mouseDown = false;
});
scrollParent.addEventListener('mousemove', function (e){
  if (mouseDown){
    thumbPosition = e.clientY - thumpInitialPosition;
    thumb.setAttribute('style', `
    top:${thumbPosition< 0 ? 0 : thumbPosition > thumbLineHeight - thumb.clientHeight + 3 ? thumbLineHeight- thumb.clientHeight + 3 : thumbPosition}px;`);
    document.querySelector('.slide-2__text').scrollTo({
      top: coefficient*thumbPosition,
    });
  }

}, {passive:true});

thumbLine.addEventListener("click", (e) => {
  mouseDown = false;
  thumbPosition = e.offsetY > thumbLineHeight - thumb.clientHeight + 3 ? thumbLineHeight - thumb.clientHeight + 3 : e.offsetY <= 10 ? 0 : e.offsetY;
  thumb.setAttribute('style', `
    transition:0.1s transform linear;
    transform:translate3d(0px,${thumbPosition}px,0px);`);
  document.querySelector('.slide-2__text').scrollTo({
    top: coefficient * e.offsetY,
    left: 0,
    behavior: 'smooth'
  });
});
const arr = [];
scrollText.addEventListener('wheel', function (e) {
  arr.push(e.deltaY);
  let arrRed = arr.reduce((prev, next) => {
    return prev + next;
  }, thumbPosition);
  thumb.setAttribute('style', `
    transform:translate3d(0px,${arrRed / coefficient < 0 ? 0 : arrRed / coefficient > thumbLineHeight - thumb.clientHeight + 3 ? thumbLineHeight - thumb.clientHeight + 3 : arrRed / coefficient}px,0px`);
}, { passive: true })
