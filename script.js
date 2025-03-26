// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function () {
    // Simula um tempo de carregamento
    setTimeout(function () {
        document.getElementById('loadingScreen').style.display = 'none';

        // Inicializa a aplicação
        initApp();
         
    }, 2000);
});


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
                'PU', 'QUA', 'QUE', 'QUI', 'RA', 'RE', 'RI', 'RO', 'RU', 'SA', 'SE', 'SI', 'SO', 'SU',
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
            case 'QUA':
                examples = ['Quadro', 'Quarto', 'Quando', 'Quasar', 'Quadrado'];
                break;
            case 'QUE':
                examples = ['Quente', 'Queijo', 'Quem', 'Quebrar', 'Queda'];
                break;
            case 'QUI':
                examples = ['Quilo', 'Quinta', 'Quiosque', 'Quiabo', 'Quimono'];
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

// Configura o canvas de escrita (ATUALIZADO)
function setupWritingCanvas() {
    const canvas = document.getElementById('writingCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Ajusta para dispositivos com alta densidade de pixels
    const scale = window.devicePixelRatio || 1;
    canvas.width = 300 * scale;
    canvas.height = 300 * scale;
    ctx.scale(scale, scale);
    canvas.style.width = '300px';
    canvas.style.height = '300px';

    // Configurações do pincel
    ctx.strokeStyle = '#9b59b6';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Eventos do mouse/touch
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    function handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const mouseEvent = {
            offsetX: touch.clientX - rect.left,
            offsetY: touch.clientY - rect.top
        };
        startDrawing(mouseEvent);
    }

    function handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const mouseEvent = {
            offsetX: touch.clientX - rect.left,
            offsetY: touch.clientY - rect.top
        };
        draw(mouseEvent);
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

// Verifica a escrita (ATUALIZADO)
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

    // Verificação simplificada - sempre considera correto nesta versão
    const isCorrect = true;

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

// Função para iniciar atividades de prática (ATUALIZADA)
window.startPractice = function (type) {
    const practiceArea = document.getElementById('practiceArea');

    // Esconde todas as práticas
    document.querySelectorAll('.practice-section').forEach(div => {
        div.style.display = 'none';
    });

    switch (type) {
        case 'escrita':
            const writingPractice = document.getElementById('writingPractice');
            if (!writingPractice) {
                // Se não existir, cria a seção de escrita
                practiceArea.innerHTML = `
                    <div class="writing-practice practice-section" id="writingPractice" style="display: block;">
                        <h3>Escreva a letra: <span id="letterToWrite">A</span></h3>
                        <div class="writing-canvas-container">
                            <canvas id="writingCanvas" width="300" height="300"></canvas>
                            <div class="writing-controls">
                                <button onclick="clearCanvas()"><i class="fas fa-eraser"></i> Limpar</button>
                                <button onclick="checkWriting()"><i class="fas fa-check"></i> Verificar</button>
                            </div>
                        </div>
                        <div class="writing-feedback" id="writingFeedback"></div>
                    </div>
                `;
                setupWritingCanvas();
            } else {
                writingPractice.style.display = 'block';
            }

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
};

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

    // Função para mostrar a prática de leitura
    window.showReadingPractice = function () {
        const practiceArea = document.getElementById('practiceArea');
        practiceArea.innerHTML = `
            <div class="reading-practice practice-section">
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
}

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

// Configura a formação de palavras
function setupWordFormation() {
    const wordGroups = [
        {
            category: "Animais",
            words: ["gato", "cachorro", "pássaro", "peixe", "elefante", "vaca", "leão", "zebra", "macaco", "tigre"],
            audio: "sons/animais/"
        },
        {
            category: "Frutas",
            words: ["maçã", "banana", "uva", "laranja", "tangerina", "caju", "manga", "umbu", "siriguela", "pêra"],
            audio: "sons/frutas/"
        },
        {
            category: "Casa",
            words: ["casa", "porta", "janela", "mesa", "pia", "cama", "sofá", "parede", "geladeira", "televisão"],
            audio: "sons/casa/"
        }
    ];

    // Função principal para mostrar a formação de palavras
    window.showWordFormation = function() {
        const practiceArea = document.getElementById('practiceArea');
        practiceArea.innerHTML = `
            <div class="word-formation practice-section">
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

    // Inicia uma categoria de palavras
    window.startWordCategory = function(category) {
        const selectedGroup = wordGroups.find(g => g.category === category);
        const wordFormationArea = document.getElementById('wordFormationArea');
        
        // Seleciona uma palavra aleatória do grupo
        const targetWord = selectedGroup.words[Math.floor(Math.random() * selectedGroup.words.length)];
        const syllables = correctSyllableSeparation(targetWord);

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
            <div class="word-formation-buttons">
                <button class="check-word-btn" onclick="checkFormedWord('${targetWord}', '${selectedGroup.audio}')">
                    <i class="fas fa-check"></i> Verificar
                </button>
                <button class="hint-btn" onclick="giveHint()">
                    <i class="fas fa-lightbulb"></i> Dica
                </button>
                <button class="back-btn" onclick="showWordFormation()">
                    <i class="fas fa-arrow-left"></i> Voltar
                </button>
            </div>
            <div id="hintArea"></div>
            <div id="feedbackArea"></div>
        `;

        setupDragAndDrop();
        setupSyllableClick();
    };

    // Divisão silábica correta segundo as regras do português brasileiro
    function correctSyllableSeparation(word) {
        // Normaliza a palavra (remove acentos e converte para minúsculas)
        const normalized = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const syllables = [];
        let currentSyllable = '';
        let position = 0;
        
        // Regras de divisão silábica
        while (position < normalized.length) {
            const currentChar = normalized[position];
            const nextChar = normalized[position + 1] || '';
            const nextNextChar = normalized[position + 2] || '';
            
            // 1. Vogais formam núcleos silábicos
            if (isVowel(currentChar)) {
                currentSyllable += word[position]; // Usa o caractere original (pode ter acento)
                position++;
                
                // 2. Ditongos e tritongos (vogais + semivogais na mesma sílaba)
                if (position < normalized.length && isSemiVowel(normalized[position])) {
                    currentSyllable += word[position];
                    position++;
                    
                    // Tritongo (raro, ex: 'quão')
                    if (position < normalized.length && isSemiVowel(normalized[position])) {
                        currentSyllable += word[position];
                        position++;
                    }
                }
                
                syllables.push(currentSyllable);
                currentSyllable = '';
                continue;
            }
            
            // 3. Consoantes
            if (isConsonant(currentChar)) {
                // 3.1. Consoantes não seguem sozinhas (exceto no final)
                if (currentSyllable === '') {
                    currentSyllable += word[position];
                    position++;
                    
                    // 3.2. Encontros consonantais
                    if (position < normalized.length && isConsonant(normalized[position])) {
                        const consonantGroup = currentChar + normalized[position];
                        
                        // Grupos consonantais inseparáveis (br, cr, dr, etc.)
                        if (isInseparableConsonantGroup(consonantGroup)) {
                            currentSyllable += word[position];
                            position++;
                            
                            // Se for 'qu' ou 'gu' seguido de vogal, trata separadamente
                            if ((consonantGroup === 'qu' || consonantGroup === 'gu') && 
                                position < normalized.length && isVowel(normalized[position])) {
                                syllables.push(currentSyllable);
                                currentSyllable = '';
                                continue;
                            }
                        } 
                        // Grupos separáveis (ex: 'cn', 'tm', 'ps')
                        else {
                            syllables.push(currentSyllable);
                            currentSyllable = word[position];
                            position++;
                            continue;
                        }
                    }
                    
                    // Se a próxima letra é vogal, completa a sílaba
                    if (position < normalized.length && isVowel(normalized[position])) {
                        continue;
                    } else {
                        syllables.push(currentSyllable);
                        currentSyllable = '';
                        continue;
                    }
                }
                
                // Consoante no final da sílaba (ex: 'cantar' -> can-tar)
                if (currentSyllable !== '' && isVowel(currentSyllable[currentSyllable.length - 1])) {
                    syllables.push(currentSyllable);
                    currentSyllable = word[position];
                    position++;
                    continue;
                }
            }
            
            // Caracteres não reconhecidos (não deve acontecer com palavras válidas)
            currentSyllable += word[position];
            position++;
        }
        
        // Adiciona qualquer sílaba restante
        if (currentSyllable !== '') {
            syllables.push(currentSyllable);
        }
        
        // Ajustes finais para palavras com hífen ou apóstrofo
        return adjustSpecialCases(syllables, word);
    }

    // Funções auxiliares para divisão silábica
    function isVowel(char) {
        return /[aeiouáéíóúâêîôûãõäëïöüàèìòù]/.test(char.toLowerCase());
    }

    function isSemiVowel(char) {
        return /[iíîïuúûü]/.test(char.toLowerCase()) || char.toLowerCase() === 'y';
    }

    function isConsonant(char) {
        return /[bcçdfghjklmnpqrstvwxyz]/.test(char.toLowerCase());
    }

    function isInseparableConsonantGroup(group) {
        const inseparableGroups = [
            'bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'tr', 'vr',
            'qu', 'gu'
        ];
        return inseparableGroups.includes(group.toLowerCase());
    }

    function adjustSpecialCases(syllables, originalWord) {
        // Trata casos especiais como hífens e apóstrofos
        const result = [];
        let currentSyllable = '';
        
        for (let i = 0; i < syllables.length; i++) {
            const syl = syllables[i];
            
            // Se a sílaba contém hífen, divide
            if (syl.includes('-')) {
                const parts = syl.split('-');
                result.push(parts[0]);
                if (parts[1]) result.push('-' + parts[1]);
                continue;
            }
            
            // Se a sílaba contém apóstrofo, divide
            if (syl.includes("'")) {
                const parts = syl.split("'");
                result.push(parts[0]);
                if (parts[1]) result.push("'" + parts[1]);
                continue;
            }
            
            result.push(syl);
        }
        
        return result;
    }

    // Configura o arrastar e soltar
    function setupDragAndDrop() {
        const syllables = document.querySelectorAll('.syllable');
        const targetWord = document.getElementById('targetWord');
        let droppedSyllables = [];

        syllables.forEach(syllable => {
            syllable.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData('text/plain', this.id);
            });
        });

        targetWord.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });

        targetWord.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });

        targetWord.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            const id = e.dataTransfer.getData('text/plain');
            const draggedSyllable = document.getElementById(id);
            
            if (draggedSyllable && !droppedSyllables.includes(id)) {
                const syllable = draggedSyllable.dataset.syllable;
                droppedSyllables.push(id);
                
                // Substitui o primeiro underline pela sílaba
                this.textContent = this.textContent.replace('_', syllable);
                draggedSyllable.style.visibility = 'hidden';
                playSound('click');
            }
        });
    }

    // Configura clique nas sílabas como alternativa ao drag and drop
    function setupSyllableClick() {
        const syllables = document.querySelectorAll('.syllable');
        const targetWord = document.getElementById('targetWord');
        let droppedSyllables = [];

        syllables.forEach(syllable => {
            syllable.addEventListener('click', function() {
                if (!droppedSyllables.includes(this.id)) {
                    const syllableText = this.dataset.syllable;
                    droppedSyllables.push(this.id);
                    
                    // Substitui o primeiro underline pela sílaba
                    targetWord.textContent = targetWord.textContent.replace('_', syllableText);
                    this.style.visibility = 'hidden';
                    playSound('click');
                }
            });
        });
    }

    // Função para dar dica
    window.giveHint = function() {
        const targetWord = document.querySelector('.target-word').textContent;
        const syllablesContainer = document.getElementById('syllablesContainer');
        const syllables = Array.from(syllablesContainer.querySelectorAll('.syllable'));
        
        // Encontra a primeira sílaba que ainda não foi usada
        const unusedSyllable = syllables.find(syl => 
            !syl.style.visibility || syl.style.visibility !== 'hidden');
        
        if (unusedSyllable) {
            const hintArea = document.getElementById('hintArea');
            hintArea.innerHTML = `
                <div class="hint-message">
                    Dica: A próxima sílaba é <strong>${unusedSyllable.dataset.syllable}</strong>
                </div>
            `;
            
            // Destaque visual na sílaba
            unusedSyllable.classList.add('hint-highlight');
            setTimeout(() => {
                unusedSyllable.classList.remove('hint-highlight');
            }, 2000);
            
            playSound('hint');
            updateProgress(-1, 'used_hint'); // Penaliza por usar dica
        }
    };

    // Função para verificar a palavra formada
    window.checkFormedWord = function(targetWord, audioPrefix) {
        const targetWordElement = document.getElementById('targetWord');
        const feedbackArea = document.getElementById('feedbackArea');
        const formedWord = targetWordElement.textContent.replace(/\s/g, '');
        const normalizedFormed = formedWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const normalizedTarget = targetWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        // Limpa feedback anterior
        feedbackArea.innerHTML = '';

        if (normalizedFormed === normalizedTarget) {
            // Resposta correta
            targetWordElement.innerHTML = `<span class="correct-word">${formedWord}</span>`;
            playSound('success');
            
            // Toca o áudio da palavra correta
            try {
                const audio = new Audio(`${audioPrefix}${normalizedTarget}.mp3`);
                audio.play().catch(e => console.log("Não foi possível tocar o áudio:", e));
            } catch (e) {
                console.log("Erro ao carregar áudio:", e);
            }
            
            // Atualiza o progresso
            updateProgress(5, `word_formed_${targetWord}`);
            
            // Feedback positivo
            feedbackArea.innerHTML = `
                <div class="feedback success">
                    <i class="fas fa-check-circle"></i> Parabéns! Você formou a palavra corretamente!
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
        } else {
            // Resposta incorreta
            playSound('error');
            targetWordElement.innerHTML = `<span class="incorrect-word">${formedWord}</span>`;
            
            // Feedback com a palavra correta
            feedbackArea.innerHTML = `
                <div class="feedback error">
                    <i class="fas fa-times-circle"></i> Tente novamente! A palavra correta é: 
                    <strong>${targetWord}</strong>
                </div>
            `;
            
            // Mostra a pronúncia correta
            try {
                const audio = new Audio(`${audioPrefix}${normalizedTarget}.mp3`);
                audio.play().catch(e => console.log("Não foi possível tocar o áudio:", e));
            } catch (e) {
                console.log("Erro ao carregar áudio:", e);
            }
            
            // Reseta após 3 segundos
            setTimeout(() => {
                const currentCategory = wordGroups.find(g => 
                    g.words.includes(targetWord))?.category;
                if (currentCategory) {
                    startWordCategory(currentCategory);
                }
            }, 3000);
        }
    };

    // Função para embaralhar array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

// Função auxiliar para embaralhar array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Configura os jogos (ATUALIZADO com Jogo da Forca e Quiz)
function setupGames() {
    // Implementação do jogo da memória
    window.startGame = function (gameType) {
        const gameArea = document.getElementById('gameArea');

        if (gameType === 'memoria') {
            gameArea.innerHTML = `
                <div class="memory-game">
                    <h3>Jogo da Memória</h3>
                    <div class="memory-grid" id="memoryGrid"></div>
                    <button class="back-btn" onclick="document.getElementById('gameArea').innerHTML = ''">
                        <i class="fas fa-arrow-left"></i> Voltar
                    </button>
                </div>
            `;

            setupMemoryGame();
        } else if (gameType === 'forca') {
            gameArea.innerHTML = `
                <div class="hangman-game">
                    <h3>Jogo da Forca</h3>
                    <div class="hangman-drawing" id="hangmanDrawing">
                        <svg height="250" width="200">
                            <!-- Base -->
                            <line x1="20" y1="230" x2="100" y2="230" style="stroke:black;stroke-width:3" />
                            <!-- Poste -->
                            <line x1="60" y1="230" x2="60" y2="30" style="stroke:black;stroke-width:3" />
                            <!-- Topo -->
                            <line x1="60" y1="30" x2="160" y2="30" style="stroke:black;stroke-width:3" />
                            <!-- Corda -->
                            <line x1="160" y1="30" x2="160" y2="60" style="stroke:black;stroke-width:3" />
                            <!-- Cabeça (inicialmente invisível) -->
                            <circle cx="160" cy="80" r="20" style="stroke:black;stroke-width:3;fill:none;visibility:hidden" id="head" />
                            <!-- Corpo (inicialmente invisível) -->
                            <line x1="160" y1="100" x2="160" y2="160" style="stroke:black;stroke-width:3;visibility:hidden" id="body" />
                            <!-- Braço esquerdo (inicialmente invisível) -->
                            <line x1="160" y1="120" x2="130" y2="140" style="stroke:black;stroke-width:3;visibility:hidden" id="leftArm" />
                            <!-- Braço direito (inicialmente invisível) -->
                            <line x1="160" y1="120" x2="190" y2="140" style="stroke:black;stroke-width:3;visibility:hidden" id="rightArm" />
                            <!-- Perna esquerda (inicialmente invisível) -->
                            <line x1="160" y1="160" x2="140" y2="190" style="stroke:black;stroke-width:3;visibility:hidden" id="leftLeg" />
                            <!-- Perna direita (inicialmente invisível) -->
                            <line x1="160" y1="160" x2="180" y2="190" style="stroke:black;stroke-width:3;visibility:hidden" id="rightLeg" />
                        </svg>
                    </div>
                    <div class="hangman-word" id="hangmanWord"></div>
                    <div class="hangman-wrong-letters" id="hangmanWrongLetters"></div>
                    <div class="hangman-keyboard" id="hangmanKeyboard"></div>
                    <button class="back-btn" onclick="document.getElementById('gameArea').innerHTML = ''">
                        <i class="fas fa-arrow-left"></i> Voltar
                    </button>
                </div>
            `;

            setupHangmanGame();
        } else if (gameType === 'quiz') {
            gameArea.innerHTML = `
                <div class="quiz-game">
                    <h3>Quiz das Letras</h3>
                    <div class="quiz-container" id="quizContainer"></div>
                    <button class="back-btn" onclick="document.getElementById('gameArea').innerHTML = ''">
                        <i class="fas fa-arrow-left"></i> Voltar
                    </button>
                </div>
            `;

            setupQuizGame();
        }
    };

    function setupMemoryGame() {
        const memoryGrid = document.getElementById('memoryGrid');
        const cards = [
            { letter: 'A', image: 'imagens/letra_a.png' },
            { letter: 'B', image: 'imagens/letra_b.png' },
            { letter: 'C', image: 'imagens/letra_c.png' },
            { letter: 'D', image: 'imagens/letra_d.png' }
        ];

        // Duplica as cartas para formar pares
        const gameCards = [...cards, ...cards];

        // Embaralha as cartas
        shuffleArray(gameCards);

        // Cria as cartas no grid
        memoryGrid.innerHTML = '';
        gameCards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card';
            cardElement.dataset.index = index;
            cardElement.innerHTML = `
                <div class="memory-card-front">
                    <img src="${card.image}" alt="${card.letter}">
                </div>
                <div class="memory-card-back">
                    ?
                </div>
            `;
            cardElement.addEventListener('click', flipCard);
            memoryGrid.appendChild(cardElement);
        });

        let flippedCards = [];
        let matchedPairs = 0;

        function flipCard() {
            if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
                this.classList.add('flipped');
                flippedCards.push(this);
                playSound('flip');

                if (flippedCards.length === 2) {
                    checkForMatch();
                }
            }
        }

        function checkForMatch() {
            const card1 = flippedCards[0];
            const card2 = flippedCards[1];
            const letter1 = card1.querySelector('.memory-card-front img').alt;
            const letter2 = card2.querySelector('.memory-card-front img').alt;

            if (letter1 === letter2) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;
                playSound('match');

                if (matchedPairs === cards.length) {
                    setTimeout(() => {
                        alert('Parabéns! Você completou o jogo!');
                        updateProgress(10, 'memory_game_completed');
                    }, 500);
                }
            } else {
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    playSound('error');
                }, 1000);
            }

            flippedCards = [];
        }
    }

    function setupHangmanGame() {
        const words = ["CASA", "BOLA", "GATO", "PATO", "SOL", "LUA", "MÃO", "PÉ"];
        const word = words[Math.floor(Math.random() * words.length)];
        const maxWrong = 6;
        let wrongGuesses = 0;
        let guessedLetters = [];

        const hangmanWord = document.getElementById('hangmanWord');
        const hangmanWrongLetters = document.getElementById('hangmanWrongLetters');
        const hangmanKeyboard = document.getElementById('hangmanKeyboard');

        // Mostra as letras escondidas
        function displayWord() {
            hangmanWord.innerHTML = word
                .split('')
                .map(letter => guessedLetters.includes(letter) ? letter : '_')
                .join(' ');
        }

        // Mostra as letras erradas
        function displayWrongLetters() {
            const wrongLetters = guessedLetters.filter(letter => !word.includes(letter));
            hangmanWrongLetters.textContent = `Letras erradas: ${wrongLetters.join(', ')}`;
        }

        // Cria o teclado
        function createKeyboard() {
            hangmanKeyboard.innerHTML = '';
            for (let i = 65; i <= 90; i++) {
                const letter = String.fromCharCode(i);
                const button = document.createElement('button');
                button.className = 'hangman-letter-btn';
                button.textContent = letter;
                button.addEventListener('click', () => guessLetter(letter));
                hangmanKeyboard.appendChild(button);
            }
        }

        // Adivinha uma letra
        function guessLetter(letter) {
            if (guessedLetters.includes(letter)) return;

            guessedLetters.push(letter);
            const letterButton = Array.from(hangmanKeyboard.children)
                .find(btn => btn.textContent === letter);

            if (word.includes(letter)) {
                letterButton.style.backgroundColor = '#2ecc71';
                playSound('correct');
            } else {
                letterButton.style.backgroundColor = '#e74c3c';
                wrongGuesses++;
                updateHangmanDrawing();
                playSound('error');
            }

            letterButton.disabled = true;
            displayWord();
            displayWrongLetters();
            checkGameStatus();
        }

        // Atualiza o desenho da forca
        function updateHangmanDrawing() {
            const parts = ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];
            document.getElementById(parts[wrongGuesses - 1]).style.visibility = 'visible';
        }

        // Verifica o status do jogo
        function checkGameStatus() {
            // Verifica se ganhou
            if (word.split('').every(letter => guessedLetters.includes(letter))) {
                setTimeout(() => {
                    alert('Parabéns! Você acertou a palavra!');
                    updateProgress(10, 'hangman_game_won');
                }, 500);
                return;
            }

            // Verifica se perdeu
            if (wrongGuesses >= maxWrong) {
                setTimeout(() => {
                    alert(`Game Over! A palavra era: ${word}`);
                }, 500);
            }
        }

        // Inicializa o jogo
        displayWord();
        displayWrongLetters();
        createKeyboard();
    }

    function setupQuizGame() {
        const quizQuestions = [
            {
                question: "Qual letra vem depois do A?",
                options: ["B", "C", "D", "E"],
                answer: "B"
            },
            {
                question: "Qual palavra começa com a letra C?",
                options: ["Casa", "Bola", "Dado", "Elefante"],
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
        const quizContainer = document.getElementById('quizContainer');

        function showQuestion() {
            const question = quizQuestions[currentQuestion];
            quizContainer.innerHTML = `
                <div class="quiz-question">
                    <h4>${question.question}</h4>
                    <div class="quiz-options">
                        ${question.options.map((option, index) => `
                            <button class="quiz-option" onclick="checkAnswer(${index}, '${option}')">
                                ${option}
                            </button>
                        `).join('')}
                    </div>
                    <div class="quiz-progress">
                        Pergunta ${currentQuestion + 1} de ${quizQuestions.length}
                    </div>
                </div>
            `;
        }

        // Função global para verificar a resposta
        window.checkAnswer = function (index, selectedOption) {
            const question = quizQuestions[currentQuestion];
            const options = document.querySelectorAll('.quiz-option');

            // Desabilita todos os botões
            options.forEach(btn => btn.disabled = true);

            if (selectedOption === question.answer) {
                options[index].style.backgroundColor = '#2ecc71';
                score++;
                playSound('correct');
            } else {
                options[index].style.backgroundColor = '#e74c3c';
                // Mostra a resposta correta
                const correctIndex = question.options.indexOf(question.answer);
                options[correctIndex].style.backgroundColor = '#2ecc71';
                playSound('error');
            }

            // Avança para a próxima questão após 1 segundo
            setTimeout(() => {
                currentQuestion++;
                if (currentQuestion < quizQuestions.length) {
                    showQuestion();
                } else {
                    showQuizResult();
                }
            }, 1000);
        };

        function showQuizResult() {
            const percentage = Math.round((score / quizQuestions.length) * 100);
            quizContainer.innerHTML = `
                <div class="quiz-result">
                    <h4>Quiz Concluído!</h4>
                    <p>Você acertou ${score} de ${quizQuestions.length} perguntas (${percentage}%)</p>
                    ${percentage >= 70 ?
                    '<p class="success">Parabéns! Você foi muito bem!</p>' :
                    '<p class="error">Você pode melhorar! Tente novamente.</p>'}
                    <button class="quiz-restart-btn" onclick="setupQuizGame()">
                        <i class="fas fa-redo"></i> Jogar Novamente
                    </button>
                </div>
            `;

            // Atualiza o progresso
            if (percentage >= 70) {
                updateProgress(10, 'quiz_completed');
            }
        }

        // Inicia o quiz mostrando a primeira pergunta
        showQuestion();
    }
}


function setupStories() {
    const stories = [
        {
            id: 'chapeuzinho',
            title: 'Chapeuzinho Vermelho',
            content: `
             <p>Era uma vez uma menina chamada <span class="highlight">Chapeuzinho Vermelho</span>. Ela ganhou esse nome porque sempre usava uma capa vermelha com um chapeuzinho.</p>
    
    <p>Um dia, sua mãe disse:</p>
    <p class="dialog">— Chapeuzinho, leve esta cesta de doces para a vovó. Ela está doentinha.</p>
    
    <p class="dialog">— Vou, sim! — disse Chapeuzinho.</p>
    
    <p>A mamãe avisou:</p>
    <p class="dialog warning">— Não entre na floresta e não fale com estranhos!</p>
    
    <p>Chapeuzinho saiu cantando. No caminho, apareceu o <span class="highlight">Lobo Mau</span>.</p>
    
    <p class="dialog">— Onde você vai, menina? — perguntou o lobo.</p>
    
    <p class="dialog">— Vou levar doces para minha vovó — respondeu Chapeuzinho, esquecendo o aviso da mãe.</p>
    
    <p>O lobo sorriu e pensou: "Hum, vou comer a vovó e depois a neta!"</p>
    
    <p>Ele correu até a casa da vovó, bateu na porta e fingiu ser Chapeuzinho. A vovó abriu e... <span class="highlight">GLUP!</span> O lobo a engoliu!</p>
    
    <p>Depois, vestiu a roupa dela e deitou na cama.</p>
    
    <p>Quando Chapeuzinho chegou, estranhou:</p>
    
    <p class="dialog">— Vovó, que orelhas grandes!<br>
    — É para te ouvir melhor!</p>
    
    <p class="dialog">— Vovó, que olhos grandes!<br>
    — É para te ver melhor!</p>
    
    <p class="dialog warning">— Vovó, que dentes grandes!<br>
    — É PARA TE COMER!</p>
    
    <p>O lobo pulou, mas <span class="highlight">um caçador</span> ouviu o barulho e entrou correndo. Ele salvou a vovó e prendeu o lobo.</p>
    
    <p>Chapeuzinho aprendeu a lição: <span class="warning">nunca desobedeça sua mãe!</span></p>
    
    <p class="end">E todos viveram felizes para sempre.</p>
    
    <p class="end"><strong>Fim.</strong></p>
        `,
            audio: 'sons/chapeuzinho.mp3',
            image: 'imagens/chapeuzinho.jpg'
        },


        {
            id: 'tres-porquinhos',
            title: 'Os Três Porquinhos',
            content: `
            <p>Era uma vez <span class="highlight">três porquinhos</span> que decidiram construir suas próprias casas.</p>
    
    <p>O <span class="highlight">primeiro porquinho</span>, que era muito preguiçoso, fez sua casa de <span class="house">palha</span>.</p>
    <p class="dialog">— Pronto! Já terminei! — disse ele, deitando para descansar.</p>
    
    <p>O <span class="highlight">segundo porquinho</span> fez sua casa de <span class="house">madeira</span>.</p>
    <p class="dialog">— Assim fica mais forte! — pensou ele.</p>
    
    <p>O <span class="highlight">terceiro porquinho</span>, trabalhador, construiu sua casa de <span class="house">tijolos</span>.</p>
    <p class="dialog">— Vai demorar, mas ficará segura! — disse ele.</p>
    
    <p>No dia seguinte, apareceu o <span class="highlight">Lobo Mau</span>.</p>
    <p class="dialog">— Porquinhos, abram a porta! Quero entrar! — rugiu ele.</p>
    
    <p>Os porquinhos responderam:</p>
    <p class="dialog warning">— De jeito nenhum!</p>
    
    <p>O lobo então <span class="highlight">soprou</span> com toda a força:</p>
    <p class="dialog">— HUFF! PUFF!</p>
    
    <p>A casa de <span class="house">palha</span> voou! O primeiro porquinho correu para a casa de madeira.</p>
    
    <p>O lobo soprou de novo:</p>
    <p class="dialog">— HUFF! PUFF!</p>
    
    <p>A casa de <span class="house">madeira</span> caiu! Os dois porquinhos fugiram para a casa de tijolos.</p>
    
    <p>O lobo soprou mais forte ainda:</p>
    <p class="dialog">— HUFF! PUFF! HUFF! PUFF!</p>
    
    <p>Mas a casa de <span class="house">tijolos</span> não caiu! O lobo ficou furioso e tentou entrar pela chaminé...</p>
    
    <p>Mas os porquinhos eram espertos! Colocaram um <span class="highlight">caldeirão de água fervente</span> no fogão.</p>
    
    <p class="warning">PLAF! O lobo caiu dentro e saiu correndo queimado!</p>
    
    <p>Os três porquinhos comemoraram:</p>
    <p class="dialog">— Viva! O lobo nunca mais vai nos perturbar!</p>
    
    <p class="end">E assim, os porquinhos viveram felizes e seguros em suas casas.</p>
    
    <p class="end"><strong>Fim.</strong></p>
        `,
            audio: 'sons/porquinhos.mp3',
            image: 'imagens/porquinhos.jpg'
        },



        {
            id: 'joao-feijao',
            title: 'João e o Pé de Feijão',
            content: `
            <p>Era uma vez um menino chamado <span class="highlight">João</span> que vivia com sua mãe em uma casinha pobre.</p>
    
    <p>Um dia, a mãe disse:</p>
    <p class="dialog">— João, vamos passar fome! Venda a vaca no mercado.</p>
    
    <p>No caminho, João encontrou um velhinho:</p>
    <p class="dialog magic">— Troco sua vaca por estes <span class="magic">feijões mágicos</span>!</p>
    
    <p>A mãe ficou furiosa:</p>
    <p class="dialog warning">— Feijões? Jogou tudo fora!</p>
    
    <p>Na manhã seguinte... <span class="magic">UAU!</span> Os feijões tinham virado um <span class="highlight">pé gigante</span> que subia até as nuvens!</p>
    
    <p>João escalou e chegou a um castelo no céu. Lá vivia um <span class="warning">gigante terrível</span>!</p>
    
    <p class="dialog">— FEDOR DE HUMANO! — rugiu o gigante.</p>
    
    <p>João se escondeu e viu:</p>
    <ul>
        <li>Uma <span class="magic">galinha que botava ovos de ouro</span></li>
        <li>Um <span class="magic">saco de moedas de prata</span></li>
        <li>Uma <span class="magic">harpa que tocava sozinha</span></li>
    </ul>
    
    <p>Quando o gigante dormiu, João pegou a galinha e fugiu!</p>
    
    <p>No dia seguinte, voltou e levou o saco de moedas.</p>
    
    <p>Na terceira vez, a harpa gritou:</p>
    <p class="dialog warning">— SOCORRO, MESTRE!</p>
    
    <p>O gigante acordou e perseguiu João! Ele desceu o pé de feijão a toda velocidade.</p>
    
    <p class="warning">CRÁÁÁC!</p>
    <p>Sua mãe cortou o pé com um machado, e o gigante caiu para nunca mais voltar!</p>
    
    <p>Com os tesouros, João e sua mãe ficaram <span class="highlight">ricos e felizes</span>.</p>
    
    <p class="end">E viveram com muitas histórias para contar!</p>
    
    <p class="end"><strong>Fim.</strong></p>
        `,
            audio: 'sons/joao-feijao.mp3',
            image: 'imagens/joao-feijao.jpg'
        },


        {
        id: 'abraco',
            title: 'O Abraço do Urso',
            content: `
             <p> Num bosque tranquilo, vivia um urso grande e peludo chamado Bruno.</p>
             <p> Todos os animais tinham medo dele, pois seu tamanho e seus rugidos eram assustadores.</p> 
             <p> Mas Bruno tinha um coração bondoso e só queria fazer amigos.</p>
             
             <p> Um dia, um coelho machucado tentava fugir quando Bruno se aproximou.</p>
             <p> Em vez de atacar, o urso simplesmente o envolveu em um abraço enorme e quentinho.</p>
             
             <p> — Uau! — disse o coelho, surpreso. — Seu abraço é tão aconchegante!</p>
             
             <p> A notícia se espalhou, e logo os outros animais perderam o medo.</p>
             <p> Bruno ensinou a todos que um gesto de carinho pode quebrar qualquer preconceito.</p>
             
             <p> "Moral" = A verdadeira força está na gentileza.</p>
        `,
            audio: 'sons/abraco.mp3',
            image: 'imagens/abraco.jpg'
        },

        {
            id: 'sementinha',
                title: 'A sementinha Teimosa',
                content: `
                 <p> No meio de um jardim bem cuidado, uma pequena semente caiu em um lugar cheio de pedras.</p>

                 <p> — Você nunca vai crescer aí! — diziam as outras plantas.</p>

                 <p> Mas a sementinha teimosa não desistiu. Enfrentou o vento, a chuva forte e até o sol escaldante, sempre dizendo:</p>

                 <p> — Eu consigo!</p>

                 <p> Dias, meses e anos se passaram, e um belo dia, ela rompeu as pedras e se transformou numa árvore forte e frondosa, dando sombra e frutos para todos.</p>

                 <p> — Ninguém acreditava em você, mas você provou que era capaz! — disseram as flores, admiradas.</p>

                 <p> "Moral": Persistência transforma dificuldades em conquistas.</p>
            `,
                audio: 'sons/sementinha.mp3',
                image: 'imagens/sementinha.jpg'
            },


            {
                id: 'patinho',
                    title: 'O Patinho Féio',
                    content: `
                    <p> Num tranquilo lago da floresta, uma mamãe pata aguardava ansiosa o nascimento de seus filhotes.</p>
                    <p> Um por um, os ovos se quebraram, revelando patinhos amarelos e fofos.</p>
                    <p> Mas o último ovo era maior e mais escuro. Quando finalmente se abriu, </p>
                    <p>saiu um patinho diferente: cinza, desengonçado e com um pescoço mais comprido.</p>

                    <p>— Que patinho esquisito! — riam os outros animais.</p>

                    <p> O patinho feio sentia-se triste e sozinho.</p>
                    <p> Mesmo sua própria família o evitava.</p> 
                    <p> Decidiu então partir, enfrentando o frio e a solidão,</p>
                    <p> até que um dia avistou um grupo de belas aves brancas nadando graciosamente no lago.</p>

                    <p>— Quem são vocês? — perguntou, com voz tímida.</p>

                    <p>— Somos cisnes — responderam. — E você também é um de nós!</p>

                    <p> Olhando seu reflexo na água, o patinho viu que havia se transformado num lindo cisne.</p>
                    <p> Os outros animais, agora admirados, perceberam que a verdadeira beleza estava em aceitar quem ele sempre foi.</p>

                    <p> "Moral": Nossa diferença não é defeito, mas nossa maior força.</p>
                `,
                    audio: 'sons/patinho.mp3',
                    image: 'imagens/patinho.jpg'
                },
    ];

    window.readStory = function (storyId) {
        const story = stories.find(s => s.id === storyId);
        const storyReader = document.getElementById('storyReader');
        const storyContent = document.getElementById('storyContent');

        storyContent.innerHTML = `
        <div class="story-header">
            <img src="${story.image}" alt="${story.title}" class="story-image">
            <h3>${story.title}</h3>
        </div>
        <div class="story-text">
            ${story.content}
        </div>
    `;

        document.getElementById('storyAudio').src = story.audio;
        storyReader.style.display = 'block';

        // Atualiza o progresso
        updateProgress(2, `story_${storyId}_read`);
    };

    window.playStoryAudio = function () {
        const audio = document.getElementById('storyAudio');
        audio.play();
        playSound('story-open');
    };

    window.stopStoryAudio = function () {
        const audio = document.getElementById('storyAudio');
        audio.pause();
        audio.currentTime = 0;
        playSound('click');
    };
}

// Configura a ajuda flutuante
function setupFloatingHelp() {
    const helpButton = document.getElementById('floatingHelp');
    const helpBox = document.getElementById('helpBox');

    helpButton.addEventListener('click', function () {
        helpBox.style.display = helpBox.style.display === 'block' ? 'none' : 'block';
        playSound('help');
    });

    window.speakHelp = function () {
        const helpText = document.getElementById('helpText').textContent;

        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(helpText);
            utterance.lang = 'pt-BR';
            speechSynthesis.speak(utterance);
        }

        playSound('help');
    };
}

