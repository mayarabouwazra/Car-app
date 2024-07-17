import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListVehiclesComponent } from './list-vehicles/list-vehicles.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ConfigService } from './config.service';
import { APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';



export function initConfig(configService: ConfigService) {
  return () => configService.getBaseUrl();
}





@NgModule({
  declarations: [
    AppComponent,
    ListVehiclesComponent,
    FavoritesComponent,
    FavoritesPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    NgxPaginationModule,
    FormsModule,
    SortableModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    BrowserAnimationsModule,

  ],
  providers: [ConfigService,{ provide: APP_INITIALIZER, useFactory: initConfig, deps: [ConfigService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
