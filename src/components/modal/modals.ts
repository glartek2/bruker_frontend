import { useState } from 'react';
import { Info } from './InfoModal';

export const editAcceptedModalId = 'edit_accepted_modal';
export const reserveEmptyModalId = 'reverse_empty_modal';
export const bulkReserveModalId = 'bulk-reserve-modal';
export const viewAcceptedModalId = 'view_accepted_modal';
export const viewProposedModalId = 'view_proposed_modal';
export const badCredentialsModalId = 'bad_credentials_modal';

export function showModal(id: string) {
  const dialog = document.getElementById(id) as HTMLDialogElement;
  dialog?.showModal();
}

export const defaultInfo: Info = {
  type: 'info',
  header: '',
  message: '',
} satisfies Info;

export function useInfo(id: string): [Info, (info: Info) => void] {
  const [info, setInfo] = useState<Info>(defaultInfo);

  function emitInfo(info: Info) {
    setInfo(info);
    showModal(id);
  }

  return [info, emitInfo];
}
