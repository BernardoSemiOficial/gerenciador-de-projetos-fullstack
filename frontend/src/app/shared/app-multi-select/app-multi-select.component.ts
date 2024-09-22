/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, forwardRef, Input, input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [MultiSelectModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppMultiSelectComponent),
      multi: true,
    },
  ],
  templateUrl: './app-multi-select.component.html',
  styleUrl: './app-multi-select.component.scss',
})
export class AppMultiSelectComponent implements ControlValueAccessor {
  @Input({ required: true }) options: unknown[] = [];
  @Input({ required: true }) id = '';
  @Input({ required: true }) optionLabel = '';
  @Input({ required: true }) optionValue = '';
  inputType = input<HTMLInputElement['type']>('text');
  placeholder = input<HTMLInputElement['placeholder']>();
  value: object = {};
  isDisabled = false;

  onChange = (_: unknown) => {};
  onTouched = () => {};

  writeValue(value: object): void {
    if (value !== this.value) {
      this.value = value;
    }
  }
  registerOnChange(fn: (_: unknown) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
