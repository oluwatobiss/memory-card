function CardMaker() {
    const cardImage = {
        backgroundImage:'url(https://cdn.pixabay.com/photo/2021/05/10/05/40/scarlet-mormon-butterfly-6242643_1280.jpg)',
        backgroundColor: 'white',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    }

    return (
        <article className='card-article' style={cardImage}>
            <div className='card-image-div'></div>
            <div className='card-text-div'>Butterfly</div>
        </article>
    )
}

export default CardMaker