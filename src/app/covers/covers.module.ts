import { SharedModule } from './../shared/shared.module';
import { CoversRoutingModule } from './covers-routing.module';
import { CoversListComponent } from './list/covers-list.component';
import { NgModule } from '@angular/core';
import { CoversComponent } from './covers.component';
import { CoverDetailsComponent } from './details/cover-details.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CoversComponent, CoverDetailsComponent, CoversListComponent],
  imports: [
    CommonModule,
    CoversRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CoversModule {}
