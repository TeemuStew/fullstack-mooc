const Notification = ({ message, type }) => {
    if(message === null) {
        return null
    }
    if (type === 'success') {
        return (
            <div className="modification-success">
                {message}
            </div>
        )
    }
    if (type === 'error') {
        return (
            <div className="modification-error">
                {message}
            </div>
        )
    }
}

export default Notification