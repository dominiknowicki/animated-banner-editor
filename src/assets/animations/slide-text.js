class ABSlideText {
  constructor(uid, canvas, params) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    this.canvasWidth = 0;
    // @ts-ignore
    this.canvasHeight = 0;
    this.startAt = 0;
    this.text = 'Hello Banner!';
    this.textposition = 'bottom';
    this.direction = 'left to right';
    this.color = 'white';
    this.fontsize = 18;
    this.speed = 2;
    this.loop = true;
    this.defaultTextX = 0;
    this.textX = 0;
    this.textY = 0;
    this.uid = uid;
    this.canvas = canvas;
    this.canvasWidth = this.canvas.clientWidth;
    this.canvasHeight = this.canvas.clientHeight;
    this.ctx = this.canvas.getContext('2d');
    this.startAt = (_a = params.startAt) !== null && _a !== void 0 ? _a : this.startAt;
    this.text = (_b = params.text) !== null && _b !== void 0 ? _b : this.text;
    this.textposition = (_c = params.textposition) !== null && _c !== void 0 ? _c : this.textposition;
    this.direction = (_d = params.direction) !== null && _d !== void 0 ? _d : this.direction;
    this.color = (_e = params.color) !== null && _e !== void 0 ? _e : this.color;
    this.fontsize = (_f = params.fontsize) !== null && _f !== void 0 ? _f : this.fontsize;
    this.speed = (_g = params.speed) !== null && _g !== void 0 ? _g : this.speed;
    this.loop = (_h = params.loop) !== null && _h !== void 0 ? _h : this.loop;
    if (this.direction === 'left to right') {
      this.defaultTextX = -this.estimatedTextWidth;
    }
    else {
      this.defaultTextX = this.canvasWidth + this.estimatedTextWidth;
    }
    this.textX = this.defaultTextX;
    this.textY = this.getTextY();
  }
  static registerAnimator() {
    window.addEventListener(this.animationName, (event) => {
      const uid = event.detail.uid;
      const canvas = event.detail.canvas;
      const animationParams = event.detail.animationParams;
      const animator = new ABSlideText(uid, canvas, animationParams);
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
          animationName: ABSlideText.animationName,
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
            direction: {
              label: 'Direction',
              type: 'select',
              default: 'left to right',
              options: ['left to right', 'right to left']
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
            speed: {
              label: 'Speed',
              type: 'number',
              default: 2,
              min: 1,
              max: 8
            },
            loop: {
              label: 'Loop animation',
              type: 'boolean',
              default: false
            },
          }
        }
      }));
    });
    console.log(`ParamsProvider registered: ${this.animationName}`);
  }
  //implements AnimatorInterface
  animate() {
    this.runAnimation();
  }
  stop() {
    this.loop = false;
  }
  get estimatedTextWidth() {
    return (this.text.length * this.fontsize * 0.5);
  }
  get endReached() {
    if (this.direction === 'left to right') {
      return this.textX > (this.canvasWidth + this.estimatedTextWidth);
    }
    else {
      return this.textX < -this.estimatedTextWidth;
    }
  }
  runAnimation() {
    if (this.direction === 'left to right') {
      this.textX += this.speed;
    }
    else {
      this.textX -= this.speed;
    }
    this.drawFrame();
    if (this.endReached && !this.loop) {
      this.sendAnimationFinishedEvent(ABSlideText.animationName, this.uid);
      return;
    }
    if (this.endReached && this.loop) {
      this.textX = this.defaultTextX;
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
  sendAnimationFinishedEvent(animationName, uid) {
    window.dispatchEvent(new CustomEvent('animation-finished', {
      detail: {
        animationName,
        uid
      }
    }));
    console.log(`Animation finished: ${animationName}`);
  }
}
ABSlideText.animationName = 'slide-text';
ABSlideText.animationVersion = '0.3.0';
ABSlideText.registerAnimator();
ABSlideText.registerParamsProvider();
