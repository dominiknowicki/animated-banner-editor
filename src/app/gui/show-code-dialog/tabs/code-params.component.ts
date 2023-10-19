import {Component, Input} from '@angular/core'
import {copyToClipboard} from "../../../shared/utils";
import {COMPONENT_PARAMS} from "../../../model/component-params";

@Component({
  selector: 'app-code-params',
  templateUrl: "./code-params.component.html",
})
export class CodeParamsComponent {

  @Input() elementId: string
  @Input() framework: string
  @Input() data: any // TODO: type that extends ComponentParams

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

  public copy(text): void {
    copyToClipboard(text)
  }

  private getCommonParams(): string {
    return `text="${this.data.text}"
      animation="${this.data.animation}"
      width="${this.data.width}"
      height="${this.data.height}"
      match-parent="${this.data.matchParent}"
      background="${this.data.background}"`
  }

  private getAnimationParams(): string {
    let result: string = '{\n'
    Object.keys(this.data).forEach(key => {
      // TODO: remove params that are not needed for current animation but maybe left in data
      if (!COMPONENT_PARAMS.includes(key)) result += `\t\t"${key}": "${this.data[key]}",\n`
    })
    return result + '\t\t}'
  }
}
