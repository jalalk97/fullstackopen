const Notification = ({ notification }) => {
  return (
    <>
      {notification &&
        <div className={notification.isError ? "error" : "success"}>
          {notification.message}
        </div>
      }
    </>
  )
}

export default Notification
