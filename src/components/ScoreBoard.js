import Score from './Score'

function ScoreBoard() {
    const currentScore = {
        icon: '⏳',
        text: 'Current Score',
        numb: 0
    };

    const bestScore = {
        icon: '⭐',
        text: 'Best Score',
        numb: 0
    };

    const currentLevel = {
        icon: '📌',
        text: 'Current Level',
        numb: 1
    };

    return (
        <div id='score-board-div'>
            <Score id='current-score' icon={currentScore.icon} text={currentScore.text} numb={currentScore.numb} />
            <Score id='best-score' icon={bestScore.icon} text={bestScore.text} numb={bestScore.numb} />
            <Score id='current-level' icon={currentLevel.icon} text={currentLevel.text} numb={currentLevel.numb} />
        </div>
    )
}

export default ScoreBoard;