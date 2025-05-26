class MyChatbot extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.sessions = [
        { id: 'today', name: 'Today', messages: [] },
        { id: 'intro', name: 'New Chatbot Introduction', messages: [] },
        { id: 'greeting', name: 'Greeting', messages: [] }
      ];
      this.currentSession = this.sessions[0];
  
      // Styles and template
      const style = document.createElement('style');
      style.textContent = `
        .chat-container {
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 400px;
          height: 600px;
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          display: none;
          flex-direction: column;
          z-index: 1000;
          color: #fff;
          overflow: hidden;
          margin-left: 0;
          transition: margin-left 0.4s ease;
        }
  
        .chat-header {
          background: #1a1a1a;
          color: white;
          padding: 20px;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #333;
          position: relative;
          gap: 15px;
        }

        .header-title {
          font-size: 1.5em;
          font-weight: 400;
          display: flex;
          align-items: center;
          gap: 15px;
          color: rgba(255, 255, 255, 0.9);
        }

        .toggle-sessions {
          position: relative;
          background: #0b8f89;
          color: white;
          border: none;
          font-size: 20px;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          cursor: pointer;
        }

        .sessions-list {
          position: absolute;
          top: 0;
          left: 0;
          width: 300px;
          height: 100%;
          background: #232323;
          transform: translateX(-100%);
          transition: transform 0.4s ease;
          z-index: 2;
          padding: 20px;
          border-right: 1px solid #333;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sessions-list.active {
          transform: translateX(0);
        }

        .session-item {
          padding: 15px 20px;
          cursor: pointer;
          color: #fff;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          position: relative;
          font-size: 1.1em;
          line-height: 1.4;
          margin: 0 -20px;
        }

        .session-item::before {
          content: '';
          position: absolute;
          left: 0;
          width: 4px;
          height: 0;
          background: #0b8f89;
          transition: height 0.3s ease;
        }

        .session-item:hover {
          background: #2a2a2a;
        }

        .session-item:hover::before {
          height: 100%;
        }

        .session-item.active {
          background: #2a2a2a;
        }

        .chat-body {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1em;
          line-height: 1.5;
        }
  
        .chat-input {
          border-top: 1px solid #333;
          padding: 15px 20px;
          display: flex;
          gap: 12px;
          background: rgba(0, 0, 0, 0.2);
        }
  
        .chat-input input {
          flex: 1;
          padding: 15px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 1em;
          transition: all 0.3s ease;
        }

        .chat-input input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .chat-input input:focus {
          background: rgba(255, 255, 255, 0.15);
          outline: none;
        }
  
        .chat-input button {
          background: #0b8f89;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 500;
          font-size: 1.1em;
          transition: all 0.3s ease;
          min-width: 100px;
        }

        .chat-input button:hover {
          background: #0aa199;
          transform: translateY(-1px);
        }
  
        .chat-toggle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #0b8f89;
          color: white;
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          font-size: 30px;
          cursor: pointer;
          z-index: 1000;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(11, 143, 137, 0.2);
        }

        .chat-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(11, 143, 137, 0.3);
        }

        .end-history {
          color: #666;
          text-align: center;
          padding: 20px;
          font-style: italic;
          margin-top: auto;
          font-size: 0.9em;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .overlay.active {
          opacity: 1;
          pointer-events: auto;
        }
      `;
  
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <div class="chat-container">
          <div class="chat-header">
            <button class="toggle-sessions">+</button>
            <span class="header-title">Chatbot</span>
          </div>
          <div class="sessions-list">
            ${this.sessions.map(session => `
              <div class="session-item" data-session-id="${session.id}">
                ${session.name}
              </div>
            `).join('')}
            <div class="end-history">You have reached the end of your chat history.</div>
          </div>
          <div class="overlay"></div>
          <div class="chat-body" id="chatBody">
            <div><strong>Bot:</strong> Hello! How can I help you?</div>
          </div>
          <div class="chat-input">
            <input type="text" id="chatInput" placeholder="Type a message..." />
            <button id="sendBtn">Send</button>
          </div>
        </div>
        <button class="chat-toggle">💬</button>
      `;
  
      this.shadowRoot.append(style, wrapper);
    }
  
    connectedCallback() {
      const toggle = this.shadowRoot.querySelector('.chat-toggle');
      const chat = this.shadowRoot.querySelector('.chat-container');
      const sendBtn = this.shadowRoot.getElementById('sendBtn');
      const chatInput = this.shadowRoot.getElementById('chatInput');
      const chatBody = this.shadowRoot.getElementById('chatBody');
      const toggleSessions = this.shadowRoot.querySelector('.toggle-sessions');
      const sessionsList = this.shadowRoot.querySelector('.sessions-list');
      const sessionItems = this.shadowRoot.querySelectorAll('.session-item');
      const overlay = this.shadowRoot.querySelector('.overlay');

      toggle.addEventListener('click', () => {
        chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
      });

      toggleSessions.addEventListener('click', () => {
        sessionsList.classList.toggle('active');
        toggleSessions.classList.toggle('active');
        overlay.classList.toggle('active');
        // chat.classList.toggle('shifted');
      });

      overlay.addEventListener('click', () => {
        sessionsList.classList.remove('active');
        toggleSessions.classList.remove('active');
        overlay.classList.remove('active');
        // chat.classList.remove('shifted');
      });

      sessionItems.forEach(item => {
        item.addEventListener('click', () => {
          const sessionId = item.dataset.sessionId;
          this.currentSession = this.sessions.find(s => s.id === sessionId);
          sessionsList.classList.remove('active');
          toggleSessions.classList.remove('active');
          overlay.classList.remove('active');
          
          // Remove active class from all items
          sessionItems.forEach(si => si.classList.remove('active'));
          // Add active class to clicked item
          item.classList.add('active');
        });
      });
  
      document.addEventListener('click', (event) => {
        const clickedElement = event.composedPath()[0];
        const isOutside = !this.contains(clickedElement) && 
                         !this.shadowRoot.contains(clickedElement);
        
        if (isOutside && chat.style.display === 'flex') {
          chat.style.display = 'none';
        }
      });
  
      sendBtn.addEventListener('click', () => {
        const msg = chatInput.value.trim();
        if (msg) {
          chatBody.innerHTML += `<div><strong>You:</strong> ${msg}</div>`;
          chatInput.value = '';
          setTimeout(() => {
            chatBody.innerHTML += `<div><strong>Bot:</strong> This is a mock reply.</div>`;
          }, 500);
        }
      });

      chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          sendBtn.click();
        }
      });
    }
  }
  
customElements.define('my-chat', MyChatbot);
  
// Auto-insert into the page
const existing = document.querySelector('my-chat');
if (!existing) {
  const chatbot = document.createElement('my-chat');
  document.body.appendChild(chatbot);
}