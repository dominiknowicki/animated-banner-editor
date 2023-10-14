/**
 * Animation Slide In From Left 0.1.1
 */
class ABSlideInFromLeft {
  constructor(canvas, text, params) {
    var _a, _b, _c, _d, _e;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.text = 'Hello Banner!';
    this.textposition = 'bottom';
    this.color = 'white';
    this.fontsize = 18;
    this.delay = 0;
    this.right = false;
    this.defaultTextX = 0;
    this.textX = 0;
    this.textY = 0;
    this.canvas = canvas;
    this.canvasWidth = this.canvas.clientWidth;
    this.canvasHeight = this.canvas.clientHeight;
    this.ctx = this.canvas.getContext('2d');
    this.text = text;
    this.textposition = (_a = params.textposition) !== null && _a !== void 0 ? _a : this.textposition;
    this.color = (_b = params.color) !== null && _b !== void 0 ? _b : this.color;
    this.fontsize = (_c = params.fontsize) !== null && _c !== void 0 ? _c : this.fontsize;
    this.delay = (_d = params.delay) !== null && _d !== void 0 ? _d : this.delay;
    this.right = (_e = params.right) !== null && _e !== void 0 ? _e : this.right;
    this.defaultTextX = this.right ?
      (this.canvasWidth + (this.text.length * this.fontsize * 0.5)) :
      -(this.text.length * this.fontsize * 0.5);
    this.textX = this.defaultTextX;
    this.textY = this.getTextY();
  }
  static registerAnimator() {
    window.addEventListener('slide-in-from-left', (event) => {
      const canvas = event.detail.canvas;
      const text = event.detail.text;
      const params = event.detail.params;
      const animator = new ABSlideInFromLeft(canvas, text, params);
      animator.animate();
      console.log('Animation started: slide-in-from-left');
    });
    console.log('Animation registered: slide-in-from-left');
  }
  static registerParamsProvider() {
    window.addEventListener('get-slide-in-from-left-params', () => {
      console.log('Got request for: get-slide-in-from-left-params');
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
          delay: {
            label: 'Delay in seconds',
            type: 'number',
            default: 0,
            min: 0,
            max: 8
          },
          right: {
            label: 'Slide from right',
            type: 'boolean',
            default: false
          },
        }
      }));
    });
    console.log('ParamsProvider registered: slide-in-from-left');
  }
  //implements AnimatorInterface
  animate() {
    this.setup();
    setTimeout(this.runAnimation.bind(this), this.delay * 1000);
  }
  get endReached() {
    return this.right ?
      (this.textX < this.canvasWidth / 2) :
      (this.textX > this.canvasWidth / 2);
  }
  setup() {
    this.ctx.font = `${this.fontsize}px Arial Black`;
    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
  }
  runAnimation() {
    if (this.right) {
      this.textX -= 2;
    }
    else {
      this.textX += 2;
    }
    this.drawFrame();
    if (this.endReached) {
      console.log('Animation finished!');
      return;
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
ABSlideInFromLeft.registerAnimator();
ABSlideInFromLeft.registerParamsProvider();
export {};
