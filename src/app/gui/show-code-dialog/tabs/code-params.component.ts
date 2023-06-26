import {Component, Input} from '@angular/core'
import {Params} from "../../../model/params";
import {copyToClipboard} from "../../../shared/utils";

@Component({
  selector: 'app-code-params',
  templateUrl: "./code-params.component.html",
})
export class CodeParamsComponent {

  @Input() data: Params

  public get text() {
    return `<animated-banner-component
      animation="${this.data.animation}"
      autosize="${this.data.autosize}"
      color=${this.data.color}"
      fontsize=${this.data.fontsize}"
      height="${this.data.height}"
      loop="${this.data.loop}"
      text="${this.data.text}"
      textposition="${this.data.textposition}"
      width="${this.data.width}"
      background="${this.data.background}"
    ></animated-banner-component>`
  }

  public copy(text): void {
    copyToClipboard(text)
  }
}
