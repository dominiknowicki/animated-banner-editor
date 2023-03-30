/**
 * Animation Slide In From Left 0.0.8
 */
window.addEventListener('slide-in-from-left', (event) => {
  abSlideInFromLeft(event.detail.canvas, event.detail.params);
  console.log('Animation started: slide-in-from-left');
});
console.log('Animation registered: slide-in-from-left');
export function abSlideInFromLeft(canvas, params) {
  const animator = new ABSlideInFromLeft(canvas, params);
  animator.animate();
}
class ABSlideInFromLeft {
  constructor(canvas, params) {
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.defaultTextX = 0;
    this.textX = 0;
    this.textY = 0;
    this.canvas = canvas;
    this.canvasWidth = this.canvas.clientWidth;
    this.canvasHeight = this.canvas.clientHeight;
    this.ctx = this.canvas.getContext('2d');
    this.text = params.text;
    this.textPosition = params.textPosition;
    this.color = params.color;
    this.fontSize = params.fontSize;
    this.loop = params.loop;
    this.defaultTextX = -this.canvas.clientWidth;
    this.textX = this.defaultTextX;
    this.textY = this.getTextY();
  }
  animate() {
    this.setup();
    this.runAnimation();
  }
  get endReached() {
    return this.textX > 20;
  }
  setup() {
    this.ctx.font = `${this.fontSize}px Arial Black`;
    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = 'start';
    this.ctx.textBaseline = 'middle';
  }
  runAnimation() {
    this.textX += 2;
    this.drawFrame();
    if (this.endReached && !this.loop) {
      console.log('Animation finished!');
      return;
    }
    if (this.endReached && this.loop) {
      this.textX = this.defaultTextX;
    }
    requestAnimationFrame(this.runAnimation.bind(this));
  }
  drawFrame() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillText(this.text, this.textX, this.textY);
  }
  //TODO: could be passed as % of canvas
  getTextY() {
    switch (this.textPosition) {
      case 'top':
        return this.fontSize;
      case 'bottom':
        return this.canvas.height - this.fontSize;
      default:
        return (this.canvas.height + this.fontSize) / 2;
    }
  }
}
