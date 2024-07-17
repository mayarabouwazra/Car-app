import { Component,OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteVehicles: any[] = [];


  constructor(  private favoritesService: FavoritesService ,private router: Router

    ) {}

  ngOnInit(): void {
    this.favoriteVehicles = this.favoritesService.getFavorites();
    this.favoriteVehicles.forEach(item => {
      item.isSelected = this.favoritesService.getSelectedState(item.id);
    });

  }
  toggleFavorite(item: any): void {
    if (item.isSelected) {
      this.removeFromFavorites(item);
    } else {
      this.addToFavorites(item);
    }
  }

  addToFavorites(item: any): void {
    const index = this.favoriteVehicles.findIndex(fav => fav.id === item.id);
    
    if (index !== -1) {
      this.favoriteVehicles[index].isSelected = false; 
      this.favoritesService.removeFromFavorites(item); 
    } else {
      item.isSelected = true; 
      this.favoritesService.addToFavorites(item);
    }
  }
  removeFromFavorites(item: any): void {
    const index = this.favoriteVehicles.findIndex(fav => fav.id === item.id);
    
    if (index !== -1) {
      this.favoriteVehicles[index].isSelected = false; 
      this.favoritesService.removeFromFavorites(item); 
    }
  }
  
  navigateToHome(): void {

    this.router.navigate(['/']);
    this.updateSelectedStates();

  }
  updateSelectedStates(): void {
    this.favoriteVehicles.forEach(item => {
      item.isSelected = this.favoritesService.getSelectedState(item.id);
    });
  }


 
}

