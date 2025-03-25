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
    }, 2000);
});

// Configura efeitos sonoros
function setupSoundEffects() {
    // Função global para tocar sons
    window.playSound = function (sound) {
        const soundEffect = document.getElementById('soundEffect');

        // Mapeamento de sons
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

    // Configura o sistema de progresso
    initProgressSystem();
    updateProgressUI();

    // Configura a prática de leitura
    setupReadingPractice();

    // Configura a formação de palavras
    setupWordFormation();
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
                'JI', 'JO', 'JU', 'LA', 'LE', 'LI', 'LO', 'LU', 'MA', 'ME', 'MI',
                'MO', 'MU', 'NA', 'NE', 'NI', 'NO', 'NU', 'PA', 'PE', 'PI', 'PO',
                'PU', 'RA', 'RE', 'RI', 'RO', 'RU', 'SA', 'SE', 'SI', 'SO', 'SU',
                'TA', 'TE', 'TI', 'TO', 'TU', 'VA', 'VE', 'VI', 'VO', 'VU', 'XA',
                'XE', 'XI', 'XO', 'XU', 'ZA', 'ZE', 'ZI', 'ZO', 'ZU'];
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

    // Atualiza a imagem da letra
    const letterImage = document.getElementById('letterImage');
    letterImage.src = `imagens/letra_${letter.toLowerCase()}.png`;
    letterImage.alt = `Letra ${letter}`;

    // Atualiza os exemplos
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
            case 'N':
                examples = ['Navio', 'Nuvem', 'Nave', 'Norte', 'Ninho'];
                break;
            case 'O':
                examples = ['Óculos', 'Olho', 'Orelha', 'Ontem', 'Ofato'];
                break;
            case 'P':
                examples = ['Palha', 'Palhaço', 'Panela', 'Pânico', 'Pé'];
                break;
            case 'Q':
                examples = ['Queijo', 'Quantidade', 'Quiabo', 'Qualificação', 'Quest'];
                break;
            case 'R':
                examples = ['Rato', 'Rosa', 'Ruim', 'Raposa', 'Rinoceronte'];
                break;
            case 'S':
                examples = ['Sapo', 'Sandália', 'Shampoo', 'Sala', 'Sistema'];
                break;
            case 'T':
                examples = ['Tarantula', 'Tênis', 'Toalha', 'Tacape', 'Tampa'];
                break;
            case 'U':
                examples = ['Unha', 'União', 'Unicórnio', 'Utensílios', 'Único'];
                break;
            case 'V':
                examples = ['Você', 'Vaso', 'Veneno', 'Voltar', 'Vê'];
                break;
            case 'W':
                examples = ['Wafe', 'webcam', 'website', 'walkie-talkie', 'walkman'];
                break;
            case 'X':
                examples = ['Xadrez', 'xarope', 'xeque-mate', 'Xaveco', 'Xenofobia'];
                break;
            case 'Y':
                examples = ['Youtube', 'Yahoo', 'Yakut', 'Yamaha', 'Yoki'];
                break;
            case 'Z':
                examples = ['Zebra', 'Zangado', 'Zagueiro', 'Zangão', 'Zarpar'];
                break;
            default:
                examples = [`${letter}ato`, `${letter}ola`, `${letter}aca`, `${letter}arte`, `${letter}isco`];
        }
    } else { // Sílabas
        switch (letter.toUpperCase()) {
            case 'BA':
                examples = ['Banana', 'Bananeira', 'Bacia', 'Balde', 'Bala'];
                break;
            case 'BE':
                examples = ['Bêbe', 'Bebida', 'Beliche', 'Berço', 'Beleza'];
                break;
            case 'BI':
                examples = ['Bicicleta', 'Biscoito', 'Bife', 'Bigode', 'Binóculo'];
                break;
            case 'BO':
                examples = ['Bola', 'Boliche', 'Boneco', 'Boneca', 'Boné'];
                break;
            case 'BU':
                examples = ['Bússola', 'Buraco', 'Bule', 'Bunda', 'Búfalo'];
                break;
            case 'CA':
                examples = ['Casa', 'Chuveiro', 'Colher', 'Capa', 'Cachorro'];
                break;
            case 'CE':
                examples = ['Céu', 'Cereja', 'Cesto', 'Cego', 'Cérebro'];
                break;
            case 'CI':
                examples = ['Cidade', 'Cimento', 'Cinema', 'Círculo', 'Cicatriz'];
                break;
            case 'CO':
                examples = ['Coelho', 'Colher', 'Coração', 'Comida', 'Corajoso'];
                break;
            case 'CU':
                examples = ['Cultura', 'Cuidade', 'Culpa', 'Culto', 'Cubo'];
                break;
            case 'DA':
                examples = ['Dado', 'Dama', 'Dança', 'Dardo', 'Danação'];
                break;
            case 'DE':
                examples = ['Dedo', 'Deus', 'Desenho', 'Defeito', 'Destino'];
                break;
            case 'DI':
                examples = ['Dia', 'Dica', 'Dinheiro', 'Dificuldade', 'Direita'];
                break;
            case 'DO':
                examples = ['Documento', 'Dono', 'Doce', 'Doido', 'Dominó'];
                break;
            case 'DU':
                examples = ['Dúvida', 'Duração', 'Dúzia', 'Dublê', 'Dublagem'];
                break;
            case 'FA':
                examples = ['Faca', 'Fada', 'Fala', 'Fama', 'Farol'];
                break;
            case 'FE':
                examples = ['Fé', 'Febre', 'Fechar', 'Feira', 'Feijão'];
                break;
            case 'FI':
                examples = ['Fila', 'Filho', 'Filha', 'Ficha', 'Filme'];
                break;
            case 'FO':
                examples = ['Folha', 'Fogo', 'Foca', 'Fofo', 'Forno'];
                break;
            case 'FU':
                examples = ['Fumaça', 'Fungo', 'Fundo', 'Funil', 'Fuzil'];
                break;
            case 'GA':
                examples = ['Gato', 'Gata', 'Garra', 'Galo', 'Galinha'];
                break;
            case 'GE':
                examples = ['Gelo', 'Gema', 'Gente', 'Gesto', 'Gesso'];
                break;
            case 'GI':
                examples = ['Girafa', 'Gíz', 'Gincana', 'Gilete', 'Ginástica'];
                break;
            case 'GO':
                examples = ['Gol', 'Goleiro', 'Gosto', 'Gostoso', 'Golpe'];
                break;
            case 'GU':
                examples = ['Guitarra', 'Guitarrista', 'Guarda', 'Guloseima', 'Guerreiro'];
                break;
            case 'HA':
                examples = ['Habilidade', 'Habitante', 'Hábito', 'Hambúrguer', 'Harmonia'];
                break;
            case 'HE':
                examples = ['Hebraico', 'Hegemonia', 'Hélice', 'Herói', 'Heterogêneo'];
                break;
            case 'HI':
                examples = ['Hino', 'Hidrico', 'Higiene', 'Hipnose', 'Hipopótamo'];
                break;
            case 'HO':
                examples = ['Hoje', 'Homem', 'Honra', 'Hora', 'Horizontal'];
                break;
            case 'HU':
                examples = ['Humano', 'Humilde', 'Humor', 'Húmus', 'Húngaro'];
                break;
            case 'JA':
                examples = ['Janela', 'Jarro', 'Jardim', 'Jato', 'Jantar'];
                break;
            case 'JE':
                examples = ['Jejum', 'Jesus', 'Jegue', 'Jeguinho', 'Jequitibá'];
                break;
            case 'JI':
                examples = ['Jiboia', 'Jiló', 'Jipe', 'Jinga', 'Jiboia-Verde'];
                break;
            case 'JO':
                examples = ['Jogo', 'Joelho', 'Jóia', 'Jornal', 'Jovem'];
                break;
            case 'JU':
                examples = ['Juiz', 'Júri', 'Justiça', 'Juramento', 'Junho'];
                break;
            case 'LA':
                examples = ['Lagarto', 'Lâmpada', 'Lago', 'Lagoa', 'Lápis'];
                break;
            case 'LE':
                examples = ['Leão', 'Leoa', 'Leitura', 'Leite', 'Lenha'];
                break;
            case 'LI':
                examples = ['Livro', 'Liberdade', 'Licença', 'Lixo', 'Lixeira'];
                break;
            case 'LO':
                examples = ['Loja', 'Loucura', 'Louco', 'Lobisomem', 'Local'];
                break;
            case 'LU':
                examples = ['Luz', 'Lugar', 'Luxo', 'Lutador', 'Luta'];
                break;
            case 'MA':
                examples = ['Mamãe', 'Mãe', 'Maçã', 'Manta', 'Manhâ'];
                break;
            case 'ME':
                examples = ['Memória', 'Medo', 'Melodia', 'Mesa', 'Mercado'];
                break;
            case 'MI':
                examples = ['Milho', 'Misterio', 'Milagre', 'Minuto', 'Miúdo'];
                break;
            case 'MO':
                examples = ['Moça', 'Montanha', 'Monumento', 'Moço', 'Morte'];
                break;
            case 'MU':
                examples = ['Múmia', 'Muralha', 'Muro', 'Música', 'Mundo'];
                break;
            case 'NA':
                examples = ['Nadar', 'Nada', 'Návio', 'Nascimento', 'Namorada'];
                break;
            case 'NE':
                examples = ['Névoa', 'Negócio', 'Necessário', 'Nenhum', 'Nervoso'];
                break;
            case 'NI':
                examples = ['Ninho', 'Nível', 'Nitidez', 'Nitrogênio', 'Nítido'];
                break;
            case 'NO':
                examples = ['Noite', 'Notícia', 'Normas', 'Nota', 'Nome'];
                break;
            case 'NU':
                examples = ['Número', 'Nuvem', 'Nutrição', 'Núcleo', 'Nudez'];
                break;
            case 'PA':
                examples = ['Palavra', 'Pássaro', 'Pano', 'Palco', 'Papel'];
                break;
            case 'PE':
                examples = ['Pessoa', 'Personagem', 'Pássaro', 'Paredão', 'Pastel'];
                break;
            case 'PI':
                examples = ['Picolé', 'Piano', 'Pintura', 'Pilha', 'Pipoca'];
                break;
            case 'PO':
                examples = ['Poder', 'Poema', 'Polícia', 'Poço', 'Porta'];
                break;
            case 'PU':
                examples = ['Pulga', 'Pulmão', 'Pular', 'Pulso', 'Pudim'];
                break;
            case 'RA':
                examples = ['Raio', 'Rainha', 'Rato', 'Ração', 'Raposa'];
                break;
            case 'RE':
                examples = ['Resposta', 'Refeição', 'Residência', 'Reset', 'Restart'];
                break;
            case 'RI':
                examples = ['Ridículo', 'Ritmo', 'Risada', 'Rima', 'Risco'];
                break;
            case 'RO':
                examples = ['Rosa', 'Roda', 'Rosto', 'Roupa', 'Robô'];
                break;
            case 'RU':
                examples = ['Rua', 'Rumo', 'Rugido', 'Ruína', 'Rumor'];
                break;
            case 'SA':
                examples = ['Sapo', 'Sapato', 'Saboneteira', 'Sal', 'Salvador'];
                break;
            case 'SE':
                examples = ['Semana', 'Segredo', 'Selva', 'Sentido', 'Seguro'];
                break;
            case 'SI':
                examples = ['Sinal', 'Sistema', 'Sílaba', 'Simples', 'Símbolo'];
                break;
            case 'SO':
                examples = ['Sol', 'Som', 'Soldado', 'Sorriso', 'Sociedade'];
                break;
            case 'SU':
                examples = ['Submarino', 'Sul', 'Sucesso', 'Surpresa', 'Suporte'];
                break;
            case 'TA':
                examples = ['Tarde', 'Tabuleiro', 'Tatuagem', 'Talento', 'Tarefa'];
                break;
            case 'TE':
                examples = ['Terra', 'Terreno', 'Tempo', 'Texto', 'Telefone'];
                break;
            case 'TI':
                examples = ['Time', 'Tinta', 'Tijolo', 'Timido', 'Tigre'];
                break;
            case 'TO':
                examples = ['Torneio', 'Toalha', 'Total', 'Tomada', 'Tocar'];
                break;
            case 'TU':
                examples = ['Tulipa', 'Tucano', 'Turista', 'Túnel', 'Tumulto'];
                break;
            case 'VA':
                examples = ['Vaca', 'Vaso', 'Varanda', 'Vaqueiro', 'Vassoura'];
                break;
            case 'VE':
                examples = ['Velocidade', 'Verdade', 'Ventania', 'Vento', 'Vegetal'];
                break;
            case 'VI':
                examples = ['Vida', 'Visão', 'Vitamina', 'Vingança', 'Visinho'];
                break;
            case 'VO':
                examples = ['Você', 'Vontade', 'Voz', 'Voltar', 'Volante'];
                break;
            case 'VU':
                examples = ['Vulcão', 'Vulto', 'Vulgar', 'Vudu', 'Vulcanismo'];
                break;
            case 'XA':
                examples = ['Xadrez', 'Xarope', 'Xale', 'Xará', 'Xamego'];
                break;
            case 'XE':
                examples = ['Xerife', 'Xereta', 'Xerocópia', 'Xenofobia', 'Xerém'];
                break;
            case 'XI':
                examples = ['Xícara', 'Xique', 'Xilocaína', 'Xilofone', 'Xisto'];
                break;
            case 'XO':
                examples = ['Xodó', 'Xoxo', 'Xonar', 'Xopotó', 'Xoque'];
                break;
            case 'XU':
                examples = ['Xuxa', 'Xucro', 'Xuvisco', 'Xulé', 'Xulipa'];
                break;
            case 'ZA':
                examples = ['Zangão', 'Zangado', 'Zarpar', 'Zarcão', 'Zabumba'];
                break;
            case 'ZE':
                examples = ['Zebra', 'Zelador', 'Zelo', 'Zero', 'Zerar'];
                break;
            case 'ZI':
                examples = ['Zíper', 'Zigoto', 'Zimbro', 'Zinco', 'Zigue'];
                break;
            case 'ZO':
                examples = ['Zoológico', 'Zona', 'Zombaria', 'Zoom', 'Zodíaco'];
                break;
            case 'ZU':
                examples = ['Zumbido', 'Zumbi', 'Zunir', 'Zumir', 'Zumbo'];
                break;
            default:
                examples = [`${letter}la`, `${letter}to`, `${letter}ca`, `${letter}rin`, `${letter}de`];
        }
    }

    examples.forEach(example => {
        const li = document.createElement('li');
        li.textContent = example;
        examplesList.appendChild(li);
    });

    // Atualiza o áudio da letra
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

