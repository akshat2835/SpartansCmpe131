from textblob import TextBlob

def analyze_sentiment(text):
    # Create a TextBlob object
    blob = TextBlob(text)

    # Get the sentiment polarity
    sentiment_polarity = blob.sentiment.polarity

    # Determine sentiment based on polarity
    if sentiment_polarity > 0:
        return "Positive"
    elif sentiment_polarity < 0:
        return "Negative"
    else:
        return "Neutral"

def main():
    # Input text strings
    texts = []
    while True:
        text = input("Enter text to analyze sentiment (press Enter to finish): ")
        if text:
            sentiment = analyze_sentiment(text)
            print("Sentiment of the text is:", sentiment)
        else:
            break

if __name__ == "__main__":
    main()
