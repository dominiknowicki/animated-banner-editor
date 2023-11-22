import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MatButtonModule} from "@angular/material/button"
import {MatIconModule} from "@angular/material/icon"
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatSelectModule} from "@angular/material/select"
import {MatSidenavModule} from "@angular/material/sidenav"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import {MatDialogModule} from "@angular/material/dialog"
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatTabsModule,
    MatSnackBarModule,
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatTabsModule,
    MatSnackBarModule,
  ]
})
export class MaterialModule {
}
