export interface DialogConfirmation {
  title: string;
  description: string;
  icon: string;
  acceptCallback: () => void;
  rejectCallback?: () => void;
}
