import requests
import json

class GiphySearch:
    def __init__(self):
        self.api_key = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
        self.base_url = "https://api.giphy.com/v1/gifs"
    
    def search_gifs(self, search_term, limit=10):
        """Search for gifs based on a term or phrase"""
        url = f"{self.base_url}/search"
        params = {
            'q': search_term,
            'api_key': self.api_key,
            'limit': limit,
            'rating': 'g'  # Family-friendly content
        }
        
        try:
            response = requests.get(url, params=params)
            if response.status_code == 200:
                return response.json()
            else:
                print(f"❌ API Error: Status code {response.status_code}")
                return None
        except requests.exceptions.RequestException as e:
            print(f"❌ Network error: {e}")
            return None
    
    def get_trending_gifs(self, limit=10):
        """Get trending gifs of the day"""
        url = f"{self.base_url}/trending"
        params = {
            'api_key': self.api_key,
            'limit': limit,
            'rating': 'g'
        }
        
        try:
            response = requests.get(url, params=params)
            if response.status_code == 200:
                return response.json()
            else:
                print(f"❌ API Error: Status code {response.status_code}")
                return None
        except requests.exceptions.RequestException as e:
            print(f"❌ Network error: {e}")
            return None
    
    def display_gifs(self, gifs_data, title="GIFs"):
        """Display gifs in a formatted way"""
        if not gifs_data or len(gifs_data['data']) == 0:
            print("No gifs found.")
            return
        
        print(f"\n🎭 {title} ({len(gifs_data['data'])} results)")
        print("="*60)
        
        for i, gif in enumerate(gifs_data['data'][:5], 1):  # Show first 5
            print(f"{i}. {gif['title']}")
            print(f"   📏 Dimensions: {gif['images']['original']['width']}x{gif['images']['original']['height']}")
            print(f"   🔗 URL: {gif['url']}")
            print(f"   📊 Rating: {gif['rating'].upper()}")
            print()
    
    def run_search_program(self):
        """Main program for searching gifs"""
        print("🎭 GIPHY SEARCH PROGRAM")
        print("="*50)
        
        while True:
            print("\nOptions:")
            print("1. Search for GIFs")
            print("2. Exit")
            
            choice = input("\nEnter your choice (1-2): ").strip()
            
            if choice == '1':
                search_term = input("Enter a term or phrase to search for GIFs: ").strip()
                
                if not search_term:
                    print("❌ Please enter a valid search term.")
                    continue
                
                # Search for the term
                search_results = self.search_gifs(search_term)
                
                if search_results and len(search_results['data']) > 0:
                    self.display_gifs(search_results, f"Search Results for '{search_term}'")
                    
                    # Ask if user wants to save results
                    save = input("Would you like to save these results to a file? (y/n): ").strip().lower()
                    if save == 'y':
                        filename = f"giphy_{search_term.replace(' ', '_')}.json"
                        with open(filename, 'w') as f:
                            json.dump(search_results, f, indent=2)
                        print(f"💾 Results saved to '{filename}'")
                
                else:
                    print(f"\n❌ Couldn't find any GIFs for '{search_term}'")
                    print("📈 Showing trending GIFs instead:")
                    
                    # Get trending gifs as fallback
                    trending_results = self.get_trending_gifs()
                    if trending_results:
                        self.display_gifs(trending_results, "Trending GIFs (Fallback)")
                        
                        # Save trending results
                        save = input("Would you like to save trending results to a file? (y/n): ").strip().lower()
                        if save == 'y':
                            with open('giphy_trending.json', 'w') as f:
                                json.dump(trending_results, f, indent=2)
                            print("💾 Trending results saved to 'giphy_trending.json'")
            
            elif choice == '2':
                print("👋 Thank you for using GIPHY Search!")
                break
            
            else:
                print("❌ Invalid choice. Please try again.")

# Run Exercise 3
if __name__ == "__main__":
    giphy = GiphySearch()
    giphy.run_search_program()