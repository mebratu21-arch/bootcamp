import requests

def fetch_hilarious_gifs():
    """Fetch hilarious gifs from Giphy API"""
    # Build URL using f-strings and variables
    base_url = "https://api.giphy.com/v1/gifs/search"
    query = "hilarious"
    rating = "g"
    api_key = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
    limit = 50  # Fetch more to filter
    
    url = f"{base_url}?q={query}&rating={rating}&api_key={api_key}&limit={limit}"
    
    try:
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            
            # Filter gifs with height > 100 and get first 10
            filtered_gifs = [
                gif for gif in data['data'] 
                if int(gif['images']['original']['height']) > 100
            ][:10]
            
            print(f"Total gifs received: {len(data['data'])}")
            print(f"Gifs with height > 100: {len(filtered_gifs)}")
            print(f"Returning first {len(filtered_gifs)} gifs")
            
            return filtered_gifs
        else:
            print(f"Error: API returned status code {response.status_code}")
            return None
            
    except requests.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

# Execute the function
if __name__ == "__main__":
    gifs = fetch_hilarious_gifs()
    if gifs:
        for i, gif in enumerate(gifs, 1):
            print(f"{i}. {gif['title']} - Height: {gif['images']['original']['height']}")