import nltk
from nltk.stem import WordNetLemmatizer
import numpy as np

# Initialize the lemmatizer globally
lemmatizer = WordNetLemmatizer()

# Ensure necessary NLTK data is downloaded (run this once)
# try:
#     nltk.data.find('corpora/wordnet')
# except nltk.downloader.DownloadError:
#     nltk.download('wordnet')
# try:
#     nltk.data.find('tokenizers/punkt')
# except nltk.downloader.DownloadError:
#     nltk.download('punkt')

def clean_up_sentence(sentence):
    """
    Tokenizes and lemmatizes a user input sentence.
    """
    # Tokenize the pattern - split words into array
    sentence_words = nltk.word_tokenize(sentence)
    # Lemmatize each word - create base word
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bow(sentence, words, show_details=False):
    """
    Creates a Bag of Words array for the given sentence against the vocabulary 'words'.
    """
    # Tokenize and clean the sentence
    sentence_words = clean_up_sentence(sentence)
    # Bag of words - matrix of N words, vocabulary matrix
    bag = [0] * len(words)
    
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                # Assign 1 if current word is in the vocabulary position
                bag[i] = 1
                if show_details:
                    print(f"found in bag: {w}")
    
    return np.array(bag)
