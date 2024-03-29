import {Component, Input} from '@angular/core'
import {ComponentParams} from "../../../model/component-params";
import {copyToClipboard} from "../../../shared/utils";
import packageInfo  from '../../../../../package.json'
import {ToastService} from "../../../shared/services/toast/toast.service";

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
    // TODO: print all animations names
    return `<script type='module' src='https://unpkg.com/browse/animated-banner@${packageInfo.version}/dist/animations/${this.data.animations[0]}.js'></script>`
  }

  constructor(
    public toast: ToastService
  ) {
  }

  public copy(text): void {
    copyToClipboard(text)
    this.toast.success('Copied to clipboard!')
  }
}
