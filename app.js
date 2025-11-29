// Dados de exemplo para planos (em um sistema real, viriam de uma API)
const planDatabase = {
    individual: [
        { name: "Plano Essencial 5G", carrier: "Vivo", gb: 10, price: 49.90, link: "https://vivo.com.br/planos" },
        { name: "TIM Pré 5G", carrier: "TIM", gb: 15, price: 59.90, link: "https://tim.com.br/planos" },
        { name: "Claro Pós 5G", carrier: "Claro", gb: 20, price: 69.90, link: "https://claro.com.br/planos" },
        { name: "Oi 5G Total", carrier: "Oi", gb: 25, price: 79.90, link: "https://oi.com.br/planos" }
    ],
    familiar: [
        { name: "Família Vivo 5G", carrier: "Vivo", gb: 30, price: 99.90, link: "https://vivo.com.br/planos" },
        { name: "TIM Família 5G", carrier: "TIM", gb: 40, price: 119.90, link: "https://tim.com.br/planos" },
        { name: "Claro Família 5G", carrier: "Claro", gb: 50, price: 139.90, link: "https://claro.com.br/planos" },
        { name: "Oi Família 5G", carrier: "Oi", gb: 60, price: 159.90, link: "https://oi.com.br/planos" }
    ]
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Elementos da página
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    
    // Formulários
    const registerForm = document.getElementById('registerForm');
    const dataForm = document.getElementById('dataForm');
    
    // Botões de navegação
    const backToRegister = document.getElementById('backToRegister');
    const backToDataForm = document.getElementById('backToDataForm');
    const newAnalysis = document.getElementById('newAnalysis');
    
    // Validação de e-mail
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Navegação entre páginas
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        // Validações
        let isValid = true;
        
        if (!name.trim()) {
            document.getElementById('nameError').classList.remove('hidden');
            isValid = false;
        } else {
            document.getElementById('nameError').classList.add('hidden');
        }
        
        if (!validateEmail(email)) {
            document.getElementById('emailError').classList.remove('hidden');
            isValid = false;
        } else {
            document.getElementById('emailError').classList.add('hidden');
        }
        
        if (isValid) {
            // Salvar dados do usuário
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            
            // Navegar para a página 2
            page1.classList.add('hidden');
            page2.classList.remove('hidden');
            page2.classList.add('fade-in');
        }
    });
    
    dataForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const currentGB = parseInt(document.getElementById('currentGB').value) || 0;
        const month1 = parseInt(document.getElementById('month1').value) || 0;
        const month2 = parseInt(document.getElementById('month2').value) || 0;
        const month3 = parseInt(document.getElementById('month3').value) || 0;
        const planType = document.getElementById('planType').value;
        const carrier = document.getElementById('carrier').value;
        const usageLocation = document.getElementById('usageLocation').value;
        const needs = document.getElementById('needs').value;
        
        // Salvar dados
        const userData = {
            currentGB,
            month1,
            month2,
            month3,
            planType,
            carrier,
            usageLocation,
            needs
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Processar análise com IA simulada
        processAnalysis(userData);
        
        // Navegar para a página 3
        page2.classList.add('hidden');
        page3.classList.remove('hidden');
        page3.classList.add('fade-in');
    });
    
    // Navegação de volta
    backToRegister.addEventListener('click', function() {
        page2.classList.add('hidden');
        page1.classList.remove('hidden');
        page1.classList.add('fade-in');
    });
    
    backToDataForm.addEventListener('click', function() {
        page3.classList.add('hidden');
        page2.classList.remove('hidden');
        page2.classList.add('fade-in');
    });
    
    newAnalysis.addEventListener('click', function() {
        page3.classList.add('hidden');
        page2.classList.remove('hidden');
        page2.classList.add('fade-in');
    });
    
    // Preencher dados do usuário se existirem
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    if (userName && userEmail) {
        document.getElementById('name').value = userName;
        document.getElementById('email').value = userEmail;
    }
    
    const userData = localStorage.getItem('userData');
    if (userData) {
        const data = JSON.parse(userData);
        document.getElementById('currentGB').value = data.currentGB || '';
        document.getElementById('month1').value = data.month1 || '';
        document.getElementById('month2').value = data.month2 || '';
        document.getElementById('month3').value = data.month3 || '';
        document.getElementById('planType').value = data.planType || '';
        document.getElementById('carrier').value = data.carrier || '';
        document.getElementById('usageLocation').value = data.usageLocation || '';
        document.getElementById('needs').value = data.needs || '';
    }
}

