def calculate_affordable_items(items_purchase, wallet):
    # 2. Data Cleaning
    # Remove dollar sign and commas, then convert to integer
    wallet_amount = int(wallet.replace('$', '').replace(',', ''))
    
    # 3. Determining Affordable Items
    basket = []
    current_wallet = wallet_amount  # Copy of wallet to update
    
    # Iterate through items in their original order (priority order)
    for item, price_str in items_purchase.items():
        # Clean the price - remove $ and commas, convert to integer
        clean_price = int(price_str.replace('$', '').replace(',', ''))
        
        # Check if we can afford this item
        if clean_price <= current_wallet:
            basket.append(item)
            current_wallet -= clean_price  # Update wallet
    
    # Check if basket is empty
    if not basket:
        return "Nothing"
    else:
        # Return basket sorted alphabetically
        return sorted(basket)

# Test the function with the provided examples
if __name__ == "__main__":
    # Example 1
    items_purchase1 = {
        "Water": "$1", 
        "Bread": "$3", 
        "TV": "$1,000", 
        "Fertilizer": "$20"
    }
    wallet1 = "$300"
    result1 = calculate_affordable_items(items_purchase1, wallet1)
    print(f"Example 1: {result1}")
    
    # Example 2
    items_purchase2 = {
        "Apple": "$4", 
        "Honey": "$3", 
        "Fan": "$14", 
        "Bananas": "$4", 
        "Pan": "$100", 
        "Spoon": "$2"
    }
    wallet2 = "$100"
    result2 = calculate_affordable_items(items_purchase2, wallet2)
    print(f"Example 2: {result2}")
    
    # Example 3
    items_purchase3 = {
        "Phone": "$999", 
        "Speakers": "$300", 
        "Laptop": "$5,000", 
        "PC": "$1200"
    }
    wallet3 = "$1"
    result3 = calculate_affordable_items(items_purchase3, wallet3)
    print(f"Example 3: {result3}")