import CloseIcon from '@mui/icons-material/Close';

function CloseModal() {
  return (
    <form>
      <button
        className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
        formMethod='dialog'
      >
        <CloseIcon />
      </button>
    </form>
  );
}

export default CloseModal;
