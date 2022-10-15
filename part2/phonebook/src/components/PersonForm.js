const PersonForm = (props) => {
  const { name, onNameChange, number, onNumberChange, onClick } = props;
  return (
    <form>
      <div>
        name: <input value={name} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={onClick}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
