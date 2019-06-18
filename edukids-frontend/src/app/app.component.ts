import { AfterViewInit, Component } from '@angular/core';
import * as AOS from 'aos';
import * as $ from 'jquery';
import { BsLocaleService } from 'ngx-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(private localeService: BsLocaleService) {

  }

  ngAfterViewInit(): void {
    this.localeService.use('pt-br');
    $(document).ready(function () {
      AOS.init();

      (function () {

        if (!('requestAnimationFrame' in window)) { return; }
        if (/Mobile|Android/.test(navigator.userAgent)) { return; }

        const backgrounds = [];

        $('[data-bs-parallax-bg]').each(function () {
          const el = $(this);
          const bg = $('<div>');

          bg.css({
            backgroundImage: el.css('background-image'),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            height: '200%',
            width: '100%',
            top: 0, left: 0,
            zIndex: -100
          });

          bg.appendTo(el);
          backgrounds.push(bg[0]);

          el.css({
            position: 'relative',
            background: 'transparent',
            overflow: 'hidden',
          });
        });

        if (!backgrounds.length) { return; }

        const visible = [];
        let scheduled;

        $(window).on('scroll resize', scroll);

        scroll();

        function scroll() {

          visible.length = 0;

          for (let i = 0; i < backgrounds.length; i++) {
            const rect = backgrounds[i].parentNode.getBoundingClientRect();

            if (rect.bottom > 0 && rect.top < window.innerHeight) {
              visible.push({
                rect: rect,
                node: backgrounds[i]
              });
            }

          }

          cancelAnimationFrame(scheduled);

          if (visible.length) {
            scheduled = requestAnimationFrame(update);
          }

        }

        function update() {

          for (let i = 0; i < visible.length; i++) {
            const rect = visible[i].rect;
            const node = visible[i].node;

            const quot = Math.max(rect.bottom, 0) / (window.innerHeight + rect.height);

            node.style.transform = 'translate3d(0, ' + (-50 * quot) + '%, 0)';
          }

        }

      })();
    });
  }
}
