import React, {useState} from "react";
import * as service from "../../services/tuits-service";
import CreateTuitComponent from "../CreateTuitComponent";
import {useParams} from "react-router-dom";

const CreateTuit = () => {
    const IMAGE_FORMATS = ["jpg", "png", "jpeg"];
    const {uid} = useParams();
    const [tuitText, setTuitText] = useState("");
    const [files, setFiles] = useState([]);
    const [tuits, setTuits] = useState([]);
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
        const newFiles = [...event.target.files];
        // reset value so the same file won't be blocked
        event.target.value = "";
        if (newFiles.length > 5) {
            alert("Maximum 5 images");
            return;
        }
        if (newFiles.length > 0) {
            setFiles(newFiles);
        }
    }

    const deleteFileHandler = (target) => {
        const newFiles = files.filter(f => f.name !== target.name);
        setFiles(newFiles);
    }
    const createTuit = () => {
        const tuit = new FormData();
        for (const file of files) {
            const fileName = file.name;
            const format = fileName.split(".").at(-1).toLowerCase();
            if (IMAGE_FORMATS.indexOf(format) >= 0) {
                tuit.append('image', file);
            } else {
                alert(`Unsupported file format: ${format}`);
                return;
            }
        }
        tuit.append('tuit', tuitText);
        service.createTuitByUser(userId, tuit)
            .then(findTuits);
    }
    const textArea = (e) => {
        setTuitText(e.target.value);
    }
    return (
        <>
            {
                <CreateTuitComponent uploadImageHandler={uploadImageHandler}
                                     tuitOnClick={createTuit} textArea={textArea} deleteFileHandler={deleteFileHandler}
                                     files={files} tuitText={tuitText}/>}
        </>
    )
};
export default CreateTuit;