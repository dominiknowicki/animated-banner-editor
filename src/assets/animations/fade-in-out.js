/**
 * Animation FadeInOut 0.1.1
 */
// TODO: maybe fade in out to another color as an option
class ABFadeInOut {
  constructor(canvas, text, params) {
    var _a, _b, _c;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.text = 'Hello Banner!';
    this.textposition = 'bottom';
    this.color = 'white';
    this.fontsize = 18;
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
    this.text = text;
    this.textposition = (_a = params.textposition) !== null && _a !== void 0 ? _a : this.textposition;
    this.color = (_b = params.color) !== null && _b !== void 0 ? _b : this.color;
    this.fontsize = (_c = params.fontsize) !== null && _c !== void 0 ? _c : this.fontsize;
    this.defaultTextX = this.canvas.width / 2;
    this.textX = this.defaultTextX;
    this.textY = this.getTextY();
  }
  static registerAnimator() {
    window.addEventListener(this.animationName, (event) => {
      const canvas = event.detail.canvas;
      const text = event.detail.text;
      const params = event.detail.params;
      const animator = new ABFadeInOut(canvas, text, params);
      animator.animate();
      console.log(`Animation started: ${this.animationName}`);
    });
    console.log(`Animation registered: ${this.animationName}`);
  }
  static registerParamsProvider() {
    window.addEventListener(`get-${this.animationName}-params`, () => {
      console.log(`Got request for: get-${this.animationName}-params`);
      // return animation params when editor requests them
      // 'selected-animation-params' is constant event name for all animations which editor listens
      window.dispatchEvent(new CustomEvent('selected-animation-params', {
        detail: {
          color: {
            label: 'Text color',
            type: 'color',
            default: '#666'
          },
          textposition: {
            label: 'Text position',
            type: 'select',
            default: 'bottom',
            options: ['top', 'middle', 'bottom']
          },
          fontsize: {
            label: 'Font size',
            type: 'number',
            default: 18,
            min: 1,
            max: 100
          },
        }
      }));
    });
    console.log(`ParamsProvider registered: ${this.animationName}`);
  }
  //implements AnimatorInterface
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
ABFadeInOut.animationName = 'fade-in-out';
ABFadeInOut.registerAnimator();
ABFadeInOut.registerParamsProvider();
export {};
