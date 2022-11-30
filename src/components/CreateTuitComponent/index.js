import React from "react";
import Tuits from "../tuits";

const CreateTuitComponent = ({tuitText, files, textArea, deleteFileHandler, uploadImageHandler, tuitOnClick}) => {
    const IMAGE_FORMATS = ["jpg", "png", "jpeg"];
    return (
        <div className={"col-12 pb-4"}>
            <div className={"row m-0 align-items-center"}>
                <div className="col-auto">
                    <img className="ttr-width-50px rounded-circle" width={60}
                         src="../images/nasa-logo.jpg"/>
                </div>
                <div className="col-10">
                        <textarea data-testid="tuit-editor"
                                  onChange={(e) =>
                                      textArea(e)}
                                  placeholder="What's happening?"
                                  className="col-12 border-0 p-2" value={tuitText}/>
                    {
                        files.length > 0 &&
                        files.map((f, nth) =>
                            <span key={nth} className={"badge bg-secondary me-3 position-relative"}>
                                    {f.name || f}
                                <span
                                    className={"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"}
                                    onClick={() => deleteFileHandler(f)}>
                                        <i className={"fa-solid fa-xmark"}/>
                                    </span>
                                </span>)}
                    <div className="row align-items-center m-0">
                        <div className="col-8 fs-4 text-primary">
                            <div className={"row justify-content-evenly align-items-center"}>
                                <label className={"col-3 nav-link"} role={"button"}>
                                    <i className=" fa-solid fa-image text-center"/>
                                    <input data-testid="image-uploader" id={"image-uploader"} className={"d-none"} type="file" multiple
                                           onChange={uploadImageHandler}
                                           accept={IMAGE_FORMATS.map(f => `.${f}`).join(",")}/>
                                </label>
                                <label className={"col-3"}><i
                                    className="fa-solid fa-chart-bar text-center"/></label>
                                <label className={"col-3"}><i
                                    className="fa-solid fa-face-smile text-center"/></label>
                            </div>
                        </div>
                        <button onClick={tuitOnClick} className={`col-4 btn btn-primary rounded-pill fw-bold`}>
                            Tuit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default CreateTuitComponent;
