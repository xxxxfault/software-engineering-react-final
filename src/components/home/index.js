import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import CreateTuit from "../CreateTuit";

const Home = () => {
  const location = useLocation();
  const {uid} = useParams();
  const [tuits, setTuits] = useState([]);
  const findTuits = () => {
    if(uid) {
      return service.findAllTuitsByUser(uid)
          .then(tuits => setTuits(tuits))
    } else {
      return service.findAllTuits()
          .then(tuits => setTuits(tuits))
    }
  }
  useEffect(() => {
    let isMounted = true;
    findTuits()
    return () => {isMounted = false;}
  }, []);
  return (
      <>
        {
          <div className={"row m-0 border border-top-0"}>
            <h1 className="col-12 fw-bold fs-2 p-4">Home Screen</h1>
            <CreateTuit />
            <div className={"col-12 p-0 border-top"}>
              {
                tuits &&
                <Tuits tuits={tuits}
                       refreshTuits={findTuits} />
              }
            </div>
          </div>}
      </>
  );
};
export default Home;
// import React from "react";
// import Tuits from "../tuits";
// import * as service from "../../services/tuits-service";
// import {useEffect, useState} from "react";
// import {useLocation, useParams} from "react-router-dom";
//
// const Home = () => {
//   const location = useLocation();
//   const {uid} = useParams();
//   const [tuits, setTuits] = useState([]);
//   const [tuit, setTuit] = useState('');
//   const [images, setImages] = useState("");
//   const userId = uid;
//   const findTuits = () => {
//     if(uid) {
//       return service.findAllTuitsByUser(uid)
//         .then(tuits => setTuits(tuits))
//     } else {
//       return service.findAllTuits()
//         .then(tuits => setTuits(tuits))
//     }
//   }
//   useEffect(() => {
//     let isMounted = true;
//     findTuits()
//     return () => {isMounted = false;}
//   }, []);
//   // TODO: Note that the original code was {tuit} in this function.
//   const createTuit = () => {
//     const formData = new FormData();
//     console.log(images);
//     formData.append("tuit", tuit);
//     formData.append("images", images);
//     service.createTuitByUser(userId, tuit)
//         .then(findTuits)
//   }
//
//   const deleteTuit = (tid) =>
//       service.deleteTuit(tid)
//           .then(findTuits)
//   return(
//     <div className="ttr-home">
//       <div className="border border-bottom-0">
//         <h4 className="fw-bold p-2">Home Screen</h4>
//         {
//           uid &&
//           <div className="d-flex">
//             <div className="p-2">
//               <img className="ttr-width-50px rounded-circle"
//                    src="../images/nasa-logo.jpg"/>
//             </div>
//             <div className="p-2 w-100">
//               <textarea
//                   onChange={(e) =>
//                       setTuit(e.target.value)}
//                 placeholder="What's happening?"
//                 className="w-100 border-0"></textarea>
//               <div className="row">
//                 <div className="col-10 ttr-font-size-150pc text-primary">
//                   <i className="fa-solid fa-image me-3"></i>
//                   <i className="far fa-gif me-3"></i>
//                   <i className="far fa-bar-chart me-3"></i>
//                   <i className="far fa-face-smile me-3"></i>
//                   <i className="far fa-calendar me-3"></i>
//                   <i className="far fa-map-location me-3"></i>
//                 </div>
//                 <div className="col-2">
//                   <a onClick={createTuit}
//                      className={`btn btn-primary rounded-pill fa-pull-right
//                                   fw-bold ps-4 pe-4`}>
//                     Tuit
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         }
//       </div>
//       <Tuits tuits={tuits} deleteTuit={deleteTuit} refreshTuits={findTuits}/>
//     </div>
//   );
// };
// export default Home;