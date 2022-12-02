// import React from "react";
// const TuitImage = ({tuit}) => {
//   return(
//     <div className="position-relative">
//       <img src={`../images/${tuit.image}`}
//            className="mt-2 w-100 ttr-rounded-15px"/>
//       {
//         tuit.imageOverlay &&
//         <span
//           className={`fa-2x text-white fw-bold bottom-0
//                       ttr-tuit-image-overlay position-absolute`}>
//           {tuit.imageOverlay}
//         </span>
//       }
//     </div>
//   );
// };
// export default TuitImage;
import React from "react";
const TuitImage = ({image, deleteHandler}) => {
    return(
        <>
            <img data-testid="image-display" src={image}
                 className="d-block w-100 align-content-center" alt={"..."}/>
            {
                deleteHandler &&
                <span className="position-absolute top-50 start-50 translate-middle badge rounded-pill bg-secondary"
                      onClick={() => deleteHandler(image, "image")}>
                            Remove
                          </span>
            }
        </>
    )
};
export default TuitImage;