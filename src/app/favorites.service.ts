import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class FavoritesService {
  private favoriteVehicles: any[] = [];
  private favoriteListChangedSource = new BehaviorSubject<any[]>([]);
  private selectedStates: { [id: number]: boolean } = {};
  private favoriteStates: Map<number, boolean> = new Map();
  private selectedFavoriteIds: number[] = [];


  favoriteListChanged$ = this.favoriteListChangedSource.asObservable();
  constructor() {}


 


  addToFavorites(item: any): void {
    this.favoriteStates.set(item.id, true);
    item.isSelected = true;
    if (!this.favoriteVehicles.some(favItem => favItem.id === item.id)) {
      this.favoriteVehicles.push(item);
      this.favoriteListChangedSource.next(this.favoriteVehicles);
    }
  }
  
  removeFromFavorites(item: any): void {
    this.favoriteStates.delete(item.id);
    item.isSelected = false;
    const index = this.favoriteVehicles.findIndex(favItem => favItem.id === item.id);
    if (index !== -1) {
      this.favoriteVehicles.splice(index, 1);
      this.favoriteListChangedSource.next(this.favoriteVehicles);
    }
  }
  
  toggleFavorite(item: any): void {
    if (item.isSelected) {
      this.removeFromFavorites(item);
    } else {
      this.addToFavorites(item);
    }
  }
  
  getSelectedState(id: number): boolean {
    return this.favoriteStates.get(id) || false;
  }
  

  getFavorites(): any[] {
    return this.favoriteVehicles;
  }

  toggleFavoriteState(id: number, isSelected: boolean): void {
    this.favoriteStates.set(id, isSelected);
    if (isSelected) {
      this.selectedFavoriteIds.push(id);
    } else {
      const index = this.selectedFavoriteIds.indexOf(id);
      if (index !== -1) {
        this.selectedFavoriteIds.splice(index, 1);
      }
    }
  }

  getFavoriteState(id: number): boolean {
    return this.favoriteStates.get(id) || false;
  }
  getSelectedFavoriteIds(): number[] {
    return this.selectedFavoriteIds;
  }


}
