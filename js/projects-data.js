/**
 * ===================================================================
 * DADOS DOS PROJETOS - PORTFÓLIO
 * ===================================================================
 * 1 Acadêmico (primeiro) e 2 Pessoais.
 * "Fin" é um dos projetos pessoais e inclui vídeo de demonstração gravado.
 */

const projectsData = [
    // 1. PROJETO ACADÊMICO: SEGURANÇA DIGITAL PARA IDOSOS (IF SUDESTE MG)
    {
        id: "seguranca-digital-idosos",
        title: "Segurança Digital para Idosos — Curso & Avaliativo Web",
        category: "academic",
        categoryLabel: "Projeto Acadêmico",
        status: "completed",
        statusLabel: "Finalizado",
        icon: "shield-check",
        hasExplanationModal: true,
        images: [
            "assets/img/projects/Seg1.jpeg",
            "assets/img/projects/Seg2.jpeg",
            "assets/img/projects/Seg3.jpeg"
        ],
        shortDesc: "Plataforma web interativa desenvolvida para capacitar idosos no uso seguro da internet, ensinando de forma prática e acessível a identificar golpes virtuais, notícias falsas (fake news) e proteger dados pessoais.",
        tags: ["HTML5", "CSS3", "JavaScript", "Acessibilidade Web", "Segurança da Informação", "Inclusão Digital"],
        githubUrl: "https://github.com/LuanNevess/AvaliativoCSD",
        demoUrl: "https://luannevess.github.io/AvaliativoCSD/",
        caseStudy: {
            context: "Projeto extensionista de inclusão e proteção digital no Instituto Federal Sudeste de Minas Gerais (Campus Juiz de Fora), focado em conscientizar e proteger o público idoso contra fraudes e desinformação online.",
            challenges: "Projetar uma experiência digital intuitiva e adaptada a pessoas com limitações visuais ou baixa familiaridade com computadores: botões amplos, alto contraste de cores, feedbacks visuais instantâneos e eliminação de termos técnicos complexos.",
            solution: "Desenvolvimento de um sistema avaliativo web interativo (Avaliativo CSD) com questionários contextualizados, simulando casos práticos (ex: identificação de fake news) para fixação ativa dos conteúdos ensinados pelos instrutores em aula.",
            results: "Testado e utilizado com sucesso pelos alunos no laboratório de informática da instituição, promovendo autonomia, conscientização e redução comprovada de vulnerabilidade a golpes virtuais."
        }
    },

    // 2. PROJETO PESSOAL: FIN (COM VÍDEO DE DEMONSTRAÇÃO E TELAS REAIS)
    {
        id: "fin-app",
        title: "Fin — Controle Financeiro Pessoal Android",
        category: "personal",
        categoryLabel: "Projeto Pessoal",
        status: "in-progress",
        statusLabel: "Em Desenvolvimento",
        icon: "smartphone",
        hasVideo: true,
        isComingSoon: true,
        videoUrl: "assets/vid/projects/fin-demo.mp4",
        images: [
            "assets/img/projects/fin-real-1.png",
            "assets/img/projects/fin-real-2.png",
            "assets/img/projects/fin-real-3.png"
        ],
        shortDesc: "Aplicativo nativo Android desenvolvido em Kotlin e Jetpack Compose com leitura automática de notificações bancárias, importador OFX, gráficos de patrimônio em Canvas e privacidade 100% offline.",
        tags: ["Kotlin", "Jetpack Compose", "Material 3", "Canvas", "MVVM", "OFX Parser", "Android"],
        githubUrl: "#",
        demoUrl: "assets/vid/projects/fin-demo.mp4",
        caseStudy: {
            context: "Muitos usuários abandonam o controle financeiro por preguiça de lançar gastos manualmente ou por receio de segurança ao conectar credenciais e senhas bancárias em servidores na nuvem.",
            challenges: "Capturar transações instantâneas de compras no cartão e Pix de bancos como Nubank, Itaú e Inter sem APIs pagas, além de isolar investimentos/caixinhas para não inflar despesas de consumo.",
            solution: "Arquitetura reativa MVVM com StateFlow e Coroutines. Implementação de NotificationListenerService em segundo plano, parser nativo de extratos bancários (.OFX) com de-duplicação inteligente e desenho manual em Canvas de anéis de gastos e curvas de evolução patrimonial.",
            results: "Solução 100% privada, sem servidor externo, com dados armazenados localmente no dispositivo e interface reativa moderna em Material 3."
        }
    },

    // 3. PROJETO PESSOAL: MONITOR DE PROMOÇÕES & BOT WHATSAPP
    {
        id: "monitor-promocoes",
        title: "Monitor de Promoções & Bot WhatsApp",
        category: "personal",
        categoryLabel: "Projeto Pessoal",
        status: "in-progress",
        statusLabel: "Em Desenvolvimento",
        icon: "bell-ring",
        images: [
            "assets/img/projects/monitor-promo-1.svg",
            "assets/img/projects/monitor-promo-2.svg"
        ],
        shortDesc: "Sistema inteligente em Python e FastAPI com Web Scraping assíncrono que monitora preços e ofertas em grandes e-commerces, valida cupons reais de desconto, compara concorrentes e dispara alertas automáticos diretamente no WhatsApp via webhooks.",
        tags: ["Python", "FastAPI", "Web Scraping", "WhatsApp Bot", "Nodriver", "APScheduler", "SQLite"],
        githubUrl: "https://github.com/LuanNevess/monitor-promocoes",
        demoUrl: "https://github.com/LuanNevess/monitor-promocoes",
        caseStudy: {
            context: "Consumidores perdem descontos relâmpago ou pagam mais caro por falta de tempo para comparar preços manualmente em vários sites e testar dezenas de cupons que geralmente estão expirados ou inválidos.",
            challenges: "Burlar proteções antibot dinâmicas (Cloudflare/Akamai) em grandes e-commerces (Nike, Netshoes, Amazon), normalizar nomes de produtos para matching multiloja e integrar mensageria bidirecional em tempo real no WhatsApp.",
            solution: "Arquitetura assíncrona em FastAPI com scrapers em Nodriver/HTTPX, motor de busca e validação de cupons ativos por loja, algoritmo de similaridade para comparação de preços e webhooks integrados à Evolution API/Z-API para envio de alertas instantâneos com links diretos.",
            results: "Monitoramento 24/7 com agendamento a cada 10 minutos pelo APScheduler, banco SQLite com menor preço histórico registrado e notificações entregues no WhatsApp em menos de 2 segundos após a queda de preço."
        }
    }
];
