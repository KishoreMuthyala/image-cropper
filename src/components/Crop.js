import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react/cjs/react.development";
import ImageContext from "../context/imageContext";

const Crop = () => {
    const navigate = useNavigate();
    const imageContext = useContext(ImageContext);
    const { setCurrent, croppedImage, setDimensions, dimensions } =
        imageContext;
    useEffect(() => {
        if (!croppedImage) {
            navigate("/");
        }
    }, [croppedImage]);

    const mainCropperRef = useRef(null);
    // const imgRef = useRef(null);
    const imageRef = useRef(null);
    const croppedImageContainerRef = useRef(null);
    const mainContainerRef = useRef(null);
    const CanvasRef = useRef(null);

    const cropper = (e, w, h) => {
        let prevX = e.clientX;
        let prevY = e.clientY;
        let width;
        let height;

        let rect = croppedImageContainerRef.current.getBoundingClientRect();
        if (w === "left") {
            width = mainCropperRef.current.offsetLeft;
        } else {
            width =
                rect.width -
                mainCropperRef.current.offsetLeft -
                mainCropperRef.current.offsetWidth;
        }
        if (h === "top") {
            height = mainCropperRef.current.offsetTop;
        } else {
            height =
                rect.height -
                mainCropperRef.current.offsetTop -
                mainCropperRef.current.offsetHeight;
        }
        window.addEventListener("mousemove", mousemove);
        mainCropperRef.current.addEventListener("mousemove", mousemove);

        window.addEventListener("mouseup", mouseup);
        mainCropperRef.current.addEventListener("mouseup", mouseup);

        function mouseup() {
            window.removeEventListener("mousemove", mousemove);
            mainCropperRef.current.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mouseup);
            mainCropperRef.current.removeEventListener("mouseup", mouseup);
        }

        function mousemove(e) {
            if (mainCropperRef.current.offsetWidth >= 50) {
                if (w === "left") {
                    mainCropperRef.current.style[w] =
                        width + (e.clientX - prevX) + "px";
                } else {
                    mainCropperRef.current.style[w] =
                        width - (e.clientX - prevX) + "px";
                }
            }
            if (mainCropperRef.current.offsetHeight >= 50) {
                if (h === "top") {
                    mainCropperRef.current.style[h] =
                        height + (e.clientY - prevY) + "px";
                } else {
                    mainCropperRef.current.style[h] =
                        height - (e.clientY - prevY) + "px";
                }
            }
        }
    };

    const downloadHandler = () => {
        let anchorElement = document.createElement("a");
        cropHandler();
        anchorElement.href = CanvasRef.current
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        anchorElement.download = `${croppedImage.alt}-cropped.png`;

        document.body.appendChild(anchorElement);
        anchorElement.click();
        setTimeout(function () {
            document.body.removeChild(anchorElement);
        });
    };

    const cropHandler = () => {
        let canvas = CanvasRef.current;

        CanvasRef.current.width = imageRef.current.width;
        CanvasRef.current.height = imageRef.current.height;

        let ctx = canvas.getContext("2d");
        let offsetWidth = mainCropperRef.current.offsetWidth;
        ctx.drawImage(
            imageRef.current,
            mainCropperRef.current.offsetLeft,
            mainCropperRef.current.offsetTop,
            offsetWidth,
            mainCropperRef.current.offsetHeight,
            0,
            0,
            offsetWidth,
            mainCropperRef.current.offsetHeight
        );
        setDimensions(
            mainCropperRef.current.offsetWidth,
            mainCropperRef.current.offsetHeight
        );

        imageRef.current.style.display = "none";
        imageRef.current.alt = "";
        mainCropperRef.current.style.display = "none";
    };

    return (
        <div className="crop-image-container">
            <div
                style={{
                    textAlign: "center",
                    paddingTop: "20px",
                }}
            >
                <button
                    className="btn btn-success"
                    onClick={cropHandler}
                    style={{ marginRight: "20px" }}
                >
                    Preview of the cropped Image
                </button>
                <button className="btn btn-primary" onClick={downloadHandler}>
                    Download Image
                </button>
            </div>

            {croppedImage && (
                <div className="crop-image" ref={mainContainerRef}>
                    <div
                        ref={croppedImageContainerRef}
                        style={{
                            position: "relative",
                            width: "fit-content",
                        }}
                    >
                        <img
                            src={croppedImage.url}
                            alt={croppedImage.alt}
                            ref={imageRef}
                            className="crop-img"
                        />
                        <div className="cropper" ref={mainCropperRef}>
                            <div
                                onMouseDown={(e) =>
                                    cropper(e, "right", "bottom")
                                }
                                className="bottom-right"
                            ></div>
                            <div
                                onMouseDown={(e) => cropper(e, "right", "top")}
                                className="top-right"
                            ></div>
                            <div
                                onMouseDown={(e) =>
                                    cropper(e, "left", "bottom")
                                }
                                className="bottom-left"
                            ></div>
                            <div
                                onMouseDown={(e) => cropper(e, "left", "top")}
                                className="top-left"
                            ></div>
                        </div>
                    </div>

                    <canvas
                        className="mt-3"
                        width="100"
                        height="100"
                        ref={CanvasRef}
                    >
                        Doesn't support Canvas
                    </canvas>
                </div>
            )}
        </div>
    );
};

export default Crop;