// Processamento da análise (simulação de IA)
function processAnalysis(userData) {
    const { currentGB, month1, month2, month3, planType, carrier, usageLocation, needs } = userData;
    
    // Calcular consumo médio
    const avgConsumptionValue = Math.round((month1 + month2 + month3) / 3);
    
    // Determinar perfil de uso
    let usageProfileValue = "Moderado";
    if (avgConsumptionValue < 5) usageProfileValue = "Leve";
    if (avgConsumptionValue > 15) usageProfileValue = "Intenso";
    
    // Determinar local de uso
    let usageLocationValue = "";
    switch(usageLocation) {
        case "street": usageLocationValue = "Uso principal na rua"; break;
        case "work": usageLocationValue = "Uso principal no trabalho"; break;
        case "home": usageLocationValue = "Uso principal em casa"; break;
        default: usageLocationValue = "Uso variado";
    }
    
    // Selecionar plano recomendado
    const availablePlans = planDatabase[planType] || planDatabase.individual;
    let recommendedPlan = availablePlans[0];
    
    // Encontrar plano com GB mais próximo do consumo médio + margem de segurança
    const targetGB = Math.max(avgConsumptionValue + 5, 10); // Mínimo de 10GB
    for (let plan of availablePlans) {
        if (Math.abs(plan.gb - targetGB) < Math.abs(recommendedPlan.gb - targetGB)) {
            recommendedPlan = plan;
        }
    }
    
    // Atualizar elementos da página com os resultados
    document.getElementById('avgConsumption').textContent = `${avgConsumptionValue} GB`;
    document.getElementById('usageProfile').textContent = usageProfileValue;
    document.getElementById('usageLocationText').textContent = usageLocationValue;
    
    document.getElementById('recommendedPlanName').textContent = recommendedPlan.name;
    document.getElementById('recommendedCarrier').textContent = recommendedPlan.carrier;
    document.getElementById('recommendedGB').textContent = `${recommendedPlan.gb} GB`;
    document.getElementById('recommendedPrice').textContent = `R$ ${recommendedPlan.price.toFixed(2).replace('.', ',')}`;
    document.getElementById('recommendedType').textContent = planType === 'individual' ? 'Individual' : 'Familiar';
    document.getElementById('recommendedLink').href = recommendedPlan.link;
    
    document.getElementById('currentPlanGB').textContent = `${currentGB} GB`;
    document.getElementById('recommendedPlanGB').textContent = `${recommendedPlan.gb} GB`;
    
    // Calcular barras de comparação
    const maxGB = Math.max(currentGB, recommendedPlan.gb);
    const currentGBPercentage = (currentGB / maxGB) * 100;
    const recommendedGBPercentage = (recommendedPlan.gb / maxGB) * 100;
    
    document.getElementById('currentGBBar').style.width = `${currentGBPercentage}%`;
    document.getElementById('recommendedGBBar').style.width = `${recommendedGBPercentage}%`;
    
    // Texto de comparação
    if (recommendedPlan.gb > currentGB) {
        document.getElementById('comparisonText').textContent = `Recomendamos ${recommendedPlan.gb - currentGB} GB adicionais para atender melhor suas necessidades.`;
    } else if (recommendedPlan.gb < currentGB) {
        document.getElementById('comparisonText').textContent = `Seu plano atual tem ${currentGB - recommendedPlan.gb} GB além do necessário, podendo economizar.`;
    } else {
        document.getElementById('comparisonText').textContent = `Seu plano atual está adequado ao seu perfil de uso.`;
    }
    
    // Análise detalhada
    const needsText = needs ? ` Suas necessidades de ${needs.toLowerCase()} foram consideradas.` : '';
    document.getElementById('detailedAnalysis').textContent = `Baseado no seu consumo médio de ${avgConsumptionValue} GB/mês e uso principal ${usageLocationValue.toLowerCase()},${needsText} recomendamos o plano ${recommendedPlan.name} da ${recommendedPlan.carrier} com ${recommendedPlan.gb} GB por R$ ${recommendedPlan.price.toFixed(2).replace('.', ',')}. Este plano atende suas necessidades com uma margem de segurança adequada.`;
    
    // Criar gráfico
    createConsumptionChart([month1, month2, month3]);
}

// Criar gráfico de consumo
function createConsumptionChart(monthlyData) {
    const ctx = document.getElementById('consumptionChart').getContext('2d');
    
    // Destruir gráfico anterior se existir
    if (window.consumptionChartInstance) {
        window.consumptionChartInstance.destroy();
    }
    
    window.consumptionChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mês 1', 'Mês 2', 'Mês 3'],
            datasets: [{
                label: 'GB Consumidos',
                data: monthlyData,
                backgroundColor: [
                    'rgba(37, 99, 235, 0.7)',
                    'rgba(37, 99, 235, 0.7)',
                    'rgba(37, 99, 235, 0.7)'
                ],
                borderColor: [
                    'rgb(37, 99, 235)',
                    'rgb(37, 99, 235)',
                    'rgb(37, 99, 235)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'GB Consumidos'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} GB`;
                        }
                    }
                }
            }
        }
    });
}
