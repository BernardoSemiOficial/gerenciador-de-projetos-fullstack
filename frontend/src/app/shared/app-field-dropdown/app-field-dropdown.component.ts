import { Component, forwardRef, Input, input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-field-dropdown',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppFieldDropdownComponent),
      multi: true,
    },
  ],
  templateUrl: './app-field-dropdown.component.html',
  styleUrl: './app-field-dropdown.component.scss',
})
export class AppFieldDropdownComponent implements ControlValueAccessor {
  @Input({ required: true }) fieldId: string = '';
  @Input({ required: true }) fieldLabel: string = '';
  @Input({ required: true }) fieldInputHelp: string = '';
  @Input({ required: true }) options: any[] = [];
  optionLabel = input<string>('');
  optionValue = input<string>('');
  placeholder = input<string>('');
  isDisabled = false;
  fieldInputValue: string | number = '';

  _onChange = (_: any) => {};
  _onTouched = () => {};

  writeValue(value: any): void {
    if (value !== this.fieldInputValue) {
      this.fieldInputValue = value;
    }
  }
  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
