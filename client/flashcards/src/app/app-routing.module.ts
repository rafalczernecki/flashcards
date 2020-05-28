import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/flashcards', pathMatch: 'full' },
  {
    path: 'flashcards',
    loadChildren: () => import('./feature/feature-routing.module').then(m => m.FeatureRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
