import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { ListboxModule } from 'primeng/listbox';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputMaskModule } from 'primeng/inputmask';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';


const angularModules = [
  FormsModule
]

const primeNgModules = [
  MenubarModule,
  SidebarModule,
  AvatarModule,
  AutoCompleteModule,
  PanelMenuModule,
  InputTextModule,
  ButtonModule,
  InputNumberModule,
  TableModule,
  ConfirmDialogModule,
  ProgressBarModule,
  ToastModule,
  SliderModule,
  MultiSelectModule,
  ContextMenuModule,
  DialogModule,
  DropdownModule,
  ToolbarModule,
  RadioButtonModule,
  ColorPickerModule,
  MessagesModule,
  MessageModule,
  InputMaskModule,
  ListboxModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...angularModules,
    ...primeNgModules
  ],
  exports: [
    ...angularModules,
    ...primeNgModules
  ],
  providers:[
    ConfirmationService,
    MessageService
  ]
})
export class SharedModule { }
