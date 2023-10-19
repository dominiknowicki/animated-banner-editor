import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA} from "@angular/material/dialog"
import {generateId} from "../../shared/utils";

@Component({
  selector: 'app-show-code-show-code-dialog',
  templateUrl: './show-code-dialog.component.html',
  styleUrls: ['./show-code-dialog.component.scss']
})
export class ShowCodeDialog {

  elementId: string = generateId()
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
