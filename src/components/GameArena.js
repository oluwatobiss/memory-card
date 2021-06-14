import { useState, useEffect } from 'react';
import CardMaker from './CardMaker';
import uniqid from 'uniqid';

let numbOfCardsOnDisplay = null;
let idOfEachCardOnDisplay = [];
let newLevel = true;
let bestScore = 0;

function GameArena() {
    const [cards, setCards] = useState([]);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [currentScore, setCurrentScore] = useState(0);

    function updateLevelsData() {
        const newCards = [];
        const nodeOfCurrentLevel = document.getElementById('current-level');

        nodeOfCurrentLevel.innerText = currentLevel;
        numbOfCardsOnDisplay = currentLevel * 4;
        newLevel = true;

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
            setCurrentScore(c => {
                updateCurrScoreOnDisplay(c + 1);
                if (bestScore <= c) {
                    const nodeOfBestScore = document.getElementById('best-score');
                    nodeOfBestScore.innerText = c + 1;
                    bestScore = c + 1;
                }
                return c + 1;
            });

            if (idOfEachCardOnDisplay.length === numbOfCardsOnDisplay) {
                idOfEachCardOnDisplay = [];
                setCurrentLevel(c => {
                    newLevel = true;
                    return c + 1;
                });
            }
            newLevel = false;
            console.log(`Current score is: ${currentScore}`);
        } else {
            setCurrentScore(0);
            setCurrentLevel(1);
            idOfEachCardOnDisplay = [];
            updateCurrScoreOnDisplay(0);
            alert("Gave over! You previously selected that card. Try again.");
        }
    }

    function configClickEvent() {
        const cardsOnDisplay = document.getElementsByClassName('card-article');
        if (newLevel) {
            Array.from(cardsOnDisplay).forEach( i => i.addEventListener('click', () => updateGameData(i)));
        }
        return () => Array.from(cardsOnDisplay).forEach(i => i.removeEventListener('click', updateGameData));
    }

    useEffect(updateLevelsData, [currentLevel]);
    useEffect(configClickEvent);

    return (
        <div id='game-arena-div'>
            {
                (function shuffleCards(arr) {
                    for (let i = arr.length - 1; i > 0; i--) {
                      const randomIndNum = Math.floor(Math.random() * (i + 1));
                      [arr[i], arr[randomIndNum]] = [arr[randomIndNum], arr[i]];
                    }
                    return arr;
                })(cards)
            }
        </div>
    )
}

export default GameArena;