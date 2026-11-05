# 🚀 Portfólio Tech — Dev Full Stack & Análise de Dados
> Template moderno, responsivo e de alta performance desenvolvido especialmente para estudantes de **Sistemas de Informação**, desenvolvedores **Full Stack** e entusiastas de **Análise de Dados / BI**.

![Status](https://img.shields.io/badge/Status-Pronto%20para%20Uso-10b981)
![Tecnologias](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS%20%7C%20Chart.js-06b6d4)
![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages%20%7C%20Vercel-3b82f6)

---

## 🌟 Destaques deste Portfólio

1. **Identidade Visual Temática de Dados & Tech**:
   - Modo Escuro (Dark Mode) por padrão e alternador instantâneo para Modo Claro (Light Mode).
   - Glassmorphism, bordas sutis e design system inspirado em dashboards analíticos de ponta.
   - Tipografia técnica com *Inter* e *JetBrains Mono*.
2. **Hero com Métricas & Preview Técnico de Código**:
   - KPIs visuais de volume de dados e projetos.
   - Bloco interativo de configuração de perfil e stack técnica em Python.
3. **Data Lab Interativo**:
   - **O grande diferencial perante recrutadores:** um simulador de métricas dinâmico embutido no site.
   - O visitante pode alternar entre cenários (*Vendas & Faturamento*, *Retenção & Churn*, *Latência de APIs*) e clicar em "Simular Novos Dados" para ver o gráfico e os indicadores recalculando ao vivo com Chart.js.
4. **Vitrine Modular de Projetos com Modal de Estudo de Caso & Player de Vídeo**:
   - Filtros por categoria: *Todos os Projetos*, *Projetos Acadêmicos* e *Projetos Pessoais*.
   - Suporte nativo a **Vídeos de Demonstração** (ex.: app **Fin** com vídeo MP4 embutido com controles e autoplay).
   - Modal com estrutura profunda de **Estudo de Caso**: Contexto de Negócio, Desafios, Solução Técnica e Resultados Mensuráveis.
   - Dados desacoplados no arquivo `js/projects-data.js` (adicione novos projetos sem mexer no HTML!).
5. **Zero Dependências ou Builds Pesados**:
   - Não requer `npm install` nem Node.js para rodar. Basta abrir o arquivo `index.html` em qualquer navegador!

---

## 📁 Estrutura de Arquivos

```text
Port/
├── index.html            # Estrutura semântica e acessível
├── README.md             # Guia completo de personalização e deploy
├── css/
│   └── style.css         # Variáveis CSS, layout responsivo e animações
├── js/
│   ├── main.js           # Lógica do tema, navegação, filtros e modal
│   ├── charts.js         # Instâncias e cenários do Chart.js
│   └── projects-data.js  # Banco de dados de projetos e estudos de caso
└── assets/
    ├── docs/             # Coloque seu curriculo.pdf aqui
    ├── img/              # Imagens e screenshots dos projetos
    └── vid/              # Vídeos de demonstração (ex: fin-demo.mp4)
```

---

## ⚡ Como Rodar o Projeto Agora

### Opção 1: Direto pelo Navegador
Dê um duplo clique no arquivo `index.html` ou arraste-o para dentro do Chrome/Edge/Firefox.

### Opção 2: Pelo VS Code (Recomendado para Desenvolvimento)
1. Abra a pasta `Port` no VS Code (`code .`).
2. Instale a extensão **Live Server** (caso ainda não tenha).
3. Clique com o botão direito em `index.html` e selecione **"Open with Live Server"**.

---

## ✏️ Como Personalizar com Seus Dados

### 1. Nome, Contatos e Textos
Abra o arquivo `index.html` e edite os seguintes pontos:
- **Título e Meta Tags**: Linhas 6-8 (`<title>` e `<meta name="author">`).
- **Logo e Nome**: Substitua `Luan.DataDev` pelo seu nome.
- **Links Sociais**: Atualize os links para seu LinkedIn, GitHub e E-mail.
- **Formação Acadêmica**: Na seção `<section id="education">`, altere o nome da sua universidade, semestre atual e previsão de formatura.
- **Currículo em PDF**: Salve o seu arquivo PDF em `assets/docs/curriculo.pdf`.

### 2. Adicionar ou Editar Seus Próprios Projetos & Fotos
Abra o arquivo `js/projects-data.js`. Você verá uma lista de objetos como esta:
```javascript
{
    id: "meu-projeto-exemplo",
    title: "Nome do Seu Projeto",
    category: "academic", // "academic" (Acadêmico) ou "personal" (Pessoal)
    categoryLabel: "Projeto Acadêmico", // ou "Projeto Pessoal"
    icon: "shield-alert",
    images: [
        "assets/img/projects/sua-foto-1.png", // Fotos alternadas automaticamente no card
        "assets/img/projects/sua-foto-2.png"
    ],
    shortDesc: "Resumo em 2 frases para o card.",
    keyMetric: "+20% em performance",
    tags: ["Python", "SQL", "Streamlit"],
    githubUrl: "https://github.com/seuperfil/repositorio",
    demoUrl: "https://seulink.com",
    caseStudy: {
        context: "Qual era o problema de negócio ou desafio?",
        challenges: "Quais dificuldades técnicas existiam?",
        solution: "Qual stack e abordagem técnica você usou?",
        results: "Quais métricas ou resultados você alcançou?"
    }
}
```
As fotos configuradas em `images` alternam suavemente a cada 3.5 segundos e ganham uma leve ampliação (zoom) quando o visitante passa o cursor do mouse por cima!

### 3. Configurar Seus Canais Diretos de Contato
Na seção de contato em `index.html`, substitua os links pelos seus canais reais:
- **E-mail:** atualize o atributo `href="mailto:seuemail@exemplo.com"`
- **LinkedIn:** coloque a URL do seu perfil público no LinkedIn
- **GitHub:** seu link de usuário no GitHub
- **WhatsApp:** configure o link `href="https://wa.me/55SEUNUMERO"` com o seu DDD e número

---

## 🌐 Como Fazer Deploy Gratuito

### Pelo GitHub Pages (Mais Fácil):
1. Crie um repositório no seu GitHub chamado `portfolio` ou `<seu-usuario>.github.io`.
2. Suba todos os arquivos desta pasta:
   ```bash
   git init
   git add .
   git commit -m "feat: meu portfolio de SI, dev fullstack e dados"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/portfolio.git
   git push -u origin main
   ```
3. No GitHub, vá em **Settings** > **Pages** > em *Branch*, selecione `main` e pasta `/ (root)` e salve.
4. Seu portfólio estará online no endereço `https://SEU_USUARIO.github.io/portfolio/`!

### Pela Vercel ou Netlify:
- Basta conectar sua conta do GitHub e selecionar o repositório. O deploy é automático e leva menos de 1 minuto.

---

Feito com dedicação para impulsionar sua carreira em **Sistemas de Informação**, **Full Stack** e **Análise de Dados**!
