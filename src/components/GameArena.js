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

    function updateCurrScoreOnDisplay(newScore) {
        const nodeOfCurrentScore = document.getElementById('current-score');
        nodeOfCurrentScore.innerText = newScore;
    }

    function updateLevelsData() {
        if (currentLevel > 30) {
            alert(
                `
                Wow! Congratulations 🤝
                You've won the game with a maximum score of ${currentScore} 🥇🏆🎉 
                Try another round.
                `
            );
            setCurrentScore(0);
            setCurrentLevel(1);
            idOfEachCardOnDisplay = [];
            updateCurrScoreOnDisplay(0);
            return;
        }

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
        newLevel && Array.from(cardsOnDisplay).forEach( i => i.addEventListener('click', () => updateGameData(i)));
        return () => Array.from(cardsOnDisplay).forEach(i => i.removeEventListener('click', updateGameData));
    }

    function shuffleCards(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const randomIndNum = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[randomIndNum]] = [arr[randomIndNum], arr[i]];
        }
        return arr;
    }

    // I intentionally omitted currentScore in updateLevelsData's dependency array 
    // to prevent updateLevelsData's execution each time the score changes.
    useEffect(updateLevelsData, [currentLevel]);
    useEffect(configClickEvent);

    return (
        <div id='game-arena-div'>
            { shuffleCards(cards) }
        </div>
    )
}

export default GameArena;