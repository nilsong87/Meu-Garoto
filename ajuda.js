        // Aguarda o carregamento completo da página
        document.addEventListener('DOMContentLoaded', function () {
            // Simula um tempo de carregamento
            setTimeout(function () {
                document.getElementById('loadingScreen').style.display = 'none';
                
                // Inicializa a aplicação
                initHelpPage();
            }, 1500);
        });

        // Configura efeitos sonoros
        function setupSoundEffects() {
            window.playSound = function (sound) {
                const soundEffect = document.getElementById('soundEffect');
                
                switch (sound) {
                    case 'click':
                        soundEffect.src = 'sons/click.mp3';
                        break;
                    case 'success':
                        soundEffect.src = 'sons/success.mp3';
                        break;
                    case 'error':
                        soundEffect.src = 'sons/error.mp3';
                        break;
                    default:
                        soundEffect.src = 'sons/click.mp3';
                }

                soundEffect.currentTime = 0;
                soundEffect.play().catch(e => console.log("Não foi possível tocar o som:", e));
            };
        }

        // Inicializa a página de ajuda
        function initHelpPage() {
            // Configura a navegação por tabs
            setupTabNavigation();

            // Configura o accordion
            setupAccordion();

            // Configura o formulário de contato
            setupContactForm();

            // Configura efeitos sonoros
            setupSoundEffects();
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

        // Configura o accordion
        function setupAccordion() {
            const accordionBtns = document.querySelectorAll('.accordion-btn');
            
            accordionBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    this.classList.toggle('active');
                    const content = this.nextElementSibling;
                    
                    if (content.style.display === 'block') {
                        content.style.display = 'none';
                        this.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
                    } else {
                        content.style.display = 'block';
                        this.querySelector('.fa-chevron-down').style.transform = 'rotate(180deg)';
                    }
                    
                    playSound('click');
                });
            });
        }

        // Configura o formulário de contato
        function setupContactForm() {
            const form = document.getElementById('helpForm');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simula o envio do formulário
                const submitBtn = form.querySelector('.submit-btn');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                setTimeout(function() {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
                    playSound('success');
                    
                    // Limpa o formulário
                    setTimeout(function() {
                        form.reset();
                        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1500);
            });
        }
    