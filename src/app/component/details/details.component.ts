import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from "../../Employee";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() detailValue?: Employee;
  @Input() isDelete: boolean = false;
  @Output() public displayCreate: EventEmitter<any> = new EventEmitter();
  @Output() public displayDetail: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  hideDisplayCreate() {
    this.displayCreate.emit()
    this.displayDetail.emit()
  }

  hideDisplayDetail(){
    this.displayDetail.emit()
  }

  toDate(value: any){
    if (value){
      const date = new Date(value * 1000);
      return date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()
    } else {
      return ''
    }
  }
}
