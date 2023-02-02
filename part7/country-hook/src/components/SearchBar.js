const SearchBar = ({ value, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange} />
      <button>find</button>
    </form>
  );
};

export default SearchBar;
