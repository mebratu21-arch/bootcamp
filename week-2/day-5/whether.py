import pyowm
from pyowm.owm import OWM
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from datetime import datetime, timedelta
import pytz
from typing import Dict, List, Tuple
import numpy as np

class WeatherApp:
    def __init__(self, api_key: str):
        """Initialize the Weather App with PyOWM configuration"""
        config_dict = {
            'language': 'en',
            'subscription_type': 'free'
        }
        self.owm = OWM(api_key, config_dict)
        self.weather_mgr = self.owm.weather_manager()
        self.city_registry = self.owm.city_id_registry()
    
    def get_city_id(self, city_name: str, country: str = None) -> int:
        """Get city ID for precise location identification"""
        try:
            if country:
                cities = self.city_registry.ids_for(city_name, country=country, matching='exact')
            else:
                cities = self.city_registry.ids_for(city_name, matching='like')
            
            if not cities:
                raise ValueError(f"City '{city_name}' not found")
            
            # Return the first match
            return cities[0][0]
        except Exception as e:
            raise Exception(f"Error finding city: {str(e)}")
    
    def get_current_weather(self, city_id: int) -> Dict:
        """Get current weather data using city ID"""
        try:
            observation = self.weather_mgr.weather_at_id(city_id)
            weather = observation.weather
            
            return {
                'temperature': weather.temperature('celsius'),
                'wind': weather.wind(),
                'humidity': weather.humidity,
                'status': weather.status,
                'detailed_status': weather.detailed_status,
                'sunrise': weather.sunrise_time(timeformat='date'),
                'sunset': weather.sunset_time(timeformat='date'),
                'pressure': weather.pressure['press'],
                'visibility': weather.visibility_distance if hasattr(weather, 'visibility_distance') else 'N/A'
            }
        except Exception as e:
            raise Exception(f"Error fetching current weather: {str(e)}")
    
    def get_three_day_forecast(self, city_id: int) -> List[Dict]:
        """Get 3-day weather forecast with 3-hour intervals"""
        try:
            forecast = self.weather_mgr.forecast_at_id(city_id, '3h')
            forecast_data = []
            
            # Get current time in UTC
            now = datetime.now(pytz.utc)
            
            for weather in forecast.forecast.weathers[:24]:  # Next 3 days (8 intervals per day)
                forecast_time = weather.reference_time('date')
                
                # Only include future forecasts
                if forecast_time >= now:
                    forecast_data.append({
                        'datetime': forecast_time,
                        'humidity': weather.humidity,
                        'temperature': weather.temperature('celsius'),
                        'status': weather.status
                    })
            
            return forecast_data
        except Exception as e:
            raise Exception(f"Error fetching forecast: {str(e)}")

def display_current_weather(weather_data: Dict, city_name: str):
    """Display current weather information in user-friendly format"""
    print("\n" + "="*50)
    print(f"🌤️  CURRENT WEATHER IN {city_name.upper()}")
    print("="*50)
    print(f"🌡️  Temperature: {weather_data['temperature']['temp']:.1f}°C "
          f"(Feels like: {weather_data['temperature']['feels_like']:.1f}°C)")
    print(f"💨 Wind: {weather_data['wind']['speed']} m/s, Direction: {weather_data['wind'].get('deg', 'N/A')}°")
    print(f"💧 Humidity: {weather_data['humidity']}%")
    print(f"📊 Pressure: {weather_data['pressure']} hPa")
    print(f"👁️  Visibility: {weather_data['visibility']} meters")
    print(f"☁️  Conditions: {weather_data['detailed_status'].title()}")
    print(f"🌅 Sunrise: {weather_data['sunrise'].strftime('%H:%M')}")
    print(f"🌇 Sunset: {weather_data['sunset'].strftime('%H:%M')}")
    print("="*50)

def init_plot():
    """Initialize the plot with titles and labels"""
    plt.figure(figsize=(12, 8))
    plt.xlabel('Date', fontsize=12, fontweight='bold')
    plt.ylabel('Humidity (%)', fontsize=12, fontweight='bold')
    plt.title('3-Day Humidity Forecast', fontsize=16, fontweight='bold', pad=20)

def aggregate_daily_humidity(forecast_data: List[Dict]) -> Tuple[List[str], List[float]]:
    """Aggregate humidity data by day"""
    daily_data = {}
    
    for forecast in forecast_data:
        date_str = forecast['datetime'].strftime('%Y-%m-%d')
        if date_str not in daily_data:
            daily_data[date_str] = []
        daily_data[date_str].append(forecast['humidity'])
    
    # Calculate daily averages and get pretty date labels
    dates = []
    avg_humidity = []
    
    for date_str, humidities in list(daily_data.items())[:3]:  # Next 3 days
        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        dates.append(date_obj.strftime('%b %d'))
        avg_humidity.append(sum(humidities) / len(humidities))
    
    return dates, avg_humidity

def plot_humidity_barchart(dates: List[str], humidity_values: List[float]):
    """Create the humidity bar chart"""
    # Create bars with different colors based on humidity level
    colors = []
    for humidity in humidity_values:
        if humidity < 40:
            colors.append('lightblue')  # Dry
        elif humidity < 70:
            colors.append('blue')       # Moderate
        else:
            colors.append('darkblue')   # Humid
    
    bars = plt.bar(dates, humidity_values, color=colors, alpha=0.7, edgecolor='black', linewidth=1.2)
    
    # Style the chart
    plt.grid(axis='y', alpha=0.3, linestyle='--')
    plt.ylim(0, max(humidity_values) * 1.15)  # Add space for labels
    
    return bars

def write_humidity_on_bar_chart(bars, humidity_values: List[float]):
    """Display humidity percentage on top of each bar"""
    for bar, value in zip(bars, humidity_values):
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height + 1,
                f'{value:.1f}%',
                ha='center', va='bottom', fontweight='bold', fontsize=11)

def main():
    """Main application function"""
    # Configuration
    API_KEY = "YOUR_API_KEY_HERE"  # Replace with your OpenWeatherMap API key
    
    try:
        # Initialize weather app
        app = WeatherApp(API_KEY)
        
        # Get user input
        print("🌎 Weather Data Fetcher")
        print("-" * 30)
        city_name = input("Enter city name: ").strip()
        country_code = input("Enter country code (e.g., US, FR, GB) or press Enter to skip: ").strip()
        
        if not city_name:
            print("❌ City name is required!")
            return
        
        # Get city ID
        print(f"🔍 Searching for {city_name}...")
        city_id = app.get_city_id(city_name, country_code if country_code else None)
        
        # Get current weather
        print("📡 Fetching current weather data...")
        current_weather = app.get_current_weather(city_id)
        display_current_weather(current_weather, city_name)
        
        # Get forecast data
        print("\n📊 Fetching 3-day forecast...")
        forecast_data = app.get_three_day_forecast(city_id)
        
        if not forecast_data:
            print("❌ No forecast data available")
            return
        
        # Prepare data for visualization
        dates, avg_humidity = aggregate_daily_humidity(forecast_data)
        
        # Create visualization
        print("🎨 Generating humidity chart...")
        init_plot()
        bars = plot_humidity_barchart(dates, avg_humidity)
        write_humidity_on_bar_chart(bars, avg_humidity)
        
        # Final styling
        plt.tight_layout()
        plt.show()
        
        print("✅ Weather analysis complete!")
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    main()