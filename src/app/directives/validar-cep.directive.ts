import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ConsultaCepService } from '../service/consulta-cep.service';

@Directive({
  selector: '[validarCepValidator]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: ValidarCepDirective,
    multi: true
  }]
})
export class ValidarCepDirective implements AsyncValidator {

  constructor(private serviceConsultaCep: ConsultaCepService) { }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const cep = control.value;
    return this.serviceConsultaCep.getConsultaCep(cep).pipe(map(
      (resp: any) => resp.erro ? {'validadorCep': true} : null
    ));
  }
}
