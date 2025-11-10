import numpy as np
import random
from tensorflow.keras.models import load_model
import os

# Local Imports
from backend.model.data_loader import load_intents, load_artifacts
from backend.model.utils import bow

# --- Global Artifacts Loading ---
# Define artifact paths relative to the project root for loading
MODEL_PATH = os.path.join(os.path.dirname(__file__), '../../artifacts/chatbot_model.h5')

# Load the model and data once when the script starts
try:
    intents = load_intents()
    words, classes = load_artifacts()
    model = load_model(MODEL_PATH)
    print("Chatbot Model and Artifacts loaded successfully.")
except Exception as e:
    print(f"Error loading model/artifacts: {e}. Ensure train.py has been run.")
    model = None
    words = []
    classes = []
    intents = {'intents': []} # Set to empty structure to prevent crashes

# --- Prediction Functions ---

def predict_class(sentence):
    """
    Predicts the intent class for the given sentence using the loaded model.
    """
    if not model:
        return [{"intent": "fallback", "probability": "1.0"}]
        
    # Get bag of words for the sentence
    p = bow(sentence, words, show_details=False)
    
    # Predict the probabilities (model expects a batch, hence np.array([p]))
    res = model.predict(np.array([p]), verbose=0)[0]
    
    # Filter out predictions below a threshold
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    
    # Sort by strength of probability
    results.sort(key=lambda x: x[1], reverse=True)
    
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
        
    # Fallback if no intent is above threshold
    if not return_list:
        return_list.append({"intent": "no_match", "probability": str(res[np.argmax(res)])})

    return return_list

def getResponse(ints, intents_json):
    """
    Selects a random response text based on the highest-ranked intent tag.
    """
    tag = ints[0]['intent']
    list_of_intents = intents_json['intents']
    
    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            return result
            
    # Should not happen if training data is complete, but handles 'no_match' if added
    return "Sorry, I didn't quite catch that."

def chatbot_response(text):
    """
    Main function to get the complete chatbot response text.
    """
    ints = predict_class(text)
    res = getResponse(ints, intents)
    return res
