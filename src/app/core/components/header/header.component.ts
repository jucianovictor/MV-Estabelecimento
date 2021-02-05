import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuItems: MenuItem[];

  filteredPages: string[]
  selectedValue: string

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Profissional',
        icon: 'pi pi-user',
        url: '/'
      },
      {
        label: 'Estabelecimento',
        icon: 'pi pi-briefcase',
        url: '/estabelecimento'
      }
    ];
  }

  search(event: { query: string }) {
    this.filteredPages = this.menuItems.map(m => m.label).filter(l => l.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()))
  }
}
