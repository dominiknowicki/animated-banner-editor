import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class MenuService {

  private restartAnimationSubject = new Subject()
  getRestartAnimationSubject = this.restartAnimationSubject.asObservable()
  emitRestartAnimation() {
    this.restartAnimationSubject.next(null)
  }

  private showCodeSubject = new Subject()
  getShowCodeSubject = this.showCodeSubject.asObservable()
  emitShowCode() {
    this.showCodeSubject.next(null)
  }

  private drawerVisibility = new BehaviorSubject(true)
  getDrawerVisibility = this.drawerVisibility.asObservable()
  setDrawerVisibility(drawerVisibility: boolean) {
    this.drawerVisibility.next(drawerVisibility)
  }
}
