import { Component, forwardRef, input } from '@angular/core';
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
  options = input.required<any[]>();
  id = input.required<string>();
  optionLabel = input.required<string>();
  optionValue = input.required<string>();
  inputType = input<HTMLInputElement['type']>('text');
  placeholder = input<HTMLInputElement['placeholder']>();
  value: any;
  isDisabled: boolean = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    if (value !== this.value) {
      this.value = value;
    }
  }
  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
