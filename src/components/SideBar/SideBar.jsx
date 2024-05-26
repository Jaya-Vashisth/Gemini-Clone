import "./SideBar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/Context.jsx";

export const SideBar = () => {
  const [expand, setExpand] = useState(true);

  const { onSent, previousPrompt, setRecentPrompt, newChat } =
    useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };
  const handleMenu = () => {
    setExpand(!expand);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt=""
          onClick={handleMenu}
        />

        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {expand && <p>New Chat</p>}
        </div>
        {expand && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompt.reverse().map((item, index) => {
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  key={index}
                  className="recent-content flext"
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item  flext recent-content">
          <img src={assets.question_icon} alt="" />
          {expand && <p>Help</p>}
        </div>

        <div className="bottom-item recent-content flext">
          <img src={assets.history_icon} alt="" />
          {expand && <p>Activity</p>}
        </div>

        <div className="bottom-item recent-content flext">
          <img src={assets.setting_icon} alt="" />
          {expand && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};
