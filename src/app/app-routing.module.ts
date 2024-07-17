import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ListVehiclesComponent } from './list-vehicles/list-vehicles.component';


const routes: Routes = [
  { path: 'main-table', component: ListVehiclesComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'favorites-page', component: FavoritesPageComponent },
  { path: '', redirectTo: '/main-table', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
