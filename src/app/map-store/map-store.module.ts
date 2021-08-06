import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapStorePageRoutingModule } from './map-store-routing.module';

import { MapStorePage } from './map-store.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapStorePageRoutingModule
  ],
  declarations: [MapStorePage]
})
export class MapStorePageModule {}
