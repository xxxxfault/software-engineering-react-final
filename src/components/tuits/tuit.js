import React from "react";
import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";

const Tuit = ({tuit, deleteTuit, likeTuit, dislikeTuit}) => {
  
  return(
    <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
      <div className="pe-2">
        {
          tuit.postedBy &&
          <img src={`../images/${tuit.postedBy.username}.jpg`}
               className="ttr-tuit-avatar-logo rounded-circle"/>
        }
      </div>
      <div className="w-100">
          <i onClick={() => deleteTuit(tuit._id)} className="fas fa-remove fa-2x fa-pull-right"></i>
        <h2
          className="fs-5">
          {tuit.postedBy && tuit.postedBy.username}
          @{tuit.postedBy && tuit.postedBy.username} -
          {tuit.published}</h2>
          {/* Public date is named as postedOn in the node project. */}
        {tuit.tuit}
        {
          tuit.youtube &&
            <TuitVideo tuit={tuit}/>
        }
        <div>
            <ul class="clearfix no-bullets" >
                    {tuit.image && tuit.image.map(image => {return (
                        <li class="tuit-img"><TuitImage tuit={tuit} image={image}/></li>
                    );})}
            </ul>
        </div>
        <TuitStats tuit={tuit} likeTuit={likeTuit} dislikeTuit={dislikeTuit}/>
      </div>
    </li>
  );
}

export default Tuit;