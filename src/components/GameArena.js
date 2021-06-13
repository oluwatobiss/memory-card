import { useState, useEffect } from 'react';
import CardMaker from './CardMaker';
import uniqid from 'uniqid';

let numbOfCardsOnDisplay = null;
let idOfEachCardOnDisplay = [];
let currentScore = 0;
let bestScore = 0;

function GameArena() {
    const [cards, setCards] = useState([]);
    const [currentLevel, setCurrentLevel] = useState(1);

    function updateLevelsData() {
        const newCards = [];
        const nodeOfCurrentLevel = document.getElementById('current-level');

        nodeOfCurrentLevel.innerText = currentLevel;
        numbOfCardsOnDisplay = currentLevel * 4;

        [...Array(numbOfCardsOnDisplay)].map(
            i => newCards.push(<CardMaker ind={newCards.length} id={uniqid()} key={uniqid()} />)
        );

        setCards(newCards);
    }

    function updateGameData(i) {
        function updateCurrScoreOnDisplay(newScore) {
            const nodeOfCurrentScore = document.getElementById('current-score');
            nodeOfCurrentScore.innerText = newScore;
        }

        if (!idOfEachCardOnDisplay.includes(i.id)) {
            idOfEachCardOnDisplay.push(i.id);
            currentScore = currentScore + 1;
            updateCurrScoreOnDisplay(currentScore);

            if (bestScore <= currentScore) {
                const nodeOfBestScore = document.getElementById('best-score');
                nodeOfBestScore.innerText = currentScore;
                bestScore = currentScore;
            }

            if (idOfEachCardOnDisplay.length === numbOfCardsOnDisplay) {
                idOfEachCardOnDisplay = [];
                setCurrentLevel(c => c + 1);
            }
            console.log(idOfEachCardOnDisplay);
            console.log(currentScore);
            console.log(currentLevel);
            console.log(`Current score is: ${currentScore}`);
        } else {
            currentScore = 0;
            setCurrentLevel(1);
            idOfEachCardOnDisplay = [];
            updateCurrScoreOnDisplay(currentScore);
            console.log("Gave over! You previously selected that card. Try again.");
        }
    }

    function configClickEvent() {
        const cardsOnDisplay = document.getElementsByClassName('card-article');
        Array.from(cardsOnDisplay).forEach( i => i.addEventListener('click', () => updateGameData(i)));
        return () => Array.from(cardsOnDisplay).forEach(i => i.removeEventListener('click', updateGameData));
    }

    useEffect(updateLevelsData, [currentLevel]);
    useEffect(configClickEvent);

    return (
        <div id='game-arena-div'>
            {cards}
        </div>
    )
}

export default GameArena;