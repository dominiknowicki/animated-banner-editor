/**
 * Animation Slide In From Left 0.0.7
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
    this.defaultTextX = 0;
    this.textX = 0;
    this.textY = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.text = params.text;
    this.textPosition = params.textPosition;
    this.color = params.color;
    this.fontSize = params.fontSize;
    this.loop = params.loop;
    this.defaultTextX = -this.canvas.clientWidth;
    this.textX = this.defaultTextX;
    this.textY = this.getTextY();
    this.canvasWidth = this.canvas.clientWidth;
    this.canvasHeight = this.canvas.clientHeight;
  }
  animate() {
    this.setup();
    this.runAnimation();
  }
  get endReached() {
    return this.textX > 10;
  }
  setup() {
    this.ctx.font = `${this.fontSize}px Arial`;
    this.ctx.fillStyle = this.color;
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
    this.ctx.clearRect(0, 0, this.canvasWidth + 10, this.canvasHeight + 10);
    this.ctx.fillText(this.text, this.textX, this.textY);
  }
  getTextY() {
    switch (this.textPosition) {
      case 'top':
        return this.fontSize * 2;
      case 'bottom':
        return this.canvas.height - this.fontSize;
      default:
        return (this.canvas.height + this.fontSize) / 2;
    }
  }
}
