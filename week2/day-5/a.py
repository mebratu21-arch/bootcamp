import os

url = "http://www.practicepython.org/assets/nameslist.txt"
local_filename = "nameslist.txt"

# 0. Download the file (only if you don’t already have it)
import urllib.request
urllib.request.urlretrieve(url, local_filename)

# 1. Read the file line by line
with open(local_filename, "r") as f:
    lines = f.readlines()
print("All lines:") 
for i, ln in enumerate(lines, start=1):
    print(f"{i}: {ln.strip()}")

# 2. Read only the 5th line of the file
if len(lines) >= 5:
    fifth_line = lines[4].strip()
else:
    fifth_line = None
print("\n5th line:", fifth_line)

# 3. Read only the first 5 characters of the file
with open(local_filename, "r") as f:
    first_five_chars = f.read(5)
print("\nFirst 5 chars:", repr(first_five_chars))

# 4. Read entire file and return it as a list of strings. Then split each word into letters
with open(local_filename, "r") as f:
    full_text = f.read()
# split into words (by whitespace)
words = full_text.split()
# now turn each word into a list of its letters
list_of_lists = [list(word) for word in words]
print("\nSample of words split into letters:")
for w_letters in list_of_lists[:10]:
    print(w_letters)

# 5. Find how many occurrences of the names "Darth", "Luke" and "Lea" are in the file
count_darth = words.count("Darth")
count_luke  = words.count("Luke")
count_lea   = words.count("Lea")
print(f"\nOccurrences → Darth: {count_darth}, Luke: {count_luke}, Lea: {count_lea}")

# 6. Append your first name at the end of the file
my_name = "Mebru"  # change if you prefer another spelling
with open(local_filename, "a") as f:
    f.write("\n" + my_name + "\n")
print(f"\nAppended my name: {my_name}")

# 7. Append "SkyWalker" next to each first name "Luke"
#    → read file, replace each occurrence of “Luke” with “Luke SkyWalker”, then write back (or append)
with open(local_filename, "r") as f:
    lines2 = f.read().split()
# replace words
modified_words = ["Luke SkyWalker" if w == "Luke" else w for w in lines2]
# write them back (overwrite file)
with open(local_filename, "w") as f:
    f.write(" ".join(modified_words))
print("\nReplaced each \"Luke\" with \"Luke SkyWalker\" and wrote back file.")
