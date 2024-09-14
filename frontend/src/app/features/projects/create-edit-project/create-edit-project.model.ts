import { FormControl } from '@angular/forms';

export type CreateEditProjectForm = {
  name: FormControl<string>;
  description: FormControl<string>;
  starts_at: FormControl<Date>;
  ends_at: FormControl<Date>;
};
