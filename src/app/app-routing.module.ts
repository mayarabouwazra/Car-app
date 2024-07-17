import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVehiclesComponent } from './list-vehicles/list-vehicles.component';


const routes: Routes = [
  { path: 'main-table', component: ListVehiclesComponent },
  { path: '', redirectTo: '/main-table', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
