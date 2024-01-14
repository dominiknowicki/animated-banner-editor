class ABSlideImage {
  constructor(uid, canvas, params) {
    var _a, _b, _c, _d, _e;
    this.canvasWidth = 0;
    // @ts-ignore
    this.canvasHeight = 0;
    this.startAt = 0;
    this.direction = 'left to right';
    this.speed = 2;
    this.loop = true;
    this.foregroundPosition = 'bottom';
    this.foreground = new Image();
    this.foregroundWidth = 450;
    this.foregroundHeight = 200;
    this.foregroundSrc = '';
    this.defaultForegroundX = 0;
    this.foregroundX = 0;
    this.foregroundY = 0;
    this.uid = uid;
    this.canvas = canvas;
    this.canvasWidth = this.canvas.clientWidth;
    this.canvasHeight = this.canvas.clientHeight;
    this.ctx = this.canvas.getContext('2d');
    this.startAt = (_a = params.startAt) !== null && _a !== void 0 ? _a : this.startAt;
    this.direction = (_b = params.direction) !== null && _b !== void 0 ? _b : this.direction;
    this.speed = (_c = params.speed) !== null && _c !== void 0 ? _c : this.speed;
    this.loop = (_d = params.loop) !== null && _d !== void 0 ? _d : this.loop;
    this.foregroundSrc = params.foregroundSrc;
    this.foregroundPosition = (_e = params.foregroundPosition) !== null && _e !== void 0 ? _e : this.foregroundPosition;
    this.updateForegroundDefaultPosition();
    this.foregroundX = this.defaultForegroundX;
    this.foregroundY = this.getObjectY();
  }
  static registerAnimator() {
    window.addEventListener(this.animationName, (event) => {
      const uid = event.detail.uid;
      const canvas = event.detail.canvas;
      const animationParams = event.detail.animationParams;
      const animator = new ABSlideImage(uid, canvas, animationParams);
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
          animationName: ABSlideImage.animationName,
          params: {
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
            foregroundSrc: {
              label: 'Foreground drawing object',
              type: 'image',
              default: ''
            },
            foregroundPosition: {
              label: 'Foreground drawing position',
              type: 'select',
              default: 'bottom',
              options: ['top', 'middle', 'bottom']
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
    this.foreground.onload = (event) => {
      const image = event.target;
      this.foregroundWidth = image.width;
      this.foregroundHeight = image.height;
      console.log('Image loaded', this.foregroundWidth, this.foregroundHeight);
      this.updateForegroundDefaultPosition();
      this.runAnimation();
    };
    this.foreground.src = this.foregroundSrc;
  }
  stop() {
    this.loop = false;
  }
  updateForegroundDefaultPosition() {
    if (this.direction === 'left to right') {
      this.defaultForegroundX = -this.foregroundWidth;
    }
    else {
      this.defaultForegroundX = this.canvasWidth;
    }
    this.foregroundX = this.defaultForegroundX;
    this.foregroundY = this.getObjectY();
  }
  get endReached() {
    if (this.direction === 'left to right') {
      return this.foregroundX > this.canvasWidth;
    }
    else {
      return this.foregroundX < -this.foregroundWidth;
    }
  }
  runAnimation() {
    if (this.direction === 'left to right') {
      this.foregroundX += this.speed;
    }
    else {
      this.foregroundX -= this.speed;
    }
    this.drawFrame();
    if (this.endReached && !this.loop) {
      this.sendAnimationFinishedEvent();
      return;
    }
    if (this.endReached && this.loop) {
      this.foregroundX = this.defaultForegroundX;
    }
    requestAnimationFrame(this.runAnimation.bind(this));
  }
  drawFrame() {
    this.ctx.drawImage(this.foreground, this.foregroundX, this.foregroundY);
  }
  getObjectY() {
    const margin = this.canvas.height / 10;
    switch (this.foregroundPosition) {
      case 'bottom':
        return this.canvasHeight - margin - this.foregroundHeight;
      case 'top':
        return margin;
      default:
        return this.canvas.height / 2 - this.foregroundHeight / 2;
    }
  }
  sendAnimationFinishedEvent() {
    window.dispatchEvent(new CustomEvent('animation-finished', {
      detail: {
        animationName: ABSlideImage.animationName,
        uid: this.uid
      }
    }));
    console.log(`Animation finished: ${ABSlideImage.animationName}`);
  }
}
ABSlideImage.animationName = 'slide-image';
ABSlideImage.animationVersion = '0.3.0';
ABSlideImage.registerAnimator();
ABSlideImage.registerParamsProvider();

