document.addEventListener("DOMContentLoaded", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    mobileMenu.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
});

async function getBotResponse(userMessage) {
    const apiKey = "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"; 
    const apiUrl = "https://api-inference.huggingface.co/models/google/flan-t5-large";
    try {
        let response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: `Answer this like a beauty expert: ${userMessage}` })
        });
        let data = await response.json();
        console.log("AI Response:", data); // Debugging
        if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
            return data[0].generated_text; // Extract correct text
        } else {
            return "I'm not sure, but I can try to help!";
        }
    } catch (error) {
        console.error("Network Error:", error);
        return "I'm having trouble connecting right now.";
    }
}
// Function to handle user input and display messages
function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;
    addUserMessage(userInput);
    document.getElementById("user-input").value = "";
    setTimeout(async () => {
        let botResponse = await getBotResponse(userInput);
        addBotMessage(botResponse);
    }, 1000); // Simulate a slight delay
}
// Function to handle "Enter" key for sending messages
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
// Function to add a user message to the chatbox
function addUserMessage(message) {
    let chatBox = document.getElementById("chat-box");
    let messageElement = document.createElement("p");
    messageElement.classList.add("user-message");
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
// Function to add a bot message to the chatbox
function addBotMessage(message) {
    let chatBox = document.getElementById("chat-box");
    let messageElement = document.createElement("p");
    messageElement.classList.add("bot-message");
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}



    // 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