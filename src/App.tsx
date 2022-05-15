import React, { useState, useCallback, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { AppProvider, TextField, Button, Card } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import style from "./style.module.css";
import { getResponse } from "./utils";

import { TextItem } from "./types";
import { ResultCard } from "./components";

const TEXT_ITEM_LIST: TextItem[] = [];
const LOCAL_STORAGE_KEY = "TEXTS";

function App() {
  const [prompt, setPrompt] = useState("Write a poem about a dog wearing skis");

  const browserText = localStorage.getItem(LOCAL_STORAGE_KEY);
  let defaultItemList;
  if(browserText) {
    defaultItemList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '') as TextItem[];
  } else {
    defaultItemList = TEXT_ITEM_LIST;
  }

  const [items, setItems] = useState(defaultItemList);

  const onClick = async () => {
    const response = getResponse(prompt).then((res) => {
      const newItem: TextItem = {
        prompt: prompt,
        response: res.text,
      };
      setItems((prevItems) => {
        const copy = [...prevItems];
        copy.unshift(newItem);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(copy));
        return copy;
      });
    });
  };
  const handleChange = useCallback(
    (newPrompt: string) => setPrompt(newPrompt),
    []
  );
  return (
    <div className="App">
    <AppProvider i18n={enTranslations}>
        <div>
          <TextField
            label="Prompt"
            value={prompt}
            onChange={handleChange}
            autoComplete="off"
            multiline={8}
            maxHeight={150}
            inputMode="text"
          />
          <Button onClick={onClick}>Go</Button>
        </div>
        <div>
        {items.map((item,i) => {
          return <ResultCard key={`card-${i}`} textItem={item} />
        })}
        </div>
    </AppProvider>
    </div>
  );
}

export default App;
