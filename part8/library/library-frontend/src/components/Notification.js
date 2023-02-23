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
const Notification = ({ message, severity }) => {
  let style;
  if (severity === "info") {
    style = {
      border: "2 #007700",
      background: "#7d777d",
      padding: 5,
    };
  } else {
    style = {
      border: "2 #770000",
      background: "#777d7d",
      padding: 5,
    };
  }

  return <div style={style}>{message}</div>;
};