// Verifica a escrita (versão melhorada)
function checkWriting() {
    const canvas = document.getElementById('writingCanvas');
    const ctx = canvas.getContext('2d');
    const feedback = document.getElementById('writingFeedback');
    const letterToWrite = document.getElementById('letterToWrite').textContent;

    // Verifica se o canvas está vazio
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const isEmpty = !Array.from(imageData.data).some(channel => channel !== 0);

    if (isEmpty) {
        feedback.textContent = 'Desenhe a letra primeiro!';
        feedback.className = 'writing-feedback error';
        feedback.style.display = 'block';
        playSound('error');
        return;
    }

    // Verificação melhorada
    const isCorrect = checkLetterShape(letterToWrite, canvas);

    if (isCorrect) {
        feedback.textContent = 'Parabéns! Você escreveu a letra corretamente!';
        feedback.className = 'writing-feedback success';
        playSound('success');

        // Atualiza o progresso
        updateProgress(5, `write_${letterToWrite}`);

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

// Função auxiliar para verificar o formato da letra
function checkLetterShape(letter, canvas) {
    // Implementação simplificada - em produção use uma biblioteca de reconhecimento
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;

    // Verifica se há pixels desenhados
    let hasDrawing = false;
    for (let i = 0; i < pixelData.length; i += 4) {
        if (pixelData[i] !== 0 || pixelData[i + 1] !== 0 || pixelData[i + 2] !== 0) {
            hasDrawing = true;
            break;
        }
    }

    if (!hasDrawing) return false;

    // Calcula a área do desenho
    let minX = canvas.width, maxX = 0, minY = canvas.height, maxY = 0;
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;
            if (pixelData[index] !== 0 || pixelData[index + 1] !== 0 || pixelData[index + 2] !== 0) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    const width = maxX - minX;
    const height = maxY - minY;

    // Verifica tamanho mínimo
    if (width < 20 || height < 20) return false;

    // Verificação baseada na letra (simplificado)
    const aspectRatio = width / height;
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    // Verificações específicas para algumas letras
    switch (letter.toUpperCase()) {

        case 'A':
            return aspectRatio > 0.7 && aspectRatio < 1.5;
        case 'B':
            return height > width * 1.5;
        case 'C':
            return aspectRatio > 1;
        case 'D':
            return height > width;
        case 'E':
            return aspectRatio > 1.2;
        case 'O':
            return Math.abs(aspectRatio - 1) < 0.3;
        case 'F':
            return width > height * 2;
        case 'G':
            return width > 50 && height < 50;
        case 'H':
            return width === height;
        case 'I':
            return height > width * 3;
        case 'J':
            return width > height * 1.5;
        case 'K':
            return height > 100;
        case 'L':
            return width > 100;
        case 'M':
            return width > height * 1.1 && width < height * 1.3;
        case 'N':
            return aspectRatio < 0.5;
        case 'P':
            return width > height && width < height * 1.5;
        case 'Q':
            return Math.abs(aspectRatio - 1) < 0.1;
        case 'R':
            return height > width && height < width * 1.5;
        case 'S':
            return width > 60 && height > 60;
        case 'T':
            return height > width * 2;
        case 'U':
            return width > 40 && height < 80;
        case 'V':
            return width < height / 2;
        case 'W':
            return width > height * 2.5;
        case 'X':
            return Math.abs(aspectRatio - 1) < 0.2;
        case 'Y':
            return height > width * 2.5;
        case 'Z':
            return width > 70 && height > 70;
        default:
            // Para outras letras, usa uma verificação genérica
            return width > 30 && height > 30;
    }
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
            showReadingPractice();
            break;
        case 'formacao':
            showWordFormation();
            break;
    }

    playSound('click');
}

// Configura a prática de leitura
function setupReadingPractice() {
    const readingLevels = [
        {
            level: 1,
            title: "Palavras Simples",
            words: ["casa", "bola", "gato", "pato", "mão", "pé", "sol", "lua"],
            audioPrefix: "sons/palavras/"
        },
        {
            level: 2,
            title: "Frases Curtas",
            words: ["O gato mia.", "O sol brilha.", "A bola pula.", "Eu vejo a lua."],
            audioPrefix: "sons/frases-curtas/"
        },
        {
            level: 3,
            title: "Frases Longas",
            words: ["O gato preto pula alto.", "A menina come uma maçã.", "O carro azul é rápido."],
            audioPrefix: "sons/frases-longas/"
        }
    ];

    // Função para mostrar a prática de leitura
    window.showReadingPractice = function () {
        const practiceArea = document.getElementById('practiceArea');
        practiceArea.innerHTML = `
                <div class="reading-practice">
                    <h3>Praticar Leitura</h3>
                    <div class="reading-levels">
                        ${readingLevels.map(level => `
                            <button class="reading-level-btn" onclick="startReadingLevel(${level.level})">
                                ${level.title}
                            </button>
                        `).join('')}
                    </div>
                    <div class="reading-content" id="readingContent"></div>
                </div>
            `;
    };

    // Função para iniciar um nível de leitura
    window.startReadingLevel = function (level) {
        const selectedLevel = readingLevels.find(l => l.level === level);
        const readingContent = document.getElementById('readingContent');

        readingContent.innerHTML = `
                <h4>${selectedLevel.title}</h4>
                <div class="reading-words">
                    ${selectedLevel.words.map(word => `
                        <div class="reading-word-card" onclick="speakWord('${word}', '${selectedLevel.audioPrefix}')">
                            <p>${word}</p>
                            <i class="fas fa-volume-up"></i>
                        </div>
                    `).join('')}
                </div>
                <button class="back-btn" onclick="showReadingPractice()">
                    <i class="fas fa-arrow-left"></i> Voltar
                </button>
            `;

        // Atualiza o progresso
        updateProgress(0, `reading_level_${level}_viewed`);
    };

    // Função para falar a palavra/frase
    window.speakWord = function (word, audioPrefix) {
        // Tenta usar a API de síntese de voz
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'pt-BR';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }

        // Tenta tocar o áudio gravado
        try {
            const audio = new Audio(`${audioPrefix}${word.toLowerCase().replace(/[^a-z]/g, '')}.mp3`);
            audio.play().catch(e => console.log("Não foi possível tocar o áudio:", e));
        } catch (e) {
            console.log("Erro ao carregar áudio:", e);
        }

        // Atualiza o progresso
        updateProgress(1, `word_${word.toLowerCase().replace(/[^a-z]/g, '')}_read`);
        playSound('correct');
    };
}

