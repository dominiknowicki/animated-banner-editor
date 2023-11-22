import {Component, Input} from '@angular/core'
import {ComponentParams} from "../../../model/component-params";
import {copyToClipboard} from "../../../shared/utils";
import packageInfo  from '../../../../../package.json'
import {ToastService} from "../../../shared/services/toast/toast.service";

@Component({
  selector: 'app-npm-tab',
  templateUrl: "./npm-tab.component.html",
})
export class NpmTabComponent {

  @Input() elementId: string
  @Input() data: ComponentParams
  public link1: string = "npm install animated-banner-component --save"
  public link2: string = "<script src='node_modules/animated-banner-component/dist/animated-banner-component.esm.js'></script>"
  public get link3(): string {
    return `<script type='module' src='https://unpkg.com/browse/animated-banner@${packageInfo.version}/dist/animations/${this.data.animation}.js'></script>`
  }

  constructor(
    public toast: ToastService
  ) {
  }

  public copy(text): void {
    copyToClipboard(text)
    this.toast.info('Copied to clipboard!')
  }
}
