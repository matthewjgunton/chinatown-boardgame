var readlineSync = require('readline-sync');
run(parseInt(process.argv[2]));

function run(numPlayers){
	if( !numPlayers || isNaN(numPlayers) || numPlayers > 6 || numPlayers < 3){
		console.log(!numPlayers,typeof numPlayers !== "number",numPlayers > 6, numPlayers < 3);
		console.log("PLEASE ENTER THE NUMBER OF PLAYERS YOU WANT\nYOU CAN HAVE FROM 3 - 6 PLAYERS");
		return;
 	}

	const deck = [];
	const restCards = [];
	const NUMBEROFCARDSINDECK = 85;
	const NUMBUSINESSES = 90;
	let round = 0;
	for(let i = 0; i < NUMBUSINESSES; i++){
		if(i < NUMBEROFCARDSINDECK) deck.push(i+1);
		restCards.push(i+1);
	}
	while(round < 6){
		console.log("*******************************");
		console.log("BEGINNING OF ROUND #"+(round+1));
		for(let i = 0; i < numPlayers; i++){
			const cardsToDraw = numCardsForRound(round, numPlayers);
			const possibleCardValues = [];
			let possibleCards = "";
			let cardsDrawn = 0;
			while(cardsDrawn < cardsToDraw){//inefficient, but we do what we must
				let index = Math.floor(Math.random()*deck.length);
				let restIndex =  Math.floor(Math.random()*restCards.length);
				possibleCardValues.push(deck[index]);
				possibleCards += deck[index]+" ";
				deck.splice(index, 1);
				cardsDrawn++;
			}
			while(true){
				const que = "Player #"+(i+1)+": Type what cards you want to give back separated by commas, you need to give back 2 cards: \n"+possibleCards+"\n";
				const returnedCards = readlineSync.question(que).split(",");
				const n = returnedCards.length;
				let loop = false;
				for(let j = 0; j < n; j++){
					let num = parseInt(returnedCards[j]);
					if(isNaN(num)){
						loop = true;
						break;
					}
				}
				if(!loop){
					returnedCards.forEach(c=>deck.push(parseInt(c)));
					break;
				}
			}
		}
		round++;	
	}
	console.log("GAME OVER!");
}

function numCardsForRound(round, players){
	const play3_building = [7,6,6,6,6,6];
	const play4_building = [6,5,5,5,5,5];
	const play5_building = [5,5,5,4,4,4];

	switch(players){
		case 3:
			return play3_building[round];
		case 4:
			return play4_building[round];
		case 5:
			return play5_building[round];
		default:
			throw new Error("ILLEGAL NUMBER OF PLAYERS!");
	}
	return null;
}
