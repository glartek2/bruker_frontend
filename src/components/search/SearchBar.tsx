import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ onUpdate }: SearchBarProps) {
  return (
    <label className='input text-xl w-full'>
      <SearchIcon className='text-gray-400' />
      <input
        type='search'
        onInput={event => {
          const target = event.target as HTMLInputElement;
          onUpdate(target.value);
        }}
        required
        placeholder='...'
      />
    </label>
  );
}

interface SearchBarProps {
  onUpdate: (query: string) => void;
}

export default SearchBar;
