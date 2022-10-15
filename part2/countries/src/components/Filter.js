const Filter = (props) => {
  const { value, onChange } = props;
  return (
    <div>
      find countries <input value={value} onChange={onChange} />
    </div>
  );
};

export default Filter;
