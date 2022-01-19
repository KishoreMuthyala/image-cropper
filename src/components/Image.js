import React, { useContext, useEffect } from "react";
import ImageContext from "../context/imageContext";

const Image = ({ image }) => {
    const { setCurrent, deleteImage, setCroppedImage } =
        useContext(ImageContext);

    const Preview = () => {
        setCurrent(image);
    };

    const crop = () => {
        setCroppedImage(image);
    };
    return (
        <div className="card pe-3 ps-3 pt-4 pb-4">
            <div className="img mb-3">
                <img className="image me-5" src={image.url} alt={image.alt} />
                <i
                    className="fas fa-trash delete-icon"
                    onClick={() => deleteImage(image.id)}
                ></i>
            </div>
            <div className="prop">
                <button className="btn btn-secondary" onClick={Preview}>
                    Preview
                </button>
                <button className="btn btn-secondary ms-2" onClick={crop}>
                    Crop
                </button>
            </div>
        </div>
    );
};

export default Image;
