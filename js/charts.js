/**
 * ===================================================================
 * GRÁFICOS INTERATIVOS & DATA LAB (CHART.JS)
 * ===================================================================
 */

let interactiveChartInstance = null;

// Color helpers based on theme
function getChartColors() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    return {
        cyan: '#06b6d4',
        cyanAlpha: 'rgba(6, 182, 212, 0.2)',
        blue: '#3b82f6',
        blueAlpha: 'rgba(59, 130, 246, 0.2)',
        emerald: '#10b981',
        emeraldAlpha: 'rgba(16, 185, 129, 0.2)',
        textColor: isDark ? '#94a3b8' : '#64748b',
        gridColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        tooltipBg: isDark ? '#101726' : '#ffffff',
        tooltipText: isDark ? '#f1f5f9' : '#0f172a'
    };
}

/* ==================== DATA LAB INTERATIVO ==================== */

// Datasets for Data Lab
const dataLabScenarios = {
    sales: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
            {
                type: 'line',
                label: 'Faturamento (R$)',
                data: [18500, 22400, 21000, 27800, 34500, 31200, 38900, 42100, 39800, 48200, 56000, 68400],
                borderColor: '#06b6d4',
                backgroundColor: 'rgba(6, 182, 212, 0.15)',
                borderWidth: 3,
                fill: true,
                tension: 0.35,
                yAxisID: 'y'
            },
            {
                type: 'bar',
                label: 'Pedidos Concluídos',
                data: [140, 165, 150, 210, 260, 235, 290, 315, 300, 360, 420, 510],
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: '#3b82f6',
                borderWidth: 1,
                borderRadius: 4,
                yAxisID: 'y1'
            }
        ],
        kpis: {
            title1: "Faturamento Anual Acumulado",
            val1: "R$ 448.800",
            trend1: "+28.4% vs ano anterior",
            title2: "Ticket Médio por Pedido",
            val2: "R$ 138,20",
            trend2: "+5.2% otimização",
            title3: "Pico de Vendas",
            val3: "Dezembro (R$ 68.4k)",
            trend3: "Melhor mês do histórico"
        },
        insight: "O ticket médio aumentou consistentemente após a implementação do sistema de recomendação de produtos complementares no carrinho."
    },
    churn: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
            {
                type: 'line',
                label: 'Taxa de Retenção (%)',
                data: [88.5, 89.2, 90.0, 91.4, 92.8, 93.5, 94.2, 94.8, 95.1, 95.8, 96.2, 96.9],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                borderWidth: 3,
                fill: true,
                tension: 0.3,
                yAxisID: 'y'
            },
            {
                type: 'line',
                label: 'Taxa de Churn (%)',
                data: [11.5, 10.8, 10.0, 8.6, 7.2, 6.5, 5.8, 5.2, 4.9, 4.2, 3.8, 3.1],
                borderColor: '#ef4444',
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderDash: [5, 5],
                tension: 0.3,
                yAxisID: 'y'
            }
        ],
        kpis: {
            title1: "Retenção Atual",
            val1: "96.9%",
            trend1: "+8.4 p.p. nos últimos 12 meses",
            title2: "Taxa de Churn Atual",
            val2: "3.1%",
            trend2: "-8.4 p.p. queda de cancelamento",
            title3: "LTV Médio Estimado",
            val3: "R$ 3.850",
            trend3: "Impacto financeiro positivo"
        },
        insight: "A identificação preditiva de clientes inativos permitiu ações proativas de suporte e campanhas de reengajamento, reduzindo o churn em mais de 70%."
    },
    performance: {
        labels: ['/api/v1/users', '/api/v1/auth', '/api/v1/products', '/api/v1/analytics', '/api/v1/checkout', '/api/v1/reports'],
        datasets: [
            {
                type: 'bar',
                label: 'Latência Média (ms)',
                data: [22, 18, 45, 95, 62, 110],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.6)',
                    'rgba(16, 185, 129, 0.6)',
                    'rgba(6, 182, 212, 0.6)',
                    'rgba(245, 158, 11, 0.6)',
                    'rgba(6, 182, 212, 0.6)',
                    'rgba(239, 68, 68, 0.6)'
                ],
                borderColor: '#06b6d4',
                borderWidth: 1,
                borderRadius: 6
            }
        ],
        kpis: {
            title1: "Latência Global Média (p95)",
            val1: "42 ms",
            trend1: "99.98% SLA mantido",
            title2: "Endpoint Mais Rápido",
            val2: "/api/v1/auth (18ms)",
            trend2: "Cache Redis otimizado",
            title3: "Gargalo sob Atenção",
            val3: "/api/v1/reports (110ms)",
            trend3: "Em processo de otimização ETL"
        },
        insight: "A adoção de cache com Redis reduziu em 65% as consultas pesadas de leitura ao PostgreSQL, mantendo as rotas críticas de autenticação abaixo de 20ms."
    }
};

