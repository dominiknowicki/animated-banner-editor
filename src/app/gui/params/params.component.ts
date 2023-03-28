import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent implements OnInit {
  @Output() paramEmitter = new EventEmitter<object>();
  public params: any

  onUpdate() {
    this.paramEmitter.emit(this.params);
  }

  ngOnInit(): void {
    this.params = {
      animation: "slide-right",
      background: "url('assets/media/corollaSedan_1000x750.jpg')",
      color: "#aaa",
      fontSize: "18",
      loop: "true",
      text: "Wyprzedaż rocznika 2022",
      textPosition: "bottom"
    }
  }
}
