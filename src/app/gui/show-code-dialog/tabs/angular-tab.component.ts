import {Component, Input} from '@angular/core'
import {ComponentParams} from "../../../model/component-params";
import {copyToClipboard} from "../../../shared/utils";
import packageInfo  from '../../../../../package.json'

@Component({
  selector: 'app-angular-tab',
  templateUrl: "./angular-tab.component.html",
})
export class AngularTabComponent {

  @Input() data: ComponentParams
  public link1: string = "npm install animated-banner-component --save"
  public link2: string = `import {defineCustomElements} from "animated-banner/loader"
...
void defineCustomElements(window)`
  public get link3(): string {
    return `<script type='module' src='https://unpkg.com/browse/animated-banner@${packageInfo.version}/dist/animations/${this.data.animation}.js'></script>`
  }
  public copy(text): void {
    copyToClipboard(text)
  }
}
