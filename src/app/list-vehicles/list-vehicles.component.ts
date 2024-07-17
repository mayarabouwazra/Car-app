import { HttpClient } from '@angular/common/http';
import { Component, OnInit,TemplateRef,ChangeDetectorRef,OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/config.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FavoritesService } from '../favorites.service';




@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.css'],
  providers:[ConfigService]

})
export class ListVehiclesComponent implements OnInit,OnDestroy{
  originalData: any[] =[];
  displayedData: any[] = [];
  pagedData: any[]=[];
  currentPage: number = 1;
  itemsPerPage: number = 20;
  showMakeColumn: boolean = true;
  searchTerm: string = '';
  sortColumn: string = 'displayValue';
  sortOrder: 'asc' | 'desc' = 'asc';
  modalRef?: BsModalRef;
  selectedVehicle: any;
  selectedVehicleImages: string[] = [];
  favoriteVehicles: any[] = [];
  private favoriteSubscription: Subscription | undefined;
  isDeleting: boolean = false;




  constructor(private http: HttpClient ,private modalService: BsModalService ,public configService: ConfigService , private cdRef: ChangeDetectorRef,    public favoritesService: FavoritesService

    ) {}
  ngOnInit(): void {

    this.favoriteVehicles.forEach(item => {
      item.isSelected = this.favoritesService.getFavoriteState(item.id);
    });

    const baseUrl = this.configService.getBaseUrl();
    this.http.get<any[]>('assets/data.json').subscribe((data) => {
      this.originalData = data;
      this.originalData.forEach(item => {
        item.makerImage =item.makerImage;
      });
      this.displayedData = this.originalData.map((item: any) => {
        return {
          displayValue: item.vehicleMake,
          makerImage: item.makerImage,
          model: item.vehicleModel,
          version: item.vehicleModelVersion,
          performanceAcceleration:item.performanceAcceleration,
          performanceTopspeed:item.performanceTopspeed,
          rangeReal:item.rangeReal,
          efficiencyReal:item.efficiencyReal,
          chargePlug:item.chargePlug,
          chargeStandardPower:item.chargeStandardPower,
          chargeStandardPhase:item.chargeStandardPhase,
          fastChargePlug:item.fastChargePlug,
          fastChargePowerMax:item.fastChargePowerMax,
          batteryCapacityFull:item.batteryCapacityFull,
          rangeWLTP:item.rangeWLTP,
          id:item.id,
          canRead:item.canRead,
          images:item.images,
          isHidden: false
        };
      });
      this.updatePagedData();

    },
    (error) => {
      console.error('Error loading data:', error);
    });

   

  }
 

  
  ngOnDestroy(): void {
    const selectedIds = this.favoriteVehicles
      .filter(item => item.isSelected)
      .map(item => item.id);
      selectedIds.forEach(id => {
        this.favoritesService.toggleFavoriteState(id, true);
      });  }


  openModal(template: TemplateRef<any>, vehicle: any) {
    this.selectedVehicle = vehicle;
    this.selectedVehicleImages = vehicle.images;
    this.modalRef = this.modalService.show(template, { animated: true });
  }

  deleteRow(item: any): void {
    this.isDeleting = true; 
    setTimeout(() => {
      item.isHidden = true; 
      this.isDeleting= false; 
    }, 110); 
  }

  toggleFavorite(item: any): void {
    if (item.isSelected) {
      this.removeFromFavorites(item);
    } else {
      this.addToFavorites(item);
    }
    this.favoritesService.toggleFavoriteState(item.id, item.isSelected);

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



  applySearch(event : any) {
    const term = event.target.value;
    this.searchTerm = term;
    this.currentPage = 1;
    this.updatePagedData();
  }
 

 



  updatePagedData() {
    const filteredData = this.displayedData.filter((item: any) =>
      item.displayValue.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedData = filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }
toggleColumn() {
  this.showMakeColumn = !this.showMakeColumn;
  this.displayedData = this.originalData.map((item: any) => {
    return {
      displayValue: this.showMakeColumn ? item.vehicleMake : item.vehicleModel,
      makerImage: item.makerImage
    };
  });
  this.updatePagedData();
}

pageChanged(event: any): void {
  this.currentPage = event.page;
  this.updatePagedData();
}


onSort(column: string): void {
  if (column === this.sortColumn) {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortOrder = 'asc';
  }

 



this.sortDisplayedData();
this.updatePagedData();
}


sortDisplayedData(): void {
  this.displayedData.sort((a, b) => {
    const aValue = a[this.sortColumn];
    const bValue = b[this.sortColumn];
    return aValue.localeCompare(bValue) * (this.sortOrder === 'asc' ? 1 : -1);
  });
}





}




