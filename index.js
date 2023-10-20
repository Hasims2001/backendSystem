const OpenAI = require('openai');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


const app = express();
app.use(express.json());
app.use(cors());

app.post("/", async(req, res)=> {
    const {searchInput, category, language} = req.body;
    if(!searchInput){
        res.send({'msg': "search input is required", 'issue': true })
    }else if(!category){
        res.send({'msg': "category is required", 'issue': true })
    }
    else{
        let prompt = `write the ${category} about the topic without adding extra explaination and symbols in ${language || "English"} language. Topic: ${searchInput}`;
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 100,
        });
        res.send({"msg":  chatCompletion.choices[0].message.content, 'issue': false})
    }
})



app.listen(8080, ()=>{
    console.log('server is running...')
});