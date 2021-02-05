import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { FilterService, PrimeNGConfig } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [HeaderComponent, PageContainerComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [HeaderComponent, PageContainerComponent],
  providers: [ PrimeNGConfig, FilterService ]
})
export class CoreModule { }
