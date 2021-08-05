import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeInfoProfilePageRoutingModule } from './change-info-profile-routing.module';

import { ChangeInfoProfilePage } from './change-info-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeInfoProfilePageRoutingModule
  ],
  declarations: [ChangeInfoProfilePage]
})
export class ChangeInfoProfilePageModule {}
