import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {Params} from "@angular/router"
import {ComponentParams, DEFAULT_ANIMATION_PARAMS, DEFAULT_COMPONENT_PARAMS} from "../../model/component-params"
import {ToastService} from "../../shared/services/toast/toast.service";
import {CodeDialogService} from "../show-code-dialog/code-dialog.service";
import {MatSnackBarRef} from "@angular/material/snack-bar";
import {MenuService} from "../../shared/services/menu/menu.service";

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent implements OnInit {
  @Output() paramEmitter = new EventEmitter<object>()
  public componentParams: ComponentParams = DEFAULT_COMPONENT_PARAMS
  public customBackgroundColor = "red"
  public customBackgroundImage: string
  public animationListPanelOpen: boolean[] = [true]

  constructor(
    public codeDialog: CodeDialogService,
    public toast: ToastService,
    private menuService: MenuService,
  ) {
    this.menuService.getRestartAnimationSubject.subscribe(_ => this.restartAnimation())
    this.menuService.getShowCodeSubject.subscribe(_ => this.openShowCodeDialog())
  }

  ngOnInit(): void {
    this.restartAnimation()
  }

  onAnimationParamsChange(animationParams: any): void {
    console.log('Animation Params changed and passed to params.component: ', animationParams)
    this.onUpdate()
  }

  onUpdate(): void {
    this.paramEmitter.emit(this.applyCustomParams(this.componentParams))
  }

  applyCustomParams(params: Params): Params {
    let updatedParams = {...params}
    switch (this.componentParams.background) {
      case 'customBackgroundColor':
        updatedParams.background = this.customBackgroundColor
        break
      case 'customBackgroundImage':
      case 'customUrlBackgroundImage':
        updatedParams.background = `url('${this.customBackgroundImage}')`
        break
      default:
        updatedParams.background = this.componentParams.background
    }
    return updatedParams
  }

  onUrlEntered(event: any): void {
    const image: HTMLImageElement = new Image()
    image.onload = this.onBackgroundImageLoaded.bind(this)
    image.src = event.target.value
  }

  onFileUpload(event: any): MatSnackBarRef<any> | void {
    const file = event.target.files[0]
    if (file.size > 524288 / 2) {
      return this.toast.error(`File too large - please use files up to 0,25MB`)
    }
    const reader = new FileReader()
    reader.onload = (): void => {
      const image: HTMLImageElement = new Image()
      image.onload = this.onBackgroundImageLoaded.bind(this)
      image.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  onBackgroundImageLoaded(event: any): MatSnackBarRef<any> | void {
    const image: HTMLImageElement = event.target as HTMLImageElement
    if (image.width > 1500 || image.height > 1500) {
      return this.toast.error('File too large - please use smaller one')
    }
    // setting width and height of canvas to match image
    this.componentParams.width = image.width
    this.componentParams.height = image.height
    this.customBackgroundImage = image.src
    this.onUpdate()
  }

  restartAnimation(): void {
    setTimeout(() => this.onUpdate())
  }

  openShowCodeDialog(): void {
    const paramsToDisplay: Params = this.applyCustomParams(this.componentParams)
    this.codeDialog.open(paramsToDisplay)
  }

  addNextAnimation(): void {
    this.componentParams.animations.push({...DEFAULT_ANIMATION_PARAMS})
    this.animationListPanelOpen.push(true)
    setTimeout(()=> {
      const element = document.getElementById('app-params')
      element.scrollBy({behavior: 'smooth', top:element.scrollHeight})
    }, 100)
  }

  removeAnimation(index: number): void {
    this.componentParams.animations.splice(index, 1)
  }
}
