import {Component} from '@angular/core'
import {MatDialogRef} from "@angular/material/dialog"

@Component({
  selector: 'app-show-code-show-code-dialog',
  templateUrl: './show-code-dialog.component.html',
  styleUrls: ['./show-code-dialog.component.scss']
})
export class ShowCodeDialog {
  constructor(public dialogRef: MatDialogRef<ShowCodeDialog>) {
  }
}
