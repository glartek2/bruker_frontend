import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  return (
    <label className='input w-full'>
      <SearchIcon className='text-gray-400' />
      <input type='search' required placeholder='...' />
    </label>
  );
}

export default SearchBar;
