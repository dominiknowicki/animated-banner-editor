import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import {ShowCodeDialog} from "../show-code-dialog/show-code-dialog.component"
import {Params} from "@angular/router"
import {DEFAULT_PARAMS} from "../../model/params"

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent implements OnInit {
  @Output() paramEmitter = new EventEmitter<object>()
  public params: Params = DEFAULT_PARAMS
  public customColor = "red"
  public customBackgroundColor = "red"
  public customBackgroundImage: string
  public fontsize: 20

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.restartAnimation()
  }

  onUpdate(): void {
    this.paramEmitter.emit(this.applyCustomParams(this.params))
  }

  applyCustomParams(params: Params): Params {
    let updatedParams = {...params}
    updatedParams.color = (this.params.color === 'customColor') ? this.customColor : this.params.color
    switch (this.params.background) {
      case 'customBackgroundColor':
        updatedParams.background = this.customBackgroundColor
        break
      case 'customBackgroundImage':
        updatedParams.background = `url('${this.customBackgroundImage}')`
        break
      default:
        updatedParams.background = this.params.background
    }
    return updatedParams
  }

  onFileUpload (event: any) {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      // TODO: set canvas width and height to image width and height
      console.log('reader.result', reader.result)
      this.customBackgroundImage = reader.result as string
      this.onUpdate()
    }
    reader.readAsDataURL(file)
  }

  restartAnimation(): void {
    setTimeout(() => this.onUpdate())
  }

  openShowCodeDialog(): void {
    this.dialog.open(ShowCodeDialog, {
      width: '50vw',
      enterAnimationDuration: 0,
      exitAnimationDuration: 0,
    })
  }
}
