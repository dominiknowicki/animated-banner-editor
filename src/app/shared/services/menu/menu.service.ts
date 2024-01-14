import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class MenuService {

  private restartAnimationSubject = new Subject()
  public getRestartAnimationSubject = this.restartAnimationSubject.asObservable()
  public emitRestartAnimation() {
    this.restartAnimationSubject.next(null)
  }

  private showCodeSubject = new Subject()
  public getShowCodeSubject = this.showCodeSubject.asObservable()
  public emitShowCode() {
    this.showCodeSubject.next(null)
  }

  private paramsDrawerVisibility = new BehaviorSubject(true)
  public getAppParamsDrawerVisibility = this.paramsDrawerVisibility.asObservable()
  public setParamsDrawerVisibility(drawerVisibility: boolean) {
    this.paramsDrawerVisibility.next(drawerVisibility)
  }

  private menuDrawerVisibility = new BehaviorSubject(false)
  public getAppMenuDrawerVisibility = this.menuDrawerVisibility.asObservable()
  public setAppMenuDrawerVisibility(drawerVisibility: boolean) {
    this.menuDrawerVisibility.next(drawerVisibility)
  }
}
