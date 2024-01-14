class ABShowText {
  constructor(uid, canvas, params) {
    var _a, _b, _c, _d, _e, _f;
    this.canvasWidth = 0;
    this.startAt = 0;
    this.text = 'Hello Banner!';
    this.textposition = 'bottom';
    this.color = 'white';
    this.fontsize = 18;
    this.timeout = 0;
    this.endReached = false;
    this.textX = 0;
    this.textY = 0;
    this.uid = uid;
    this.canvas = canvas;
    this.canvasWidth = this.canvas.clientWidth;
    // this.canvasHeight = this.canvas.clientHeight
    this.ctx = this.canvas.getContext('2d');
    this.startAt = (_a = params.startAt) !== null && _a !== void 0 ? _a : this.startAt;
    this.text = (_b = params.text) !== null && _b !== void 0 ? _b : this.text;
    this.textposition = (_c = params.textposition) !== null && _c !== void 0 ? _c : this.textposition;
    this.color = (_d = params.color) !== null && _d !== void 0 ? _d : this.color;
    this.fontsize = (_e = params.fontsize) !== null && _e !== void 0 ? _e : this.fontsize;
    this.timeout = (_f = params.timeout) !== null && _f !== void 0 ? _f : this.timeout;
    this.textX = this.canvasWidth / 2;
    this.textY = this.getTextY();
  }
  static registerAnimator() {
    window.addEventListener(this.animationName, (event) => {
      const uid = event.detail.uid;
      const canvas = event.detail.canvas;
      const animationParams = event.detail.animationParams;
      const animator = new ABShowText(uid, canvas, animationParams);
      canvas['runningAnimations'].push(animator);
      console.log(`Animation started: ${this.animationName}`);
      setTimeout(() => {
        animator.animate();
      }, animator.startAt * 1000);
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
          animationName: ABShowText.animationName,
          params: {
            text: {
              label: 'Text',
              type: 'string',
              default: 'Hello Banner!',
            },
            startAt: {
              label: 'Start at',
              type: 'number',
              default: 0,
              min: 1,
              max: 100
            },
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
            timeout: {
              label: 'Timeout in seconds',
              type: 'number',
              default: 3,
              min: 0,
              max: 10
            }
          }
        }
      }));
    });
    console.log(`ParamsProvider registered: ${this.animationName}`);
  }
  //implements AnimatorInterface
  animate() {
    this.runAnimation();
    setTimeout(() => {
      this.endReached = true;
    }, this.timeout * 1000);
  }
  stop() {
    // nothing to do here
  }
  runAnimation() {
    this.drawFrame();
    if (this.endReached) {
      this.sendAnimationFinishedEvent();
      return;
    }
    requestAnimationFrame(this.runAnimation.bind(this));
  }
  drawFrame() {
    this.ctx.font = `${this.fontsize}px Arial Black`;
    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
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
  sendAnimationFinishedEvent() {
    window.dispatchEvent(new CustomEvent('animation-finished', {
      detail: {
        animationName: ABShowText.animationName,
        uid: this.uid
      }
    }));
    console.log(`Animation finished: ${ABShowText.animationName}`);
  }
}
ABShowText.animationName = 'show-text';
ABShowText.animationVersion = '0.3.0';
ABShowText.registerAnimator();
ABShowText.registerParamsProvider();
