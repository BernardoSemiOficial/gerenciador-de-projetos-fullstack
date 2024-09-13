import { FormControl } from '@angular/forms';

export type CreateProjectForm = {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  starts_at: FormControl<Date | null>;
  ends_at: FormControl<Date | null>;
};
