import {  useState } from "react"
import { MUI_C, MUI_I } from "../lib/MaterialUI"
import "../assets/css/ChatComponent.css"


export default function ChatComponent() {
    const [question, setQuestions] = useState("")
    const [answer, setAnswer] = useState("")


         const SendData = async function() {
            const Api_Key = import.meta.env.VITE_API_KEY
            try {
                const response  = await fetch (`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${Api_Key}`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        "contents": [
                            {
                                "parts": [
                                    { "text": question }
                                ]
                            }
                        ]
                    })
                })   
               if (response.ok) {
                 const data = await response.json()
                 setAnswer(data.candidates[0].content.parts[0].text)
               }else{
                console.log("erroe")
               }
            } catch (error) {
                console.error("Error sending request:", error);
            }
           
        }

    return (
        <>
            <MUI_C.Box>
                <MUI_C.Container>
                    <MUI_C.Grid container spacing={2}>
                        <MUI_C.Grid item xs={2}>
                        <h1>CHATBOT</h1>
                        </MUI_C.Grid>
                        <MUI_C.Grid item xs={10} className="section-2">
                            <h3>How Can I Help You?</h3>
                            <pre>{answer}</pre> 
                            <div>
                            <textarea value={question} onChange={(e)=>setQuestions(e.target.value)} placeholder="Ask Anuthing..."/>
                            <MUI_I.SendIcon onClick ={SendData}/>
                          </div>   
                        </MUI_C.Grid>
                    </MUI_C.Grid>
                </MUI_C.Container>
            </MUI_C.Box>
        </>
    )
}
