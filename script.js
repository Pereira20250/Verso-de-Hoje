const versiculos = [
  { texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito...', referencia: 'João 3:16' },
  { texto: 'O Senhor é meu pastor, nada me faltará.', referencia: 'Salmo 23:1' },
  { texto: 'Posso todas as coisas naquele que me fortalece.', referencia: 'Filipenses 4:13' },
  { texto: 'Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.', referencia: 'Salmo 37:5' },
  { texto: 'Mil cairão ao teu lado e dez mil à tua direita, mas tu não serás atingido', referencia: 'Salmo 91:7'},
  { texto: 'Entregue o teu caminho ao Senhor; confia nele, e ele tudo fará.', referencia: 'Salmo 37:5'},
  { texto: 'Não temas pois eu sou contigo, e não te assombres pois eu sou o teu Deus.', referencia: 'Isaias 41:10'},
  { texto: 'Não fui eu que ordenei a você? Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar".', referencia: 'Josué 1:9'},
  { texto: 'Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos.', referencia: 'Provérbios 16:3'},
  { texto: 'Porque sou eu que conheço os planos que tenho para vocês', 'diz o Senhor', 'planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.', referencia: 'Jeremias 29:11'},
  { texto: '"Venham a mim, todos os que estão cansados e sobrecarregados, e eu darei descanso a vocês.', referencia: 'Mateus 11:28'},
  { texto: 'Lancem sobre ele toda a sua ansiedade, porque ele tem cuidado de vocês.', referencia: 'Mateus 6:33'},
  { texto: 'Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus.', referencia: 'Filipenses 4:6'},
  { texto: 'Assim, permanecem agora estes três: a fé, a esperança e o amor. O maior deles, porém, é o amor.', referencia: '1 Coríntios 13:13'},
  { texto: 'Acima de tudo, porém, revistam-se do amor, que é o elo perfeito.', referencia: 'Colossenses 3:14'},
  { texto: 'Deus converte o deserto em lago e a terra seca em fontes.', referencia: 'Salmos 107:35'},
  { texto: 'Busquem, pois, em primeiro lugar o Reino de Deus e a sua justiça, e todas essas coisas lhes serão acrescentadas.', referencia: 'Mateus 6:33'},
  { texto: 'Escondi a tua palavra no meu coração, para eu não pecar contra ti.', referencia: 'Salmos 119:11'},
  { texto: 'A esperança adiada desfalece o coração, mas o desejo atendido é árvore', referencia: 'Provérbios 13:12'},
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
