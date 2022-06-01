import React from 'react';

interface IMessageProps {
    author: string;
    rank: string;
    text: string;
    timestamp: Date;
}

function Message(props: IMessageProps): JSX.Element {
    const { author, rank, text, timestamp } = props;

    return (
        <div>
            <span>[{rank}]</span>
            <span> {author}</span>
            <p>{text}</p>
            <span>{timestamp.toLocaleTimeString()}</span>
        </div>
    );
}

export default Message;
