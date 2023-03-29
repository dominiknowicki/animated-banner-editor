import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {DEFAULT_PARAMS} from "../../model/params"
import {MatDialog} from '@angular/material/dialog'
import {ShowCodeDialog} from "../show-code-dialog/show-code-dialog.component"

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent implements OnInit {
  @Output() paramEmitter = new EventEmitter<object>()
  public params = DEFAULT_PARAMS

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    setTimeout(() => this.onUpdate())
  }

  onUpdate(): void {
    this.paramEmitter.emit(this.params)
  }

  openShowCodeDialog(): void {
    this.dialog.open(ShowCodeDialog, {
      width: '50vw',
      enterAnimationDuration: 0,
      exitAnimationDuration: 0,
    })
  }
}

