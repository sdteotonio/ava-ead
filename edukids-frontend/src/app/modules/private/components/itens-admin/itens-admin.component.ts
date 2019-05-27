import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itens-admin',
  templateUrl: './itens-admin.component.html',
  styleUrls: ['./itens-admin.component.css']
})
export class ItensAdminComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }


  cadastrarProfessor() {
    this.router.navigate(['private/manter-professor']);
  }

}
