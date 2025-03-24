// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function () {
    // Simula um tempo de carregamento
    setTimeout(function () {
        document.getElementById('loadingScreen').style.display = 'none';

        // Inicializa a aplicação
        initApp();

        // Toca música de fundo (opcional)
        const bgMusic = document.getElementById('backgroundMusic');
        bgMusic.volume = 0.3;
        // bgMusic.play(); // Descomente para ativar música automática

        // Atualiza o progresso
        updateProgress();
    }, 2000);
});

// Configura efeitos sonoros (movido para o início)
function setupSoundEffects() {
    // Função global para tocar sons
    window.playSound = function (sound) {
        const soundEffect = document.getElementById('soundEffect');

        // Mapeamento de sons (na prática, seriam arquivos diferentes)
        switch (sound) {
            case 'click':
                soundEffect.src = 'sons/click.mp3';
                break;
            case 'flip':
                soundEffect.src = 'sons/flip.mp3';
                break;
            case 'match':
                soundEffect.src = 'sons/match.mp3';
                break;
            case 'win':
                soundEffect.src = 'sons/win.mp3';
                break;
            case 'lose':
                soundEffect.src = 'sons/lose.mp3';
                break;
            case 'correct':
                soundEffect.src = 'sons/correct.mp3';
                break;
            case 'error':
                soundEffect.src = 'sons/error.mp3';
                break;
            case 'success':
                soundEffect.src = 'sons/success.mp3';
                break;
            case 'erase':
                soundEffect.src = 'sons/erase.mp3';
                break;
            case 'game-start':
                soundEffect.src = 'sons/game-start.mp3';
                break;
            case 'story-open':
                soundEffect.src = 'sons/story-open.mp3';
                break;
            case 'help':
                soundEffect.src = 'sons/help.mp3';
                break;
            case 'mascot':
                soundEffect.src = 'sons/mascot.mp3';
                break;
            default:
                soundEffect.src = 'sons/click.mp3';
        }

        soundEffect.currentTime = 0;
        soundEffect.play();
    };
}

// Inicializa a aplicação
function initApp() {
    // Configura a navegação por tabs
    setupTabNavigation();

    // Carrega as letras do alfabeto
    loadAlphabet();

    // Configura o canvas de escrita
    setupWritingCanvas();

    // Configura os jogos
    setupGames();

    // Configura as histórias
    setupStories();

    // Configura a ajuda flutuante
    setupFloatingHelp();

    // Configura o mascote interativo
    setTimeout(setupMascot, 3000);
}

// Configura a navegação por tabs
function setupTabNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove a classe active de todos os links
            navLinks.forEach(l => l.classList.remove('active'));

            // Adiciona a classe active ao link clicado
            this.classList.add('active');

            // Esconde todas as seções
            sections.forEach(section => {
                section.classList.remove('active-section');
            });

            // Mostra a seção correspondente
            const target = this.getAttribute('href');
            document.querySelector(target).classList.add('active-section');

            // Toca efeito sonoro
            playSound('click');
        });
    });
}

// Carrega o alfabeto
function loadAlphabet() {
    const lettersDisplay = document.getElementById('lettersDisplay');

    // Mostra as vogais por padrão
    showLetters('vogais');

    // Configura o evento de clique nas letras
    lettersDisplay.addEventListener('click', function (e) {
        if (e.target.classList.contains('letter-btn')) {
            const letter = e.target.textContent;
            showLetterDetails(letter);
            playLetterSound(letter);
        }
    });
}

