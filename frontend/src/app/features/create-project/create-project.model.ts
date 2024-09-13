import { FormControl } from '@angular/forms';

export type CreateProjectForm = {
  name: FormControl<string>;
  description: FormControl<string>;
  starts_at: FormControl<Date>;
  ends_at: FormControl<Date>;
};
