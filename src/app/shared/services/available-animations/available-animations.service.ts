import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ToastService} from "../toast/toast.service";

@Injectable({
  providedIn: 'root',
})
export class AvailableAnimationsService {

  private availableAnimationNames: string[] = ['slide-text', 'slide-image', 'show-text']
  private availableAnimationNamesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.availableAnimationNames)
  getAvailableAnimationNamesSubject = this.availableAnimationNamesSubject.asObservable()

  public setAvailableAnimationNames(availableAnimationNames: string[]) {
    this.availableAnimationNamesSubject.next(availableAnimationNames)
  }

  constructor(
    public toast: ToastService,
  ) {
  }

  onAnimationFileUpload(event: any): void {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => this.onAnimationFileLoaded(reader.result as string)
    reader.readAsText(file)
  }

  onAnimationFileLoaded(data: string): void {
    if (!data) {
      this.toast.error('Error loading animation file - try again with different file!')
      return
    }

    this.getCustomCustomAnimationCode(data)
      .then((animationCode: string) => this.getAnimationName(animationCode))
      .then((animationData: {
        animationName: string,
        animationCode: string
      }) => this.addCustomAnimationToList(animationData))
      .then((animationData: {
        animationName: string,
        animationCode: string
      }) => this.registerCustomAnimation(animationData))
      .then((animationData: {
        animationName: string,
        animationCode: string
      }) => this.toast.success(`Animation ${animationData.animationName} added`))
      .catch((reason: any) => this.toast.error(`Error adding animation (${reason})`))
  }

  getCustomCustomAnimationCode(data: string): Promise<string> {
    const animationCode = data.replace("export {}", "")
    if (!animationCode.includes("registerAnimator") || !animationCode.includes("animationName")) {
      return Promise.reject('invalid animation code')
    } else {
      return Promise.resolve(animationCode)
    }
  }

  getAnimationName(animationCode: string): Promise<{ animationName: string, animationCode: string }> {
    try {
      let animationName = animationCode.split("animationName = '")[1]
      animationName = animationName.split("';")[0]
      return Promise.resolve({animationName, animationCode})
    } catch (e) {
      return Promise.reject(('invalid animation name'))
    }
  }

  addCustomAnimationToList({animationName, animationCode}): Promise<{ animationName: string, animationCode: string }> {
    if (this.availableAnimationNames.includes(animationName)) return Promise.reject('animation already exists')
    this.availableAnimationNames.unshift(animationName)
    this.setAvailableAnimationNames(this.availableAnimationNames)
    return Promise.resolve({animationName, animationCode})
  }

  registerCustomAnimation(animationData: { animationName: string, animationCode: string }): Promise<{
    animationName: string,
    animationCode: string
  }> {
    eval(animationData.animationCode)
    return Promise.resolve(animationData)
  }
}
