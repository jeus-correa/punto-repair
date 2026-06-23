(function () {
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
            bottom: 20%;
            right: -60px; /* Enterrado para eliminar bordes transparentes */
            width: 180px;
            height: 150px;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            cursor: pointer;
        }

        /* Tooltip / Speech Bubble */
        #support-chat-tooltip {
            position: absolute;
            bottom: 120px;
            right: 60px;
            background: #1a1a1a;
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 14px;
            white-space: nowrap;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
            pointer-events: none;
            font-family: 'Inter', sans-serif;
            z-index: 10001;
        }

        #support-chat-tooltip.show {
            opacity: 1;
            transform: translateY(0);
        }

        #support-chat-tooltip::after {
            content: '';
            position: absolute;
            bottom: -8px;
            right: 40px;
            border-width: 8px 8px 0;
            border-style: solid;
            border-color: #1a1a1a transparent transparent;
        }

        #support-chat-bubble-container:hover #support-chat-tooltip {
            opacity: 1;
            transform: translateY(0);
        }

        /* El Robot Peeking desde el lateral */
        .bot-img-wrapper {
            position: absolute;
            width: 180px;
            height: 180px;
            right: 0;
            z-index: 1;
            transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            transform: translateX(5%); /* Casi fuera para ver bien el ojo */
        }

        .bot-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        /* Hover: El robot se asoma un poco más sin mostrar el corte */
        #support-chat-bubble-container:hover .bot-img-wrapper {
            transform: translateX(-15px);
        }

        /* Ocultar el botón circular viejo */
        #support-chat-bubble {
            display: none;
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
        .msg h1, .msg h2, .msg h3 {
            margin: 8px 0 4px 0;
            font-size: 14px;
            font-weight: 700;
        }
        .msg ul {
            margin: 5px 0;
            padding-left: 20px;
        }
        .msg li {
            margin-bottom: 4px;
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

    // Helper to format basic markdown to HTML
    function formatMarkdown(text) {
        if (!text) return '';
        
        // Escape HTML to prevent XSS
        let html = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
            
        // Convert headers (###, ##, #)
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        
        // Convert bold (**text**)
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Convert italic (*text*)
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Convert lists
        const lines = html.split('\n');
        let inList = false;
        const processedLines = [];
        
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            
            // Match "* item" or "- item"
            const listMatch = line.match(/^[\*\-\+]\s+(.*)$/);
            if (listMatch) {
                if (!inList) {
                    processedLines.push('<ul>');
                    inList = true;
                }
                processedLines.push(`<li>${listMatch[1]}</li>`);
            } else {
                if (inList) {
                    processedLines.push('</ul>');
                    inList = false;
                }
                processedLines.push(line);
            }
        }
        if (inList) {
            processedLines.push('</ul>');
        }
        
        html = processedLines.join('\n');
        
        // Convert newlines to <br>
        html = html.replace(/\n/g, '<br>');
        
        // Clean up margins/spacing for blocks
        html = html.replace(/<\/h[1-3]><br>/g, '</h3>')
                   .replace(/<\/ul><br>/g, '</ul>')
                   .replace(/<\/li><br>/g, '</li>')
                   .replace(/<ul><br>/g, '<ul>');
                   
        return html;
    }

    // Add Message to UI
    function addMessage(role, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg msg-${role}`;
        if (role === 'bot') {
            msgDiv.innerHTML = formatMarkdown(text);
        } else {
            msgDiv.innerText = text;
        }
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
            
            if (data.error) {
                const errMsg = data.error.message || (data.error.metadata && data.error.metadata.raw) || 'Error desconocido';
                addMessage('bot', `Lo siento, hubo un error con el proveedor de IA: ${errMsg}`);
                return;
            }

            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                addMessage('bot', 'Lo siento, el servidor no devolvió una respuesta válida.');
                return;
            }

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

    // Tooltip Timer: Aparece automáticamente cada 10 segundos
    const tooltip = document.getElementById('support-chat-tooltip');
    setInterval(() => {
        if (!container.classList.contains('active')) {
            tooltip.classList.add('show');
            setTimeout(() => {
                tooltip.classList.remove('show');
            }, 5000); // Se oculta después de 5 segundos
        }
    }, 10000); // Se activa cada 10 segundos

})();
