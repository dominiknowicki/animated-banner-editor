/**
 * No Animation 0.1.1
 */
class ABNoAnimation {
  constructor(canvas, text, params) {
    var _a, _b, _c;
    this.canvasWidth = 0;
    this.text = 'Hello Banner!';
    this.textposition = 'bottom';
    this.color = 'white';
    this.fontsize = 18;
    this.textX = 0;
    this.textY = 0;
    console.log('animaton params received', params);
    this.canvas = canvas;
    this.canvasWidth = this.canvas.clientWidth;
    // this.canvasHeight = this.canvas.clientHeight
    this.ctx = this.canvas.getContext('2d');
    this.text = text;
    this.textposition = (_a = params.textposition) !== null && _a !== void 0 ? _a : this.textposition;
    this.color = (_b = params.color) !== null && _b !== void 0 ? _b : this.color;
    this.fontsize = (_c = params.fontsize) !== null && _c !== void 0 ? _c : this.fontsize;
    this.textX = this.canvasWidth / 2;
    this.textY = this.getTextY();
  }
  static registerAnimator() {
    window.addEventListener(this.animationName, (e) => {
      new ABNoAnimation(e.detail.canvas, e.detail.text, e.detail.params)
        .animate();
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
          }
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
ABNoAnimation.animationName = 'no-animation';
ABNoAnimation.registerAnimator();
ABNoAnimation.registerParamsProvider();
export {};
