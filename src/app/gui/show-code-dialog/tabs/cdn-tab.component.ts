import {Component, Input} from '@angular/core'
import {ComponentParams} from "../../../model/component-params";
import {copyToClipboard} from "../../../shared/utils";
import packageInfo  from '../../../../../package.json'
import {ToastService} from "../../../shared/services/toast/toast.service";

@Component({
  selector: 'app-cdn-tab',
  templateUrl: "./cdn-tab.component.html",
})
export class CdnTabComponent {

  @Input() elementId: string
  @Input() data: ComponentParams
  public stencilUrl: string = "https://stenciljs.com/docs/javascript"
  public link1: string = `<script src='https://unpkg.com/browse/animated-banner@${packageInfo.version}/dist/index.js'></script>`
  public get link2(): string {
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

  public openUrl(url: string): void {
    window.open(url, '_blank')
  }
}
