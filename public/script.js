// Get the title from script tag before anything else
const scriptTag = document.currentScript;
const defaultTitle = scriptTag?.dataset?.title || 'Assistant PulseOS';

// Inline SVG assets
const AVATAR_SVG = `<svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 8.82031C3.46875 8.82031 3.82031 9.21094 3.82031 9.67969C3.82031 10.1094 3.46875 10.5 3 10.5C2.53125 10.5 2.17969 10.1094 2.17969 9.67969C2.17969 9.21094 2.53125 8.82031 3 8.82031ZM3 12.1797C3.46875 12.1797 3.82031 12.5312 3.82031 13C3.82031 13.4688 3.46875 13.8203 3 13.8203C2.53125 13.8203 2.17969 13.4688 2.17969 13C2.17969 12.5312 2.53125 12.1797 3 12.1797ZM3 5.5C3.46875 5.5 3.82031 5.89062 3.82031 6.32031C3.82031 6.78906 3.46875 7.17969 3 7.17969C2.53125 7.17969 2.17969 6.78906 2.17969 6.32031C2.17969 5.89062 2.53125 5.5 3 5.5ZM0.5 5.92969C0.734375 5.92969 0.929688 6.08594 0.929688 6.32031C0.929688 6.55469 0.734375 6.75 0.5 6.75C0.265625 6.75 0.0703125 6.55469 0.0703125 6.32031C0.0703125 6.08594 0.265625 5.92969 0.5 5.92969ZM3 2.17969C3.46875 2.17969 3.82031 2.53125 3.82031 3C3.82031 3.46875 3.46875 3.82031 3 3.82031C2.53125 3.82031 2.17969 3.46875 2.17969 3C2.17969 2.53125 2.53125 2.17969 3 2.17969ZM15.5 6.75C15.2656 6.75 15.0703 6.55469 15.0703 6.32031C15.0703 6.08594 15.2656 5.92969 15.5 5.92969C15.7344 5.92969 15.9297 6.08594 15.9297 6.32031C15.9297 6.55469 15.7344 6.75 15.5 6.75ZM9.67969 3.82031C9.21094 3.82031 8.82031 3.46875 8.82031 3C8.82031 2.53125 9.21094 2.17969 9.67969 2.17969C10.1094 2.17969 10.5 2.53125 10.5 3C10.5 3.46875 10.1094 3.82031 9.67969 3.82031ZM9.67969 0.929688C9.44531 0.929688 9.25 0.734375 9.25 0.5C9.25 0.265625 9.44531 0.0703125 9.67969 0.0703125C9.91406 0.0703125 10.0703 0.265625 10.0703 0.5C10.0703 0.734375 9.91406 0.929688 9.67969 0.929688ZM0.5 9.25C0.734375 9.25 0.929688 9.44531 0.929688 9.67969C0.929688 9.91406 0.734375 10.0703 0.5 10.0703C0.265625 10.0703 0.0703125 9.91406 0.0703125 9.67969C0.0703125 9.44531 0.265625 9.25 0.5 9.25ZM6.32031 15.0703C6.55469 15.0703 6.75 15.2656 6.75 15.5C6.75 15.7344 6.55469 15.9297 6.32031 15.9297C6.08594 15.9297 5.92969 15.7344 5.92969 15.5C5.92969 15.2656 6.08594 15.0703 6.32031 15.0703ZM6.32031 0.929688C6.08594 0.929688 5.92969 0.734375 5.92969 0.5C5.92969 0.265625 6.08594 0.0703125 6.32031 0.0703125C6.55469 0.0703125 6.75 0.265625 6.75 0.5C6.75 0.734375 6.55469 0.929688 6.32031 0.929688ZM6.32031 3.82031C5.89062 3.82031 5.5 3.46875 5.5 3C5.5 2.53125 5.89062 2.17969 6.32031 2.17969C6.78906 2.17969 7.17969 2.53125 7.17969 3C7.17969 3.46875 6.78906 3.82031 6.32031 3.82031ZM6.32031 8.42969C7.02344 8.42969 7.57031 8.97656 7.57031 9.67969C7.57031 10.3438 7.02344 10.9297 6.32031 10.9297C5.65625 10.9297 5.07031 10.3438 5.07031 9.67969C5.07031 8.97656 5.65625 8.42969 6.32031 8.42969ZM13 8.82031C13.4688 8.82031 13.8203 9.21094 13.8203 9.67969C13.8203 10.1094 13.4688 10.5 13 10.5C12.5312 10.5 12.1797 10.1094 12.1797 9.67969C12.1797 9.21094 12.5312 8.82031 13 8.82031ZM13 12.1797C13.4688 12.1797 13.8203 12.5312 13.8203 13C13.8203 13.4688 13.4688 13.8203 13 13.8203C12.5312 13.8203 12.1797 13.4688 12.1797 13C12.1797 12.5312 12.5312 12.1797 13 12.1797ZM13 5.5C13.4688 5.5 13.8203 5.89062 13.8203 6.32031C13.8203 6.78906 13.4688 7.17969 13 7.17969C12.5312 7.17969 12.1797 6.78906 12.1797 6.32031C12.1797 5.89062 12.5312 5.5 13 5.5ZM13 2.17969C13.4688 2.17969 13.8203 2.53125 13.8203 3C13.8203 3.46875 13.4688 3.82031 13 3.82031C12.5312 3.82031 12.1797 3.46875 12.1797 3C12.1797 2.53125 12.5312 2.17969 13 2.17969ZM15.5 9.25C15.7344 9.25 15.9297 9.44531 15.9297 9.67969C15.9297 9.91406 15.7344 10.0703 15.5 10.0703C15.2656 10.0703 15.0703 9.91406 15.0703 9.67969C15.0703 9.44531 15.2656 9.25 15.5 9.25ZM9.67969 12.1797C10.1094 12.1797 10.5 12.5312 10.5 13C10.5 13.4688 10.1094 13.8203 9.67969 13.8203C9.21094 13.8203 8.82031 13.4688 8.82031 13C8.82031 12.5312 9.21094 12.1797 9.67969 12.1797ZM9.67969 15.0703C9.91406 15.0703 10.0703 15.2656 10.0703 15.5C10.0703 15.7344 9.91406 15.9297 9.67969 15.9297C9.44531 15.9297 9.25 15.7344 9.25 15.5C9.25 15.2656 9.44531 15.0703 9.67969 15.0703ZM6.32031 5.07031C7.02344 5.07031 7.57031 5.65625 7.57031 6.32031C7.57031 7.02344 7.02344 7.57031 6.32031 7.57031C5.65625 7.57031 5.07031 7.02344 5.07031 6.32031C5.07031 5.65625 5.65625 5.07031 6.32031 5.07031ZM6.32031 12.1797C6.78906 12.1797 7.17969 12.5312 7.17969 13C7.17969 13.4688 6.78906 13.8203 6.32031 13.8203C5.89062 13.8203 5.5 13.4688 5.5 13C5.5 12.5312 5.89062 12.1797 6.32031 12.1797ZM9.67969 8.42969C10.3438 8.42969 10.9297 8.97656 10.9297 9.67969C10.9297 10.3438 10.3438 10.9297 9.67969 10.9297C8.97656 10.9297 8.42969 10.3438 8.42969 9.67969C8.42969 8.97656 8.97656 8.42969 9.67969 8.42969ZM9.67969 5.07031C10.3438 5.07031 10.9297 5.65625 10.9297 6.32031C10.9297 7.02344 10.3438 7.57031 9.67969 7.57031C8.97656 7.57031 8.42969 7.02344 8.42969 6.32031C8.42969 5.65625 8.97656 5.07031 9.67969 5.07031Z" fill="#0046FE"/>
</svg>
`;

