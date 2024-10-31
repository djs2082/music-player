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

  const handleMouseEnter = (id) => {
    setDimensions();
    props.togglePlay(id);
  };

  return (
    <div>
      <img
        ref={imageRef}
        // onLoad={setDimensions}
        onMouseEnter={() => handleMouseEnter(image.image_id)}
        onClick={() => props.togglePlay(image.id)}
        src={image.image_url}
        alt=""
      />
    </div>
  );
};

export default FrontImageComponent;
