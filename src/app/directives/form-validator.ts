import { AutofillMonitor } from '@angular/cdk/text-field';
import { Directive, ElementRef, Optional, Self, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, DefaultValueAccessor, RequiredValidator, Validators } from '@angular/forms';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'input:not([type=checkbox])[ngModel]',
})
export class AutofillValueAccessorDirective implements OnInit, OnDestroy {
    autofilled = false;

    constructor(
        private _autofillMonitor: AutofillMonitor,
        private _valueAccessor: DefaultValueAccessor,
        private _elementRef: ElementRef,
        @Optional() @Self() requiredValidator: RequiredValidator,
    ) {
        if (requiredValidator) {
            requiredValidator.validate = (c: AbstractControl) => {
                return requiredValidator.required && !this.autofilled ? Validators.required(c) : null;
            };
        }
    }

    ngOnInit() {
        this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe((event) => {
            this.autofilled = event.isAutofilled;
            if (this.autofilled) {
                this._valueAccessor.onChange(this._elementRef.nativeElement.value);
            }
        });
    }

    ngOnDestroy() {
        this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
}
