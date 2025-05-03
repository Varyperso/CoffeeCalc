import { useEffect, useRef, useState } from 'react'
import styles from './chat.module.css'
import Svgs from '../svg/Svgs'
import UserCard from '../Components/User/UserCard'
import Button from '../Components/UI/Button'
import { myFetch } from '../utils/myFetch'
import { useUserData } from '../context/UserContext'
import { useUsersData } from '../context/UsersContext'

//prettier-ignore
export default function Chat() {

  const [toggle, setToggle] = useState(false); // toggle = chat sidebar width
  const [messages, setMessages] = useState([]); // all messages in chat
  const [privateChat, setPrivateChat] = useState(null); // the user we are chatting with
 
  const { users, setUsers } = useUsersData(); 
  const { user } = useUserData()

  const inputRef = useRef(null);
  const ws = useRef(null); // web socket
  const containerRef = useRef(null); // auto scroll element

  function resizeHandler() {
    setToggle(prev => !prev);
  }
  
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await myFetch({ url: `http://localhost:5000/users` });
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  useEffect(() => {

    if (privateChat) ws.current = new WebSocket(`ws://localhost:8080/private/${privateChat}`);
    else ws.current = new WebSocket('ws://localhost:8080');
    
    ws.current.onopen = () => {
      console.log(privateChat, "opened chat");
      
      if (user && user._id) {
        const handshakeData = {
          event: 'handshake',
          userId: user._id,
          privateChat: privateChat ? privateChat : null,
        };
        ws.current.send(JSON.stringify(handshakeData));     
      }
    };

    ws.current.onclose = () => {
      console.log("chat closed");
    }

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.event === 'history') {
        const messages = data.messages
        console.log('Historical messages:', messages)
        setMessages(messages);
      }
    
      if (data.event === 'newMessage') {
        const newMessage = data.message
        console.log('New message:', newMessage)
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [privateChat]);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    const inputValue = inputRef.current.value; 
    if (inputValue.trim() !== '') {
      const messageData = {
        userId: user._id,
        content: inputValue,
        event: 'message',
      };

      if (privateChat) messageData.privateChat = privateChat
      
      ws.current.send(JSON.stringify(messageData));
      inputRef.current.value = "";
    }
  };

  const startPrivateChat = (selectedUser) => {
    setMessages([])
    setPrivateChat(selectedUser);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage(); 
      event.preventDefault(); 
    }
  };

  const backToGeneralChat = () => {
    setMessages([])
    setPrivateChat(null)
  }

  console.log(messages);
  
  let privateChatWith;
  if (privateChat) privateChatWith = users.find((user) => privateChat === user._id)
  
  return (
    <div className={`${styles.parentGrid} ${toggle && styles.resize}`} >
      <header className={styles.gridHeader}>
       {privateChat ? <h2 style={{fontSize:"1.75rem"}}> Chatting With <span style={{color:"var(--my-purple)", fontSize:"2.5rem"}}>{privateChatWith.user}</span> </h2> : <h2 style={{fontSize:"1.75rem"}}> Global Chat Room </h2>}
      </header>
      <aside className={styles.gridSidebar}>
        <div className={styles.logo}> <Svgs name="chatUsers-icon"/> </div>
        <button type="button" onClick={resizeHandler}>
          { toggle ? <Svgs name="leftSidebarChat-icon"/> : <Svgs name="rightSidebarChat-icon"/> }
        </button> <br />
        {users?.map((user) => <UserCard key={user._id} toggle={toggle} user={user} chat={startPrivateChat} /> )}
      </aside>
      <main className={styles.gridMain} ref={containerRef}>
      {messages.map((msg) => {
        const chatUser = users.find(user => user._id === msg.userId);
        return (
          <div key={msg._id} className={styles.chat__line}>
            {chatUser && <img src={chatUser.avatar} alt="User Avatar" className={styles.chat__image} />}
            <strong className={msg.userId === user._id ? styles.chat__username__me : styles.chat__username}> {chatUser?.user} </strong>: {msg.message}
          </div>
        );
      })}
      </main>
      <footer className={styles.gridFooter}>
      <div className={styles.input__wrapper}>
        <Button handler={sendMessage}> Send </Button>
        <input type="text" ref={inputRef} onKeyDown={handleKeyPress} placeholder="message..." className={`input__one ${styles.chat__input}`}/>
        <Button handler={backToGeneralChat}> Back To Global Chat </Button>
      </div>
      </footer>
    </div>
  );
}
