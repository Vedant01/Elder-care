let recognition;

function initSpeechRecognition() {
    recognition = new webkitSpeechRecognition(); // Create a new instance of SpeechRecognition
    recognition.continuous = false; // Set continuous to false to stop speech recognition after a single phrase
    recognition.interimResults = false; // Set interimResults to false to get final transcription results
    recognition.lang = 'en-US'; // Set the language for speech recognition (change as needed)
}

function startVoiceInput() {
    if (!recognition) {
        initSpeechRecognition();
    }

    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        document.getElementById("user-input").value = transcript;
        sendMessage(); // Automatically send the message when voice input is received
        recognition.stop(); // Stop speech recognition after receiving input
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error detected: ' + event.error);
        recognition.stop(); // Stop speech recognition if an error occurs
    };

    recognition.start(); // Start speech recognition
}

function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() !== "") {
        addMessage("ME:", userInput);
        document.getElementById("user-input").value = "";
        // Call function to process user input and generate response
        var response = generateResponse(userInput);
        addMessage("Chatbot:", response);
    }
}

function addMessage(sender, message) {
    var chatBox = document.getElementById("chat-box");
    var messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    if (sender === "ME:") {
        messageDiv.classList.add("user-message");
    } else {
        messageDiv.classList.add("bot-message");
    }
    messageDiv.innerHTML = "<strong>" + sender + "</strong> " + message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

function generateResponse(userInput) {
    // Placeholder function for generating bot responses
    return "Thank you for your message!";
}
