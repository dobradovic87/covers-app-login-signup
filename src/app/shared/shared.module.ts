import { ClickElsewhereDirective } from './directives/clickElsewhere.directive';
import { SafePipe } from './pipes/safe.pipe';
import { LoadingComponent } from './components/loading-spinner/laoding-spinner.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    SafePipe,
    ClickElsewhereDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    InlineSVGModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    InlineSVGModule,
    LoadingComponent,
    SafePipe,
    ClickElsewhereDirective,
  ],
})
export class SharedModule {}
