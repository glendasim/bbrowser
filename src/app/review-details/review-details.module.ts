import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewDetailsPageRoutingModule } from './review-details-routing.module';

import { ReviewDetailsPage } from './review-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ReviewDetailsPage]
})
export class ReviewDetailsPageModule {}