// Mostra as letras de acordo com a categoria selecionada
function showLetters(category) {
    const lettersDisplay = document.getElementById('lettersDisplay');
    lettersDisplay.innerHTML = '';

    let letters = [];

    switch (category) {
        case 'vogais':
            letters = ['A', 'E', 'I', 'O', 'U'];
            break;
        case 'consoantes':
            letters = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M',
                'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
            break;
        case 'silabas':
            letters = ['BA', 'BE', 'BI', 'BO', 'BU', 'CA', 'CE', 'CI', 'CO', 'CU',
                'DA', 'DE', 'DI', 'DO', 'DU', 'FA', 'FE', 'FI', 'FO', 'FU', 'GA', 
                'GE', 'GI', 'GO', 'GU', 'HA', 'HE', 'HI', 'HO', 'HU', 'JA', 'JE', 
                'JI', 'JO', 'JU', 'KA', 'KE', 'KI', 'KO', 'KU', 'LA', 'LE', 'LI',
                'LO', 'LU', 'MA', 'ME', 'MI', 'MO', 'MU', 'NA', 'NE', 'NI', 'NO',
                'NU', 'PA', 'PE', 'PI', 'PO', 'PU', 'RA', 'RE', 'RI', 'RO', 'RU',
                'SA', 'SE', 'SI', 'SO', 'SU', 'TA', 'TE', 'TI', 'TO', 'TU', 'VA',
                'VE', 'VI', 'VO', 'VU', 'WA', 'WE', 'WI', 'WO', 'WU', 'XA', 'XE', 
                'XI', 'XO', 'XU', 'YA', 'YE', 'YI', 'YO', 'YU', 'ZA', 'ZE', 'ZI',
                'ZO', 'ZU' 
            ];
            break;
    }

    letters.forEach(letter => {
        const button = document.createElement('button');
        button.className = 'letter-btn';
        button.textContent = letter;
        lettersDisplay.appendChild(button);
    });

    // Mostra detalhes da primeira letra
    if (letters.length > 0) {
        showLetterDetails(letters[0]);
    }
}

// Mostra os detalhes de uma letra específica
function showLetterDetails(letter) {
    document.getElementById('currentLetter').textContent = letter;

    // Atualiza a imagem da letra (simulado - na prática seria um arquivo diferente para cada letra)
    const letterImage = document.getElementById('letterImage');
    letterImage.src = `imagens/letra_${letter.toLowerCase()}.png`;
    letterImage.alt = `Letra ${letter}`;

    // Atualiza os exemplos (simulado)
    const examplesList = document.getElementById('letterExamples');
    examplesList.innerHTML = '';

    let examples = [];

    if (letter.length === 1) { // Letra única
        switch (letter.toUpperCase()) {
            case 'A':
                examples = ['Abacaxi', 'Amigo', 'Arara', 'Árvore', 'Avião'];
                break;
            case 'B':
                examples = ['Bola', 'Bala', 'Bicicleta', 'Banana', 'Brinquedo'];
                break;
            case 'C':
                examples = ['Cama', 'Caixa', 'Casa', 'Chiclete', 'Cinza'];
                break;
            case 'D':
                examples = ['Dado', 'Dedo', 'Dia', 'Direita', 'Doce'];
                break;
            case 'E':
                examples = ['Elefante', 'Escova', 'Escola', 'Estádio', 'Esquerda'];
                break;
            case 'F':
                examples = ['Faca', 'Foice', 'Foca', 'Folha', 'Flexa'];
                break;
            case 'G':
                examples = ['Gato', 'Galho', 'Galinha', 'Goleiro', 'Gol'];
                break;
            case 'H':
                examples = ['Hamburguer', 'Helicoptero', 'Hortelã', 'Hino', 'Higiêne'];
                break;
            case 'I':
                examples = ['Igreja', 'Inteligência', 'Impacto', 'Infinito', 'Inocente'];
                break;
            case 'J':
                examples = ['Justiça', 'Jaula', 'Jegue', 'Jeguinho', 'Janela'];
                break;
            case 'K':
                examples = ['kanga', 'kart', 'ketchup', 'Km', 'kg'];
                break;
            case 'L':
                examples = ['Lápis', 'Lazer', 'Livro', 'Limão', 'Língua'];
                break;         
            case 'M':
                examples = ['Mesa', 'Menssagem', 'Molho', 'Menino', 'Menina'];
                break;                        
            // Adicione mais casos para outras letras...
            default:
                examples = [`${letter}ato`, `${letter}ola`, `${letter}aca`, `${letter}arte`, `${letter}isco`];
        }
    } else { // Sílabas
        examples = [`${letter}la`, `${letter}to`, `${letter}ca`, `${letter}rin`, `${letter}de`];
    }

    examples.forEach(example => {
        const li = document.createElement('li');
        li.textContent = example;
        examplesList.appendChild(li);
    });

    // Atualiza o áudio da letra (simulado)
    const letterSound = document.getElementById('letterSound');
    letterSound.src = `sons/letra_${letter.toLowerCase()}.mp3`;
}