function updateDataLabKPIs(kpis, insight) {
    document.getElementById('kpi-1-label').textContent = kpis.title1;
    document.getElementById('kpi-1-val').textContent = kpis.val1;
    document.getElementById('kpi-1-trend').innerHTML = `<i data-lucide="trending-up"></i> ${kpis.trend1}`;

    document.getElementById('kpi-2-label').textContent = kpis.title2;
    document.getElementById('kpi-2-val').textContent = kpis.val2;
    document.getElementById('kpi-2-trend').innerHTML = `<i data-lucide="trending-up"></i> ${kpis.trend2}`;

    document.getElementById('kpi-3-label').textContent = kpis.title3;
    document.getElementById('kpi-3-val').textContent = kpis.val3;
    document.getElementById('kpi-3-trend').innerHTML = `<i data-lucide="award"></i> ${kpis.trend3}`;

    document.getElementById('insight-text').innerHTML = `<strong>Insight Identificado:</strong> ${insight}`;

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function renderInteractiveChart(scenarioKey) {
    const ctx = document.getElementById('interactiveChart');
    if (!ctx) return;

    const colors = getChartColors();
    const scenario = dataLabScenarios[scenarioKey] || dataLabScenarios.sales;

    updateDataLabKPIs(scenario.kpis, scenario.insight);

    const scalesConfig = scenarioKey === 'sales' ? {
        x: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor } },
        y: {
            type: 'linear',
            position: 'left',
            grid: { color: colors.gridColor },
            ticks: {
                color: colors.textColor,
                callback: (val) => 'R$ ' + (val >= 1000 ? (val / 1000) + 'k' : val)
            }
        },
        y1: {
            type: 'linear',
            position: 'right',
            grid: { display: false },
            ticks: { color: colors.textColor }
        }
    } : {
        x: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor } },
        y: {
            grid: { color: colors.gridColor },
            ticks: {
                color: colors.textColor,
                callback: (val) => scenarioKey === 'churn' ? val + '%' : val + 'ms'
            }
        }
    };

    const config = {
        data: {
            labels: scenario.labels,
            datasets: JSON.parse(JSON.stringify(scenario.datasets)) // deep clone
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    labels: { color: colors.textColor, font: { family: 'Inter', size: 12 } }
                },
                tooltip: {
                    backgroundColor: colors.tooltipBg,
                    titleColor: colors.tooltipText,
                    bodyColor: colors.tooltipText,
                    borderColor: 'rgba(6, 182, 212, 0.4)',
                    borderWidth: 1
                }
            },
            scales: scalesConfig
        }
    };

    if (interactiveChartInstance) {
        interactiveChartInstance.destroy();
    }
    interactiveChartInstance = new Chart(ctx, config);
}

function randomizeDataLab() {
    const select = document.getElementById('dataset-select');
    const scenarioKey = select.value;
    const scenario = dataLabScenarios[scenarioKey];

    // Add mild random variance
    scenario.datasets.forEach(dataset => {
        dataset.data = dataset.data.map(val => {
            const jitter = 1 + (Math.random() * 0.1 - 0.05); // +/- 5%
            return typeof val === 'number' ? Math.round(val * jitter * 10) / 10 : val;
        });
    });

    renderInteractiveChart(scenarioKey);
}

// Re-render when theme switches
function updateChartsTheme() {
    const select = document.getElementById('dataset-select');
    if (select) {
        renderInteractiveChart(select.value);
    }
}
