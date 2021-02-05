import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',  pathMatch: 'full', loadChildren: () => import('./pages/profissional/profissional.module').then(m => m.ProfissionalModule) },
  { path: 'estabelecimento', loadChildren: () => import('./pages/estabelecimento/estabelecimento.module').then(m => m.EstabelecimentoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
