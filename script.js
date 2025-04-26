document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const themeSelector = document.getElementById('theme-selector');
  
    const themes = {
      emojis: ['🍎', '🍌', '🍇', '🍓', '🍎', '🍌', '🍇', '🍓'],
      animals: ['🐶', '🐱', '🐰', '🐼', '🐶', '🐱', '🐰', '🐼'],
      colors: ['🔴', '🟢', '🔵', '🟡', '🔴', '🟢', '🔵', '🟡']
    };
  
    let flippedCards = [];
    let matchedPairs = 0;
    let score = 0;
    let currentTheme = themes.emojis;
  
    function updateScoreDisplay() {
      scoreDisplay.innerText = `Score: ${score}`;
    }
  
    function flipCard(card) {
      if (
        flippedCards.length < 2 &&
        !card.classList.contains('flipped') &&
        !card.classList.contains('matched')
      ) {
        card.classList.add('flipped');
        flippedCards.push(card);
  
        if (flippedCards.length === 2) {
          checkMatch();
        }
      }
    }
  
    function checkMatch() {
      const [card1, card2] = flippedCards;
      const symbol1 = card1.dataset.symbol;
      const symbol2 = card2.dataset.symbol;
  
      if (symbol1 === symbol2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        score += 10;
        matchedPairs++;
        flippedCards = [];
        updateScoreDisplay();
  
        if (matchedPairs === currentTheme.length / 2) {
          setTimeout(() => {
            alert('You win!');
            initializeGame(currentTheme);
          }, 500);
        }
      } else {
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          flippedCards = [];
        }, 1000);
      }
    }
  
    function initializeGame(cardsArray) {
      gameBoard.innerHTML = '';
      flippedCards = [];
      matchedPairs = 0;
      score = 0;
      currentTheme = cardsArray;
      updateScoreDisplay();
  
      const shuffledCards = [...cardsArray].sort(() => 0.5 - Math.random());
      shuffledCards.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
  
        card.innerHTML = `
          <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">${symbol}</div>
          </div>
        `;
  
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
      });
    }
  
    themeSelector.addEventListener('change', () => {
      const selectedTheme = themeSelector.value;
      initializeGame(themes[selectedTheme]);
    });
  
   
    initializeGame(themes.emojis);
  });
  