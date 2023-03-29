import {Component, Input} from '@angular/core'

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent {
  @Input() showParams: boolean

  // TODO: refactor change detection!
  _reloaded = true
  params = null

  onParamEmitted(param: object): void {
    this.params = param
    this.reload()
  }

  getTextPosition(): string {
    const tp = this.params?.textPosition || 'middle'
    console.log('textPosition', tp)
    return tp
  }

  private reload(): void {
    setTimeout(() => this._reloaded = false)
    setTimeout(() => this._reloaded = true)
  }
}
