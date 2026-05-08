(function() {
    // Configuration
    const WORKER_URL = 'https://chatbot.ryu7w7123.workers.dev'; // Same Worker for both
    
    // Configuración específica para Punto Repair
    const BOT_ID = 'repair';
    const BOT_NAME = 'Mr.Repair';
    const GREETING = '¡Hola! Soy Mister Repair, tu asistente técnico. ¿En qué puedo ayudarte hoy?';

    // Styles
    const styles = `
        #support-chat-bubble-container {
            position: fixed;
            bottom: 20px;
            right: -60px; /* Más metido hacia el borde */
            width: 160px;
            height: 160px;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* Tooltip / Mensaje flotante */
        #support-chat-tooltip {
            position: absolute;
            top: 20px;
            right: 100px;
            background: #1a1a1a;
            color: white;
            padding: 10px 18px;
            border-radius: 18px;
            font-size: 13px;
            font-weight: 500;
            white-space: nowrap;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            pointer-events: none;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.5s ease;
            z-index: 10001;
            font-family: 'Inter', sans-serif;
        }

        #support-chat-tooltip::after {
            content: '';
            position: absolute;
            right: -6px;
            top: 50%;
            transform: translateY(-50%);
            border-width: 6px 0 6px 6px;
            border-style: solid;
            border-color: transparent transparent transparent #1a1a1a;
        }

        /* Animación del Tooltip */
        @keyframes tooltip-fade {
            0%, 10%, 90%, 100% { opacity: 0; transform: translateY(10px) translateX(0); }
            20%, 80% { opacity: 1; transform: translateY(0) translateX(-10px); }
        }

        #support-chat-bubble-container.active-tooltip #support-chat-tooltip {
            animation: tooltip-fade 8s infinite;
        }

        /* Ocultar el botón azul anterior */
        #support-chat-bubble {
            display: none;
        }

        /* El Robot 3D como Único Trigger */
        .bot-img-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 1;
            opacity: 1;
            pointer-events: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.4s ease;
        }

        .bot-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: drop-shadow(-5px 10px 20px rgba(0,0,0,0.15));
        }

        #support-chat-bubble-container:hover {
            transform: translateX(-20px); /* Se asoma un poco más en hover */
        }

        #support-chat-container {
            position: fixed;
            bottom: 30px;
            right: 30px;
            display: none;
            align-items: flex-end;
            z-index: 9999;
            gap: 0;
            pointer-events: none;
        }
        #support-chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            display: none;
            align-items: flex-end;
            z-index: 9999;
            gap: 0;
            pointer-events: none;
        }
        #support-chat-character-area {
            width: 280px;
            pointer-events: auto;
            margin-right: -40px;
            z-index: 10001;
            transition: all 0.5s ease;
            transform: translateX(50px);
            opacity: 0;
        }
        #support-chat-container.active #support-chat-character-area {
            transform: translateX(0);
            opacity: 1;
        }
        #support-chat-character-area img {
            width: 100%;
            display: block;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
        }
        #support-chat-window {
            width: 380px;
            height: 520px;
            background: white;
            border: 4px solid #1a1a1a;
            border-radius: 35px;
            position: relative;
            display: flex;
            flex-direction: column;
            pointer-events: auto;
            box-shadow: 0 20px 50px rgba(0,0,0,0.2);
            font-family: 'Inter', -apple-system, sans-serif;
            margin-bottom: 20px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform: scale(0.8) translateY(50px);
            opacity: 0;
            transform-origin: bottom right;
        }
        #support-chat-container.active #support-chat-window {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
        /* Bubble Tail */
        #support-chat-window::before {
            content: '';
            position: absolute;
            bottom: 40px;
            left: -24px;
            border-width: 12px 24px 12px 0;
            border-style: solid;
            border-color: transparent #1a1a1a transparent transparent;
        }
        #support-chat-window::after {
            content: '';
            position: absolute;
            bottom: 44px;
            left: -16px;
            border-width: 8px 16px 8px 0;
            border-style: solid;
            border-color: transparent white transparent transparent;
        }
        #support-chat-header {
            padding: 20px 25px 10px;
            font-weight: 800;
            font-size: 1.2rem;
            color: #1a1a1a;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        #close-chat {
            cursor: pointer;
            width: 30px;
            height: 30px;
            background: #f0f0f0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            transition: background 0.2s;
        }
        #close-chat:hover {
            background: #e0e0e0;
        }
        #support-chat-messages {
            flex: 1;
            padding: 10px 25px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .msg {
            padding: 12px 18px;
            border-radius: 20px;
            font-size: 14px;
            line-height: 1.5;
            max-width: 85%;
            word-wrap: break-word;
        }
        .msg-user {
            align-self: flex-end;
            background: #0070f3;
            color: white;
            border-bottom-right-radius: 4px;
        }
        .msg-bot {
            align-self: flex-start;
            background: #f0f2f5;
            color: #1a1a1a;
            border-bottom-left-radius: 4px;
            font-weight: 500;
        }
        #support-chat-input-container {
            padding: 20px 25px;
            display: flex;
            gap: 10px;
            background: white;
            border-bottom-left-radius: 35px;
            border-bottom-right-radius: 35px;
        }
        #support-chat-input {
            flex: 1;
            border: 2px solid #eee;
            border-radius: 20px;
            padding: 12px 18px;
            outline: none;
            font-size: 14px;
            transition: border-color 0.2s;
        }
        #support-chat-input:focus {
            border-color: #0070f3;
        }
        #support-chat-send {
            background: #0070f3;
            color: white;
            border: none;
            border-radius: 50%;
            width: 45px;
            height: 45px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0, 112, 243, 0.3);
        }
        #support-chat-send:hover {
            transform: scale(1.05);
            background: #0061d1;
        }
        @media (max-width: 768px) {
            #support-chat-character-area {
                display: none;
            }
            #support-chat-window {
                width: calc(100vw - 40px);
                margin-right: 0;
            }
            #support-chat-window::before, #support-chat-window::after {
                display: none;
            }
        }
    `;

    // Inject Styles
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Create Trigger Button Container
    const bubbleContainer = document.createElement('div');
    bubbleContainer.id = 'support-chat-bubble-container';
    bubbleContainer.className = 'active-tooltip'; // Activar el mensaje periódico
    bubbleContainer.innerHTML = `
        <div id="support-chat-tooltip">Hola, soy Mr. Repair. ¡Haz clic para ayudarte!</div>
        <div class="bot-img-wrapper">
            <img src="/Images/bot_peeking.png" class="bot-img" alt="Bot">
        </div>
        <div id="support-chat-bubble"></div>
    `;
    document.body.appendChild(bubbleContainer);

    // Create Main Container
    const container = document.createElement('div');
    container.id = 'support-chat-container';
    container.innerHTML = `
        <div id="support-chat-character-area">
            <img src="/Images/bot2.png" alt="Bot Character">
        </div>
        <div id="support-chat-window">
            <div id="support-chat-header">
                <span>${BOT_NAME}</span>
                <span id="close-chat">&times;</span>
            </div>
            <div id="support-chat-messages"></div>
            <div id="support-chat-input-container">
                <input type="text" id="support-chat-input" placeholder="Escribe tu duda...">
                <button id="support-chat-send">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    const messagesContainer = document.getElementById('support-chat-messages');
    const input = document.getElementById('support-chat-input');
    const sendBtn = document.getElementById('support-chat-send');
    const closeBtn = document.getElementById('close-chat');

    let chatHistory = [];

    // Toggle Chat
    bubbleContainer.addEventListener('click', () => {
        const isActive = container.classList.contains('active');
        if (isActive) {
            container.classList.remove('active');
            setTimeout(() => { container.style.display = 'none'; }, 400);
        } else {
            container.style.display = 'flex';
            setTimeout(() => { container.classList.add('active'); }, 10);
            bubbleContainer.style.display = 'none';
            if (messagesContainer.children.length === 0) {
                addMessage('bot', GREETING);
            }
        }
    });

    closeBtn.addEventListener('click', () => {
        container.classList.remove('active');
        setTimeout(() => { 
            container.style.display = 'none';
            bubbleContainer.style.display = 'flex';
        }, 400);
    });

    // Add Message to UI
    function addMessage(role, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg msg-${role}`;
        msgDiv.innerText = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Send Message Logic
    async function handleSend() {
        const text = input.value.trim();
        if (!text) return;

        addMessage('user', text);
        chatHistory.push({ role: 'user', content: text });
        input.value = '';

        try {
            const response = await fetch(`${WORKER_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    messages: chatHistory,
                    bot_id: BOT_ID
                })
            });
            const data = await response.json();
            const botMessage = data.choices[0].message.content;
            
            addMessage('bot', botMessage);
            chatHistory.push({ role: 'assistant', content: botMessage });
        } catch (error) {
            addMessage('bot', 'Lo siento, hubo un error al conectar con el servidor.');
            console.error(error);
        }
    }

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

})();
