const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
//   organization: "org-GwU9zOnkp5N2gTRBWSR62laZ",
  apiKey: "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",
// apiKey: process.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
  const { chats, model } = req.body;
  console.log(model);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: chats,
    max_tokens: 1000,
    temperature: 0.5,
  });
  res.json({ chat: response.data.choices[0].text });
});

app.get("/", async (req, res) => {
  const response = await openai.listModels();
  res.json({ model: response.data.data });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});