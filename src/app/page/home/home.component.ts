import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../../Employee";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  empEditValue?: Employee;
  displayCreate: boolean = false;
  isEdit: boolean = false;
  displayDetail: boolean = false;
  displayDelete: boolean = false;
  intoDetail: boolean = false;
  baseURI = 'https://localhost:44329/api/'
  headers = new HttpHeaders()
    .set('Content-Type', 'Application/json')

  constructor(public http: HttpClient) {
  }

  employees: Employee[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees(): void {
    this.isLoading = true
    this.http.get<Employee[]>(this.baseURI + 'Employee', {headers: this.headers}).subscribe(value => {
      this.employees = value
      this.isLoading = false
      console.log(value)
    }, error => {
      this.isLoading = false
    })
  }

  showDisplayCreate(emp: any): void {
    if (emp) {
      this.empEditValue = emp
      this.isEdit = true
    } else {
      this.isEdit = false
    }
    if (this.intoDetail) {
      this.isEdit = true
    }
    this.displayCreate = !this.displayCreate
    if (!this.displayCreate) {
      this.getEmployees()
    }
  }

  showDisplayDetail(emp: any): void {
    if (emp) {
      this.empEditValue = emp
      this.isEdit = true
    }
    this.displayDetail = !this.displayDetail
    this.intoDetail = !this.intoDetail
  }

  toDate(value: number) {
    const date = new Date(value * 1000);
    return date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()
  }

  showDisplayDelete(emp: any) {
    if (emp) {
      this.empEditValue = emp
    }
    this.displayDelete = !this.displayDelete
  }

  confirmDelete() {
    this.http.delete<Employee[]>(this.baseURI + 'Employee/' + this.empEditValue?.employeeID, {headers: this.headers})
      .subscribe(value => {
        this.displayDelete = !this.displayDelete
        this.getEmployees()
      }, error => {
        this.isLoading = false
      })
  }
}
