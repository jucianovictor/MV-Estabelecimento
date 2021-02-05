import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstabelecimentoRoutingModule } from './estabelecimento-routing.module';
import { EstabelecimentoCrudComponent } from './estabelecimento-crud/estabelecimento-crud.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [EstabelecimentoCrudComponent],
  imports: [
    CommonModule,
    EstabelecimentoRoutingModule,
    SharedModule
  ]
})
export class EstabelecimentoModule { }
