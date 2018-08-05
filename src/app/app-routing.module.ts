import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecognizeComponent } from './pages/recognize/recognize.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'recognize', component: RecognizeComponent },
  { path: 'list', component: ListComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes),
  ],
})
export class AppRoutingModule { }
