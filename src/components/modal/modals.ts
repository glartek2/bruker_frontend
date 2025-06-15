export const editAcceptedModalId = 'edit_accepted_modal';
export const reserveEmptyModalId = 'reverse_empty_modal';
export const viewAcceptedModalId = 'view_accepted_modal';
export const viewProposedModalId = 'view_proposed_modal';
export const badCredentialsModalId = 'bad_credentials_modal';

export function showModal(id: string) {
  const dialog = document.getElementById(id) as HTMLDialogElement;
  dialog?.showModal();
}
