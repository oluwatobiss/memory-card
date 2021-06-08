import { useState } from 'react'
import Score from './Score'

function ScoreBoard() {
    const [currentScore, setCurrentScore] = useState({
        icon: '⏳',
        text: 'Current Score',
        numb: 7
    })

    const [bestScore, setBestScore] = useState({
        icon: '⭐',
        text: 'Best Score',
        numb: 51
    })

    const [currentLevel, setCurrentLevel] = useState({
        icon: '📌',
        text: 'Current Level',
        numb: 2
    })

    return (
        <div id='score-board-div'>
            <Score icon={currentScore.icon} text={currentScore.text} numb={currentScore.numb} />
            <Score icon={bestScore.icon} text={bestScore.text} numb={bestScore.numb} />
            <Score icon={currentLevel.icon} text={currentLevel.text} numb={currentLevel.numb} />
        </div>
    )
}

export default ScoreBoard