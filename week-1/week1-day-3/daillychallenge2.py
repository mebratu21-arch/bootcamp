def caesar_cipher():
    """
    Encrypts or decrypts a message using the Caesar cipher based on user input.
    """
    print(" Welcome to the Caesar Cipher Tool!")
    
    # 1. Get Operation Choice
    while True:
        mode = input("Do you want to (E)ncrypt or (D)ecrypt a message? Enter 'E' or 'D': ").strip().upper()
        if mode in ('E', 'D'):
            break
        print("Invalid input. Please enter 'E' or 'D'.")
        
    # 2. Get Message and Shift
    message = input("Enter the message: ").strip()
    
    while True:
        try:
            shift = int(input("Enter the shift number (e.g., 3): "))
            break
        except ValueError:
            print("Invalid input. Please enter a whole number for the shift.")

    # If decrypting, the shift needs to be the inverse of the encryption shift
    if mode == 'D':
        # Decrypting with a shift of 'n' is the same as encrypting with a shift of '-n'
        # We use a negative shift, but keep it positive for the modulo operation
        shift = -shift
        
    # 3. Process the Message
    result_text = ""

    for char in message:
        # Check if the character is a letter
        if 'a' <= char <= 'z' or 'A' <= char <= 'Z':
            
            # Determine the starting ASCII point (A=65 or a=97)
            start_point = ord('a') if 'a' <= char <= 'z' else ord('A')
            
            # Convert the letter to its 0-25 index: (ord('d') - ord('a')) = 3
            original_index = ord(char) - start_point
            
            # Apply the shift and use modulo 26 to handle wrapping
            # (3 + 3) % 26 = 6 for 'd' + 3 = 'g'
            # (-3 + 26) % 26 = 23 for 'd' - 3 = 'a'
            new_index = (original_index + shift) % 26
            
            # Convert the new index back to a character
            new_char = chr(start_point + new_index)
            
            result_text += new_char
        else:
            # Keep non-alphabetic characters (spaces, punctuation) unchanged
            result_text += char

    # 4. Print the Result
    if mode == 'E':
        print(f"\n**Encrypted Message**: {result_text}")
    else:
        print(f"\n **Decrypted Message**: {result_text}")

# Execute the program
caesar_cipher()