import nltk
nltk.download('punkt_tab')
nltk.download('wordnet')
from nltk.stem import WordNetLemmatizer
import numpy as np
import random
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Activation, Dropout
from tensorflow.keras.optimizers import SGD

# Local Imports
from backend.model.data_loader import load_intents, save_artifacts

# --- Initialization ---
lemmatizer = WordNetLemmatizer()
ignore_words = ['?', '!']
words = []
classes = []
documents = []

# --- Data Loading and Preprocessing ---
def prepare_data():
    """Loads intents and prepares words, classes, and documents lists."""
    intents = load_intents()

    for intent in intents['intents']:
        for pattern in intent['patterns']:
            # Tokenize each word
            w = nltk.word_tokenize(pattern)
            words.extend(w)
            # Add documents (pattern and tag)
            documents.append((w, intent['tag']))

            # Add to our classes list
            if intent['tag'] not in classes:
                classes.append(intent['tag'])

    # Lemmatize, lower each word and remove duplicates
    processed_words = [lemmatizer.lemmatize(w.lower()) for w in words if w not in ignore_words]
    processed_words = sorted(list(set(processed_words)))
    # Sort classes
    processed_classes = sorted(list(set(classes)))

    print(f"{len(documents)} documents")
    print(f"{len(processed_classes)} classes: {processed_classes}")
    print(f"{len(processed_words)} unique lemmatized words")

    return processed_words, processed_classes, documents

def create_training_data(words, classes, documents):
    """Creates the Bag-of-Words (BoW) training data."""
    training = []
    output_empty = [0] * len(classes)

    for doc in documents:
        # Initialize bag of words
        bag = []
        pattern_words = doc[0]
        # Lemmatize each word
        pattern_words = [lemmatizer.lemmatize(word.lower()) for word in pattern_words]
        
        # Create BoW array
        for w in words:
            bag.append(1) if w in pattern_words else bag.append(0)

        # Create output row (one-hot encoding)
        output_row = list(output_empty)
        output_row[classes.index(doc[1])] = 1
        
        training.append([bag, output_row])
        
    # Shuffle and convert to numpy array
    random.shuffle(training)
    training = np.array(training, dtype="object")
    
    train_x = list(training[:, 0])
    train_y = list(training[:, 1])
    print("Training data created")
    return np.array(train_x), np.array(train_y)

def build_and_train_model(train_x, train_y, epochs=200, batch_size=5):
    """Builds, compiles, and trains the Keras model."""
    # Create model - 3 layers (matching your original structure)
    model = Sequential()
    model.add(Dense(128, input_shape=(len(train_x[0]),), activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(64, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(len(train_y[0]), activation='softmax'))

    # Compile model
    sgd = SGD(learning_rate=0.01, decay=1e-6, momentum=0.9, nesterov=True)
    model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])

    # Fitting the model
    print("Starting model training...")
    hist = model.fit(train_x, train_y, epochs=epochs, batch_size=batch_size, verbose=1)
    print("Model trained successfully.")
    return model

if __name__ == '__main__':
    # 1. Prepare Data
    words, classes, documents = prepare_data()
    
    # 2. Create Training Data
    train_x, train_y = create_training_data(words, classes, documents)

    # 3. Build and Train Model
    model = build_and_train_model(train_x, train_y)
    
    # 4. Save Artifacts
    save_artifacts(words, classes)
    model_path = 'artifacts/chatbot_model.h5'
    model.save(model_path)
    print(f"Keras Model saved to {model_path}")
