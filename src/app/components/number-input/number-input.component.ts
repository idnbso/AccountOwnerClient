import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { formatNumber } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true
    }
  ]
})
export class NumberInputComponent implements ControlValueAccessor {
    @Input() disabled = false;
    @Input() isPositiveOnly = false;
    @ViewChild('inputElement') inputElement: ElementRef;

    private validInput: string;
    public inputValue: string;

    public isPeriodExists = false;
    public isMinusExists = false;

    constructor() { }

    get value(): number | null {
        return this.inputValue ? Number(this.inputValue.replace(/[^\d.-]/g, '')) : null;
    }

    setInputValue(value: string): void {
        const selectionStart = this.inputElement.nativeElement.selectionStart;
        const previousTotalCommas = (this.inputValue.match(/,/g) || []).length;
        setTimeout(() => {
            this.inputValue = value;
            this.validInput = value;
            const currentTotalCommas = (this.inputValue.match(/,/g) || []).length;
            setTimeout(() => {
                const caretPosition = currentTotalCommas > previousTotalCommas ? selectionStart + 1 : selectionStart;
                this.inputElement.nativeElement.setSelectionRange(caretPosition, caretPosition);
            });
        });
    }

    /* Event Handlers - Start */
    onChange = (value: number) => {};
    onTouched = () => {};
    public onInput($event): void {
        const validInputCharactersRegex = /[^\d.-]/g;
        const inputCharacter: string = $event.data;

        if (!inputCharacter) {
            this.setFormattedInput(this.value);
            return;
        }

        const isPeriodInputInvalid = inputCharacter === '.' && this.isPeriodExists;
        const isMinusInputInvalid = inputCharacter === '-' && (this.isPositiveOnly || this.isMinusExists || this.inputValue.length > 1);
        const isGeneralInputInvalid = validInputCharactersRegex.test(inputCharacter);
        if (isPeriodInputInvalid || isMinusInputInvalid || isGeneralInputInvalid) {
                this.setInputValue(this.validInput);
                return;
        }

        if (inputCharacter === '.' && !this.isPeriodExists) {
            this.isPeriodExists = true;
            return;
        }

        if (inputCharacter === '-' && !this.isMinusExists) {
            this.isMinusExists = true;
            return;
        }

        this.setFormattedInput(this.value);
    }

    /* Event Handlers - End */

    /* Angular Control Value Accessors - Start */

    // Update the model and changes needed for the view here.
    writeValue(value: number): void {
        if (!value && value !== 0) { return; }

        this.setFormattedInput(value);
        this.onChange(this.value);
    }

    // Allows Angular to register a function to call when the model (number value) changes.
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    // Allows Angular to register a function to call when the input has been touched.
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    // Allows Angular to disable the input.
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /* Angular Control Value Accessors - End */

    /* Input Logic */
    private setFormattedInput(value: number): void {
        this.setInputValue(formatNumber(value, 'en', '1.0-2'));
        this.onChange(this.value);
    }
}
