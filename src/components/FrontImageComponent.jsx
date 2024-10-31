import React, { useRef } from "react";
const FrontImageComponent = (props) => {
  const image = props.image;
  const imageRef = useRef();

  const setDimensions = () => {
    if (imageRef.current) {
      const { width, height } = imageRef.current.getBoundingClientRect();
      props.setDimensions({
        width: `${width}px`,
        height: `${height}px`,
      });
    }
  };

  const handleMouseEnter = () => {
    setDimensions();
    // props.togglePlay(image);
  };

  return (
    <div>
      <img
        ref={imageRef}
        // onLoad={setDimensions}
        onMouseEnter={() => handleMouseEnter()}
        onClick={() => props.togglePlay(image)}
        src={image.image_url}
        alt=""
      />
    </div>
  );
};

export default FrontImageComponent;
