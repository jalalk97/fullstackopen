import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const notificationReducer = (state, action) => {
    switch (action.type) {
      case "SHOW":
        return action.payload;
      case "HIDE":
        return null;
      default:
        return state;
    }
  };

  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext);
  return notification;
};

export const useNotificationDispatch = () => {
  const [, dispatch] = useContext(NotificationContext);
  return dispatch;
};

export default NotificationContext;
