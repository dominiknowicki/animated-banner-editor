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
  width = 300

  public get markParent() {
    return this.params?.matchParent ? "background: #eee" : ""
  }

  public get adjustWidth() {
    return this.params?.matchParent ? `width: ${this.width}px` : ""
  }

  public makeSmaller(): void {
    if (this.width <= 200) return
    this.width -= 20
    this.reload()
  }

  public makeBigger(): void {
    if (this.width >= 1000) return
    this.width += 20
    this.reload()
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
