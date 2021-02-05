import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Cidade } from 'src/app/model/dto/cidade.model';
import { Estabelecimento } from 'src/app/model/dto/estabelecimento.model';
import { Estado } from 'src/app/model/dto/estado.model';
import { Page } from 'src/app/model/dto/response/page.interface';
import { ServiceResponse } from 'src/app/model/dto/response/service-response.interface';
import { IbgeService } from 'src/app/service/ibge/ibge.service';
import { EstabelecimentoService } from 'src/app/service/estabelecimento/estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-crud',
  templateUrl: './estabelecimento-crud.component.html',
  styleUrls: ['./estabelecimento-crud.component.scss']
})
export class EstabelecimentoCrudComponent implements OnInit {

  constructor(private estabelecimentoService: EstabelecimentoService, private ibgeService: IbgeService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  // Table
  estabelecimentos: Estabelecimento[]
  estabelecimentosSelecionados: Estabelecimento[]
  loading: boolean
  paginator = true
  totalRecords: number

  // Dialog
  estabelecimentoDialogIsVisible: boolean
  upsertEstabelecimentoObj: Estabelecimento
  submitted: boolean
  cidades: Cidade[]
  estados: Estado[]
  rua: string
  numCasa: string
  cidadesDropwdownIsDisabled = true

  ngOnInit() {
    this.loading = true
    this.loadEstabelecimentos();
  }

  openDialog() {
    this.ibgeService.findAllEstados().subscribe((o: ServiceResponse<Estado[]>) => this.estados = o.data)
    this.upsertEstabelecimentoObj = new Estabelecimento()
    this.submitted = false
    this.estabelecimentoDialogIsVisible = true
  }

  onChangeEstado(event: { value: string}) {
    this.enableCampoCidade(event.value)
  }

  private enableCampoCidade(uf: string) {
    this.cidadesDropwdownIsDisabled = false
    this.ibgeService.findCidadesByUF(uf).subscribe((o: ServiceResponse<Cidade[]>) => this.cidades = o.data)
  }

  loadEstabelecimentos(page = 1, size = 10) {
    this.estabelecimentoService.findAllPageable(page, size)
      .subscribe((estabelecimentosPageResponse: ServiceResponse<Page<Estabelecimento>>) => {
        this.estabelecimentos = estabelecimentosPageResponse.data.content
        this.totalRecords = estabelecimentosPageResponse.data.totalElements
        this.loading = false
      })
  }

  lazyLoadEstabelecimentos(event: LazyLoadEvent) {
    this.loading = true
    this.loadEstabelecimentos((event.first + 10) / 10, event.rows)
  }

  deleteSelectedEstabelecimentos() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja remover os estabelecimentos selecionados ?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.estabelecimentoService.deleteByIds(this.estabelecimentosSelecionados.map(v => v.estabelecimentoId))
          .subscribe((resp: ServiceResponse<number>) => this.messageService.add({severity: resp.feedback.type, summary: resp.feedback.message, detail: resp.feedback.detail}))
        this.estabelecimentos = this.estabelecimentos.filter(p => !this.estabelecimentosSelecionados.includes(p))
        this.estabelecimentosSelecionados = []
      }
    })
  }

  editEstabelecimento(estabelecimento: Estabelecimento) {
    this.openDialog()
    this.enableCampoCidade(estabelecimento.endereco.estado)
    this.upsertEstabelecimentoObj = estabelecimento
  }

  deleteEstabelecimento(estabelecimento: Estabelecimento) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja deletar o ${estabelecimento.nome} ?`,
      accept: () => {
        this.estabelecimentoService.deleteById(estabelecimento.estabelecimentoId)
          .subscribe((resp: ServiceResponse<number>) => this.messageService.add({severity: resp.feedback.type, summary: resp.feedback.message, detail: resp.feedback.detail}))
          this.estabelecimentos = this.estabelecimentos.filter(p => estabelecimento.estabelecimentoId !== p.estabelecimentoId)
      }
    })
  }

  hideDialog() {
    this.cidadesDropwdownIsDisabled = true
    this.estabelecimentoDialogIsVisible = false
    this.submitted = false
  }

  upsertEstabelecimento() {
    this.submitted = true

    if (!this.upsertEstabelecimentoObj.endereco.cidade) {
      this.messageService.add({severity: 'error', summary: 'Campo não preenchido', detail: 'O campo cidade não foi preenchido'})
    }

    if (!this.upsertEstabelecimentoObj.endereco.estado) {
      this.messageService.add({severity: 'error', summary: 'Campo não preenchido', detail: 'O campo estado não foi preenchido'})
    }

    if (
      this.upsertEstabelecimentoObj.celular          &&
      this.upsertEstabelecimentoObj.residencial      &&
      this.upsertEstabelecimentoObj.nome             &&
      this.upsertEstabelecimentoObj.endereco         &&
      this.upsertEstabelecimentoObj.endereco.bairro  &&
      this.upsertEstabelecimentoObj.endereco.cidade  &&
      this.upsertEstabelecimentoObj.endereco.estado  &&
      this.upsertEstabelecimentoObj.endereco.numCasa &&
      this.upsertEstabelecimentoObj.endereco.rua
    ) {
      this.estabelecimentoService.upsert(this.upsertEstabelecimentoObj)
        .subscribe(resp => {
          this.messageService.add({severity: resp.feedback.type, summary: resp.feedback.message, detail: resp.feedback.detail})
          this.loadEstabelecimentos()
        })
        this.hideDialog()
      }
  }

}
