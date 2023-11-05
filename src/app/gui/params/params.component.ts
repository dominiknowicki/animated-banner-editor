import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {Params} from "@angular/router"
import {DEFAULT_PARAMS} from "../../model/component-params"
import {ToastService} from "../../shared/services/toast/toast.service";
import {CodeDialogService} from "../show-code-dialog/code-dialog.service";

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent implements OnInit {
  @Output() paramEmitter = new EventEmitter<object>()
  public params: Params = DEFAULT_PARAMS
  public animationParams: any
  public customColor = "red"
  public customBackgroundColor = "red"
  public customBackgroundImage: string
  public animationList: string[] = ['slide-right', 'slide-in-from-left', 'fade-in-out']


  constructor(
    public codeDialog: CodeDialogService,
    public toast: ToastService
  ) {
  }

  get animationParamsKeys(): string[] {
    return Object.keys(this.animationParams)
  }

  ngOnInit(): void {
    this.setAnimationParamsListener()
    this.getAnimationParams()
    this.restartAnimation()
  }

  private setAnimationParamsListener(): void {
    // Listen to answer event from animation
    window.addEventListener('selected-animation-params', (event: any) => {
      this.animationParams = event.detail
      for (const key in this.animationParams) {
        if (!this.params.hasOwnProperty(key)) {
          this.params[key] = this.animationParams[key].default
        }
      }
      console.log('Custom params provided by animation: ', this.animationParams);
    });
  }

  getAnimationParams(): void {
    // Ask animation for params
    window.dispatchEvent(new CustomEvent(`get-${this.params.animation}-params`))
  }

  onAnimationFileUpload(event: any): void {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => this.onAnimationFileLoaded(reader.result as string)
    reader.readAsText(file)
  }

  onUpdate(): void {
    this.paramEmitter.emit(this.applyCustomParams(this.params))
  }

  applyCustomParams(params: Params): Params {
    let updatedParams = {...params}
    updatedParams.color = (this.params.color === 'customColor') ? this.customColor : this.params.color
    switch (this.params.background) {
      case 'customBackgroundColor':
        updatedParams.background = this.customBackgroundColor
        break
      case 'customBackgroundImage':
      case 'customUrlBackgroundImage':
        updatedParams.background = `url('${this.customBackgroundImage}')`
        break
      default:
        updatedParams.background = this.params.background
    }
    return updatedParams
  }

  onUrlEntered(event: any): void {
    this.customBackgroundImage = event.target.value
    const image = new Image()
    image.onload = () => {
      if (image.width > 1500 || image.height > 1500) {
        return this.toast.error('File too large - please use smaller one')
      }
      // setting width and height of canvas to match image
      this.params.width = image.width
      this.params.height = image.height
      this.onUpdate()
    }
    image.src = this.customBackgroundImage
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    if (file.size > 524288) {
      return this.toast.error(`File too large - please use files up to 0,5MB`)
    }
    const reader = new FileReader()
    reader.onload = () => {
      this.customBackgroundImage = reader.result as string
      const image = new Image()
      image.onload = () => {
        if (image.width > 1500 || image.height > 1500) {
          return this.toast.error('File too large - please use smaller one')
        }
        // setting width and height of canvas to match image
        this.params.width = image.width
        this.params.height = image.height
        this.onUpdate()
      }
      image.src = this.customBackgroundImage
    }
    reader.readAsDataURL(file)
  }

  restartAnimation(): void {
    setTimeout(() => this.onUpdate())
  }

  openShowCodeDialog(): void {
    const paramsToDisplay: Params = this.applyCustomParams(this.params)
    this.codeDialog.open(paramsToDisplay)
  }

  onAnimationFileLoaded(data: string): void {
    if (data) this.onCustomAnimationAdded(data)
      .then((animationCode: string) => this.getAnimationName(animationCode))
      .then((animationName: string) => this.selectCustomAnimation(animationName))
      .then((animationName: string) => this.toast.success(`Animation ${animationName} added`))
      .catch((_: any) => this.toast.error('Error adding animation - try again with different file!'))
  }

  onCustomAnimationAdded(data: string): Promise<string> {
    const animationCode = data.replace("export {}", "")
    if (!animationCode.includes("registerAnimator") || !animationCode.includes("animationName")) {
      return Promise.reject(null)
    } else {
      eval(animationCode)
      return Promise.resolve(animationCode)
    }
  }

  getAnimationName(animationCode: string): Promise<string> {
    try {
      let animationName = animationCode.split("animationName = '")[1]
      animationName = animationName.split("';")[0]
      return Promise.resolve(animationName)
    } catch (e) {
      return Promise.reject(null)
    }
  }

  selectCustomAnimation(animationName: string): Promise<string> {
    if (!animationName) return Promise.reject(null)
    this.animationList.unshift(animationName)
    this.params.animation = animationName
    this.onUpdate()
    this.getAnimationParams()
    this.restartAnimation()
    return Promise.resolve(animationName)
  }
}
