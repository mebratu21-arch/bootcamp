import requests

def search_gifs():
    """Search for gifs based on user input or return trending gifs"""
    api_key = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
    
    # Get user input
    search_term = input("Enter a term or phrase to search for gifs: ").strip()
    
    if search_term:
        # Search for the term
        url = f"https://api.giphy.com/v1/gifs/search?q={search_term}&api_key={api_key}&limit=10"
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            
            if data['data']:
                print(f"\nFound {len(data['data'])} gifs for '{search_term}':")
                for i, gif in enumerate(data['data'], 1):
                    print(f"{i}. {gif['title']}")
                return data['data']
            else:
                print(f"\nCouldn't find any gifs for '{search_term}'. Showing trending gifs instead.")
                return get_trending_gifs(api_key)
        else:
            print(f"API error. Showing trending gifs instead.")
            return get_trending_gifs(api_key)
    else:
        print("No search term entered. Showing trending gifs.")
        return get_trending_gifs(api_key)

def get_trending_gifs(api_key):
    """Get trending gifs for the day"""
    url = f"https://api.giphy.com/v1/gifs/trending?api_key={api_key}&limit=10"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        print(f"\nToday's trending gifs:")
        for i, gif in enumerate(data['data'], 1):
            print(f"{i}. {gif['title']}")
        return data['data']
    else:
        print("Error fetching trending gifs")
        return []

if __name__ == "__main__":
    search_gifs()