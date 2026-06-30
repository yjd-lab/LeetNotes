function SearchBar(props) {
  
  return (

    <input
      type="text"
      placeholder={props.placeholder}
      value={props.search}
      onChange={(e) =>
        props.setSearch(e.target.value)
      }
    />

  );
}

export default SearchBar;