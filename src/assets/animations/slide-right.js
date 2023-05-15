/**
 * Animation Slide Right 0.0.9
 */
window.addEventListener('slide-right', (event) => {
  abSlideRight(event.detail.canvas, event.detail.params);
  console.log('Animation started: slide-right');
});
console.log('Animation registered: slide-right');
export function abSlideRight(canvas, params) {
  const animator = new ABSlideRight(canvas, params);
  animator.animate();
}
class ABSlideRight {
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
    this.textposition = params.textposition;
    this.color = params.color;
    this.fontsize = params.fontsize;
    this.loop = true; // TODO: temporary override
    this.defaultTextX = -75; // TODO: calculate this
    this.textX = this.defaultTextX;
    this.textY = this.getTextY();
  }
  animate() {
    this.setup();
    this.runAnimation();
  }
  get endReached() {
    return this.textX > this.canvasWidth;
  }
  setup() {
    this.ctx.font = `${this.fontsize}px Arial Black`;
    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = 'center';
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
  getTextY() {
    switch (this.textposition) {
      case 'top':
        return this.fontsize;
      case 'bottom':
        return this.canvas.height - this.fontsize;
      default:
        return (this.canvas.height + this.fontsize) / 2;
    }
  }
}
