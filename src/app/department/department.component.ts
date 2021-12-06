import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from './../services/hospital-service.service'


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  query: string | null ='';

  constructor(private route: ActivatedRoute, private hospitalService: HospitalService) { }

  data: any = []

  tempObj:any;
  selectedIndex: any;
  sortOrder = false;

  newData = {
    newDepartment: '',
    newHead:'',
    newNumber: ''
  }

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParamMap.get('hospital');
    this.getDepartmentData();
  }

  getDepartmentData(){
    this.data = this.hospitalService.getDepartmentData(this.query);
  }

  sortData() {
    this.sortOrder = !this.sortOrder;
    if (this.sortOrder) {
      return this.data.sort((a: any, b: any) => {
        return a.departmentname.localeCompare(b.departmentname)
      })
    } else {
      this.data.sort((a: any, b: any) => {
        return b.departmentname.localeCompare(a.departmentname);
      })
    }

  }

  editInput(index: any) {
    this.selectedIndex = index
    this.tempObj={...this.data[index]}
  }

  delete(index: any) {
    if (index > -1) {
      let obj =this.data[index]
      this.data.splice(index, 1);
      this.hospitalService.deleteDepartment(obj)
    }
  }

  saveInput(index: any) {
    if (isNaN(index)) {
      this.hospitalService.addNewDepartment({
        departmentname:this.newData.newDepartment,
        head:this.newData.newHead,
        contactnumber:this.newData.newNumber,
        hospitalname:this.query
      })
      this.newData = {
        newDepartment: '',
        newHead:'',
        newNumber: ''
      }
      this.getDepartmentData();
    } else {
      this.hospitalService.updateDeaprtment(this.data[index])
      this.tempObj=undefined
    }
  }

  CancelInput() {
    this.newData = {
      newDepartment: '',
      newHead:'',
      newNumber: ''
    }
    this.tempObj=undefined
  }

}
