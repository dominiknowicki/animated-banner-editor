import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppComponent} from './app.component'
import {FormsModule} from "@angular/forms"
import {HttpClientModule} from "@angular/common/http"
import {MaterialModule} from "./shared/material/material.module"
import {TitlebarComponent} from "./gui/titlebar/titlebar.component"
import {ParamsComponent} from "./gui/params/params.component"
import {PlaygroundComponent} from "./gui/playground/playground.component"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {ShowCodeDialog} from './gui/show-code-dialog/show-code-dialog.component'
import {NgxColorsModule} from "ngx-colors"
import {PlainJsTabComponent} from "./gui/show-code-dialog/tabs/plain-js-tab.component";
import {CodeParamsComponent} from "./gui/show-code-dialog/tabs/code-params.component";
import {AngularTabComponent} from "./gui/show-code-dialog/tabs/angular-tab.component";
import {NpmTabComponent} from "./gui/show-code-dialog/tabs/npm-tab.component";
import {ReactTabComponent} from "./gui/show-code-dialog/tabs/react-tab.component";
import {VueTabComponent} from "./gui/show-code-dialog/tabs/vue-tab.component";
import {CdnTabComponent} from "./gui/show-code-dialog/tabs/cdn-tab.component";
import {ToastService} from "./shared/services/toast/toast.service";
import {CodeDialogService} from "./gui/show-code-dialog/code-dialog.service";
import {MenuService} from "./shared/services/menu/menu.service";
import {AnimationParamsComponent} from "./gui/params/animation-params/animation-params.component";

@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    ParamsComponent,
    AnimationParamsComponent,
    PlaygroundComponent,
    ShowCodeDialog,
    AngularTabComponent,
    ReactTabComponent,
    VueTabComponent,
    NpmTabComponent,
    CdnTabComponent,
    PlainJsTabComponent,
    CodeParamsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgxColorsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CodeDialogService,
    ToastService,
    MenuService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
