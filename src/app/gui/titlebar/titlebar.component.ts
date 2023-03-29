import {Component, EventEmitter, Output} from '@angular/core'

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent {
  @Output() drawerVisibilityEmitter = new EventEmitter<boolean>()
  drawerVisibility = true

  toggleDrawer() {
    this.drawerVisibility = !this.drawerVisibility
    this.drawerVisibilityEmitter.emit(this.drawerVisibility)
  }
}
