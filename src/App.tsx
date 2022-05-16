import React, { useState, useCallback, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  AppProvider,
  TextField,
  Button,
  Card,
  Heading,
  DisplayText,
  InlineError,
  Spinner,
} from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import style from "./style.module.css";
import { getResponse } from "./utils";

import { TextItem } from "./types";
import { ResultCard } from "./components";

const TEXT_ITEM_LIST: TextItem[] = [];
const LOCAL_STORAGE_KEY = "TEXTS";

function App() {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const browserText = localStorage.getItem(LOCAL_STORAGE_KEY);
  let defaultItemList;
  if (browserText == '5') {
    defaultItemList = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || ""
    ) as TextItem[];
  } else {
    defaultItemList = TEXT_ITEM_LIST;
  }

  const [items, setItems] = useState(defaultItemList);

  const onClick = async () => {
    if (prompt.length === 0) {
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);
    const response = getResponse(prompt).then((res) => {
      const newItem: TextItem = {
        prompt: prompt,
        response: res.text,
      };
      setItems((prevItems) => {
        const copy = [...prevItems];
        copy.unshift(newItem);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(copy));
        setLoading(false);
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
        <div className="justify-center">
          <div className="page-container">
            <DisplayText size="large">AI Generated Text</DisplayText>
            <div className="textbox-container">
              <div className="width-100">
                <TextField
                  id="prompt"
                  label="Write something (anything!)"
                  value={prompt}
                  onChange={handleChange}
                  autoComplete="off"
                  multiline={8}
                  maxHeight={150}
                  inputMode="text"
                  placeholder="Once upon a time..."
                />
              </div>
              <div className="generate-button">
                <Button primary onClick={onClick}>
                  Generate Some Text!
                </Button>
              </div>
              {error && <InlineError message="Type something" fieldID="prompt" />}
            </div>
            {loading && <Spinner accessibilityLabel="Spinner" size="small" />}
            {items.map((item, i) => {
              return <ResultCard key={`card-${i}`} textItem={item} />;
            })}
          </div>
        </div>
      </AppProvider>
    </div>
  );
}

export default App;
