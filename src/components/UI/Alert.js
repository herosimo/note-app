import React, { useEffect, useState } from "react";

const Alert = ({ message }) => {
    const [open, setOpen] = useState();

    // Close alert handler
    // SetOpen to false
    const closeAlertHandler = () => {
        setOpen();
    };

    // Will set the alert for timeout time (3000ms), and then dissappear
    useEffect(() => {
        setOpen(message);
        setTimeout(() => {
            setOpen();
        }, 3000);
        return () => clearTimeout(alert);
    }, [message]);

    let content;
    if (open) {
        // Set alert type and message
        let messageContent, messageClass;
        if (message === "save") {
            messageContent = "Saved successfully!";
            messageClass = "alert alert-success alert-dismissible fade show";
        } else if (message === "delete") {
            messageContent = "Deleted successfully!";
            messageClass = "alert alert-warning alert-dismissible fade show";
        } else if (message === "error") {
            messageContent = "Something went wrong!";
            messageClass = "alert alert-danger alert-dismissible fade show";
        }

        content = (
            <div className={messageClass} role="alert">
                {messageContent}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true" onClick={closeAlertHandler}>
                        &times;
                    </span>
                </button>
            </div>
        );
    }
    return <div>{content}</div>;
};

export default Alert;
