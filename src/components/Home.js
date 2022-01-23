import React from "react";
import ImageForm from "./ImageForm";
import Images from "./Images";

const Home = () => {
    return (
        <div className="container">
            <ImageForm />
            <p className="text-danger text-center"> </p>
            <Images />
        </div>
    );
};

export default Home;
