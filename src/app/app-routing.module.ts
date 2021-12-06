import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalComponent } from "./hospital/hospital.component"
import { DepartmentComponent } from "./department/department.component"

const routes: Routes = [
  { path: '', redirectTo: '/hospital', pathMatch: 'full' },
  {
    path: 'hospital',
    component: HospitalComponent
  },
  {
    path: 'department',
    component: DepartmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
