// Variáveis que a gente vai usar o tempo todo no jogo
let baralho, jogador, banca, fimDeJogo;

// Função que monta o baralho e embaralha
function criarBaralho() {
  const naipes = ['♠', '♥', '♣', '♦']; // Os símbolos bonitinhos das cartas
  const valores = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']; // Os números e letras
  let cartas = [];

  // Junta cada valor com cada naipe, tipo "A♥", "10♠", etc
  for (let naipe of naipes) {
    for (let valor of valores) {
      cartas.push({valor, naipe});
    }
  }

  // Embaralha tudo na doideira
  return cartas.sort(() => Math.random() - 0.5);
}

// Vê quanto vale a mão (as cartas que o jogador ou a banca têm)
function valorDaMao(mao) {
  let total = 0, ases = 0;

  // Soma os pontos das cartas
  for (let carta of mao) {
    if (['J','Q','K'].includes(carta.valor)) total += 10; // J, Q e K valem 10
    else if (carta.valor === 'A') { // Ás vale 11 por enquanto
      total += 11;
      ases++;
    } else {
      total += parseInt(carta.valor); // As cartas normais valem o número mesmo
    }
  }

  // Se passar de 21 e tiver Ás, troca 11 por 1 pra tentar salvar
  while (total > 21 && ases > 0) {
    total -= 10;
    ases--;
  }

  return total;
}

// Mostra as cartas do jogador e da banca na tela
function mostrarCartas(mostrarTudo = false) {
  // Cartas do jogador
  const textoJogador = jogador.map(c => c.valor + c.naipe).join(', ');
  const totalJogador = valorDaMao(jogador);
  document.getElementById('player').textContent = 'Jogador: ' + textoJogador + ' (' + totalJogador + ')';

  let textoBanca = '', totalBanca = 0;

  // Se o jogo acabou, mostra tudo da banca
  if (fimDeJogo || mostrarTudo) {
    textoBanca = banca.map(c => c.valor + c.naipe).join(', ');
    totalBanca = valorDaMao(banca);
  } else {
    // Se ainda tá rolando, esconde uma carta da banca
    textoBanca = banca[0].valor + banca[0].naipe + ', ??';
    totalBanca = '?';
  }

  document.getElementById('dealer').textContent = 'Banca: ' + textoBanca + ' (' + totalBanca + ')';
}

// Começa o jogo (ou reinicia)
function iniciarJogo() {
  baralho = criarBaralho(); // Novo baralho embaralhado
  jogador = [baralho.pop(), baralho.pop()]; // Duas cartas pro player
  banca = [baralho.pop(), baralho.pop()]; // Duas pra banca
  fimDeJogo = false;
  document.getElementById('resultado').textContent = ''; // Limpa o texto de vitória/derrota
  mostrarCartas(); // Mostra as cartas na tela
}

// Quando o player clica no botão "Pedir Carta"
function pedirCarta() {
  if (fimDeJogo) return; // Se o jogo já acabou, não faz nada

  jogador.push(baralho.pop()); // Dá mais uma cartinha pro jogador
  mostrarCartas();

  // Se o cara passar de 21, perdeu :(
  if (valorDaMao(jogador) > 21) {
    fimDeJogo = true;
    mostrarCartas(true); // Revela as cartas da banca
    document.getElementById('resultado').textContent = 'Você perdeu!';
  }
}

// Quando o jogador decide parar e passar a vez pra banca
function parar() {
  if (fimDeJogo) return;

  // A banca compra até chegar a pelo menos 17
  while (valorDaMao(banca) < 17) {
    banca.push(baralho.pop());
  }

  fimDeJogo = true;
  mostrarCartas(true); // Mostra tudo

  // Agora vê quem ganhou
  const totalJogador = valorDaMao(jogador);
  const totalBanca = valorDaMao(banca);
  let res = '';

  if (totalBanca > 21 || totalJogador > totalBanca) res = 'Você venceu! 🎉';
  else if (totalJogador < totalBanca) res = 'Banca venceu! 😭';
  else res = 'Empate! 🤝';

  document.getElementById('resultado').textContent = res;
}

// Quando a página carrega, já começa um joguinho
iniciarJogo();
