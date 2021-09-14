import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Cidade } from 'src/app/model/dto/cidade.model';
import { Estabelecimento } from 'src/app/model/dto/estabelecimento.model';
import { Estado } from 'src/app/model/dto/estado.model';
import { Profissional } from 'src/app/model/dto/profissional.model';
import { Page } from 'src/app/model/dto/response/page.interface';
import { ServiceResponse } from 'src/app/model/dto/response/service-response.interface';
import { EstabelecimentoService } from 'src/app/service/estabelecimento/estabelecimento.service';
import { IbgeService } from 'src/app/service/ibge/ibge.service';
import { ProfissionalService } from 'src/app/service/profissional/profissional.service';

@Component({
  selector: 'app-profissional-crud',
  templateUrl: './profissional-crud.component.html',
  styleUrls: ['./profissional-crud.component.scss']
})
export class ProfissionalCrudComponent implements OnInit {

  constructor(private profissionalService: ProfissionalService, private estabelecimentoService: EstabelecimentoService, private ibgeService: IbgeService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  // Table
  profissionais: Profissional[]
  profissionaisSelecionados: Profissional[]
  loading: boolean
  paginator = true
  totalRecords: number

  // Dialog
  profissionalDialogIsVisible: boolean
  upsertProfissionalObj: Profissional = new Profissional()
  submitted: boolean
  cidades: Cidade[]
  estados: Estado[]
  rua: string
  numCasa: string
  cidadesDropwdownIsDisabled = true
  estabelecimentosDisponiveis: Estabelecimento[]
  selectedEstabelecimentos: Estabelecimento[]

  ngOnInit() {
    this.loading = true
    this.loadProfissionais();
  }

  openDialog(profissional: Profissional) {
    this.estabelecimentoService.findAllPageable().subscribe(o => {
      this.estabelecimentosDisponiveis = o.data.content
      this.selectedEstabelecimentos = o.data.content.filter(e => profissional.estabelecimentos.map(es => es.estabelecimentoId).includes(e.estabelecimentoId))
    })
    this.ibgeService.findAllEstados().subscribe((o: ServiceResponse<Estado[]>) => this.estados = o.data)
    this.submitted = false
    this.profissionalDialogIsVisible = true
    this.upsertProfissionalObj = profissional
  }

  onChangeEstado(event: { value: string}) {
    this.enableCampoCidade(event.value)
  }

  private enableCampoCidade(uf: string) {
    this.cidadesDropwdownIsDisabled = false
    this.ibgeService.findCidadesByUF(uf).subscribe((o: ServiceResponse<Cidade[]>) => this.cidades = o.data)
  }

  loadProfissionais(page = 1, size = 10) {
    this.profissionalService.findAllPageable(page, size)
      .subscribe((profissionaisPageResponse: ServiceResponse<Page<Profissional>>) => {
        if (profissionaisPageResponse.feedback.type === 'error') {
          this.messageService.add({
            severity: profissionaisPageResponse.feedback.type,
            summary: profissionaisPageResponse.feedback.message,
            detail: profissionaisPageResponse.feedback.detail
          })
        } else {
          this.profissionais = profissionaisPageResponse.data.content
          this.totalRecords = profissionaisPageResponse.data.totalElements
        }
        this.loading = false
      })
  }

  lazyLoadProfissionais(event: LazyLoadEvent) {
    this.loading = true
    this.loadProfissionais((event.first + 10) / 10, event.rows)
  }

  deleteSelectedProfissionais() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja remover os profissionais selecionados ?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.profissionalService.deleteByIds(this.profissionaisSelecionados.map(v => v.profissionalId))
          .subscribe((resp: ServiceResponse<number>) => this.messageService.add({severity: resp.feedback.type, summary: resp.feedback.message, detail: resp.feedback.detail}))
        this.profissionais = this.profissionais.filter(p => !this.profissionaisSelecionados.includes(p))
        this.profissionaisSelecionados = []
      }
    })
  }

  editProfissional(profissional: Profissional) {
    this.openDialog(profissional)
    this.enableCampoCidade(profissional.endereco.estado)
  }

  newProfissional() {
    this.openDialog(new Profissional())
  }

  deleteProfissional(profissional: Profissional) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja deletar o ${profissional.nome} ?`,
      accept: () => {
        this.profissionalService.deleteById(profissional.profissionalId)
          .subscribe((resp: ServiceResponse<number>) => this.messageService.add({severity: resp.feedback.type, summary: resp.feedback.message, detail: resp.feedback.detail}))
          this.profissionais = this.profissionais.filter(p => profissional.profissionalId !== p.profissionalId)
      }
    })
  }

  hideDialog() {
    this.cidadesDropwdownIsDisabled = true
    this.profissionalDialogIsVisible = false
    this.submitted = false
  }

  upsertProfissional() {
    this.upsertProfissionalObj.estabelecimentos = this.selectedEstabelecimentos
    this.submitted = true

    if (!this.upsertProfissionalObj.endereco.cidade) {
      this.messageService.add({severity: 'error', summary: 'Campo não preenchido', detail: 'O campo cidade não foi preenchido'})
    }

    if (!this.upsertProfissionalObj.endereco.estado) {
      this.messageService.add({severity: 'error', summary: 'Campo não preenchido', detail: 'O campo estado não foi preenchido'})
    }

    if (
      this.upsertProfissionalObj.celular          &&
      this.upsertProfissionalObj.residencial      &&
      this.upsertProfissionalObj.funcao           &&
      this.upsertProfissionalObj.nome             &&
      this.upsertProfissionalObj.endereco         &&
      this.upsertProfissionalObj.endereco.bairro  &&
      this.upsertProfissionalObj.endereco.cidade  &&
      this.upsertProfissionalObj.endereco.estado  &&
      this.upsertProfissionalObj.endereco.numCasa &&
      this.upsertProfissionalObj.endereco.rua     &&
      this.upsertProfissionalObj.estabelecimentos
    ) {
      this.profissionalService.upsert(this.upsertProfissionalObj)
        .subscribe(resp => {
          this.messageService.add({severity: resp.feedback.type, summary: resp.feedback.message, detail: resp.feedback.detail})
          this.loadProfissionais()
        })
        this.hideDialog()
      }
  }

}
