import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  receivedParams: object;

  onParamEmitted(param: object) {
    this.receivedParams = param;
  }
}
