function criarBaralho() {
  const naipes = ['♠', '♥', '♣', '♦']; 
  const valores = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  let cartas = [];
  for (let naipe of naipes) {
    for (let valor of valores) {
      cartas.push({valor, naipe});
    }
}
