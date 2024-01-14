import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {ToastService} from "../../../shared/services/toast/toast.service";
import {MatSnackBarRef} from "@angular/material/snack-bar";
import {AvailableAnimationsService} from "../../../shared/services/available-animations/available-animations.service";
import {DEFAULT_CUSTOM_PARAMS} from "../../../model/component-params";

@Component({
  selector: 'app-animation-params',
  templateUrl: './animation-params.component.html',
  styleUrls: ['./animation-params.component.scss']
})
export class AnimationParamsComponent implements OnInit {

  @Input() params
  @Output() onParamsChange = new EventEmitter<object>()
  public customParams = DEFAULT_CUSTOM_PARAMS
  public animationParams: any
  public availableAnimationNames: string[] = []

  constructor(
    public toast: ToastService,
    public availableAnimationsService: AvailableAnimationsService,
  ) {
    this.availableAnimationsService
      .getAvailableAnimationNamesSubject
      .subscribe(v => this.availableAnimationNames = v)
  }

  get animationParamsKeys(): string[] {
    return Object.keys(this.animationParams)
  }

  public ngOnInit(): void {
    this.setAnimationParamsListener()
    this.getAnimationParams()
  }

  public getAnimationParams(): void {
    window.dispatchEvent(new CustomEvent(`get-${this.params.animationName}-params`))
  }

  public onUpdate(): void {
    this.onParamsChange.emit(this.params)
  }

  public applyCustomColor(key: string): void {
    if (this.customParams[key] !== 'customColor') {
      this.params[key] = this.customParams[key]
    }
  }

  public applyCustomImage(key: string): void {
    if (!['customBackgroundImage', 'customUrlBackgroundImage']
      .includes(this.customParams[key])) {
      this.params[key] = this.customParams[key]
    }
  }

  public onImageUrlEntered(event: any, key: string): void {
    const image: HTMLImageElement = new Image()
    image.onload = this.onImageLoaded.bind(this)
    image.src = event.target.value
  }

  public onImageFileUpload(event: any, key: string): MatSnackBarRef<any> | void {
    const file = event.target.files[0]
    if (file.size > 524288 / 2) {
      return this.toast.error(`File too large - please use files up to 0,25MB`)
    }
    const reader = new FileReader()
    reader.onload = (): void => {
      const image: HTMLImageElement = new Image()
      image.onload = this.onImageLoaded.bind(this)
      image.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  private onImageLoaded(event): MatSnackBarRef<any> | void {
    const image: HTMLImageElement = event.target as HTMLImageElement
    if (image.width > 1500 || image.height > 1500) {
      return this.toast.error('File too large - please use smaller one')
    }
    // TODO: pass key as a function parameter
    this.params['foregroundSrc'] = image.src
    this.onUpdate()
  }

  private setAnimationParamsListener(): void {
    // Listen to answer event from animation
    window.addEventListener('selected-animation-params', (event: any): void => {
      if (event.detail.animationName !== this.params.animationName) return
      this.animationParams = event.detail.params
      for (const key in this.animationParams) {
        if (!this.params.hasOwnProperty(key)) {
          this.params[key] = this.animationParams[key].default
        }
      }
      for (const key in this.params) {
        if (key !== 'animationName' && !this.animationParams.hasOwnProperty(key)) {
          delete this.params[key]
        }
      }
      console.log('Custom params provided by animation: ', this.animationParams);
    });
  }
}
