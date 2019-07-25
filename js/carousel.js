class Carousel {

  constructor(props){
    this.carouselContainer = document.querySelector(props.carouselWrapper);
    this.carouselImageWrapper = document.querySelector(props.imageWrapper);
    this.imageWidth;
    this.imageHeight = props.imageHeight || 500;
    this.fps = props.fps || 60;
    this.delay = 5000;
    this.marginLeft = 0;
    this.imageCount = this.carouselImageWrapper.childElementCount;
    this.currentImageIndex = 0;
    this.minPos = 0;
    this.maxPos = this.imageWidth * this.imageCount -1 ;
    this.maxIndex = this.imageCount - 1;
    this.dots = [];

    this.windowResizeTimeout;

    this.dotWrapper;
    this.nextWrapper;
    this.prevWrapper;
    this.intervalId;
    this.build();
    this.animate();

    //to control disable property to the buttons



  }

  build(){

    //setting container and image wrapper  dimension dynamically
     if(window.innerWidth >1349 && window.innerWidth <1440){
      this.imageWidth = 1349;
    }
    else{
      this.imageWidth  = window.innerWidth;
    }





    this.carouselContainer.style.width = this.imageWidth+'px';
    this.carouselImageWrapper.style.width = this.imageCount * this.imageWidth + 'px';

    let images = this.carouselImageWrapper.querySelectorAll('img');
    for(let i=0; i<images.length; i++){
      images[i].style.width = this.imageWidth + 'px';
    }


    //creating dots to dom

    this.dotWrapper = document.createElement('div');
    this.dotWrapper.className = 'dot-wrapper';
    this.carouselContainer.appendChild(this.dotWrapper);
    for(let i = 0; i < this.imageCount; i++){
      let dotController = document.createElement('div');
          dotController.className = 'dot' + (i === 0 ? ' active' : '');
          dotController.style.cursor = 'pointer';
          this.dots.push(dotController);
          dotController.addEventListener('click', () => {
            this.gotoSlide(i);
          });
          this.dotWrapper.appendChild(dotController);
          }


    // //adding next button to dom
    // this.nextWrapper = document.createElement('div');
    // this.nextWrapper.className = 'arrow next-arrow';
    // this.carouselContainer.appendChild( this.nextWrapper);
    // const nextButton = document.createElement('img');
    // this.nextWrapper.appendChild(nextButton);
    // nextButton.src ='./images/next-arrow.png';
    //
    // //adding eventlistener to nextbtn
    // nextButton.addEventListener('click',()=> {
    //   this.nextSlide();
    // });
    //
    // //adding prev button to dom
    // this.prevWrapper = document.createElement('div');
    // this.prevWrapper.className = 'arrow prev-arrow';
    // this.carouselContainer.appendChild(this.prevWrapper);
    // const prevButton = document.createElement('img');
    // this.prevWrapper.appendChild(prevButton);
    // prevButton.src = './images/prev-arrow.png';
    //
    // prevButton.addEventListener('click',()=>{
    //   this.prevSlide();
    // });
    //
    //


    if (window.addEventListener) {
      window.addEventListener('resize', ()=>{
        this.windowResize();
      });
    } else if (window.attachEvent) {
      window.attachEvent('onresize',()=>{
        this.windowResize();
      });
    } else {
      window.onresize = this.windowResize();
    }



  }
  windowResize(){
    if (window.innerWidth !== this.imageWidth) {
      clearTimeout(this.windowResizeTimeout);
     this.windowResizeTimeout = setTimeout( ()=> {
        this.destroy();
        this.build();
      }, 300);

    }
  }
  nextSlide(){
    if (this.currentImageIndex + 1 > this.imageCount - 1) {
      this.gotoSlide(0);
    } else {
      this.gotoSlide(this.currentImageIndex + 1);
    }

  }
  prevSlide(){
    if (this.currentImageIndex - 1 < 0) {
      this.gotoSlide(this.imageCount - 1);
    } else {
      this.gotoSlide(this.currentImageIndex - 1);
    }

  }
  //
  // buttonControl(){
  //   if(this.currentImageIndex === this.maxIndex){
  //     this.nextWrapper.style.display = 'none';
  //   }else{
  //     this.nextWrapper.style.display = 'block';
  //   }
  //   if(this.currentImageIndex === this.minPos){
  //     this.prevWrapper.style.display = 'none';
  //   }else{
  //     this.prevWrapper.style.display = 'block';
  //   }
  // }
  gotoSlide(i){
    let start = this.currentImageIndex * this.imageWidth;
    let end = i * this.imageWidth;
    let distance = end - start;
    let speed = 0.01;
    let movement = 0;

    clearInterval(this.slider);
    clearInterval(this.move);

    this.move = setInterval(() => {

      this.carouselImageWrapper.style.marginLeft = (-(start + distance * movement))+'px';
      movement += speed;
      if (movement >= 1) {
        this.carouselImageWrapper.style.marginLeft = (-end)+'px';
        clearInterval(this.move);
        this.animate();
      }
    }, speed * 1000);
    this.dotWrapper.children[this.currentImageIndex].classList.remove('active');
    this.currentImageIndex = i;
    this.dotWrapper.children[this.currentImageIndex].classList.add('active');



}
animate(){
  // this.buttonControl();
  this.slider = setInterval(() => {
    if (this.currentImageIndex + 1 > this.imageCount - 1) {
      this.gotoSlide(0);
    } else {
      this.gotoSlide(this.currentImageIndex + 1);
    }
  }, this.delay);

}
destroy(){
    
    this.dotWrapper.parentNode.removeChild(this.dotWrapper);


}
}
