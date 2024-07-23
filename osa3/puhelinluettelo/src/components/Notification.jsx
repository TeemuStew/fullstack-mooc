const Notification = ({ notification }) => {
    if (['', undefined, null].includes(notification['message'])) {
      return null
    }
  
    return (
      <div className={`note ${notification['success'] ? "success" : "error"}`}>
        {notification['message']}
      </div>
    )
  }

  export default Notification