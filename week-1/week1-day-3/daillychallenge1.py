def create_index_dictionary():
    # Get user input and normalize
    word = input("Enter a word: ").strip().lower() 
    indices_dict = {}

    # Iterate with index and character
    for index, char in enumerate(word):
        # Use .setdefault to simplify logic
        indices_dict.setdefault(char, []).append(index)

    print(indices_dict)

# create_index_dictionary(========2====)
def affordable_items(items_purchase, wallet):
    # Clean wallet string and convert to integer
    current_money = int(wallet.replace('$', '').replace(',', ''))
    basket = []

    # Iterate through items in priority order
    for item, price_str in items_purchase.items():
        # Clean price string and convert to integer
        item_price = int(price_str.replace('$', '').replace(',', ''))
        
        # Check affordability and purchase
        if current_money >= item_price:
            basket.append(item)
            current_money -= item_price # Update remaining money
            
    # Return sorted list or "Nothing"
    return sorted(basket) if basket else "Nothing"

print('finished')

