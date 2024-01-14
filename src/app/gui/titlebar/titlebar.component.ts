import {Component, EventEmitter, Output} from '@angular/core'
import packageInfo  from '../../../../package.json'
import {MenuService} from "../../shared/services/menu/menu.service";

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent {
  public paramsDrawerVisibility = true
  public menuDrawerVisibility = false
  public version = packageInfo.version

  constructor(private menuService: MenuService) {
  }

  restartAnimation() {
    this.menuService.emitRestartAnimation()
  }

  showCodeDialog() {
    this.menuService.emitShowCode()
  }

  toggleMenuDrawer() {
    this.menuDrawerVisibility = !this.menuDrawerVisibility
    this.menuService.setAppMenuDrawerVisibility(this.menuDrawerVisibility)
  }

  toggleParamsDrawer() {
    this.paramsDrawerVisibility = !this.paramsDrawerVisibility
    this.menuService.setParamsDrawerVisibility(this.paramsDrawerVisibility)
  }
}
