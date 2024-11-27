import React, { useRef } from "react";
const FrontImageComponent = (props) => {
  const image = props.image;
  const imageRef = useRef();

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

  return (
    <div
      className={`${
        image === props.selectedImage ? "selected-img-wrapper" : ""
      }`}
      onClick={() => {
        // setDimensions();
        props.setSelectedImage();
        props.togglePlay(image);
      }}
    >
      <img
        className={`${image === props.selectedImage ? "selected-img" : ""}`}
        ref={imageRef}
        src={image.image_url}
        alt=""
      />

      {
        <div className="card-front">
          <button
            id="open"
            onClick={(e) => {
              e.stopPropagation();
              // props.setSelectedImage();
              props.setFlippedImage();
              setDimensions();
              // props.togglePlay(image);
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
