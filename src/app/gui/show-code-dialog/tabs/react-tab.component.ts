import {Component, Input} from '@angular/core'
import {ComponentParams} from "../../../model/component-params";
import {copyToClipboard} from "../../../shared/utils";
import packageInfo  from '../../../../../package.json'
import {ToastService} from "../../../shared/services/toast/toast.service";

@Component({
  selector: 'app-react-tab',
  templateUrl: "./react-tab.component.html",
})
export class ReactTabComponent {
  @Input() data: ComponentParams
  public stencilUrl: string = "https://stenciljs.com/docs/react"
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
