import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../../Employee";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  valueDate: any | undefined;
  empForm: FormGroup;
  submitted = false;
  @Input() isEdit: boolean = false
  @Input() editValue?: Employee;
  @Output() public displayCreate: EventEmitter<any> = new EventEmitter();

  baseURI = 'https://localhost:44329/api/'
  headers = new HttpHeaders()
    .set('Content-Type', 'Application/json')


  public emp: Employee = {
    employeeID: 0,
    empName: '',
    empAddress: '',
    empDesignation: '',
    empSalary: 0,
    empJoiningDate: 0,
  };

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.empForm = this.formBuilder.group({
      empName: ['', Validators.required],
      empAddress: ['', Validators.required],
      empDesignation: ['', Validators.required],
      empSalary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      valueDate: ['', Validators.required]
    });
  }

  get f() {
    return this.empForm.controls;
  }

  ngOnInit(): void {
    console.log('ngOnInit', this.editValue)
    console.log('ngOnInit', this.isEdit)
    if (this.editValue && this.isEdit) {
      this.emp = {
        employeeID: this.editValue.employeeID,
        empName: this.editValue.empName,
        empAddress: this.editValue.empAddress,
        empDesignation: this.editValue.empDesignation,
        empSalary: this.editValue.empSalary,
        empJoiningDate: this.editValue.empJoiningDate,
      }
      this.valueDate = new Date(this.editValue.empJoiningDate * 1000)
    }
  }

  hideDisplayCreate(): void {
    this.displayCreate.emit()
  }

  saveHandle() {
    this.submitted = true;
    console.log(this.empForm)
    if (this.empForm.invalid) {
      return;
    }
    if (this.valueDate) {
      this.emp.empJoiningDate = this.valueDate / 1000
    }
    if (!this.isEdit) {
      this.http.post(this.baseURI + 'Employee', JSON.stringify(this.emp), {headers: this.headers})
        .subscribe(value => {
          console.log(value)
          this.hideDisplayCreate()
        }, error => {
          console.log('error: ', error)
        })
    } else {
      this.http.put(this.baseURI + 'Employee', JSON.stringify(this.emp), {headers: this.headers})
        .subscribe(value => {
          console.log(value)
          this.hideDisplayCreate()
        }, error => {
          console.log('error: ', error)
        })
    }
  }

}

