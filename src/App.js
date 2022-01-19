import "./App.css";
import ImageForm from "./components/ImageForm";
import Images from "./components/Images";
import PreviewAndCrop from "./components/PreviewAndCrop";

import ImageState from "./context/ImageState";

function App() {
    return (
        <ImageState>
            <div className="container">
                <ImageForm />
                <p className="text-danger text-center"> </p>
                <Images />
            </div>
            <PreviewAndCrop />
        </ImageState>
    );
}

export default App;
