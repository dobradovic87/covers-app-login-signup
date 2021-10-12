import { CoversListComponent } from './list/covers-list.component';
import { CoversComponent } from './covers.component';
import { Routes, RouterModule } from '@angular/router';
import { CoverDetailsComponent } from './details/cover-details.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: CoversComponent,
    children: [
      {
        path: 'list',
        component: CoversListComponent,
      },
      {
        path: 'details',
        component: CoverDetailsComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoversRoutingModule {}
