import React, { useContext } from "react";
import { useRef } from "react/cjs/react.development";
import ImageContext from "../context/imageContext";

const PreviewAndCrop = () => {
    const imageContext = useContext(ImageContext);
    const {
        currentImage,
        setCurrent,
        croppedImage,
        setDimensions,
        dimensions,
    } = imageContext;

    const mainCropperRef = useRef(null);
    const imgRef = useRef(null);
    const croppedImageRef = useRef(null);
    const croppedImageContainerRef = useRef(null);

    const cropper = (e) => {
        let prevX = e.clientX;
        let prevY = e.clientY;
        let width = mainCropperRef.current.offsetWidth;
        let height = mainCropperRef.current.offsetHeight;

        imgRef.current.addEventListener("mousemove", mousemove);
        mainCropperRef.current.addEventListener("mousemove", mousemove);

        imgRef.current.addEventListener("mouseup", mouseup);
        mainCropperRef.current.addEventListener("mouseup", mouseup);

        function mouseup() {
            imgRef.current.removeEventListener("mousemove", mousemove);
            mainCropperRef.current.removeEventListener("mousemove", mousemove);
            imgRef.current.removeEventListener("mouseup", mouseup);
            mainCropperRef.current.removeEventListener("mouseup", mouseup);
            let wid = mainCropperRef.current.offsetWidth;
            let he = mainCropperRef.current.offsetHeight;
            setDimensions(wid, he);
        }

        function mousemove(e) {
            //console.log(mainCropperRef.current.style);
            mainCropperRef.current.style.width =
                width + (e.clientX - prevX) + "px";
            mainCropperRef.current.style.height =
                height + (e.clientY - prevY) + "px";
        }
    };

    const cropHandler = () => {
        //console.log(croppedImageContainerRef.current);
        croppedImageRef.current.style.width = "";
        croppedImageContainerRef.current.style.width = dimensions.width + "px";
        croppedImageContainerRef.current.style.height =
            dimensions.height + "px";
    };

    return (
        <div>
            <div
                className={currentImage ? "overlay active" : "overlay"}
                onClick={() => {
                    setCurrent(null);
                    //setCroppedImage(null);
                }}
            ></div>
            {croppedImage && (
                <div className="current-image">
                    <button className="btn btn-secondary" onClick={cropHandler}>
                        Crop
                    </button>
                    <div
                        className="close"
                        onClick={() => {
                            setCurrent(null);
                            //setCroppedImage(null);
                        }}
                    >
                        &times;
                    </div>
                    <div className="current-img">
                        <div
                            className="cropped-img"
                            ref={croppedImageContainerRef}
                        >
                            <img
                                src={croppedImage.url}
                                alt={croppedImage.alt}
                                className="cropped-image"
                                ref={croppedImageRef}
                            />
                        </div>
                        <div className="cropper" ref={mainCropperRef}>
                            <div
                                onMouseDown={cropper}
                                className="bottom-right"
                            ></div>
                        </div>
                        <div className="crop-overlay" ref={imgRef}></div>
                    </div>
                </div>
            )}
            {currentImage && (
                <div className="current-image">
                    <div
                        className="close"
                        onClick={() => {
                            setCurrent(null);

                            //setCroppedImage(null);
                        }}
                    >
                        &times;
                    </div>
                    <div className="current-img">
                        <img
                            src={currentImage.url}
                            alt={currentImage.alt}
                            className="w-100 current-img"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PreviewAndCrop;