const BURGER_ICON_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 18L20 18" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <path d="M4 12L20 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <path d="M4 6L20 6" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>`;


class MyChatbot extends HTMLElement {
    constructor() {
      super();
      const title = this.getAttribute('title') || defaultTitle;
      this.attachShadow({ mode: 'open' });
      this.sessions = [
        { id: 'today', name: "Aujourd'hui", messages: [], sessionId: null },
        { id: 'intro', name: 'Nouvelle Introduction', messages: [], sessionId: null },
        { id: 'greeting', name: 'Accueil', messages: [], sessionId: null },
        { id: 'greeting', name: 'Accueil', messages: [], sessionId: null },
        { id: 'greeting', name: 'Accueil', messages: [], sessionId: null },
        { id: 'greeting', name: 'Accueil', messages: [], sessionId: null },
        { id: 'greeting', name: 'Accueil', messages: [], sessionId: null },
        { id: 'greeting', name: 'Accueil', messages: [], sessionId: null },
        { id: 'greeting', name: 'Accueil', messages: [], sessionId: null },
        { id: 'greeting', name: 'Accueil', messages: [], sessionId: null },
      ];
      this.currentSession = this.sessions[0];
      this.apiEndpoint = 'http://localhost:3000/api/pulse/chat';
      this.isLoading = false;
  
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
          width: 32px;
          height: 32px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
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
          background: #FF5C35;
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
        /* Custom subtle scrollbar styles for .chat-body (to match .sessions-list) */
        .chat-body::-webkit-scrollbar {
          width: 6px;
        }
        .chat-body::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-body::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .chat-body:hover::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
        }
        .chat-body {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }
  
        .chat-input {
          border-top: 1px solid #333;
          padding: 15px 20px;
          display: flex;
          gap: 12px;
          background: rgba(0, 0, 0, 0.2);#FF5C35
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
  
        .chat-input .send-icon {
          background: #0052CC;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          padding: 10px;
          cursor: pointer;
          opacity: 0.4;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(0, 82, 204, 0.2);
        }

        .chat-input .send-icon:hover {
          background: #0065FF;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 82, 204, 0.3);
        }

        .chat-input .send-icon:active {
          transform: translateY(1px);
          box-shadow: 0 2px 4px rgba(0, 82, 204, 0.2);
        }

        .chat-input .send-icon.active {
          opacity: 1;
          pointer-events: auto;
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

        .loading-indicator {
          opacity: 0.7;
        }

        .typing-dots {
          display: inline-block;
          animation: typing 1.5s infinite;
        }

        @keyframes typing {
          0%, 20% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
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

        .chat-input .send-icon {
          width: 40px;
          height: 40px;
          padding: 8px;
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
            <button class="toggle-sessions" aria-label="Toggle sessions">${BURGER_ICON_SVG}</button>
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
          </div>
          <div class="chat-input">
            <input type="text" id="chatInput" placeholder="Tapez un message..." />
            <button id="sendBtn" class="send-icon" aria-label="Send">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 19V5M12 5L19 12M12 5L5 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <button class="chat-toggle">
          ${AVATAR_SVG}
        </button>
      `;

      this.shadowRoot.append(style, wrapper);
    }

    async sendMessage() {
      const chatInput = this.shadowRoot.getElementById('chatInput');
      const chatBody = this.shadowRoot.getElementById('chatBody');
      const sendBtn = this.shadowRoot.getElementById('sendBtn');
      
      const msg = chatInput.value.trim();
      if (!msg || this.isLoading) return;

      // Clear input and disable send button
      chatInput.value = '';
      sendBtn.classList.remove('active');
      this.isLoading = true;

      // Add user message to UI and conversation history
      const userMessage = { role: 'user', content: msg };
      this.addMessageToUI('Vous', msg);
      this.currentSession.messages.push(userMessage);

      // Show loading indicator
      this.showLoadingIndicator(chatBody);

      try {
        // Prepare request body
        const requestBody = { message: msg };
        
        // Add session_id if this is not the first message
        if (this.currentSession.sessionId) {
          requestBody.session_id = this.currentSession.sessionId;
        }

        // Make API call
        const response = await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Store session_id if this was the first message
        if (!this.currentSession.sessionId && data.session_id) {
          this.currentSession.sessionId = data.session_id;
        }

        // Remove loading indicator and add bot response
        this.removeLoadingIndicator(chatBody);
        const botMessage = { role: 'assistant', content: data.response };
        this.addMessageToUI('Bot', data.response);
        this.currentSession.messages.push(botMessage);

      } catch (error) {
        console.error('Error sending message:', error);
        this.removeLoadingIndicator(chatBody);
        this.addMessageToUI('Bot', 'Désolé, une erreur s\'est produite. Veuillez réessayer.');
      } finally {
        this.isLoading = false;
      }
    }

    addMessageToUI(sender, message) {
      const chatBody = this.shadowRoot.getElementById('chatBody');
      const messageDiv = document.createElement('div');
      messageDiv.innerHTML = `<strong>${sender}:</strong> ${this.formatMessage(message)}`;
      chatBody.appendChild(messageDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    formatMessage(message) {
      // Convert markdown-style formatting to HTML
      return message
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
    }

    showLoadingIndicator(chatBody) {
      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'loading-indicator';
      loadingDiv.innerHTML = '<strong>Bot:</strong> <span class="typing-dots">●●●</span>';
      chatBody.appendChild(loadingDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    removeLoadingIndicator(chatBody) {
      const loadingIndicator = chatBody.querySelector('.loading-indicator');
      if (loadingIndicator) {
        loadingIndicator.remove();
      }
    }

    loadSessionMessages() {
      const chatBody = this.shadowRoot.getElementById('chatBody');
      chatBody.innerHTML = '';
      
      if (this.currentSession.messages.length === 0) {
        this.addMessageToUI('Bot', 'Bonjour! Comment puis-je vous aider?');
      } else {
        this.currentSession.messages.forEach(message => {
          const sender = message.role === 'user' ? 'Vous' : 'Bot';
          this.addMessageToUI(sender, message.content);
        });
      }
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
          
          // Load conversation history for this session
          this.loadSessionMessages();
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
        this.sendMessage();
      });

      chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          this.sendMessage();
        }
      });

      // Enable/disable send icon based on input content
      chatInput.addEventListener('input', () => {
        if (chatInput.value.trim()) {
          sendBtn.classList.add('active');
        } else {
          sendBtn.classList.remove('active');
        }
      });

      // Add new session functionality
      newSessionBtn.addEventListener('click', () => {
        const sessionId = 'session-' + Date.now();
        const newSession = {
          id: sessionId,
          name: 'Nouvelle Session ' + (this.sessions.length + 1),
          messages: [],
          sessionId: null
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
          
          // Load conversation history for this session
          this.loadSessionMessages();
        });

        // Activate the new session
        sessionElement.click();
      });

      // Initialize the first session with welcome message
      this.loadSessionMessages();
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