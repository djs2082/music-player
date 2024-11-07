import React, { useEffect, useRef, useState } from "react";
const FrontImageComponent = (props) => {
  const image = props.image;
  const imageRef = useRef();
  const [showBtn, setShowBtn] = useState(true);

  // useEffect(() => {
  //   const img = new Image();
  //   console.log(img);
  //   img.src = image.image_url;

  //   img.onload = () => {
  //     // img.width = img.naturalWidth;
  //     console.log(`Image width: ${img.naturalWidth}px`);
  //     console.log(`Image height: ${img.naturalHeight}px`);
  //   };
  // }, [image]);

  const setDimensions = () => {
    if (imageRef.current) {
      const { width, height } = imageRef.current.getBoundingClientRect();
      console.log(width, height);
      props.setDimensions(
        {
          width: `${width}px`,
          height: `${height}px`,
        },
        image.id
      );
    }
  };

  // useEffect(() => {
  //   const cards = document.getElementsByClassName("card-front");
  //   console.log(cards);
  //   if (cards) {
  //     const id = image.id - 1;
  //     console.log(id);
  //     cards[id].addEventListener("transitionstart", () => {
  //       setShowBtn(false);
  //       cards[id].classList.add("transitioning");
  //       console.log("transitioning");
  //     });

  //     cards[id].addEventListener("transitionend", () => {
  //       setShowBtn(true);
  //       cards[id].classList.remove("transitioning");

  //       console.log("transitionend");
  //     });
  //   }
  // }, [image]);

  const handleMouseEnter = () => {
    setDimensions();
    // props.togglePlay(image);
  };

  return (
    <div>
      <img
        ref={imageRef}
        // onLoad={setDimensions}
        // onMouseEnter={() => handleMouseEnter()}
        src={image.image_url}
        alt=""
      />

      {
        <div className="card-front">
          <button
            id="open"
            onClick={() => {
              setShowBtn(false);
              setDimensions();
              props.togglePlay(image);
            }}
          >
            &gt;
          </button>
        </div>
      }
    </div>
  );
};

export default FrontImageComponent;