// Toca o som da letra
function playLetterSound(letter = null) {
    if (letter) {
        const letterSound = document.getElementById('letterSound');
        letterSound.src = `sons/letra_${letter.toLowerCase()}.mp3`;
        letterSound.play();
    } else {
        document.getElementById('letterSound').play();
    }

    // Animação de feedback
    const letterElement = document.getElementById('currentLetter');
    letterElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        letterElement.style.transform = 'scale(1)';
    }, 300);
}

// Configura o canvas de escrita
function setupWritingCanvas() {
    const canvas = document.getElementById('writingCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Configurações do pincel
    ctx.strokeStyle = '#9b59b6';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Eventos do mouse/touch
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    function handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }

    function handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e) {
        if (!isDrawing) return;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing() {
        isDrawing = false;
    }
}

// Limpa o canvas
function clearCanvas() {
    const canvas = document.getElementById('writingCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playSound('erase');

    // Esconde o feedback
    document.getElementById('writingFeedback').style.display = 'none';
}

// Verifica a escrita (simplificado)
function checkWriting() {
    const canvas = document.getElementById('writingCanvas');
    const ctx = canvas.getContext('2d');
    const feedback = document.getElementById('writingFeedback');
    const letterToWrite = document.getElementById('letterToWrite').textContent;

    // Simulação de verificação (em uma aplicação real, isso seria mais complexo)
    const isEmpty = ctx.getImageData(0, 0, canvas.width, canvas.height).data.some(channel => channel !== 0);

    if (!isEmpty) {
        feedback.textContent = 'Desenhe a letra primeiro!';
        feedback.className = 'writing-feedback error';
        feedback.style.display = 'block';
        playSound('error');
        return;
    }

    // Simula uma verificação aleatória (80% de acerto)
    const isCorrect = Math.random() < 0.8;

    if (isCorrect) {
        feedback.textContent = 'Parabéns! Você escreveu a letra corretamente!';
        feedback.className = 'writing-feedback success';
        playSound('success');

        // Atualiza o progresso
        updateProgress(5);

        // Muda para a próxima letra após 2 segundos
        setTimeout(() => {
            const currentLetter = letterToWrite.charCodeAt(0);
            const nextLetter = currentLetter < 90 ? String.fromCharCode(currentLetter + 1) : 'A';
            document.getElementById('letterToWrite').textContent = nextLetter;
            clearCanvas();
            feedback.style.display = 'none';
        }, 2000);
    } else {
        feedback.textContent = 'Quase lá! Tente novamente.';
        feedback.className = 'writing-feedback error';
        playSound('error');
    }

    feedback.style.display = 'block';
}

// Inicia uma atividade de prática
function startPractice(type) {
    const practiceArea = document.getElementById('practiceArea');

    // Esconde todas as práticas
    document.querySelectorAll('.practice-area > div').forEach(div => {
        div.style.display = 'none';
    });

    switch (type) {
        case 'escrita':
            document.getElementById('writingPractice').style.display = 'block';
            // Define uma letra aleatória para praticar
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const randomLetter = letters[Math.floor(Math.random() * letters.length)];
            document.getElementById('letterToWrite').textContent = randomLetter;
            clearCanvas();
            break;
        case 'leitura':
            // Implementar prática de leitura
            break;
        case 'formacao':
            // Implementar formação de palavras
            break;
    }

    playSound('click');
}

// Configura os jogos
function setupGames() {
    // Implementação básica dos jogos
    const gameArea = document.getElementById('gameArea');

    // Configura o evento de clique nos cards de jogo
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function () {
            const gameType = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            startGame(gameType);
        });
    });
}

