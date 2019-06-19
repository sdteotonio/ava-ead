import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-curso',
  templateUrl: './area-curso.component.html',
  styleUrls: ['./area-curso.component.css']
})
export class AreaCursoComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  solicitarTurma() {
    sessionStorage.removeItem('ID_TURMA');
    this.router.navigate(['/area-aluno']);
  }

}