// Configura o mascote interativo
function setupMascot() {
    const mascote = document.getElementById('mascote');

    mascote.addEventListener('click', function () {
        playSound('mascot');

        // Animações aleatórias
        const animations = ['jump', 'spin', 'shake', 'dance'];
        const randomAnim = animations[Math.floor(Math.random() * animations.length)];

        this.style.animation = `${randomAnim} 0.5s ease`;

        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
}

// Configura o sistema de progresso
function initProgressSystem() {
    if (!localStorage.getItem('userProgress')) {
        localStorage.setItem('userProgress', JSON.stringify({
            points: 0,
            achievements: []
        }));
    }
}

// Atualiza o progresso do usuário
function updateProgress(points, achievement) {
    const progress = JSON.parse(localStorage.getItem('userProgress'));

    progress.points += points;

    if (achievement && !progress.achievements.includes(achievement)) {
        progress.achievements.push(achievement);
    }

    localStorage.setItem('userProgress', JSON.stringify(progress));
    updateProgressUI();
}

// Atualiza a UI do progresso
function updateProgressUI() {
    const progress = JSON.parse(localStorage.getItem('userProgress'));
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const trophiesGrid = document.getElementById('trophiesGrid');

    // Atualiza a barra de progresso (max 100 pontos)
    const progressPercent = Math.min(100, progress.points);
    progressFill.style.width = `${progressPercent}%`;
    progressText.textContent = `Você completou ${progressPercent}% das atividades!`;

    // Atualiza as conquistas
    trophiesGrid.innerHTML = '';

    const allAchievements = [
        { id: 'write_A', name: 'Letra A', icon: 'fas fa-a' },
        { id: 'memory_game_completed', name: 'Jogo da Memória', icon: 'fas fa-brain' },
        { id: 'hangman_game_won', name: 'Forca', icon: 'fas fa-ghost' },
        { id: 'quiz_completed', name: 'Quiz', icon: 'fas fa-question' },
        { id: 'story_chapeuzinho_read', name: 'Chapeuzinho', icon: 'fas fa-book' },
        { id: 'story_tres-porquinhos_read', name: 'Três Porquinhos', icon: 'fas fa-book' },
        { id: 'story_joao-feijao_read', name: 'João e o Pé de Feijão', icon: 'fas fa-book' }
    ];

    allAchievements.forEach(ach => {
        const trophy = document.createElement('div');
        trophy.className = `trophy ${progress.achievements.includes(ach.id) ? '' : 'locked'}`;
        trophy.innerHTML = `
        <i class="${ach.icon}"></i>
        <span>${ach.name}</span>
    `;

        trophy.addEventListener('click', function () {
            showTrophyDetails(ach, progress.achievements.includes(ach.id));
        });

        trophiesGrid.appendChild(trophy);
    });
}

// Mostra detalhes do troféu
function showTrophyDetails(achievement, unlocked) {
    const trophyDetails = document.getElementById('trophyDetails');

    trophyDetails.innerHTML = `
    <div class="trophy-details-content">
        <i class="${achievement.icon} ${unlocked ? '' : 'locked'}"></i>
        <h4>${achievement.name}</h4>
        <p>${unlocked ? 'Conquista desbloqueada!' : 'Conquista ainda não desbloqueada'}</p>
        <button onclick="document.getElementById('trophyDetails').style.display = 'none'">
            Fechar
        </button>
    </div>
`;

    trophyDetails.style.display = 'flex';
    playSound(unlocked ? 'win' : 'click');
}