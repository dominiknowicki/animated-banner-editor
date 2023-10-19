import {Component, EventEmitter, Output} from '@angular/core'
import packageInfo  from '../../../../package.json'

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent {
  @Output() drawerVisibilityEmitter = new EventEmitter<boolean>()
  drawerVisibility = true

  public version = packageInfo.version

  toggleDrawer() {
    this.drawerVisibility = !this.drawerVisibility
    this.drawerVisibilityEmitter.emit(this.drawerVisibility)
  }
}
