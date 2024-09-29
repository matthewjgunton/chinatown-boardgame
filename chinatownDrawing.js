var readlineSync = require('readline-sync');
run(parseInt(process.argv[2]));

function run(numPlayers) {
	if (!numPlayers || isNaN(numPlayers) || numPlayers > 6 || numPlayers < 3) {
		console.log(!numPlayers, typeof numPlayers !== "number", numPlayers > 6, numPlayers < 3);
		console.log("PLEASE ENTER THE NUMBER OF PLAYERS YOU WANT\nYOU CAN HAVE FROM 3 - 6 PLAYERS");
		return;
	}

	const businessDeck = [];
	const businessCard = (name, maxSize) => {
		return {
			name: name,
			maxSize: maxSize
		}
	};

	const businesses = [
		businessCard("tea", 3),
		businessCard("photo", 3),
		businessCard("sea food", 3),
		businessCard("jewelery", 4),
		businessCard("tropical fish", 4),
		businessCard("florist", 4),
		businessCard("take out", 5),
		businessCard("laundry", 5),
		businessCard("dim sum", 5),
		businessCard("antiques", 6),
		businessCard("factory", 6),
		businessCard("restaurant", 6),
	];

	for (let i = 0; i < businesses.length; i++) {
		let business = businesses[i];
		for (let j = 0; j < business.maxSize + 3; j++) {
			businessDeck.push(business);
		}
	}

	console.log("Confirm: 90 = " + businessDeck.length);

	const deck = [];
	const NUMBEROFCARDSINDECK = 85;
	let round = 0;
	for (let i = 0; i < NUMBEROFCARDSINDECK; i++) {
		deck.push(i + 1);
	}
	while (round < 6) {
		console.log("*******************************");
		console.log("BEGINNING OF ROUND #" + (round + 1));
		console.log("*******************************");
		//draw the building cards

		console.log("Draw Property Cards");
		console.log("=====================")
		for (let i = 0; i < numPlayers; i++) {
			const cardsToDraw = numCardsForRound(round, numPlayers);
			const possibleCardValues = [];
			let possibleCards = "";
			let cardsDrawn = 0;
			while (cardsDrawn < cardsToDraw) {//inefficient, but we do what we must
				let index = Math.floor(Math.random() * deck.length);
				possibleCardValues.push(deck[index]);
				possibleCards += deck[index] + " ";
				deck.splice(index, 1);
				cardsDrawn++;
			}
			while (true) {
				console.log("---");
				const que = "Player #" + (i + 1) + ": Type what cards you want to give back separated by commas, you need to give back 2 cards: \n" + possibleCards + "\n";
				const returnedCards = readlineSync.question(que).split(",");
				const returnedCardsInt = [];
				const n = returnedCards.length;
				let loop = false;
				for (let j = 0; j < n; j++) {
					let num = parseInt(returnedCards[j]);
					if (isNaN(num)) {
						console.log("Not a number entered", returnedCards[k]);
						loop = true;
						break;
					}
					returnedCardsInt.push(num);
				}
				let seen = new Set();
				for (let k = 0; k < returnedCardsInt.length; k++) {
					if (!possibleCardValues.includes(returnedCardsInt[k])) {
						console.log("Not a card dealt", returnedCardsInt[k], possibleCardValues, possibleCardValues.includes(returnedCardsInt[k]));
						loop = true;
						break;
					}
					if (seen.has(returnedCardsInt[k])) {
						console.log("Duplicate card entered", returnedCardsInt[k]);
						loop = true;
						break;
					}
					seen.add(returnedCardsInt[k]);
				}

				if (returnedCardsInt.length != 2) {
					console.log("Did not return 2 cards", returnedCardsInt);
					loop = true;
				}

				if (!loop) {
					returnedCards.forEach(c => deck.push(parseInt(c)));
					break;
				}
				console.log("Please enter in 2 valid cards to return");
			}
		}

		console.log("=====================");
		console.log("Draw Business Cards");
		console.log("=====================");

		//draw the business cards
		for (let i = 0; i < numPlayers; i++) {
			const cardsToDraw = numCardsForRoundBusiness(round, numPlayers);
			let possibleCards = [];
			let cardsDrawn = 0;
			while (cardsDrawn < cardsToDraw) {//inefficient, but we do what we must
				let index = Math.floor(Math.random() * businessDeck.length);
				possibleCards.push(businessDeck[index]);
				businessDeck.splice(index, 1);
				cardsDrawn++;
			}
			console.log("Player #" + (i + 1) + " \n Your businesses drawn: ", possibleCards);
		}

		console.log("****************************");
		console.log("****************************");
		console.log("****************************");
		console.log("Beginning of trade");
		console.log("****************************");
		console.log("****************************");
		console.log("****************************");
		readlineSync.question("Press any button to continue").split(",");

		round++;
	}
	console.log("GAME OVER!");
}

function numCardsForRound(round, players) {
	const play3_building = [7, 6, 6, 6, 6, 6];
	const play4_building = [6, 5, 5, 5, 5, 5];
	const play5_building = [5, 5, 5, 4, 4, 4];

	switch (players) {
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

function numCardsForRoundBusiness(round, players) {
	const play3_building = [7, 4, 4, 4, 4, 4];
	const play4_building = [6, 3, 3, 3, 3, 3];
	const play5_building = [5, 3, 3, 2, 2, 2];

	switch (players) {
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
