import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { userContext } from '../../App';
import { Send } from 'lucide-react';
import axios from 'axios';

const Chat = () => {
  const { projectId, projectOwner } = useParams();
  const { udata } = useContext(userContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/chat/${projectId}`);
        setMessages(response.data);
        setLoading(false);
        
        // Mark messages as read
        if (response.data.length > 0) {
          await axios.put(`http://localhost:9000/api/chat/${projectId}/read`, {
            recipient: udata.username
          });
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setLoading(false);
      }
    };

    const interval = setInterval(fetchMessages, 5000); // Poll every 5 seconds
    fetchMessages(); // Initial fetch

    return () => clearInterval(interval); // Cleanup on unmount
  }, [projectId, udata.username]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(`http://localhost:9000/api/chat/${projectId}`, {
        content: newMessage,
        sender: udata.username,
        recipient: projectOwner
      });

      setMessages(prev => [...prev, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Chat with {projectOwner}</h5>
          <span className="text-muted">Project Chat</span>
        </div>
        
        <div className="card-body">
          <div style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
            {/* Messages container */}
            <div className="overflow-auto mb-3" style={{ flex: 1 }}>
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`d-flex mb-3 ${
                    message.sender === udata.username ? 'justify-content-end' : 'justify-content-start'
                  }`}
                >
                  <div
                    className={`rounded p-3 ${
                      message.sender === udata.username
                        ? 'bg-primary text-white'
                        : 'bg-light'
                    }`}
                    style={{ maxWidth: '70%' }}
                  >
                    <div className="small fw-bold mb-1">{message.sender}</div>
                    <div>{message.content}</div>
                    <div className="small opacity-75 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                      {message.sender === udata.username && (
                        <span className="ms-2">
                          {message.read ? '✓✓' : '✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
              />
              <button
                className="btn btn-primary d-flex align-items-center"
                onClick={handleSendMessage}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;