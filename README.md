# chatbotwrapper
A chatbot wrapper over OpenAI models. This requires an OpenAI key. 

The key needs to be replace the string on line 8. As an FYI, this is not considered best practice. You should ideally place your key in at least a ```.env``` file and use the python-dotenv library. The dotenv library allows developers to separate sensitive information (like passwords) from their code by storing it in a separate file, making it safer to share or deploy the code. Therefore, if you decide to fork this library DO NOT LEAVE YOUR OPENAI KEY IN THE PYTHON FILE!
