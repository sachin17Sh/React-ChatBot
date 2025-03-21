import { useState } from "react"
import { MUI_C, MUI_I } from "../lib/MaterialUI"
import "../assets/css/ChatComponent.css"


export default function ChatComponent() {
    const [messages, setMessages] = useState([])
    const [question, setQuestions] = useState("")



    const SendData = async function () {
        const Api_Key = import.meta.env.VITE_API_KEY
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${Api_Key}`, {
                method: 'POST',
                headers: {
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
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { type: "user", text: question },
                    { type: "bot", text: data.candidates[0].content.parts[0].text }
                ])
                setQuestions('');
            } else {
                console.log("error")
            }
        } catch (error) {
            console.error("Error sending request:", error);
        }

    }

    return (
        <>

            <MUI_C.Grid container spacing={2} className="mainContainer">
                <MUI_C.Grid item xs={2} className="section-1">
                    <h1>CHATBOT</h1>
                </MUI_C.Grid>
                <MUI_C.Grid item xs={10} className="section-2">
                    <h3>How Can I Help You?</h3>
                    <div className="chat-history">
                        <pre>{messages.map((item, index) => <p key={index}>{item.text}</p>)}</pre>
                    </div>
                    <div className="responseData">
                        <textarea
                            value={question}
                            onChange={(e) => setQuestions(e.target.value)}
                            placeholder="Ask Anything..."
                        />
                        <MUI_I.SendIcon onClick={SendData} />
                    </div>
                </MUI_C.Grid>
            </MUI_C.Grid>

        </>
    )
}
