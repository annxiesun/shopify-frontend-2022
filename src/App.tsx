import React, { useState, useCallback, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {AppProvider, TextField, Button} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import axios from "axios";
import style from './style.module.css';

function API(prompt:string) {
  const data = {
    prompt: "Write a poem about a dog wearing skis",
    max_tokens: 64,
   };
    
   console.log(process.env.REACT_APP_SECRET_KEY)
   axios.post("https://api.openai.com/v1/engines/text-curie-001/completions", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
    }
   }).then((res) => {
     console.log(res.data.choices);
   });
}
function App() {
  const [value, setValue] = useState("Jaded Pixel");

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    []
  );
  return (
    <AppProvider i18n={enTranslations}>
    <div className="App">
      hi
<div>
<TextField
        label="Store name"
        value={value}
        onChange={handleChange}
        autoComplete="off"
        multiline={8}
        maxHeight={150}
        inputMode="text"
      />
      <Button onClick={() => API('')}/>
      
</div>
    </div>
    </AppProvider>
  );
}

export default App;
