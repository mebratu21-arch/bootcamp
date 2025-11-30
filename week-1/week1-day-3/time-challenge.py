REverseinp = input("Enter a sentence: ")

# Write down your logic here
# 1. Split the sentence into a list of words.
words = REverseinp.split()

# 2. Reverse the order of the words list.
words.reverse()

# 3. Join the words back together with a space between them.
reversed_sentence = " ".join(words)

# Print the final reversed sentence
print(reversed_sentence)