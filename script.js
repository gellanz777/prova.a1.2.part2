document.addEventListener('DOMContentLoaded', () => {   
    const URL = 'https://dog.ceo/api/breeds/image/random';
    const btnCarregar = document.getElementById('btnCarregar');
    const btnVerLogs = document.getElementById('btnVerLogs');
    const dogContainer = document.getElementById('dogContainer');
    const modalLogs = document.getElementById('modalLogs');
    const closeModal = modalLogs.querySelector('.close');
    const listaLogs = document.getElementById('listaLogs');

    // Array para armazenar os logs
    let logs = [];

    // Função para carregar um novo cachorro
    async function carregarDog() {
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error('Erro ao carregar a imagem do cachorro');
            }
            const data = await response.json();
            
            // Criar elemento de imagem
            const img = document.createElement('img');
            img.src = data.message;
            img.alt = 'Cachorro';
            
            // Limpar o container e adicionar a nova imagem
            dogContainer.innerHTML = '';
            dogContainer.appendChild(img);
            
            // Registrar o log
            const timestamp = new Date().toLocaleString();
            logs.push(`[${timestamp}] Imagem carregada: ${data.message}`);
            
        } catch (error) {
            console.error('Erro:', error);
            dogContainer.innerHTML = '<p>Erro ao carregar a imagem</p>';
            logs.push(`[${new Date().toLocaleString()}] Erro: ${error.message}`);
        }
    }

    // Event Listeners
    btnCarregar.addEventListener('click', carregarDog);

    btnVerLogs.addEventListener('click', () => {
        listaLogs.innerHTML = logs.map(log => `<li>${log}</li>`).join('');
        modalLogs.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modalLogs.style.display = 'none';
    });

    // Fechar modal ao clicar fora dele
    window.onclick = (event) => {
        if (event.target === modalLogs) {
            modalLogs.style.display = 'none';
        }
    };

    // Carregar primeiro cachorro automaticamente
    carregarDog();
});
