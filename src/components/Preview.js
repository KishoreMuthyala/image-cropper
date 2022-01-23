import React, { useContext } from "react";
import ImageContext from "../context/imageContext";

const Preview = () => {
    const imageContext = useContext(ImageContext);

    const { currentImage } = imageContext;

    return (
        <div className="current-image">
            <div className="current-img">
                <img
                    src={currentImage.url}
                    alt={currentImage.alt}
                    className="current-img"
                />
            </div>
        </div>
    );
};

export default Preview;
