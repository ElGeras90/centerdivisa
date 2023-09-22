import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  selectedData: any;
  activo: boolean = false;

  setSelectedData(data: any) {
    this.selectedData = data;
  }

  getSelectedData() {
    return this.selectedData;
  }

  getActivo(){
    return this.activo;
  }

  setActivo(data: boolean) {
    this.activo = data;
  }
}
