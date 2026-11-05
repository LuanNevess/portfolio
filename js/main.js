/**
 * ===================================================================
 * SCRIPT PRINCIPAL - PORTFÓLIO DEV FULL STACK & DADOS
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa ícones Lucide
    if (window.lucide) {
        window.lucide.createIcons();
    }

    initTheme();
    initNavigation();
    initSkillsFilter();
    renderProjects('all');
    initProjectFilter();
    initModal();
});

/* ==================== 1. TEMA CLARO / ESCURO (THEME SWITCHER) ==================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    if (theme === 'light') {
        themeToggleBtn.innerHTML = '<i data-lucide="sun"></i>';
    } else {
        themeToggleBtn.innerHTML = '<i data-lucide="moon"></i>';
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

/* ==================== 2. NAVEGAÇÃO & MENU MOBILE ==================== */
function initNavigation() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Fecha menu ao clicar em qualquer link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    // Scroll Spy: Destacar link ativo conforme rolagem da página
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__list a[href*="${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active-link');
                } else {
                    correspondingLink.classList.remove('active-link');
                }
            }
        });
    });
}

/* ==================== 3. FILTRO DE HABILIDADES (SKILLS) ==================== */
function initSkillsFilter() {
    const skillTabs = document.querySelectorAll('.skills__tab');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==================== 4. RENDERIZAÇÃO & CARROSSEL DE PROJETOS ==================== */
let projectCarouselInterval = null;

const GITHUB_ICON_SVG = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`;

function renderProjects(filter = 'all') {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid || typeof projectsData === 'undefined') return;

    const filtered = filter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === filter);

    projectsGrid.innerHTML = filtered.map(proj => {
        const hasImages = proj.images && proj.images.length > 0;
        const hasMultiple = hasImages && proj.images.length > 1;
        const isSecurity = proj.id === 'seguranca-digital-idosos';
        const visualClick = isSecurity 
            ? `openSecurityDemoModal()` 
            : `openCaseStudy('${proj.id}')`;
        const visualTitle = isSecurity 
            ? 'Clique para ver a explicação e acessar a demonstração' 
            : (proj.hasVideo ? 'Clique para assistir ao vídeo de demonstração' : 'Clique para ver detalhes do projeto');

        const primaryBtnLabel = proj.hasVideo 
            ? 'Assistir Demonstração' 
            : (proj.id === 'monitor-promocoes' ? 'Ver mais' : 'Estudo de Caso');
        const primaryBtnIcon = proj.hasVideo 
            ? 'play-circle' 
            : (proj.id === 'monitor-promocoes' ? 'plus-circle' : 'book-open');

        return `
        <article class="project-card" data-category="${proj.category}">
            <div class="project-card__visual" onclick="${visualClick}" title="${visualTitle}">
                <span class="project-card__badge-category">${proj.categoryLabel}</span>
                <span class="project-card__badge-status project-card__badge-status--${proj.status}">
                    <span class="status-dot"></span> ${proj.statusLabel}
                </span>
                
                <div class="project-card__gallery" data-project="${proj.id}">
                    ${hasImages ? proj.images.map((img, idx) => `
                        <img src="${img}" alt="${proj.title} foto ${idx + 1}" class="gallery-img ${idx === 0 ? 'active' : ''}">
                    `).join('') : `
                        <div class="project-card__mock-preview">
                            <i data-lucide="${proj.icon}"></i>
                            <span>${proj.title}</span>
                        </div>
                    `}
                </div>

                ${hasMultiple ? `
                    <div class="gallery-indicators">
                        ${proj.images.map((_, idx) => `
                            <span class="gallery-dot ${idx === 0 ? 'active' : ''}"></span>
                        `).join('')}
                    </div>
                ` : ''}

                ${proj.hasVideo ? `
                    <div class="project-card__play-badge">
                        <i data-lucide="play"></i> <span>Vídeo Demo</span>
                    </div>
                ` : ''}
            </div>

            <div class="project-card__content">
                <h3 class="project-card__title">${proj.title}</h3>
                <p class="project-card__desc">${proj.shortDesc}</p>

                <div class="project-card__tech">
                    ${proj.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                </div>

                <div class="project-card__actions">
                    ${isSecurity ? `
                        <button type="button" class="btn btn--sm btn--primary" onclick="openSecurityDemoModal()" aria-label="Ver Demonstração com Explicação Prévia">
                            <i data-lucide="external-link"></i> Ver Demonstração
                        </button>
                        <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--sm btn--code" aria-label="Ver Repositório no GitHub">
                            ${GITHUB_ICON_SVG} GitHub
                        </a>
                    ` : `
                        <button class="btn btn--sm btn--primary" onclick="openCaseStudy('${proj.id}')">
                            <i data-lucide="${primaryBtnIcon}"></i> ${primaryBtnLabel}
                        </button>
                        ${proj.isComingSoon ? `
                            <span class="btn btn--sm btn--disabled" title="Download em fase de publicação">
                                <i data-lucide="download"></i> Em Breve
                            </span>
                        ` : `
                            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--sm btn--code" aria-label="Ver Repositório no GitHub">
                                ${GITHUB_ICON_SVG} GitHub
                            </a>
                        `}
                    `}
                </div>
            </div>
        </article>
        `;
    }).join('');

    if (window.lucide) {
        window.lucide.createIcons();
    }

    initProjectCarousels();
}

function initProjectCarousels() {
    if (projectCarouselInterval) {
        clearInterval(projectCarouselInterval);
    }

    const cards = document.querySelectorAll('.project-card');

    // Pausa a troca automática enquanto o mouse estiver sobre o card
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => card.dataset.hovered = 'true');
        card.addEventListener('mouseleave', () => card.dataset.hovered = 'false');
    });

    // Alternância automática a cada 3.5 segundos
    projectCarouselInterval = setInterval(() => {
        const galleries = document.querySelectorAll('.project-card__gallery');

        galleries.forEach(gallery => {
            const card = gallery.closest('.project-card');
            // Se o mouse estiver sobre o card, pausa a troca automática para permitir visualização
            if (card && card.dataset.hovered === 'true') return;

            const images = gallery.querySelectorAll('.gallery-img');
            const visual = gallery.closest('.project-card__visual');
            const dots = visual ? visual.querySelectorAll('.gallery-dot') : [];

            if (images.length > 1) {
                let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
                if (currentIndex === -1) currentIndex = 0;

                images[currentIndex].classList.remove('active');
                if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

                const nextIndex = (currentIndex + 1) % images.length;
                images[nextIndex].classList.add('active');
                if (dots[nextIndex]) dots[nextIndex].classList.add('active');
            }
        });
    }, 3500);
}

function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.project__filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            renderProjects(filter);
        });
    });
}

/* ==================== 5. MODAL DE ESTUDO DE CASO ==================== */
function initModal() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');

    if (!modal) return;

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';

        // Pausa qualquer vídeo em execução no modal ao fechar
        const video = modal.querySelector('video');
        if (video) {
            video.pause();
        }
    };
    window.closeProjectModal = closeModal;

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openSecurityDemoModal() {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-content');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <span class="modal__tag">Demonstração • Projeto Acadêmico</span>
        <h2 class="modal__title">Segurança Digital para Idosos — Avaliativo Web</h2>

        <div class="modal__section" style="margin-top: 1.25rem;">
            <h4 class="modal__section-title"><i data-lucide="help-circle"></i> O que é este site?</h4>
            <p class="modal__text">
                Este site é um <strong>questionário interativo de perguntas e respostas (Avaliativo CSD)</strong> desenvolvido como projeto extensionista no <strong>IF Sudeste MG</strong>.
            </p>
            <p class="modal__text" style="margin-top: 0.75rem;">
                Ele foi planejado especialmente para apoiar os alunos da terceira idade a <strong>fixar de maneira prática e descomplicada</strong> o conteúdo ensinado nas aulas presenciais: como identificar tentativas de golpes, links fraudulentos, notícias falsas (fake news) e proteger seus dados pessoais na internet.
            </p>
        </div>

        <div class="modal__links" style="margin-top: 2rem;">
            <a href="https://luannevess.github.io/AvaliativoCSD/" target="_blank" rel="noopener noreferrer" class="btn btn--primary" onclick="closeProjectModal()">
                <i data-lucide="external-link"></i> Acessar Avaliativo CSD
            </a>
            <button type="button" class="btn btn--outline" onclick="closeProjectModal()">
                <i data-lucide="x"></i> Voltar
            </button>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (window.lucide) {
        window.lucide.createIcons();
    }
}
window.openSecurityDemoModal = openSecurityDemoModal;

function openCaseStudy(projectId) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-content');
    if (!modal || !modalBody || typeof projectsData === 'undefined') return;

    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    const mediaPreview = (project.hasVideo && project.videoUrl) ? `
        <div class="modal__video-wrapper">
            <video controls autoplay playsinline class="modal__video-player" poster="${project.images && project.images.length > 0 ? project.images[0] : ''}">
                <source src="${project.videoUrl}" type="video/mp4">
                Seu navegador não suporta a tag de vídeo.
            </video>
        </div>
    ` : (project.images && project.images.length > 0 ? `
        <div class="modal__preview-img">
            <img src="${project.images[0]}" alt="${project.title}">
        </div>
    ` : '');

    modalBody.innerHTML = `
        <span class="modal__tag">${project.categoryLabel}</span>
        <h2 class="modal__title">${project.title}</h2>

        ${mediaPreview}

        <div class="modal__section">
            <h4 class="modal__section-title"><i data-lucide="target"></i> Contexto & Desafio de Negócio</h4>
            <p class="modal__text">${project.caseStudy.context}</p>
            <p class="modal__text" style="margin-top: 0.5rem;">${project.caseStudy.challenges}</p>
        </div>

        <div class="modal__section">
            <h4 class="modal__section-title"><i data-lucide="cpu"></i> Arquitetura Técnica & Solução</h4>
            <p class="modal__text">${project.caseStudy.solution}</p>
        </div>

        <div class="modal__section">
            <h4 class="modal__section-title"><i data-lucide="bar-chart-3"></i> Resultados & Entregas</h4>
            <p class="modal__text">${project.caseStudy.results}</p>
        </div>

        <div class="project-card__tech" style="margin-top: 1.5rem;">
            ${project.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <div class="modal__links">
            ${project.isComingSoon ? `
                <span class="btn btn--outline btn--disabled" title="Download em fase de publicação">
                    <i data-lucide="download"></i> Em Breve
                </span>
            ` : `
                <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
                    ${GITHUB_ICON_SVG} Ver Repositório no GitHub
                </a>
            `}
            ${project.hasVideo ? `
                <a href="${project.videoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
                    <i data-lucide="play"></i> Abrir Vídeo Completo
                </a>
            ` : `
                <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--outline">
                    <i data-lucide="external-link"></i> Abrir Demonstração
                </a>
            `}
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Garante disponibilidade global para chamadas via onclick
window.openCaseStudy = openCaseStudy;
