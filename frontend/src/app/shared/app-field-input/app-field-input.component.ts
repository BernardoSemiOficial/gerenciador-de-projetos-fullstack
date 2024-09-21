import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  Input,
  input,
  InputSignal,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgModel,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-field-input',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppFieldInputComponent),
      multi: true,
    },
  ],
  templateUrl: './app-field-input.component.html',
  styleUrl: './app-field-input.component.scss',
})
export class AppFieldInputComponent implements ControlValueAccessor {
  formControlField:
    | InputSignal<NgModel>
    | InputSignal<AbstractControl>
    | InputSignal<null> = input(null);
  @Input({ required: true }) fieldId: string = '';
  @Input({ required: true }) fieldLabel: string = '';
  @Input({ required: true }) fieldInputHelp: string = '';
  fieldInputType = input<HTMLInputElement['type']>('text');
  fieldInputValue: string | number = '';
  isDisabled: boolean = false;

  analyticsFormControl() {
    const formControl = this.formControlField();
    const errors = formControl?.errors;
    const errorsKey = Object.keys(errors ?? {});

    return {
      errorsLength: errorsKey.length,
      errorKey: errorsKey[0],
      status: formControl?.status?.toLowerCase() ?? '',
    };
  }

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
