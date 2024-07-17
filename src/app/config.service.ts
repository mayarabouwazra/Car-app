import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public baseUrl: string;

  constructor() {
    
    this.baseUrl = 'https://ev-database.continuousnet.com/';
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}