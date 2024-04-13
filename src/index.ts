//Importing project dependancies that we installed earlier
import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors' 
import { GoogleGenerativeAI } from "@google/generative-ai"



dotenv.config()


const app = express(); 

 
app.use(cors()); 
app.use(express.json())


// module.exports = app

const PORT = process.env.PORT || 3000


app.listen(PORT, async () => {
   console.log(`[server]: Server listning on port ${PORT}`)
})

app.get('/', (req, res) => {
   res.send("Hello from server\n")
})

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/chat', async (req, res) => {
   const prompt = req.body.prompt;

   console.log(prompt)
   
   const model = genAI.getGenerativeModel({ model: "gemini-pro"});
   
   const result = await model.generateContent(prompt);
   const response = await result.response;
   const text = response.text();
   console.log(response);
   
   res.send(text).status(200)
})