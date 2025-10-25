// Manipulação do formulário de agendamento
document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        data: document.getElementById('data').value,
        horario: document.getElementById('horario').value,
        servico: document.getElementById('servico').value,
        mensagem: document.getElementById('mensagem').value
    };
    
    // Validação básica
    if (!formData.nome || !formData.email || !formData.telefone || !formData.data || !formData.horario || !formData.servico) {
        showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Validar e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMessage('Por favor, insira um e-mail válido.', 'error');
        return;
    }
    
    // Validar data (não pode ser no passado)
    const selectedDate = new Date(formData.data);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showMessage('Por favor, selecione uma data futura.', 'error');
        return;
    }
    
    // Simular envio do formulário
    console.log('Dados do agendamento:', formData);
    
    // Mostrar mensagem de sucesso
    showMessage('Solicitação enviada com sucesso! Entraremos em contato em breve para confirmar seu agendamento.', 'success');
    
    // Limpar formulário
    document.getElementById('appointmentForm').reset();
    
    // Aqui você pode adicionar a integração com seu backend
    // fetch('/api/agendamento', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData)
    // })
});

// Função para mostrar mensagens
function showMessage(message, type) {
    // Remover mensagens anteriores
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Criar nova mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    // Adicionar após o formulário
    const form = document.getElementById('appointmentForm');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
    
    // Scroll suave até a mensagem
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Máscara para telefone
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    }
    
    e.target.value = value;
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Adicionar animação aos elementos quando entram na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar seções para animação
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Validação de data mínima (hoje)
const dateInput = document.getElementById('data');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);