import React, { useState } from "react";
import ImageContext from "./imageContext";
import axios from "axios";

const ImageState = (props) => {
    const initialState = {
        images: [],
        currentImage: null,
        croppedImage: null,
        dimensions: null,
        error: null,
        loading: false,
    };

    const [state, setState] = useState(initialState);

    const getImages = async () => {
        setState({ ...state, loading: true });

        try {
            let res = await axios.get("http://localhost:3000/images");
            setState({ ...state, images: res.data, loading: false });
        } catch (err) {
            console.log(err);
        }
    };

    const deleteImage = async (id) => {
        try {
            let res = axios.delete(`http://localhost:3000/images/${id}`);
            setState({
                ...state,
                images: state.images.filter((img) => img.id !== id),
            });
        } catch (err) {
            console.log(err);
        }
    };

    const uploadImage = (file) => {
        setState({ ...state, loading: true });
        try {
            let reader = new FileReader();
            reader.readAsDataURL(file[0]);
            reader.onload = async () => {
                if (reader.readyState === 2) {
                    let re = await axios.post(
                        "http://localhost:3000/images",
                        { url: reader.result, alt: file[0].name },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    setState({
                        ...state,
                        images: [...state.images, re.data],
                        loading: false,
                    });
                }
            };
        } catch (error) {
            console.log(error);
        }
    };

    const setCurrent = (val) => {
        setState({ ...state, currentImage: val, croppedImage: val });
    };
    const setCroppedImage = (val) => {
        setState({ ...state, croppedImage: val, dimensions: null });
    };

    const setDimensions = (width, height) => {
        setState({
            ...state,
            dimensions: {
                width,
                height,
            },
        });
    };

    return (
        <ImageContext.Provider
            value={{
                images: state.images,
                currentImage: state.currentImage,
                croppedImage: state.croppedImage,
                loading: state.loading,
                dimensions: state.dimensions,
                setCurrent,
                deleteImage,
                getImages,
                uploadImage,
                setCroppedImage,
                setDimensions,
            }}
        >
            {props.children}
        </ImageContext.Provider>
    );
};

export default ImageState;
