import { useState, useEffect } from 'react';
import CardMaker from './CardMaker';
import uniqid from 'uniqid';

function GameArena() {
    const [currentLevel, setCurrentLevel] = useState(1);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const newCards = [];
        [...Array(currentLevel * 4)].map(i => newCards.push(<CardMaker ind={newCards.length} key={uniqid()} />));
        console.log(newCards);
        setCards(newCards);
    }, [currentLevel])

    return (
        <div id='game-arena-div'>
            {cards}
        </div>
    )
}

export default GameArena;