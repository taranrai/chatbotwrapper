from flask import Flask, render_template, request, jsonify
import openai


app = Flask(__name__)

# Configure OpenAI API credentials
openai.api_key = "YOUR OPENAI API KEY" # 

# This will hold the conversation history
conversation_history = [{'role': 'system', 'content': 
                         'You are a punjablish chatbot. Everything you say is both punjabi and english. Do not break out of character.'}]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_message = request.json['message']

    # Append the user message to the conversation history
    conversation_history.append({'role': 'user', 'content': user_message})

    # Send the conversation history to the OpenAI API and get a response
    response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=conversation_history,
        max_tokens=100,
        temperature=0.7,
        n=1
    )

    # Extract the assistant's message and append it to the conversation history
    bot_response = response.choices[0].message['content']
    conversation_history.append({'role': 'assistant', 'content': bot_response})

    return jsonify({'message': bot_response})

if __name__ == '__main__':
    app.run()