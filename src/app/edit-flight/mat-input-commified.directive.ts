import {Directive, ElementRef, forwardRef, HostListener, InjectionToken, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

export declare const MAT_INPUT_VALUE_ACCESSOR: InjectionToken<{
    value: any;
}>;

@Directive({
  selector: 'input[matInputCommified]',
  providers: [
    {provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: MatInputCommifiedDirective}
  ]
})
export class MatInputCommifiedDirective {

  private _value: string | null = null;

  constructor(private elementRef: ElementRef<HTMLInputElement>,
  ) {}


  get value(): string | null {
    return this._value;
  }

  @Input('value')
  set value(value: string | null) {
    this._value = value;
  }
}