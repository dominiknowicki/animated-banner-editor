import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog"

@Component({
  selector: 'app-add-animation-dialog',
  templateUrl: './add-animation-dialog.component.html',
  styleUrls: ['./add-animation-dialog.component.scss']
})
export class AddAnimationDialog {

  public animationCode: string = ''

  constructor(
    private dialogRef: MatDialogRef<AddAnimationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public save() {
    this.dialogRef.close(this.animationCode);
  }

  public close() {
    this.dialogRef.close();
  }
}
