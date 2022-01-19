import React, { useContext, useState } from "react";

import ImageContext from "../context/imageContext";

const ImageForm = () => {
    const [file, setFile] = useState("");

    const imageContext = useContext(ImageContext);

    const { uploadImage } = imageContext;
    const clickHandler = async (e) => {
        e.preventDefault();
        uploadImage(file);
        setFile("");
    };
    return (
        <form className="text-center pt-5 pb-5" onSubmit={clickHandler}>
            <div className="mb-3">
                <input
                    className="form-control m-auto"
                    accept=".jpg,.png"
                    type="file"
                    id="formFile"
                    onChange={(e) => setFile(e.target.files)}
                    files={file}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Upload
            </button>
        </form>
    );
};

export default ImageForm;
