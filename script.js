let burger = document.querySelector('.header__burger'),
    list = document.querySelector('.header__nav-list'),
    opacity = document.querySelector('.opacity'),
    link = document.querySelectorAll('.header__nav-link');

for(let i = 0; i < link.length; i++) {
    link[i].addEventListener("click", function() {
        burger.classList.remove('active')
        list.classList.remove('active')
        opacity.style.display = "none"
    })
}
    
burger.addEventListener('click', function() {

    burger.classList.toggle('active')
    list.classList.toggle('active')
    if(list.classList.contains('active')) {
        opacity.style.display = "block"
        opacity.addEventListener("click", function() {
            if(opacity.style.display = "block") {
                burger.classList.remove('active')
                list.classList.remove('active')
                opacity.style.display = "none"
            }else {
                burger.classList.add('active')
                list.classList.add('active')
                opacity.style.display = "block"
            }
        })
    }else if(!list.classList.contains('active')) {
        opacity.style.display = "none"
    }
})

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}

class Slider{
  constructor({el, active, duration, autoplay, indicators, buttons, interval}){
      this.slider = el instanceof HTMLElement ? el : document.querySelector(el);
      this.active = active !== undefined ? active : 0;
      this.duration = duration !== undefined ? duration : 400;
      this.autoplay = autoplay;
      this.indicators = indicators;
      this.buttons = buttons;
      this.interval = interval !== undefined ? interval : 3000;
      this.id = '';
      this.sliderContent = this.slider.querySelector('.slider__content');
      this.sliderItems = [...this.sliderContent.children];
      if(this.indicators){
          let indParent = this.slider.querySelector('.indicators');
          for (let i = 0; i < this.sliderItems.length; i++) {
              let li = document.createElement('li');
              indParent.append(li);                
          }
      }
      this.sliderItems.forEach(item => {
          item.style.transition = `${this.duration}ms linear`;
      })
      this.sliderPrev = this.slider.querySelector('.slider__prev') ?? null;
      this.sliderNext = this.slider.querySelector('.slider__next') ?? null;
      this.indicatorsItems = this.indicators ? [...this.slider.querySelectorAll('.indicators li')] : null;
      this.changeClass();
      if(this.buttons){
          this.sliderPrev.addEventListener('click', () => this.changeSlide(this.sliderPrev));
          this.sliderNext.addEventListener('click', () => this.changeSlide(this.sliderNext));
      }
      if(this.indicators) {
          this.indicatorsItems.forEach(item => {
              item.addEventListener('click', (e) => {
                  e.preventDefault();
                  let index = this.indicatorsItems.findIndex(item => item == e.target);
                  this.active = index;
                  this.changeClass();
              })
          })
      }
      this.autoplaying();
      
  }
  changeClass(){
      if(this.autoplay) {
         clearInterval(this.id);
         this.autoplaying();
      }
      for (let i = 0; i < this.sliderItems.length; i++) {
          this.sliderItems[i].classList.remove('active');
          if(this.indicatorsItems) this.indicatorsItems[i].classList.remove('active');
      }
      this.sliderItems[this.active].classList.add('active');
      if(this.indicatorsItems) this.indicatorsItems[this.active].classList.add('active');
  }
  changeSlide(btn = this.sliderNext){
      if(btn == this.sliderNext){
          this.active++;
          if(this.active == this.sliderItems.length) this.active = 0;  
      }
      else if(btn == this.sliderPrev){
          this.active--;
          if(this.active < 0) this.active = this.sliderItems.length - 1;
      }
      else throw new Error('Wrong Button');
      this.changeClass();
  }
  autoplaying(){
      if(this.autoplay){
         this.id = setInterval(() => {
              this.changeSlide();
         }, this.interval);
      }
  }
};
const mySlider = new Slider({
  el: '.slider',
  active: 2,//указывается от 0
  duration: 800,
  autoplay: false,
  indicators: true,
  buttons: true,
  interval: 3000
  
});
