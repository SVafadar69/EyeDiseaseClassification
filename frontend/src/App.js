import logo from "./2655_left.jpg";
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [predicted, setPredicted] = useState(null);
  const [isTimeOut, setIsTimeout] = useState(false);
  const [fileImage, setFileImage] = useState(
    "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
  );

  const labels = ["Normal", "Diabetic Retinopathy", "Cataracts", "Glaucoma"];
  const handleChange = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("fileName", e.target.files[0].name);

    setFileImage(URL.createObjectURL(e.target.files[0]));

    const config = {
      headers: {
        "Content-Type": "image/jpeg",
      },
    };
    axios.post("/predict", formData, config).then((response) => {
      setIsLoading(false);
      setTimeout(false);
      setPredicted(response.data.prediction);
    });
  };

  useEffect(() => {
    setTimeout(false);
    if (isLoading) {
      console.log("Started Timer");
      const timer = setTimeout(() => {
        setIsTimeout(true);
      }, 120000);
      return () => {
        console.log("clearing timer")
        clearTimeout(timer);
      }
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="hero min-h-full rounded-l-xl bg-base-200">
            <div className="hero-content py-12 flex-col">
              <img
                className="rounded h-40 w-40 border-4 border-indigo-600"
                src={logo}
                alt="Eye Disease Classification"
              />
              <h1 className="text-3xl text-center font-bold">
                Eye Disease Classification ML
              </h1>
              <a href="https://github.com/SVafadar69/EyeDiseaseClassification">
                <AiFillGithub className="inline mr-2" />
                SVafadar69/EyeDiseaseClassification
              </a>
              <div className=" text-left">
                <h2 className="text-xl font-bold py-3 ">
                  <a href="https://github.com/Rpyaanng">
                    <img
                      src="https://avatars.githubusercontent.com/u/25127243?v=4"
                      className="w-7 inline-block mr-2 mask mask-circle"
                      alt="dashwind-logo"
                    />
                    Ryan Pang
                  </a>
                </h2>
                <h2 className="text-xl font-bold">
                  <a href="https://github.com/SVafadar69">
                    <img
                      src="https://avatars.githubusercontent.com/u/100171698?v=4"
                      className="w-7 inline-block mr-2 mask mask-circle"
                      alt="dashwind-logo"
                    />
                    Steven Vafadar
                  </a>
                </h2>
              </div>

              <article className="prose">
                <ul>
                  <li>
                    <b>Normal:</b> A normal healthy eye.
                  </li>
                  <li>
                    <b>Diabetic Retinopathy:</b> A condition that affects the
                    blood vessels in the retina, the light-sensitive tissue at
                    the back of the eye. It can cause vision loss or blindness
                    if left untreated.
                  </li>
                  <li>
                    <b>Cataracts:</b> A clouding of the lens of the eye, which
                    normally helps focus light on the retina. It can cause
                    blurry or dim vision, and may require surgery to remove the
                    affected lens and replace it with an artificial one.
                  </li>
                  <li>
                    <b>Glaucoma:</b> A group of diseases that damage the optic
                    nerve, which carries visual information from the eye to the
                    brain. It can cause peripheral vision loss and eventually
                    central vision loss if not treated. It is often associated
                    with high pressure inside the eye, but not always.
                  </li>
                </ul>
              </article>
            </div>
          </div>
          <div className="hero min-h-full rounded-l-xl">
            <div className="hero-content flex-col">
              <h1 className="text-3xl text-center font-bold">
                {isLoading
                  ? isTimeOut
                    ? "The server seems like it's not responding. Please try refreshing."
                    : "This might take a minute..."
                  : "Upload an image of an eye:"}
              </h1>
              <img
                className="rounded border-2 border-primary h-40 w-40"
                src={fileImage}
                alt=""
              />
              <div className="w-full p-4 items-center justify-center flex">
                <div className="form-control">
                  {isLoading ? (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-pink-600 animate-spin">
                      <div className="h-9 w-9 rounded-full bg-base-100"></div>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                      <p
                        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="file_input_help"
                      >
                        PNG, JPG or JPEG.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {predicted != null && (
                <>
                  <h1 className="text-2xl text-center font-bold pt-2">
                    Predicted:
                  </h1>
                  <h2 className="text-xl text-center font-bold">
                    {labels[predicted]}
                  </h2>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
