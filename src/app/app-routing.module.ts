import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./reviews/reviews.module').then( m => m.ReviewsPageModule)
  },
  {
    path: 'review-details/:id',
    loadChildren: () => import('./review-details/review-details.module').then( m => m.ReviewDetailsPageModule)
  },
  {
    path: 'book-details/:id',
    loadChildren: () => import('./book-details/book-details.module').then( m => m.BookDetailsPageModule)
  },
  {
    path: 'review',
    loadChildren: () => import('./modals/review/review.module').then( m => m.ReviewPageModule)
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./landing-page/landing-page.module').then( m => m.LandingPagePageModule)
  },  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'change-info-profile',
    loadChildren: () => import('./modals/change-info-profile/change-info-profile.module').then( m => m.ChangeInfoProfilePageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'map-store',
    loadChildren: () => import('./map-store/map-store.module').then( m => m.MapStorePageModule)
  }





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
