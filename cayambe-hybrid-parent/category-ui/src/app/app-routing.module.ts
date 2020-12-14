import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryAddGuard } from './components/category-add/category-add.guard';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryEditGuard } from './components/category-edit/category-edit.guard';
import { AppAuthGuard } from './app-auth.guard';

// https://betterfullstack.com/how-to-use-angular-parameter-in-right-way/

const routes: Routes = [
  {
    path: 'categories',
    component: HomeComponent,
  },
  {
    path: 'categories/add',
    component: CategoryAddComponent,
    canDeactivate: [CategoryAddGuard],
    canActivate: [AppAuthGuard], data: { roles: ['admin'] }
  },
  {
    path: 'categories/:id/edit',
    component: CategoryEditComponent,
    canDeactivate: [CategoryEditGuard],
    canActivate: [AppAuthGuard], data: { roles: ['admin'] }
  },
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
