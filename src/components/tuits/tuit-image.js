import React from "react";

const TuitImage = ({tuit, image}) => {
  
  return(
    <div className="position-relative">
      <img src={image}
           className="mt-2 w-100 li-img"/>
      {
        tuit.imageOverlay &&
        <span
          className={`fa-2x text-white fw-bold bottom-0
                      ttr-tuit-image-overlay position-absolute`}>
          {tuit.imageOverlay}
        </span>
      }
    </div>
  );
};
export default TuitImage;