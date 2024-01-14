import {Component, Input} from '@angular/core'
import {copyToClipboard} from "../../../shared/utils";
import {ToastService} from "../../../shared/services/toast/toast.service";
import {ComponentParams} from "../../../model/component-params";

@Component({
  selector: 'app-code-params',
  templateUrl: "./code-params.component.html",
})
export class CodeParamsComponent {

  @Input() elementId: string
  @Input() framework: string
  @Input() data: ComponentParams

  public getText(): string {
    switch (this.framework) {
      case 'angular':
        return `<animated-banner-component
      ${this.getCommonParams()}
      [animationParams]="${this.getAnimationParams()}"
    ></animated-banner-component>`
      case 'vue':
        return `<animated-banner-component
      ${this.getCommonParams()}
      .animationParams="${this.getAnimationParams()}"
    ></animated-banner-component>`
      case 'react':
        return `<animated-banner-component
      ${this.getCommonParams()}
      animationParams=${this.getAnimationParams()}
    ></animated-banner-component>`
      default:
        return `<animated-banner-component
      id="${this.elementId}"
      ${this.getCommonParams()}
    ></animated-banner-component>
    <script>
      document.querySelector('${this.elementId}')
        .animationParams = ${this.getAnimationParams()}
    </script>`
    }
  }

  constructor(
    public toast: ToastService
  ) {
  }

  public copy(text): void {
    copyToClipboard(text)
    this.toast.success('Copied to clipboard!')
  }

  private getCommonParams(): string {
    return `width="${this.data.width}"
      height="${this.data.height}"
      match-parent="${this.data.matchParent}"
      background="${this.data.background}"`
  }

  private getAnimationParams(): string {
    let result: string = '{\n'
    this.data.animations.forEach(animation => {
      result += '\t\t[\n'
      Object.keys(animation).forEach(key => {
        result += `\t\t"${key}": "${String(animation[key]).replaceAll('\n', '')}",\n`
      })
      result += '\t\t],\n'
    })
    return result + '\t\t}'
  }
}
