import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  constructor() { }

  data = [
    {
      id: 1,
      hospitalname: 'KIMS',
      contactnumber: '9632587410'
    },
    {
      id: 2,
      hospitalname: 'CSI Mission Hospital',
      contactnumber: '9685321470'
    }
  ];

  deptData = [{
    id: 1,
    departmentname: 'nephrology', head: 'Dr. A P Kulashekhar',
    contactnumber: '9876543210', hospitalname: 'KIMS'
  },
  { id: 2, departmentname: 'neurology', head: 'Dr.B Raj Kumar', contactnumber: '9876543210', hospitalname: 'KIMS' },
  { id: 3, departmentname: 'cardiology', head: 'Dr. L Sri Devi', contactnumber: '9876543210', hospitalname: 'KIMS' },
  { id: 4, departmentname: 'ENT', head: 'Dr. K Ram Prasad', contactnumber: '9876543210', hospitalname: 'CSI Mission Hospital' },
  { id: 5, departmentname: 'opthalmology', head: 'Dr. J Sirisha', contactnumber: '9876543210', hospitalname: 'CSI Mission Hospital' }]

  getHospitalData() {
    let refdata = this.data.map(a => { return { ...a } })
    return refdata;
  }

  updatehospital(payload: any, refName: any) {
    let index = this.data.findIndex(x => x.id == payload.id);
    this.data[index]['hospitalname'] = payload.hospitalname;
    this.data[index]['contactnumber'] = payload.contactnumber;
    this.deptData.forEach((obj: any) => {
      if (obj.hospitalname === refName) {
        obj.hospitalname = payload.hospitalname
      }
    });

  }

  addNewHospital(payload: any) {
    payload.id = this.data[this.data.length - 1].id + 1
    this.data.push(payload)
  }

  updateDeaprtment(payload: any) {
    let index = this.deptData.findIndex(x => x.id == payload.id);
    this.deptData[index]['departmentname'] = payload.departmentname;
    this.deptData[index]['head'] = payload.head;
    this.deptData[index]['contactnumber'] = payload.contactnumber;
    this.deptData[index]['hospitalname'] = payload.hospitalname;
  }

  addNewDepartment(payload: any) {
    payload.id = this.deptData[this.deptData.length - 1].id + 1
    this.deptData.push(payload)
  }

  deleteDepartment(obj: any) {
    let index = this.deptData.findIndex(x => x.id == obj.id);
    this.deptData.splice(index, 1);
  }

  deleteHospital(obj: any) {
    let index = this.data.findIndex(x => x.id == obj.id);
    this.data.splice(index, 1);
  }

  getDepartmentData(hospitalName: any) {
    let refdata = this.deptData.map(a => { return { ...a } })
    return refdata.filter(ele => ele.hospitalname == hospitalName)
  }
}
