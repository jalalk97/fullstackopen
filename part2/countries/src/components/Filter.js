const Filter = (props) => {
  const { filter, onChange, onFocus } = props;
  return (
    <div>
      find countries{" "}
      <input value={filter} onChange={onChange} />
    </div>
  );
};

export default Filter;
