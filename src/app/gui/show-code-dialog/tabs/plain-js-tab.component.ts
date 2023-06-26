import {Component, Input} from '@angular/core'
import {Params} from "../../../model/params";
import {copyToClipboard} from "../../../shared/utils";

@Component({
  selector: 'app-plain-js-tab',
  templateUrl: "./plain-js-tab.component.html",
})
export class PlainJsTabComponent {

  @Input() data: Params
  public link1: string = "<script src='/animated-banner-component/dist/animated-banner-component.esm.js'></script>"
  public get link2(): string {
    return `<script type='module' src='https://unpkg.com/browse/animated-banner@0.0.10/dist/animations/${this.data.animation}.js'></script>`
  }

  public copy(text): void {
    copyToClipboard(text)
  }
}
