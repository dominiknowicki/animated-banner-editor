import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import {ShowCodeDialog} from "../show-code-dialog/show-code-dialog.component"
import {Params} from "@angular/router";
import {DEFAULT_PARAMS} from "../../model/params";

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent implements OnInit {
  @Output() paramEmitter = new EventEmitter<object>()
  public params: Params = DEFAULT_PARAMS
  public customColor = "red"
  public customBackground = ""
  selectedImage: string

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    setTimeout(() => this.onUpdate())
  }

  onUpdate(): void {
    this.paramEmitter.emit(this.addCustomParams(this.params))
  }

  addCustomParams(params: Params): Params {
    let updatedParams = {...params}
    if (this.params.color === 'customColor') {
      updatedParams.color = this.customColor
    }
    if (this.params.background === 'customBackground') {
      updatedParams.background = this.customBackground
    }
    console.log(params, updatedParams)
    return updatedParams
  }

  previewImage
  (event: any) {
    const file = event.target.files[0]

    const reader = new FileReader()

    reader.onload = () => {
      this.selectedImage = reader.result as string
    }

    reader.readAsDataURL(file)
  }

  openShowCodeDialog(): void {
    this.dialog.open(ShowCodeDialog, {
      width: '50vw',
      enterAnimationDuration: 0,
      exitAnimationDuration: 0,
    })
  }
}

