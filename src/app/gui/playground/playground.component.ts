import {Component, Input} from '@angular/core'

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent {
  @Input() showParams: boolean

  _reloaded = true
  params = null

  public get markParent() {
    return this.params?.matchParent ? "background: #eee" : ""
  }

  onParamEmitted(param: object): void {
    this.params = param
    this.reload()
  }

  /**
   * Reloads the component into playground, required for matchParent to work properly
   * @private
   */
  private reload(): void {
    setTimeout(() => this._reloaded = false)
    setTimeout(() => this._reloaded = true)
  }
}
