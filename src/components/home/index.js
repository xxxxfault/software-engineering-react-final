import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";

const Home = () => {
  const IMAGE_FORMATS = ["jpg", "png", "jpeg"];
  const location = useLocation();
  const {uid} = useParams();
  const [tuits, setTuits] = useState([]);
  const [tuit, setTuit] = useState('');
  const [images, setImages] = useState([]);
  const userId = uid;
  const findTuits = () => {
    if(uid) {
      return service.findAllTuitsByUser(uid)
        .then(tuits => setTuits(tuits))
    } else {
      return service.findAllTuits()
        .then(tuits => setTuits(tuits))
    }
  }

  const uploadImageHandler = (event) => {
    const newImages = [...event.target.files];
    // reset value so the same file won't be blocked
    event.target.value = "";
    if (newImages.length > 6) {
      alert("Maximum 6 images");
      return;
    }
    if (newImages.length > 0) {
      setImages(newImages);
    }
  }

  useEffect(() => {
    let isMounted = true;
    findTuits();
    return () => {isMounted = false;}
  }, []);

  // TODO: Note that the original code was {tuit} in this function.
  const createTuit = () => {
    const formData = new FormData();

    // formData.append("images", images);
    for (const image of images) {
      const fileName = image.name;
      const format = fileName.split(".").at(-1).toLowerCase();
      if (IMAGE_FORMATS.indexOf(format) >= 0) {
        formData.append('image', image);
      } else {
        alert(`Unsupported file format: ${format}`);
        return;
      }
    }
    console.log(images);
    formData.append("tuit", tuit);
    service.createTuitByUser(userId, formData)
        .then(findTuits)
  }

  const deleteFileHandler = (target) => {
    const newImages = images.filter(f => f.name !== target.name);
    setImages(newImages);
  }

  const deleteTuit = (tid) =>
      service.deleteTuit(tid)
          .then(findTuits)
  return(
    <div className="ttr-home">
      <div className="border border-bottom-0">
        <h4 className="fw-bold p-2">Home Screen</h4>
        {
          uid &&
          <div className="d-flex">
            <div className="p-2">
              <img className="ttr-width-50px rounded-circle"
                   src="../images/nasa-logo.jpg"/>
            </div>
            <div className="p-2 w-100">
              <textarea
                  onChange={(e) =>
                      setTuit(e.target.value)}
                placeholder="What's happening?"
                className="w-100 border-0" value={tuit}></textarea>
              {
                images.length > 0 &&
                images.map((f, nth) =>
                    <span key={nth} className={"badge bg-secondary me-3 position-relative"}>
                                    {f.name || f}
                      <span
                          className={"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"}
                          onClick={() => deleteFileHandler(f)}>
                                        <i className={"fa-solid fa-xmark"}/>
                      </span>
                    </span>)}
              <div className="row">
                <div className="col-10 ttr-font-size-150pc text-primary">
                  <label>
                  <i className="fa-solid fa-image me-3"></i>
                  <input className="d-none" type="file" multiple
                         onChange={uploadImageHandler}
                         accept={IMAGE_FORMATS.map(f => `.${f}`).join(",")}/>
                  </label>
                  <i className="far fa-gif me-3"></i>
                  <i className="far fa-bar-chart me-3"></i>
                  <i className="far fa-face-smile me-3"></i>
                  <i className="far fa-calendar me-3"></i>
                  <i className="far fa-map-location me-3"></i>
                </div>
                <div className="col-2">
                  <a onClick={createTuit}
                     className={`btn btn-primary rounded-pill fa-pull-right
                                  fw-bold ps-4 pe-4`}>
                    Tuit
                  </a>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      <Tuits tuits={tuits} deleteTuit={deleteTuit} refreshTuits={findTuits}/>
    </div>
  );
};
export default Home;