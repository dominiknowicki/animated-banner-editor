class ABSlideRightObject {
  constructor(canvas, text, params, uid) {
    var _a, _b, _c, _d, _e;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.foreground = new Image();
    this.foregroundSrc = '';
    this.text = 'Hello Banner!';
    this.textposition = 'bottom';
    this.color = 'white';
    this.fontsize = 18;
    this.speed = 2;
    this.loop = false;
    this.defaultTextX = 0;
    this.defaultForegroundX = 0;
    this.textX = 0;
    this.foregroundX = 0;
    this.textY = 0;
    this.foregroundY = 0;
    this.canvas = canvas;
    this.uid = uid;
    this.canvasWidth = this.canvas.clientWidth;
    this.canvasHeight = this.canvas.clientHeight;
    this.ctx = this.canvas.getContext('2d');
    this.text = text;
    this.textposition = (_a = params.textposition) !== null && _a !== void 0 ? _a : this.textposition;
    this.color = (_b = params.color) !== null && _b !== void 0 ? _b : this.color;
    this.fontsize = (_c = params.fontsize) !== null && _c !== void 0 ? _c : this.fontsize;
    this.speed = (_d = params.speed) !== null && _d !== void 0 ? _d : this.speed;
    this.loop = (_e = params.loop) !== null && _e !== void 0 ? _e : this.loop;
    this.foregroundSrc = params.foregroundSrc;
    this.defaultTextX = -(this.text.length * this.fontsize * 0.5);
    this.defaultForegroundX = -450;
  }
  static registerAnimator() {
    window.addEventListener(this.animationName, (event) => {
      const canvas = event.detail.canvas;
      const text = event.detail.text;
      const params = event.detail.params;
      const uid = event.detail.uid;
      const animator = new ABSlideRightObject(canvas, text, params, uid);
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
          foregroundSrc: {
            label: 'Foreground drawing object',
            type: 'image',
            default: ''
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
      }));
    });
    console.log(`ParamsProvider registered: ${this.animationName}`);
  }
  //implements AnimatorInterface
  animate() {
    this.resetXCounters();
    this.setupCanvasParams();
    this.foreground.onload = () => {
      this.runObjectInSequence();
    };
    this.foreground.src = this.foregroundSrc;
  }
  resetXCounters() {
    this.foregroundX = this.defaultForegroundX;
    this.textX = this.defaultTextX;
    this.textY = this.getTextY();
    this.foregroundY = this.getObjectY();
  }
  setupCanvasParams() {
    this.ctx.font = `${this.fontsize}px Arial Black`;
    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
  }
  runObjectInSequence() {
    this.foregroundX += this.speed;
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillText(this.text, this.textX, this.textY);
    this.ctx.drawImage(this.foreground, this.foregroundX, this.foregroundY);
    if (this.foregroundX > 0) {
      this.runTextInSequence();
      return;
    }
    else {
      requestAnimationFrame(this.runObjectInSequence.bind(this));
    }
  }
  runTextInSequence() {
    this.textX += this.speed;
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillText(this.text, this.textX, this.textY);
    this.ctx.drawImage(this.foreground, this.foregroundX, this.foregroundY);
    if (this.textX > this.canvasWidth / 2) {
      this.runObjectOutSequence();
      return;
    }
    else {
      requestAnimationFrame(this.runTextInSequence.bind(this));
    }
  }
  runObjectOutSequence() {
    this.foregroundX += this.speed;
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillText(this.text, this.textX, this.textY);
    this.ctx.drawImage(this.foreground, this.foregroundX, this.foregroundY);
    if (this.foregroundX > this.canvasWidth) {
      this.runTextOutSequence();
      return;
    }
    else {
      requestAnimationFrame(this.runObjectOutSequence.bind(this));
    }
  }
  runTextOutSequence() {
    this.textX += this.speed;
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillText(this.text, this.textX, this.textY);
    this.ctx.drawImage(this.foreground, this.foregroundX, this.foregroundY);
    if (this.textX > this.canvasWidth + (this.text.length * this.fontsize * 0.5)) {
      if (this.loop) {
        this.animate();
        return;
      }
      else {
        this.sendAnimationFinishedEvent();
        return;
      }
    }
    else {
      requestAnimationFrame(this.runTextOutSequence.bind(this));
    }
  }
  getTextY() {
    const margin = this.canvas.height / 10;
    switch (this.textposition) {
      case 'top':
        return this.fontsize + margin;
      case 'bottom':
        return this.canvas.height - this.fontsize - margin;
      default:
        return (this.canvas.height + this.fontsize) / 2;
    }
  }
  getObjectY() {
    const margin = this.canvas.height / 10;
    switch (this.textposition) {
      case 'top':
        return this.fontsize + margin * 2;
      case 'bottom':
        return margin;
      default:
        return 0;
    }
  }
  sendAnimationFinishedEvent() {
    console.log(`Animation finished: ${ABSlideRightObject.animationName}`);
    window.dispatchEvent(new CustomEvent('animation-finished', {
      detail: {
        animationName: ABSlideRightObject.animationName,
        uid: this.uid
      }
    }));
  }
}
ABSlideRightObject.animationName = 'slide-right-object';
ABSlideRightObject.animationVersion = '0.2.1';
ABSlideRightObject.registerAnimator();
ABSlideRightObject.registerParamsProvider();
