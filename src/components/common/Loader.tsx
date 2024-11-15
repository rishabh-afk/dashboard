import "./loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      {/* <div className="bg-black grid place-items-center h-screen">
        <div className="body-div">
          <div className="scene">
            <div className="shadow"></div>
            <div className="jumper">
              <div className="spinner">
                <div className="scaler">
                  <div className="loader">
                    <div className="cuboid">
                      <div className="cuboid__side"></div>
                      <div className="cuboid__side"></div>
                      <div className="cuboid__side"></div>
                      <div className="cuboid__side"></div>
                      <div className="cuboid__side"></div>
                      <div className="cuboid__side"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="flex justify-center items-center h-screen bg-primary text-white p-2 text-4xl">
        Please wait...
      </div>
    </div>
  );
};

export default Loader;
