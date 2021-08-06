import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapStorePage } from './map-store.page';

const routes: Routes = [
  {
    path: '',
    component: MapStorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapStorePageRoutingModule {}
