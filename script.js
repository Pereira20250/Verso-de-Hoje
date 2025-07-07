const versiculos = [
  { texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito...', referencia: 'João 3:16' },
  { texto: 'O Senhor é meu pastor, nada me faltará.', referencia: 'Salmo 23:1' },
  { texto: 'Posso todas as coisas naquele que me fortalece.', referencia: 'Filipenses 4:13' },
  { texto: 'Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.', referencia: 'Salmo 37:5' },
  { texto: 'Mil cairão ao teu lado e dez mil à tua direita, mas tu não serás atingido', referencia: 'Salmo 91:7'},
  { texto: 'Entregue o teu caminho ao Senhor; confia nele, e ele tudo fará.', referencia: 'salmo 37:5'},
];

function getTodayKey() {
  const today = new Date();
  return today.toISOString().slice(0, 10);
}

function loadVersiculos() {
  const stored = JSON.parse(localStorage.getItem('versiculosMostrados')) || [];
  return stored;
}

function saveVersiculos(versiculosMostrados) {
  localStorage.setItem('versiculosMostrados', JSON.stringify(versiculosMostrados));
}

function mostrarVersiculos() {
  const container = document.getElementById('meio');
  container.innerHTML = '';
  const versiculosMostrados = loadVersiculos();
  versiculosMostrados.forEach(v => {
    const div = document.createElement('div');
    div.className = 'versiculo-dia';
    div.innerHTML = `<p>"${v.texto}"<br><strong>${v.referencia}</strong><br><small>${v.data}</small></p>`;
    container.appendChild(div);
  });
}

function adicionarVersiculoDoDia() {
  const versiculosMostrados = loadVersiculos();
  const hoje = getTodayKey();
  const ultimo = versiculosMostrados[versiculosMostrados.length - 1];
  if (!ultimo || ultimo.data !== hoje) {
    const proximoIndice = versiculosMostrados.length % versiculos.length;
    const novoVersiculo = { ...versiculos[proximoIndice], data: hoje };
    versiculosMostrados.push(novoVersiculo);
    saveVersiculos(versiculosMostrados);
  }
}

function toggleMenu() {
    const nav = document.getElementById('buttons-nav');
    nav.classList.toggle('hide');
}

adicionarVersiculoDoDia();
mostrarVersiculos();

// ...existing code...
function mostrarVersiculos() {
  const container = document.getElementById('meio');
  container.innerHTML = '';
  const versiculosMostrados = loadVersiculos();
  versiculosMostrados.forEach(v => {
    const div = document.createElement('div');
    div.className = 'versiculo-dia';
    div.innerHTML = `
      <p>"${v.texto}"<br><strong>${v.referencia}</strong><br><small>${v.data}</small></p>
      <button class="whatsapp-share" onclick="compartilharWhatsApp('${v.texto.replace(/'/g, "\\'")}', '${v.referencia}')">
        Compartilhar no WhatsApp
      </button>
    `;
    container.appendChild(div);
  });
}

// Função para compartilhar no WhatsApp
function compartilharWhatsApp(texto, referencia) {
  const mensagem = `"${texto}"\n${referencia}\nEnviado pelo app Versículo de Hoje!`;
  const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}
// ...existing code...