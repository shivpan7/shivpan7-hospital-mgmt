import { Component, OnInit } from '@angular/core';
import { HospitalService } from './../services/hospital-service.service'
@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {

  constructor(private hospitalService: HospitalService) { }

  edit: boolean = false;
  tempObj:any;
  data: any = [];
  selectedIndex: any;
  sortOrder = false;

  newData = {
    newHospital: '',
    newNumber: ''
  }


  ngOnInit(): void {
    this.data = this.hospitalService.getHospitalData();
  }

  sortData() {
    this.sortOrder = !this.sortOrder;
    if (this.sortOrder) {
      return this.data.sort((a: any, b: any) => {
        return a.hospitalname.localeCompare(b.hospitalname)
      })
    } else {
      this.data.sort((a: any, b: any) => {
        return b.hospitalname.localeCompare(a.hospitalname);
      })
    }

  }

  editInput(index: any) {
    this.tempObj={...this.data[index]};
    this.selectedIndex = index
  }

  delete(index: any) {
    if (index > -1) {
      let obj =this.data[index]
      this.data.splice(index, 1);
      this.hospitalService.deleteHospital(obj)
    }
  }

  saveInput(index: any) {
    if (isNaN(index)) {
      this.hospitalService.addNewHospital({
        hospitalname: this.newData.newHospital,
        contactnumber: this.newData.newNumber
      })
      this.newData = {
        newHospital: '',
        newNumber: ''
      }

    } else {
      this.hospitalService.updatehospital(this.data[index],this.tempObj.hospitalname)
      this.tempObj=undefined
    }
  }

  CancelInput() {
    this.newData = {
      newHospital: '',
      newNumber: ''
    }
    this.tempObj=undefined
  }

}
