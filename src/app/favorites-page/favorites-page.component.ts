import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToFavorites(): void {
    this.router.navigate(['/favorites']);
  }
}
