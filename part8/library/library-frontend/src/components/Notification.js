const Notification = ({ error }) => {
  if (!error) {
    return null;
  }

  const style = {
    padding: 5,
    border: "solid #ff0000",
    color: "#770000",
  };

  return <div style={style}>{error}</div>;
};
export default Notification;
