import React, { useState } from 'react';
import { Input } from '../../../../utilComponents';

interface IMessageInputProps {
    sendMessage: (message: string) => void;
}

function MessagingInput(props: IMessageInputProps): JSX.Element {
    const { sendMessage } = props;
    const [message, setMessage] = useState('');

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setMessage(e.target.value);
    };

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    };

    return (
        <div>
            <form onSubmit={handleSendMessage}>
                <Input required value={message} onChange={handleMessageChange} />
                <button type="submit">send</button>
            </form>
        </div>
    );
}

export default MessagingInput;
