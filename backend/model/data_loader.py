import json
import pickle
import os

# Define artifact paths (assuming they are saved in an 'artifacts' directory relative to where the API runs)
ARTIFACTS_DIR = os.path.join(os.path.dirname(__file__), '../../artifacts')
INTENTS_PATH = os.path.join(os.path.dirname(__file__), '../../data/intents.json')
WORDS_PATH = os.path.join(ARTIFACTS_DIR, 'words.pkl')
CLASSES_PATH = os.path.join(ARTIFACTS_DIR, 'classes.pkl')

def load_intents():
    """Loads the intents data from intents.json."""
    with open(INTENTS_PATH) as file:
        return json.load(file)

def save_artifacts(words, classes):
    """Saves the vocabulary (words) and classes to pickle files."""
    os.makedirs(ARTIFACTS_DIR, exist_ok=True)
    pickle.dump(words, open(WORDS_PATH, 'wb'))
    pickle.dump(classes, open(CLASSES_PATH, 'wb'))
    print(f"Artifacts saved to {ARTIFACTS_DIR}")

def load_artifacts():
    """Loads the saved vocabulary (words) and classes from pickle files."""
    try:
        words = pickle.load(open(WORDS_PATH, 'rb'))
        classes = pickle.load(open(CLASSES_PATH, 'rb'))
        return words, classes
    except FileNotFoundError:
        print("Warning: Artifacts (words.pkl or classes.pkl) not found. Run train.py first.")
        return [], []
