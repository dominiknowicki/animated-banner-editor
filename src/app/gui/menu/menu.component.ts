import {Component} from "@angular/core";
import {ToastService} from "../../shared/services/toast/toast.service";
import {MenuService} from "../../shared/services/menu/menu.service";
import {AvailableAnimationsService} from "../../shared/services/available-animations/available-animations.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(
    public toast: ToastService,
    private menuService: MenuService,
    private availableAnimationsService: AvailableAnimationsService,
  ) {
  }

  public onAnimationFileUpload(event: any): void {
    this.availableAnimationsService.onAnimationFileUpload(event)
    ;(document.getElementById('new-animation-input') as HTMLInputElement).value = null
  }

  public showCodeDialog(): void {
    this.menuService.emitShowCode()
  }

  public restartAnimation(): void {
    this.menuService.emitRestartAnimation()
  }
}