// Inicia um jogo
function startGame(gameType) {
    const gameArea = document.getElementById('gameArea');

    // Limpa a área de jogo
    gameArea.innerHTML = '';

    switch (gameType) {
        case 'memoria':
            gameArea.innerHTML = `
                <h3>Jogo da Memória</h3>
                <p>Encontre os pares de letras e imagens correspondentes.</p>
                <div class="memory-grid" id="memoryGrid"></div>
            `;
            setupMemoryGame();
            break;
        case 'forca':
            gameArea.innerHTML = `
                <h3>Jogo da Forca</h3>
                <p>Adivinhe a palavra antes do boneco ser enforcado.</p>
                <div class="hangman-container" id="hangmanContainer"></div>
            `;
            setupHangmanGame();
            break;
        case 'quiz':
            gameArea.innerHTML = `
                <h3>Quiz das Letras</h3>
                <p>Responda perguntas sobre as letras do alfabeto.</p>
                <div class="quiz-container" id="quizContainer"></div>
            `;
            setupQuizGame();
            break;
    }

    playSound('game-start');
}

// Configura o jogo da memória (simplificado)
function setupMemoryGame() {
    const gameArea = document.getElementById('gameArea');
    const memoryGrid = document.getElementById('memoryGrid');
    const pairs = 8; // Número de pares
    const letters = 'ABCDEFGH'.split(''); // Letras para o jogo

    // Cria os cards
    let cards = [];
    letters.forEach(letter => {
        cards.push({ type: 'letter', content: letter });
        cards.push({ type: 'image', content: letter });
    });

    // Embaralha os cards
    cards = shuffleArray(cards);

    // Cria a grade
    memoryGrid.style.gridTemplateColumns = `repeat(4, 1fr)`;

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.dataset.index = index;
        cardElement.dataset.type = card.type;
        cardElement.dataset.content = card.content;
        cardElement.innerHTML = '<div class="memory-card-back"></div><div class="memory-card-front"></div>';

        cardElement.addEventListener('click', flipCard);
        memoryGrid.appendChild(cardElement);
    });

    function flipCard() {
        if (this.classList.contains('flipped')) return;

        this.classList.add('flipped');
        playSound('flip');

        // Verifica por pares
        const flippedCards = document.querySelectorAll('.memory-card.flipped');
        if (flippedCards.length === 2) {
            const [card1, card2] = flippedCards;

            if (card1.dataset.content === card2.dataset.content) {
                // Par encontrado
                setTimeout(() => {
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    checkGameWin();
                    playSound('match');

                    // Atualiza o progresso
                    updateProgress(2);
                }, 500);
            } else {
                // Par errado
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    playSound('error');
                }, 1000);
            }
        }
    }

    function checkGameWin() {
        const matchedCards = document.querySelectorAll('.memory-card.matched');
        if (matchedCards.length === cards.length) {
            setTimeout(() => {
                gameArea.innerHTML += `
                    <div class="game-win-message">
                        <h4>Parabéns! Você venceu!</h4>
                        <button onclick="startGame('memoria')">Jogar Novamente</button>
                    </div>
                `;
                playSound('win');

                // Atualiza o progresso
                updateProgress(10);
            }, 500);
        }
    }
}

