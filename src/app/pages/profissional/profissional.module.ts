import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfissionalRoutingModule } from './profissional-routing.module';
import { ProfissionalCrudComponent } from './profissional-crud/profissional-crud.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ProfissionalCrudComponent],
  imports: [
    CommonModule,
    ProfissionalRoutingModule,
    SharedModule
  ]
})
export class ProfissionalModule { }
