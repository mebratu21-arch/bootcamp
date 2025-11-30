# The starting string
car_string = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"

# --- 1. List Conversion and Count ---
# Convert the string to a list by splitting at the comma and space, removing whitespace
manufacturers = [m.strip() for m in car_string.split(',')]
print("1. Initial List:")
print(manufacturers)
print(f"There are **{len(manufacturers)}** manufacturers/companies in the list.")

# --- 2. Reverse (Descending) Order (Z-A) ---
manufacturers.sort(reverse=True)
print("\n2. Manufacturers in descending order (Z-A):")
print(manufacturers)

# --- 3. Find Names with 'o' ---
o_count = len([name for name in manufacturers if 'o' in name.lower()])
print(f"\n3. Number of manufacturers with the letter 'o': **{o_count}**") # Volkswagen, Toyota, Ford Motor, Honda

# --- 4. Find Names without 'i' ---
no_i_count = len([name for name in manufacturers if 'i' not in name.lower()])
print(f"4. Number of manufacturers that do NOT have the letter 'i': **{no_i_count}**") # All 5

# ------------------------------
# ---  Bonus Challenges ---
# ------------------------------

# Bonus 1: Remove Duplicates
duplicated_manufacturers = ["Honda","Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]
# Use set to remove duplicates, then convert back to a list
unique_manufacturers = list(set(duplicated_manufacturers))
unique_manufacturers.sort() # Sort for consistent output

print("\n---Bonus 1: Remove Duplicates ---")
print(f"Companies without duplicates: **{', '.join(unique_manufacturers)}**")
print(f"There are now **{len(unique_manufacturers)}** unique companies in the list.")


# Bonus 2: Reverse Letters, Ascending Order (A-Z)
# The unique_manufacturers list is already sorted (A-Z)
reversed_manufacturers = [name[::-1] for name in unique_manufacturers]

print("\n--- Bonus 2: Reversed Letters, Ascending Order ---")
print("List with letters of each name reversed (A-Z order of original names):")
print(reversed_manufacturers)