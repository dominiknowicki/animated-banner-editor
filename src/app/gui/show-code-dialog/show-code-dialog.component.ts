import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA} from "@angular/material/dialog"

@Component({
  selector: 'app-show-code-show-code-dialog',
  templateUrl: './show-code-dialog.component.html',
  styleUrls: ['./show-code-dialog.component.scss']
})
export class ShowCodeDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  public getTabPlainJSDownloadingText(): string {
    return `
1. Download the webcomponent files:

2. Copy downloaded files into the source folder of your website:
3. Import desired animations in head of your index.html file by adding:
    "<script type='module' src='path-to-the-cdn/animated-banner/${this.data.animation}.js'></script>"
4. Use the webcomponent in your HTML by adding:
`
  }

}
