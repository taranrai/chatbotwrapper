// JavaScript code for sending and receiving messages
async function sendMessage() {
  var userInput = document.getElementById("user-input");
  var userMessage = userInput.value;

  if (userMessage !== "") {
    var chatContainer = document.querySelector(".chat-container");

    var userDiv = document.createElement("div");
    userDiv.className = "chat-message user-message";
    userDiv.innerHTML = "<p>" + userMessage + "</p>";
    chatContainer.appendChild(userDiv);

    // Send user message to the server
    var botDiv = document.createElement("div");
    botDiv.className = "chat-message bot-message";
    chatContainer.appendChild(botDiv);

    try {
      const response = await fetch('/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage
        })
      });

      if (response.ok) {
        const data = await response.json();
        const botResponse = data.message;

        typeWriter(botResponse, botDiv);
      } else {
        throw new Error('Failed to fetch response from the server');
      }
    } catch (error) {
      console.log(error);
      botDiv.innerHTML = '<p>Error: Failed to fetch response from the server</p>';
    }

    // Scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Clear user input immediately
    userInput.value = "";
    userInput.focus();
  }
}

// Typewriter effect function
function typeWriter(text, element) {
  var i = 0;
  var speed = 50; // typing speed in milliseconds

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Event listener for Enter/Return key press
var userInput = document.getElementById("user-input");
userInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) { // 13 corresponds to the Enter/Return key
    event.preventDefault();
    sendMessage();
  }
});

// Event listener for send button click
var sendButton = document.querySelector(".send-button");
sendButton.addEventListener("click", function() {
  sendMessage();
});
