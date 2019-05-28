import { Pipe, PipeTransform } from '@angular/core';
import { TipoUsuarioEnumMensagem } from '../../shared-models/enum/tipo-usuario.enum';

@Pipe({
  name: 'tipoUsuarioTradutor'
})
export class TipoUsuarioTradutorPipe implements PipeTransform {

  transform(value: any): any {
    return TipoUsuarioEnumMensagem[value];
  }

}
