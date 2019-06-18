import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(
        private spinnerService: NgxSpinnerService,
        private toastr: ToastrService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                document.getElementById('my-body').classList.remove('no-over');
                this.spinnerService.hide();
            } else {
                document.getElementById('my-body').classList.add('no-over');
                this.spinnerService.show();
            }
        }, (error) => {
            console.log(error);
            this.spinnerService.hide();
            this.toastr.error('Erro desconhecido, verifique o console.');
        }));
    }

}
