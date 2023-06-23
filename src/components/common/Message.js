import React, {useEffect, useState} from 'react';
import './css/Message.css'


const Message = () => {
    const [messages, setMessages] = useState([
        { id: 1, content: '안녕하세요!', sender: 'sent' },
        { id: 2, content: '안녕하세요! 어떤 도움이 필요하신가요?', sender: 'received' }
    ]);

    const [newMessage, setNewMessage] = useState('');

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const newId = messages.length + 1;
            const newMessageObj = { id: newId, content: newMessage, sender: 'sent' };
            setMessages([...messages, newMessageObj]);
            setNewMessage('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div>
            <div className="chat-container">
                {messages.map((message) => (
                    <div key={message.id} className={`message ${message.sender}`}>
                        <span>{message.content}</span>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="메시지를 입력하세요"
                    value={newMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleSendMessage}>보내기</button>
            </div>
        </div>
    );
};

export default Message;
