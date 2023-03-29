import {Component} from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showDrawer = true

  onDrawerVisibilityEmitted(v: boolean) {
    this.showDrawer = v
  }
}
