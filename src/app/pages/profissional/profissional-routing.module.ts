import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfissionalCrudComponent } from './profissional-crud/profissional-crud.component';


const routes: Routes = [{ path: '', component: ProfissionalCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfissionalRoutingModule { }
