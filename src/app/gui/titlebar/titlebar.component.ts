import {Component, EventEmitter, Output} from '@angular/core'
import packageInfo  from '../../../../package.json'
import {MenuService} from "../../shared/services/menu/menu.service";

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent {
  public drawerVisibility = true
  public version = packageInfo.version

  constructor(private menuService: MenuService) {
  }

  restartAnimation() {
    this.menuService.emitRestartAnimation()
  }

  showCodeDialog() {
    this.menuService.emitShowCode()
  }

  toggleDrawer() {
    this.drawerVisibility = !this.drawerVisibility
    this.menuService.setDrawerVisibility(this.drawerVisibility)
  }
}
