import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompts] = useState([]);
  const [showRes, setShowRes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resData, setResData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowRes(false);
  };
  const onSent = async (prompt) => {
    setResData("");
    setLoading(true);
    setShowRes(true);
    let response = "";
    if (prompt != undefined) {
      response = await run(prompt);
    } else {
      response = await run(input);
      setPreviousPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
    }

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 === 0) {
        newResponse += responseArray[i];
      } else newResponse += "<b>" + responseArray[i] + "</b>";
    }

    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    // setResData(newResponse2);
    setLoading(false);
    setInput("");
  };

  //   onSent("Ho to give prompt to Gemini");
  const contextValue = {
    previousPrompt,
    setPreviousPrompts,
    recentPrompt,
    setRecentPrompt,
    onSent,
    resData,
    showRes,
    loading,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
