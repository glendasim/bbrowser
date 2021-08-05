import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeInfoProfilePage } from './change-info-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeInfoProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeInfoProfilePageRoutingModule {}
