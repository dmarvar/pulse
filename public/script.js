// Get the title from script tag before anything else
const scriptTag = document.currentScript;
const defaultTitle = scriptTag?.dataset?.title || 'Assistant PulseOS';

class MyChatbot extends HTMLElement {
    constructor() {
      super();
      const title = this.getAttribute('title') || defaultTitle;
      this.attachShadow({ mode: 'open' });
      this.sessions = [
        { id: 'today', name: "Aujourd'hui", messages: [] },
        { id: 'intro', name: 'Nouvelle Introduction', messages: [] },
        { id: 'greeting', name: 'Accueil', messages: [] },
        { id: 'greeting', name: 'Accueil', messages: [] },
        { id: 'greeting', name: 'Accueil', messages: [] },
        { id: 'greeting', name: 'Accueil', messages: [] },
        { id: 'greeting', name: 'Accueil', messages: [] },
        { id: 'greeting', name: 'Accueil', messages: [] },
        { id: 'greeting', name: 'Accueil', messages: [] },
        { id: 'greeting', name: 'Accueil', messages: [] },
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
          background: #0052CC;
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

        .sessions-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sessions-title {
          font-size: 0.9em;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
        }

        .sessions-list.active {
          transform: translateX(0);
        }

        /* Custom subtle scrollbar styles for .sessions-list */
        .sessions-list::-webkit-scrollbar {
          width: 6px;
        }

        .sessions-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .sessions-list::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .sessions-list:hover::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
        }

        .sessions-list {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
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
          background: #FF991F;
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
          background: #0052CC;
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
          background: #0065FF;
          transform: translateY(-1px);
        }
  
        .chat-toggle {
          position: fixed;
          bottom: var(--md-sys-spacing-medium, 20px);
          right: var(--md-sys-spacing-medium, 20px);
          background: #E5EDFF;
          color: var(--md-sys-color-on-primary, white);
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          font-size: 30px;
          cursor: pointer;
          z-index: 1000;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 82, 204, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-toggle:hover {
          background: #E5EDFF;
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0, 82, 204, 0.3);
        }

        .chat-toggle:focus {
          outline: 2px solid #0052CC;
          outline-offset: 2px;
          box-shadow: none;
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

        .close-chat {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          color: white;
          border: none;
          font-size: 24px;
          cursor: pointer;
          line-height: 1;
        }

        .new-session-btn {
          background: #0052CC;
          color: white;
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          padding: 0;
          line-height: 1;
        }

        .new-session-btn:hover {
          background: #0065FF;
          transform: translateY(-1px);
        }
      `;
      // Mobile responsiveness
      style.textContent += `
      @media (max-width: 480px) {
        .chat-container {
          width: 100vw;
          height: 100vh;
          bottom: 0;
          right: 0;
          border-radius: 0;
        }

        .chat-input button {
          min-width: auto;
          padding: 12px;
          font-size: 1em;
        }

        .chat-input {
          padding: 10px;
        }

        .chat-input input {
          padding: 12px;
        }

        .chat-toggle {
          width: 50px;
          height: 50px;
          font-size: 24px;
        }

        .toggle-sessions {
          width: 28px;
          height: 28px;
          font-size: 18px;
        }

        .header-title {
          font-size: 1.2em;
        }
      }
      `;
  
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <div class="chat-container">
          <div class="chat-header">
            <button class="toggle-sessions">+</button>
            <span class="header-title">${title}</span>
            <button class="close-chat" title="Fermer">×</button>
          </div>
          <div class="sessions-list">
            <div class="sessions-header">
              <div class="sessions-title">Sessions</div>
              <button class="new-session-btn">+</button>
            </div>
            ${this.sessions.map(session => `
              <div class="session-item" data-session-id="${session.id}">
                ${session.name}
              </div>
            `).join('')}
            <div class="end-history">Vous avez atteint la fin de votre historique de chat.</div>
          </div>
          <div class="overlay"></div>
          <div class="chat-body" id="chatBody">
            <div><strong>Bot:</strong> Bonjour! Comment puis-je vous aider?</div>
          </div>
          <div class="chat-input">
            <input type="text" id="chatInput" placeholder="Tapez un message..." />
            <button id="sendBtn">Envoyer</button>
          </div>
        </div>
        <button class="chat-toggle"><img src="Avatar.svg" alt="Chat" width="24" height="24"/></button>
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
      const closeBtn = this.shadowRoot.querySelector('.close-chat');
      const newSessionBtn = this.shadowRoot.querySelector('.new-session-btn');

      toggle.addEventListener('click', () => {
        chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
        // Responsive toggle button behavior
        if (window.innerWidth <= 480) {
          toggle.style.display = 'none';
        } else {
          toggle.style.zIndex = '1';
        }
      });

      closeBtn.addEventListener('click', () => {
        chat.style.display = 'none';
        toggle.style.display = 'flex';
        toggle.style.zIndex = '1000';
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
          chatBody.innerHTML += `<div><strong>Vous:</strong> ${msg}</div>`;
          chatInput.value = '';
          setTimeout(() => {
            chatBody.innerHTML += `<div><strong>Bot:</strong> Ceci est une réponse automatique.</div>`;
          }, 500);
        }
      });

      chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          sendBtn.click();
        }
      });

      // Add new session functionality
      newSessionBtn.addEventListener('click', () => {
        const sessionId = 'session-' + Date.now();
        const newSession = {
          id: sessionId,
          name: 'Nouvelle Session ' + (this.sessions.length + 1),
          messages: []
        };
        
        this.sessions.unshift(newSession);
        this.currentSession = newSession;

        // Create and insert new session element
        const sessionElement = document.createElement('div');
        sessionElement.className = 'session-item';
        sessionElement.dataset.sessionId = sessionId;
        sessionElement.textContent = newSession.name;

        // Insert after the new session button
        const firstSession = sessionsList.querySelector('.session-item');
        if (firstSession) {
          sessionsList.insertBefore(sessionElement, firstSession);
        } else {
          sessionsList.insertBefore(sessionElement, sessionsList.querySelector('.end-history'));
        }

        // Add click handler to new session
        sessionElement.addEventListener('click', () => {
          this.currentSession = newSession;
          sessionsList.classList.remove('active');
          toggleSessions.classList.remove('active');
          overlay.classList.remove('active');
          
          // Remove active class from all items
          this.shadowRoot.querySelectorAll('.session-item').forEach(si => si.classList.remove('active'));
          // Add active class to clicked item
          sessionElement.classList.add('active');
        });

        // Clear chat body and add welcome message
        chatBody.innerHTML = '<div><strong>Bot:</strong> Bonjour! Comment puis-je vous aider?</div>';
        
        // Activate the new session
        sessionElement.click();
      });
    }
  }
  
customElements.define('my-chat', MyChatbot);
  
// Auto-insert into the page
const existing = document.querySelector('my-chat');
if (!existing) {
  const chatbot = document.createElement('my-chat');
  chatbot.setAttribute('title', defaultTitle);
  document.body.appendChild(chatbot);
}