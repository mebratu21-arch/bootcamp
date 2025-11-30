import requests
import json

def fetch_hilarious_gifs():
    """Fetch hilarious gifs from Giphy API with specific criteria"""
    
    # Build URL using f-strings and variables
    base_url = "https://api.giphy.com/v1/gifs/search"
    query = "hilarious"
    rating = "g"
    api_key = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
    limit = 10  # Only return first 10 gifs
    
    url = f"{base_url}?q={query}&rating={rating}&api_key={api_key}&limit={limit}"
    
    try:
        # Fetch data from Giphy API
        response = requests.get(url)
        
        # Check if request was successful
        if response.status_code == 200:
            data = response.json()
            
            # Filter gifs with height > 100
            filtered_gifs = []
            for gif in data['data']:
                if gif['images']['original']['height'] > '100':
                    filtered_gifs.append(gif)
            
            print(f"✅ Successfully fetched {len(filtered_gifs)} gifs with height > 100")
            
            # Return the filtered results and length
            return {
                "gifs": filtered_gifs,
                "count": len(filtered_gifs),
                "original_count": len(data['data'])
            }
        else:
            print(f"❌ Error: Received status code {response.status_code}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Network error: {e}")
        return None
    except KeyError as e:
        print(f"❌ Error parsing response: {e}")
        return None

def display_gif_info(gifs_data):
    """Display information about the fetched gifs"""
    if not gifs_data or gifs_data['count'] == 0:
        print("No gifs found matching the criteria.")
        return
    
    print(f"\n📊 GIPHY API RESULTS")
    print(f"Original gifs received: {gifs_data['original_count']}")
    print(f"Gifs with height > 100: {gifs_data['count']}")
    
    print(f"\n🎭 First {min(3, gifs_data['count'])} gifs (showing first 3):")
    for i, gif in enumerate(gifs_data['gifs'][:3], 1):
        print(f"{i}. Title: {gif['title']}")
        print(f"   URL: {gif['url']}")
        print(f"   Height: {gif['images']['original']['height']}px")
        print(f"   Width: {gif['images']['original']['width']}px")
        print()

# Run Exercise 2
if __name__ == "__main__":
    print("🎭 Exercise 2: Giphy API - Hilarious Gifs")
    print("="*50)
    
    gifs_data = fetch_hilarious_gifs()
    if gifs_data:
        display_gif_info(gifs_data)
        
        # Save to file for reference
        with open('hilarious_gifs.json', 'w') as f:
            json.dump(gifs_data, f, indent=2)
        print("💾 Results saved to 'hilarious_gifs.json'")