// Function to handle sending text request
function sendRequestText() {
    // Get the values from the new input fields
    const nameInput = document.getElementById("name").value;
    const locationInput = document.getElementById("location").value;
    const timeInput = document.getElementById("time").value;
    const additionalInfoInput = document.getElementById("additional-info").value;
    
    // Construct the request object
    const request = {
        name: nameInput,
        location: locationInput,
        time: timeInput,
        additionalInfo: additionalInfoInput
    };
    
    // Store the request object in local storage
    localStorage.setItem("request", JSON.stringify(request));
    
    // Do not redirect here, let the response page handle it
}

// Function to start voice input
function startVoiceInput() {
    // Check if SpeechRecognition is supported by the browser
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        // Create a new instance of SpeechRecognition
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        
        // Start recognition
        recognition.start();
        
        // Event listener for when speech is recognized
        recognition.onresult = function(event) {
            // Get the recognized speech
            const speechResult = event.results[0][0].transcript;
            
            // Store the recognized speech in local storage
            localStorage.setItem("request", speechResult);
            
            // Do not redirect here, let the response page handle it
        };
        
        // Event listener for errors
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
        };
    } else {
        // SpeechRecognition not supported, display error message or fallback
        console.error('Speech recognition not supported by this browser');
    }
}
