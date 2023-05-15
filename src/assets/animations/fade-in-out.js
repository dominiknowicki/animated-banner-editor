/**
 * Animation FadeInOut 0.0.2
 */
window.addEventListener('fade-in-out', (event) => {
  abFadeInOut(event.detail.canvas, event.detail.params);
  console.log('Animation started: fade-in-out');
});
console.log('Animation registered: fade-in-out');
export function abFadeInOut(canvas, params) {
  const animator = new ABFadeInOut(canvas, params);
  animator.animate();
}
class ABFadeInOut {
  constructor(canvas, params) {
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    // private loop
    this.defaultTextX = 0;
    this.textX = 0;
    this.textY = 0;
    this.alpha = 0;
    this.delta = 0.005;
    this.fadeIn = true;
    this.canvas = canvas;
    this.canvasWidth = this.canvas.clientWidth;
    this.canvasHeight = this.canvas.clientHeight;
    this.ctx = this.canvas.getContext('2d');
    this.text = params.text;
    this.textposition = params.textposition;
    this.color = params.color;
    this.fontsize = params.fontsize;
    // this.loop = params.loop
    this.defaultTextX = this.canvas.width / 2;
    this.textX = this.defaultTextX;
    this.textY = this.getTextY();
  }
  animate() {
    this.setup();
    this.runAnimation();
  }
  setup() {
    this.ctx.font = `${this.fontsize}px Arial Black`;
    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
  }
  runAnimation() {
    this.drawFrame();
    if (this.fadeIn) {
      this.alpha += this.delta;
      if (this.alpha >= 1) {
        this.alpha = 1;
        this.fadeIn = false;
        setTimeout(() => {
          this.fadeIn = true;
        }, 5000);
      }
    }
    else {
      this.alpha -= this.delta;
      if (this.alpha <= 0) {
        this.alpha = 0;
      }
    }
    requestAnimationFrame(this.runAnimation.bind(this));
  }
  drawFrame() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillText(this.text, this.textX, this.textY);
    this.ctx.globalAlpha = this.alpha;
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
