import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-modal-video',
  templateUrl: './modal-video.component.html',
  styleUrls: ['./modal-video.component.css']
})
export class ModalVideoComponent implements AfterViewInit {
  titulo: string;
  iFrame: any;
  constructor(
    private bsModal: BsModalRef
  ) { }

  ngAfterViewInit(): void {
    const iFrames = document.getElementsByTagName('iframe');
    iFrames[0].style.width = '100%';
    iFrames[0].style.height = '400px';
  }

  fechar() {
    this.bsModal.hide();
  }

}
