const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env") });

// Initialize the model
const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.2,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Create prompt template
const promptTemplate = ChatPromptTemplate.fromMessages([
  ["human", "Give me an essay in 20 words about {topic}"],
]);

async function getAIResponse(topic) {
  const formattedMessages = await promptTemplate.formatMessages({
    topic,
  });
  const response = await model.invoke(formattedMessages);
  return response.content;
}

module.exports = getAIResponse;
