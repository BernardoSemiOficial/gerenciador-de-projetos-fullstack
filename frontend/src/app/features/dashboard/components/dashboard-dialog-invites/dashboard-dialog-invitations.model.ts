import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type InvitationFormArray = FormArray<
  FormGroup<{
    email: FormControl<string>;
    projectsId: FormControl<string[]>;
  }>
>;

export type SendInvitationsForm = {
  invitations: InvitationFormArray;
};
