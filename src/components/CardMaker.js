import { useState, useEffect } from "react";

function CardMaker(props) {
  const [imagesData, setImagesData] = useState(null);
  const photographer = {
    user: "Oluwatobi",
    page: "https://www.codesweetly.com/",
  };

  let cardImage = { backgroundColor: "white" };

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=flowers&image_type=photo&orientation=horizontal&per_page=132`
    )
      .then((response) => response.json())
      .then((jsonResult) => setImagesData(jsonResult))
      .catch(() => console.log("Something went wrong"));
  }, []);

  if (imagesData) {
    const chosenImageData = imagesData.hits[props.ind];
    const imageURL = chosenImageData.webformatURL;

    photographer.user = chosenImageData.user;
    photographer.page = chosenImageData.pageURL;

    cardImage = {
      backgroundImage: `url(${imageURL})`,
      backgroundColor: "white",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    };
  }

  return (
    <article id={props.id} className="card-article" style={cardImage}>
      <div className="card-dummy-div"></div>
      <div className="card-text-div">
        <a
          className="image-credit"
          target="_blank"
          rel="noreferrer"
          href={photographer.page}
        >
          {photographer.user}
        </a>
      </div>
    </article>
  );
}

export default CardMaker;
