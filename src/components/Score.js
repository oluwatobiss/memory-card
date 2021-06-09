function Score(props) {
    return (
        <div className='score-div'>
            <span className='score-div-icon'>{props.icon}</span>
            <span className='score-div-text'>{props.text}</span>
            <span className='score-div-numb'>{props.numb}</span>
        </div>
    )
}

export default Score;