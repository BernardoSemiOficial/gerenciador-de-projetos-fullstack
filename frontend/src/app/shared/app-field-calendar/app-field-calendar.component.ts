import { Component, forwardRef, Input, input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-field-calendar',
  standalone: true,
  imports: [CalendarModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppFieldCalendarComponent),
      multi: true,
    },
  ],
  templateUrl: './app-field-calendar.component.html',
  styleUrl: './app-field-calendar.component.scss',
})
export class AppFieldCalendarComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) fieldId: string = '';
  @Input({ required: true }) fieldLabel: string = '';
  @Input({ required: true }) fieldInputHelp: string = '';
  fieldInputFormat = input<string>('dd/mm/yy');
  isShowIcon = input<boolean>(true);
  isShowOnFocus = input<boolean>(true);
  fieldInputValue: string | number = '';
  isDisabled: boolean = false;
  isShowButtonBar: boolean = true;
  minDate = input<Date>(new Date());

  ngOnInit() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const currentMonth = month === 0 ? 11 : month;
    const currentYear = currentMonth === 11 ? year - 1 : year;
    this.minDate().setHours(0, 0, 0, 0);
    this.minDate().setMonth(currentMonth);
    this.minDate().setFullYear(currentYear);
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