// Configura o jogo da forca (simplificado)
function setupHangmanGame() {
    const words = ['ABACAXI', 'BANANA', 'CASA', 'DADO', 'ELEFANTE', 'FADA', 'GATO', 'HORA'];
    const word = words[Math.floor(Math.random() * words.length)];
    const hangmanContainer = document.getElementById('hangmanContainer');

    let guessedLetters = [];
    let errors = 0;
    const maxErrors = 6;

    // Inicializa o jogo
    updateHangmanDisplay();

    // Continuação do jogo da forca
    function updateHangmanDisplay() {
        // Mostra a palavra com as letras adivinhadas
        let displayWord = '';
        for (const letter of word) {
            if (guessedLetters.includes(letter)) {
                displayWord += letter + ' ';
            } else {
                displayWord += '_ ';
            }
        }

        // Mostra as letras erradas
        const wrongLetters = guessedLetters.filter(l => !word.includes(l));

        hangmanContainer.innerHTML = `
        <div class="hangman-word">${displayWord}</div>
        <div class="hangman-drawing">
            <svg width="200" height="200" viewBox="0 0 200 200">
                ${errors >= 1 ? '<circle cx="100" cy="40" r="20" fill="none" stroke="#333" stroke-width="3"/>' : ''}
                ${errors >= 2 ? '<line x1="100" y1="60" x2="100" y2="100" stroke="#333" stroke-width="3"/>' : ''}
                ${errors >= 3 ? '<line x1="100" y1="70" x2="80" y2="90" stroke="#333" stroke-width="3"/>' : ''}
                ${errors >= 4 ? '<line x1="100" y1="70" x2="120" y2="90" stroke="#333" stroke-width="3"/>' : ''}
                ${errors >= 5 ? '<line x1="100" y1="100" x2="80" y2="130" stroke="#333" stroke-width="3"/>' : ''}
                ${errors >= 6 ? '<line x1="100" y1="100" x2="120" y2="130" stroke="#333" stroke-width="3"/>' : ''}
            </svg>
        </div>
        <div class="hangman-wrong-letters">Letras erradas: ${wrongLetters.join(', ')}</div>
        <div class="hangman-keyboard">
            ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => `
                <button 
                    class="hangman-letter-btn ${guessedLetters.includes(letter) ? 'guessed' : ''}"
                    onclick="guessLetter('${letter}')"
                    ${guessedLetters.includes(letter) ? 'disabled' : ''}
                >
                    ${letter}
                </button>
            `).join('')}
        </div>
    `;

        // Verifica se o jogador ganhou
        if ((word.split('').every(letter => guessedLetters.includes(letter)))) {
            setTimeout(() => {
                hangmanContainer.innerHTML += `
                <div class="game-win-message">
                    <h4>Parabéns! Você acertou a palavra: ${word}</h4>
                    <button onclick="startGame('forca')">Jogar Novamente</button>
                </div>
            `;
                playSound('win');

                // Atualiza o progresso
                updateProgress(15);
            }, 500);
        }

        // Verifica se o jogador perdeu
        if (errors >= maxErrors) {
            setTimeout(() => {
                hangmanContainer.innerHTML += `
                <div class="game-lose-message">
                    <h4>Que pena! A palavra era: ${word}</h4>
                    <button onclick="startGame('forca')">Tentar Novamente</button>
                </div>
            `;
                playSound('lose');
            }, 500);
        }
    }

    // Função global para adivinhar uma letra
    window.guessLetter = function (letter) {
        if (!guessedLetters.includes(letter)) {
            guessedLetters.push(letter);

            if (!word.includes(letter)) {
                errors++;
                playSound('error');
            } else {
                playSound('correct');
            }

            updateHangmanDisplay();
        }
    };

    // Configura o jogo de quiz (simplificado)
    function setupQuizGame() {
        const quizContainer = document.getElementById('quizContainer');
        const questions = [
            {
                question: "Qual letra vem depois do A?",
                options: ["B", "C", "D", "E"],
                answer: "B"
            },
            {
                question: "Qual palavra começa com a letra C?",
                options: ["Casa", "Bola", "Dado", "Faca"],
                answer: "Casa"
            },
            {
                question: "Quantas vogais existem no alfabeto?",
                options: ["3", "5", "7", "9"],
                answer: "5"
            }
        ];

        let currentQuestion = 0;
        let score = 0;

        showQuestion();

        function showQuestion() {
            if (currentQuestion >= questions.length) {
                // Fim do quiz
                quizContainer.innerHTML = `
                <div class="quiz-result">
                    <h4>Quiz Concluído!</h4>
                    <p>Sua pontuação: ${score} de ${questions.length}</p>
                    <button onclick="startGame('quiz')">Jogar Novamente</button>
                </div>
            `;

                // Atualiza o progresso baseado na pontuação
                updateProgress(score * 3);
                return;
            }

            const q = questions[currentQuestion];

            quizContainer.innerHTML = `
            <div class="quiz-question">
                <h4>${q.question}</h4>
                <div class="quiz-options">
                    ${q.options.map(option => `
                        <button class="quiz-option" onclick="checkAnswer('${option}')">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                <div class="quiz-progress">
                    Pergunta ${currentQuestion + 1} de ${questions.length}
                </div>
            </div>
        `;
        }

        // Função global para verificar a resposta
        window.checkAnswer = function (selectedOption) {
            const correctAnswer = questions[currentQuestion].answer;

            if (selectedOption === correctAnswer) {
                score++;
                playSound('correct');
            } else {
                playSound('error');
            }

            currentQuestion++;
            showQuestion();
        };
    }

    // Configura as histórias
    function setupStories() {
        const stories = {
            'chapeuzinho': {
                title: "Chapeuzinho Vermelho",
                content: `
                <p>Era uma vez uma menina chamada Chapeuzinho Vermelho...</p>
                <p>Sua mãe pediu que ela levasse doces para a vovó que estava doente...</p>
                <p>No caminho, ela encontrou o Lobo Mau...</p>
            `,
                audio: "sons/chapeuzinho.mp3"
            },
            'tres-porquinhos': {
                title: "Os Três Porquinhos",
                content: `
                <p>Era uma vez três porquinhos que decidiram construir suas casas...</p>
                <p>O primeiro fez uma casa de palha, o segundo de madeira e o terceiro de tijolos...</p>
                <p>Então veio o Lobo Mau e soprou a casa de palha...</p>
            `,
                audio: "sons/porquinhos.mp3"
            },
            'joao-feijao': {
                title: "João e o Pé de Feijão",
                content: `
                <p>João era um menino pobre que vivia com sua mãe...</p>
                <p>Um dia, trocou a vaca da família por feijões mágicos...</p>
                <p>Os feijões cresceram e formaram um pé gigante que levava ao céu...</p>
            `,
                audio: "sons/joao-feijao.mp3"
            }
        };

        // Configura o evento de clique nos cards de história
        document.querySelectorAll('.story-card').forEach(card => {
            card.addEventListener('click', function () {
                const storyId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
                readStory(storyId);
            });
        });

        // Função global para ler uma história
        window.readStory = function (storyId) {
            const story = stories[storyId];
            const storyContent = document.getElementById('storyContent');

            document.getElementById('storyAudio').src = story.audio;

            storyContent.innerHTML = `
            <h3>${story.title}</h3>
            ${story.content}
        `;

            playSound('story-open');

            // Atualiza o progresso
            updateProgress(3);
        };

        // Funções globais para controlar o áudio da história
        window.playStoryAudio = function () {
            document.getElementById('storyAudio').play();
        };

        window.stopStoryAudio = function () {
            document.getElementById('storyAudio').pause();
            document.getElementById('storyAudio').currentTime = 0;
        };
    }

    // Configura a ajuda flutuante
    function setupFloatingHelp() {
        const helpButton = document.querySelector('.floating-help button');
        const helpBox = document.getElementById('helpBox');
        const helpText = document.getElementById('helpText');

        helpButton.addEventListener('click', function () {
            playSound('click');
        });

        // Função global para alternar a ajuda
        window.toggleHelp = function () {
            helpBox.style.display = helpBox.style.display === 'block' ? 'none' : 'block';
        };

        // Função global para falar a ajuda
        window.speakHelp = function () {
            // Em uma aplicação real, usaria a Web Speech API
            playSound('help');
        };

        // Atualiza o texto de ajuda baseado na seção atual
        document.addEventListener('click', function () {
            const activeSection = document.querySelector('.content-section.active-section');

            if (activeSection.id === 'aprender') {
                helpText.textContent = 'Clique nas letras para ver detalhes e ouvir seus sons!';
            } else if (activeSection.id === 'praticar') {
                helpText.textContent = 'Escolha um tipo de prática e treine sua escrita e leitura!';
            } else if (activeSection.id === 'jogar') {
                helpText.textContent = 'Escolha um jogo para aprender de forma divertida!';
            } else if (activeSection.id === 'historias') {
                helpText.textContent = 'Escolha uma história para ler e ouvir!';
            } else if (activeSection.id === 'premiacao') {
                helpText.textContent = 'Acompanhe seu progresso e conquistas aqui!';
            }
        });
    }

    // Atualiza o progresso do usuário
    function updateProgress(points = 0) {
        // Simula armazenamento do progresso (em uma aplicação real, seria no localStorage ou backend)
        if (!window.userProgress) {
            window.userProgress = 0;
        }

        window.userProgress += points;
        if (window.userProgress > 100) window.userProgress = 100;

        // Atualiza a barra de progresso
        document.getElementById('progressFill').style.width = `${window.userProgress}%`;
        document.getElementById('progressText').textContent =
            `Você completou ${window.userProgress}% das atividades!`;

        // Verifica conquistas (simplificado)
        updateTrophies();
    }

    // Atualiza as conquistas do usuário
    function updateTrophies() {
        const trophiesGrid = document.getElementById('trophiesGrid');
        const progress = window.userProgress || 0;

        const trophies = [
            { id: 1, name: 'Primeiros Passos', earned: progress >= 10, icon: 'fas fa-star' },
            { id: 2, name: 'Leitor Iniciante', earned: progress >= 30, icon: 'fas fa-book-open' },
            { id: 3, name: 'Escritor Mirim', earned: progress >= 50, icon: 'fas fa-pencil-alt' },
            { id: 4, name: 'Jogador Expert', earned: progress >= 70, icon: 'fas fa-gamepad' },
            { id: 5, name: 'Mestre do ABC', earned: progress >= 90, icon: 'fas fa-trophy' }
        ];

        trophiesGrid.innerHTML = '';

        trophies.forEach(trophy => {
            const trophyElement = document.createElement('div');
            trophyElement.className = `trophy ${trophy.earned ? '' : 'locked'}`;
            trophyElement.innerHTML = `
            <i class="${trophy.icon}"></i>
            <span>${trophy.name}</span>
        `;
            trophiesGrid.appendChild(trophyElement);
        });
    }

    // Funções auxiliares
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Inicializa o mascote interativo
    function setupMascot() {
        const mascote = document.getElementById('mascote');

        mascote.addEventListener('click', function () {
            // Animações aleatórias ao clicar no mascote
            const animations = ['jump', 'spin', 'shake', 'dance'];
            const randomAnim = animations[Math.floor(Math.random() * animations.length)];

            this.style.animation = `${randomAnim} 0.5s`;

            setTimeout(() => {
                this.style.animation = '';
            }, 500);

            playSound('mascot');
        });

        // Animações periódicas
        setInterval(() => {
            if (Math.random() > 0.7) {
                mascote.style.transform = 'scaleX(-1)';
            } else {
                mascote.style.transform = 'scaleX(1)';
            }
        }, 5000);
    }
}