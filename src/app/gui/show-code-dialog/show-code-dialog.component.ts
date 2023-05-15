import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA} from "@angular/material/dialog"

@Component({
  selector: 'app-show-code-show-code-dialog',
  templateUrl: './show-code-dialog.component.html',
  styleUrls: ['./show-code-dialog.component.scss']
})
export class ShowCodeDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  public getTab1Text(): string {
    return `
    <animated-banner-component
      animation="${this.data.animation}"
      autosize="${this.data.autosize}"
      background="${this.data.background}"
      color=${this.data.color}"
      fontsize=${this.data.fontsize}"
      height="${this.data.height}"
      loop="${this.data.loop}"
      text="${this.data.text}"
      textposition="${this.data.textposition}"
      width="${this.data.width}"
    ></animated-banner-component>`
  }

  public getTab2Text(): string {
    return `
1. Run "npm install animated-banner-component --save"
2. Import webcomponent in head of your index.html file with by adding
    "<script src='node_modules/animated-banner-component/dist/animated-banner-component.esm.js'></script>
3. Copy the javascript files of desired animation into the source folder of your website
4. Import the animation in head of your index.html file where src should point the path to the animation file
5. Use the webcomponent in your HTML with params provided in first tab
`
  }
}
