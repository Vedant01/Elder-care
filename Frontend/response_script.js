window.onload = function() {
    // Retrieve the request details from localStorage
    const requestDetails = JSON.parse(localStorage.getItem("request"));
    
    // Display the request details in the response box
    const responseBox = document.getElementById("response-box");
    responseBox.innerHTML = "<h2>Request Details:</h2>";
    responseBox.innerHTML += "<p>Name: " + requestDetails.name + "</p>";
    responseBox.innerHTML += "<p>Location: " + requestDetails.location + "</p>";
    responseBox.innerHTML += "<p>Time: " + requestDetails.time + "</p>";
    responseBox.innerHTML += "<p>Additional Information: " + requestDetails.additionalInfo + "</p>";
}



