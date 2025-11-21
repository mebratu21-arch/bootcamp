import requests
import time

def load_time(url):
    try:
        start_time = time.time()
        response = requests.get(url)
        response.raise_for_status()  # Check for HTTP errors
        end_time = time.time()
        return end_time - start_time
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None

# Test the function with multiple sites
urls = [
    "https://www.google.com",
    "https://www.ynet.co.il",
    "https://www.imdb.com"
]

for url in urls:
    duration = load_time(url)
    if duration is not None:
        print(f"Load time for {url}: {duration:.2f} seconds")