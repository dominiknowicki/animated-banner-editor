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

@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    ParamsComponent,
    PlaygroundComponent,
    ShowCodeDialog,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
