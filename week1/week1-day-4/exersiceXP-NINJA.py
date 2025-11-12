# Exercise 1: What’s Your Name?
def get_full_name(first_name, last_name, middle_name=None):
    if middle_name:
        return f"{first_name.capitalize()} {middle_name.capitalize()} {last_name.capitalize()}"
    return f"{first_name.capitalize()} {last_name.capitalize()}"


# Exercise 2: From English To Morse and Morse To English
EN_TO_MORSE = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..',
    'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....',
    '7': '--...', '8': '---..', '9': '----.', '0': '-----',
    ' ': '/', 
}

def english_to_morse(text):
    return ' '.join(EN_TO_MORSE[char.upper()] for char in text if char.upper() in EN_TO_MORSE)

MORSE_TO_EN = {value: key for key, value in EN_TO_MORSE.items()}

def morse_to_english(morse):
    words = morse.split(' / ')
    decoded = []
    for word in words:
        decoded.append(''.join(MORSE_TO_EN[char] for char in word.split()))
    return ' '.join(decoded)


# Exercise 3: Box Of Stars
def box_printer(*args):
    max_length = max(len(word) for word in args)
    print('*' * (max_length + 4))
    for word in args:
        print(f"* {word.ljust(max_length)} *")
    print('*' * (max_length + 4))


# Exercise 4: What Is The Purpose Of This Code?
# The code implements insertion sort: it sorts a list by iteratively inserting each element into the sorted sublist.
def insertion_sort(alist):
    for index in range(1, len(alist)):
        currentvalue = alist[index]
        position = index

        while position > 0 and alist[position - 1] > currentvalue:
            alist[position] = alist[position - 1]
            position -= 1

        alist[position] = currentvalue

# Example usage:
alist = [54, 26, 93, 17, 77, 31, 44, 55, 20]
insertion_sort(alist)
print(alist)  # Output will be the sorted list in ascending order
