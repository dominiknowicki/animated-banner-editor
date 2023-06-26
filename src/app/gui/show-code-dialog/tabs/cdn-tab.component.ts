import {Component, Input} from '@angular/core'
import {Params} from "../../../model/params";
import {copyToClipboard} from "../../../shared/utils";

@Component({
  selector: 'app-cdn-tab',
  templateUrl: "./cdn-tab.component.html",
})
export class CdnTabComponent {

  @Input() data: Params
  public stencilUrl: string = "https://stenciljs.com/docs/javascript"
  public link1: string = "<script src='https://unpkg.com/browse/animated-banner@0.0.10/dist/index.js'></script>"
  public link1a: string = "<script src='https://unpkg.com/browse/animated-banner@0.0.10/'></script>"
  public get link2(): string {
    return `<script type='module' src='https://unpkg.com/browse/animated-banner@0.0.10/dist/animations/${this.data.animation}.js'></script>`
  }

  public copy(text): void {
    copyToClipboard(text)
  }
  public openUrl(url: string): void {
    window.open(url, '_blank')
  }
}