// Configura a formação de palavras
function setupWordFormation() {
    const wordGroups = [
        {
            category: "Animais",
            words: ["gato", "cachorro", "pássaro", "peixe"],
            audio: "sons/animais/"
        },
        {
            category: "Frutas",
            words: ["maçã", "banana", "uva", "laranja"],
            audio: "sons/frutas/"
        },
        {
            category: "Casa",
            words: ["casa", "porta", "janela", "mesa"],
            audio: "sons/casa/"
        }
    ];

    // Função para mostrar a formação de palavras
    window.showWordFormation = function () {
        const practiceArea = document.getElementById('practiceArea');
        practiceArea.innerHTML = `
                <div class="word-formation">
                    <h3>Formar Palavras</h3>
                    <div class="word-categories">
                        ${wordGroups.map(group => `
                            <button class="word-category-btn" onclick="startWordCategory('${group.category}')">
                                ${group.category}
                            </button>
                        `).join('')}
                    </div>
                    <div class="word-formation-area" id="wordFormationArea"></div>
                </div>
            `;
    };

    // Função para iniciar uma categoria de palavras
    window.startWordCategory = function (category) {
        const selectedGroup = wordGroups.find(g => g.category === category);
        const wordFormationArea = document.getElementById('wordFormationArea');

        // Seleciona uma palavra aleatória do grupo
        const targetWord = selectedGroup.words[Math.floor(Math.random() * selectedGroup.words.length)];
        const syllables = splitIntoSyllables(targetWord);

        // Embaralha as sílabas
        const shuffledSyllables = shuffleArray([...syllables]);

        wordFormationArea.innerHTML = `
                <h4>${category}: Forme a palavra</h4>
                <div class="target-word" id="targetWord">${'_ '.repeat(syllables.length)}</div>
                <div class="syllables-container" id="syllablesContainer">
                    ${shuffledSyllables.map((syl, index) => `
                        <div class="syllable" draggable="true" data-syllable="${syl}" id="syl${index}">
                            ${syl}
                        </div>
                    `).join('')}
                </div>
                <button class="check-word-btn" onclick="checkFormedWord('${targetWord}', '${selectedGroup.audio}')">
                    <i class="fas fa-check"></i> Verificar
                </button>
                <button class="back-btn" onclick="showWordFormation()">
                    <i class="fas fa-arrow-left"></i> Voltar
                </button>
            `;

        setupDragAndDrop();
    };

    // Função para dividir palavras em sílabas (simplificado)
    function splitIntoSyllables(word) {
        // Esta é uma implementação simplificada - na prática seria mais complexa
        const vowels = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú', 'ã', 'õ', 'â', 'ê', 'ô'];
        let syllables = [];
        let currentSyllable = '';

        for (let i = 0; i < word.length; i++) {
            currentSyllable += word[i];
            if (vowels.includes(word[i].toLowerCase())) {
                syllables.push(currentSyllable);
                currentSyllable = '';
            }
        }

        if (currentSyllable) {
            syllables[syllables.length - 1] += currentSyllable;
        }

        return syllables.length > 0 ? syllables : [word];
    }

    // Configura o arrastar e soltar
    function setupDragAndDrop() {
        const syllables = document.querySelectorAll('.syllable');
        const targetWord = document.getElementById('targetWord');
        let droppedSyllables = [];

        syllables.forEach(syllable => {
            syllable.addEventListener('dragstart', function (e) {
                e.dataTransfer.setData('text/plain', this.id);
            });
        });

        targetWord.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        targetWord.addEventListener('drop', function (e) {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain');
            const draggedSyllable = document.getElementById(id);
            const syllable = draggedSyllable.dataset.syllable;

            if (!droppedSyllables.includes(id)) {
                droppedSyllables.push(id);
                this.textContent = this.textContent.replace('_', syllable);
                draggedSyllable.style.visibility = 'hidden';
                playSound('click');
            }
        });
    }

    // Função para verificar a palavra formada
    window.checkFormedWord = function (targetWord, audioPrefix) {
        const targetWordElement = document.getElementById('targetWord');
        const syllablesContainer = document.getElementById('syllablesContainer');
        const formedWord = targetWordElement.textContent.replace(/\s/g, '');

        if (formedWord === targetWord) {
            targetWordElement.innerHTML = `<span style="color: #2ecc71">${formedWord}</span>`;
            playSound('success');

            // Toca o áudio da palavra correta
            try {
                const audio = new Audio(`${audioPrefix}${targetWord.toLowerCase().replace(/[^a-z]/g, '')}.mp3`);
                audio.play().catch(e => console.log("Não foi possível tocar o áudio:", e));
            } catch (e) {
                console.log("Erro ao carregar áudio:", e);
            }

            // Atualiza o progresso
            updateProgress(5, `word_formed_${targetWord}`);

            // Mostra mensagem de sucesso
            setTimeout(() => {
                syllablesContainer.innerHTML += `
                        <div class="feedback success">
                            Parabéns! Você formou a palavra corretamente!
                        </div>
                    `;

                // Mostra a próxima palavra após 3 segundos
                setTimeout(() => {
                    const currentCategory = wordGroups.find(g =>
                        g.words.includes(targetWord))?.category;
                    if (currentCategory) {
                        startWordCategory(currentCategory);
                    }
                }, 3000);
            }, 500);
        } else {
            playSound('error');
            targetWordElement.innerHTML = `<span style="color: #e74c3c">${formedWord}</span>`;

            // Mostra mensagem de erro
            syllablesContainer.innerHTML += `
                    <div class="feedback error">
                        Tente novamente! A palavra correta é: ${targetWord}
                    </div>
                `;

            // Reseta após 2 segundos
            setTimeout(() => {
                const currentCategory = wordGroups.find(g =>
                    g.words.includes(targetWord))?.category;
                if (currentCategory) {
                    startWordCategory(currentCategory);
                }
            }, 2000);
        }
    };
} 