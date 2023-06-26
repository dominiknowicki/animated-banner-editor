import {Component, Input} from '@angular/core'
import {Params} from "../../../model/params";
import {copyToClipboard} from "../../../shared/utils";

@Component({
  selector: 'app-vue-tab',
  templateUrl: "./vue-tab.component.html",
})
export class VueTabComponent {
  @Input() data: Params
  public stencilUrl: string = "https://stenciljs.com/docs/vue"
  public get link2(): string {
    return `<script type='module' src='https://unpkg.com/browse/animated-banner@0.0.10/dist/animations/${this.data.animation}.js'></script>`
  }

  public openUrl(url: string): void {
    window.open(url, '_blank')
  }

  public copy(text): void {
    copyToClipboard(text)
  }
}
