import {Component, Input} from '@angular/core'
import {ComponentParams} from "../../../model/component-params";
import {copyToClipboard} from "../../../shared/utils";
import packageInfo  from '../../../../../package.json'
import {CodeDialogService} from "../code-dialog.service";
import {ToastService} from "../../../shared/services/toast/toast.service";

@Component({
  selector: 'app-plain-js-tab',
  templateUrl: "./plain-js-tab.component.html",
})
export class PlainJsTabComponent {

  @Input() elementId: string
  @Input() data: ComponentParams
  public link1: string = "<script src='/animated-banner-component/dist/animated-banner-component.esm.js'></script>"
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
}
