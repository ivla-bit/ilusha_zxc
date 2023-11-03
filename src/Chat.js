import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Chat() {
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [newChatName, setNewChatName] = useState('');

  const styles = {
    backLink: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
    },
    arrowIcon: {
      width: '20px', 
      height: '20px',
      marginRight: '5px', 
      background: 'none', 
      border: 'none', 
    },
  };

  const chatContainerStyle = {
    display: 'flex',
    height: '100vh',
  };

  const chatSidebarStyle = {
    flex: '1',
    borderRight: '1px solid #ccc',
    display: 'flex',
    flexDirection: 'column',
  };

  const chatHeaderStyle = {
    padding: '20px',
    backgroundColor: '#2f4f4f',
    color: '#fff',
    fontSize: '20px',
  };

  const newChatButtonStyle = {
    background: 'transparent',
    border: 'none',
    color: '#3498db',
    cursor: 'pointer',
    padding: '10px',
    fontSize: '16px',
  };

  const chatContentStyle = {
    flex: '2',
    display: 'flex',
    flexDirection: 'column',
  };

  const chatListStyle = {
    flex: '1',
    overflowY: 'auto',
  };

  const chatListItemStyle = {
    padding: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const chatListItemHoverStyle = {
    backgroundColor: '#f0f0f0',
  };

  const chatMessagesStyle = {
    flex: '1',
    padding: '20px',
    overflowY: 'auto',
  };

  const messageStyle = {
    margin: '10px',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '16px',
  };

  const userMessageStyle = {
    backgroundColor: '#3498db',
    color: '#fff',
    alignSelf: 'flex-end',
  };

  const botMessageStyle = {
    backgroundColor: '#f0f0f0',
    color: '#000',
  };

  const messageTextStyle = {
    margin: '0',
  };

  const messageInputStyle = {
    display: 'flex',
    borderTop: '1px solid #ccc',
    padding: '10px',
    alignItems: 'center',
  };

  const inputStyle = {
    flex: '1',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    marginRight: '10px',
    fontSize: '16px',
  };

  const sendButtonStyle = {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const handleSend = () => {
    if (newMessage.trim() === '') {
      return;
    }
  
    
    const writingMessage = {
      text: 'writing...',
      user: 'Bot',
    };
    setChats([...chats, { name: newChatName, messages: [writingMessage] }]);
  
    axios.get('http://127.0.0.1:8000/request', {
  params: {
    user_request: newMessage,
    resp_ua: true,
    req_ua: true
  }
})
  .then((response) => {
    console.log(newMessage);
    console.log(response.data);

    
    const responseText = response.data.response;


    
    const newChat = {
      name: newChatName,
      messages: [
        {
          text: newMessage,
          user: 'You',
        },
        {
          text: responseText, 
          user: 'Bot',
        },
      ],
    };

    const updatedChats = chats.slice(0, -1); 
    setChats([...updatedChats, newChat]);
    setNewMessage('');
  })
  .catch((error) => {
    console.error("Произошла ошибка при выполнении запроса:", error);
    
  });
  };
  

  

   

  const handleNewChat = () => {
    if (newChatName.trim() === '') {
      return;
    }

   
    const newChat = {
      name: newChatName,
      messages: [],
    };

   
    setChats([...chats, newChat]);

   
    setNewChatName('');
  };

  return (
    <div style={chatContainerStyle}>
      <div style={chatSidebarStyle}>
      <Link to="/dashboard65" style={styles.backLink}>
        <img src="/arrow-icon.png" alt="Назад" style={styles.arrowIcon} />
        Назад
      </Link>
        <div style={chatHeaderStyle}>Chats</div>
        
        <div style={chatListStyle}>
          {chats.map((chat, index) => (
            <div
              key={index}
              style={{
                ...chatListItemStyle,
                ...(chat.name === newChatName ? chatListItemHoverStyle : {}),
              }}
              onClick={() => setNewChatName(chat.name)}
            >
              {chat.name}
            </div>
          ))}
          <input
            type="text"
            style={inputStyle}
            placeholder="New Chat Name"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
          />
          <button style={newChatButtonStyle} onClick={handleNewChat}>
            New Chat
          </button>
        </div>
      </div>
      <div style={chatContentStyle}>
        <div style={chatMessagesStyle}>
        {chats.map((chat, index) => {
  if (chat.name === newChatName) {
    return chat.messages.map((message, msgIndex) => (
      <div
        key={msgIndex}
        style={{
          ...messageStyle,
          ...(message.user === 'Bot' ? botMessageStyle : userMessageStyle),
        }}
        dangerouslySetInnerHTML={{
          __html: message.text.replace(/\n/g, '<br/>'),
        }}
      />
    ));
  }
  return null;
})}


        </div>
        <div style={messageInputStyle}>
          <input
            type="text"
            style={inputStyle}
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button style={sendButtonStyle} onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
        }
      

export default Chat;
