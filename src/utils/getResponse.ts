import axios from "axios";

export default function getResponse(prompt: string) {
  const data = {
    prompt: prompt,
    max_tokens: 64,
  };

  return axios
    .post(
      "https://api.openai.com/v1/engines/text-curie-001/completions",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        },
      }
    )
    .then((res) => {
      return res.data.choices[0];
    });
}
