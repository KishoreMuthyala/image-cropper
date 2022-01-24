import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react/cjs/react.development";

import ImageContext from "../context/imageContext";

const ImageForm = () => {
    const [file, setFile] = useState("");
    const inputRef = useRef(null);

    const imageContext = useContext(ImageContext);

    const { uploadImage } = imageContext;

    const clickHandler = (e) => {
        e.preventDefault();

        uploadImage(inputRef.current.files);
        setFile(null);
    };
    return (
        <form className="text-center pt-5 pb-5" onSubmit={clickHandler}>
            <div className="mb-3">
                <input
                    className="form-control m-auto"
                    accept="image/*"
                    ref={inputRef}
                    type="file"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Upload
            </button>
        </form>
    );
};

export default ImageForm;
