import { assets } from "../../assets/assets";
import { useContext } from "react";
import "./Main.css";
import { Context } from "../../context/Context";

export const Main = () => {
  const { onSent, recentPrompt, showRes, loading, resData, setInput, input } =
    useContext(Context);

  // useEffect((

  // ),[resultData])

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {showRes ? (
          <div className="response">
            <div className="response-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="response-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  {" "}
                  <hr className="hr1" />
                  <hr className="hr2" />
                  <hr className="hr3" />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resData }}></p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="intro">
              <h4>Hello, Dear.</h4>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beutiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div className="card">
                <p>Briefly summarize this concept: Urban Planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>

              <div className="card">
                <p>Brainstor team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>

              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="search-bar">
        <div className="input-text">
          <input
            onChange={handleOnChange}
            type="text"
            placeholder="Enter a Prompt here"
            value={input}
          />
          <img src={assets.gallery_icon} alt="" />
          <img src={assets.mic_icon} alt="" />
          <img onClick={() => onSent()} src={assets.send_icon} alt="" />
        </div>
        <div className="footer">
          <p>
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};
