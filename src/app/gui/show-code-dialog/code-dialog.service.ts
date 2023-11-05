import {Injectable} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ShowCodeDialog} from "./show-code-dialog.component";
import {Params} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class CodeDialogService {
  constructor(public dialog: MatDialog) {
  }

  open(paramsToDisplay: Params): MatDialogRef<ShowCodeDialog> {
    return this.dialog.open(ShowCodeDialog, {
      width: '80vw',
      enterAnimationDuration: 0,
      exitAnimationDuration: 0,
      data: paramsToDisplay
    })
  }
}
