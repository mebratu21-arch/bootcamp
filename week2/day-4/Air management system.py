from datetime import date, timedelta
from typing import List, Optional

class Airline:
    def __init__(self, id: str, name: str):
        self.id = id
        self.name = name
        self.planes: List['Airplane'] = []

class Airport:
    def __init__(self, city: str):
        self.city = city
        self.planes: List['Airplane'] = []
        self.scheduled_departures: List['Flight'] = []
        self.scheduled_arrivals: List['Flight'] = []
    
    def schedule_flight(self, destination: 'Airport', flight_date: date) -> Optional['Flight']:
        """
        Schedule a flight from this airport to destination on the given date.
        Finds an available airplane that can make the flight.
        """
        # Look for available airplanes at this airport on the given date
        for plane in self.planes:
            if plane.available_on_date(flight_date, self):
                # Create and schedule the flight
                flight = Flight(flight_date, destination, self, plane)
                
                # Update the plane's next flights
                plane.next_flights.append(flight)
                plane.next_flights.sort(key=lambda f: f.date)
                
                # Update airport schedules
                self.scheduled_departures.append(flight)
                self.scheduled_departures.sort(key=lambda f: f.date)
                destination.scheduled_arrivals.append(flight)
                destination.scheduled_arrivals.sort(key=lambda f: f.date)
                
                return flight
        
        return None  # No available plane found
    
    def info(self, start_date: date, end_date: date):
        """Display scheduled flights between start_date and end_date"""
        print(f"Scheduled flights from {self.city} between {start_date} and {end_date}:")
        print("-" * 60)
        
        for flight in self.scheduled_departures:
            if start_date <= flight.date <= end_date:
                print(f"Flight {flight.id}:")
                print(f"  Date: {flight.date}")
                print(f"  To: {flight.destination.city}")
                print(f"  Airline: {flight.plane.company.name}")
                print(f"  Plane ID: {flight.plane.id}")
                print()

class Flight:
    def __init__(self, date: date, destination: 'Airport', origin: 'Airport', plane: 'Airplane'):
        self.date = date
        self.destination = destination
        self.origin = origin
        self.plane = plane
        self.id = f"{destination.city}_{plane.company.id}_{date.strftime('%Y%m%d')}"
    
    def take_off(self):
        """Execute take off - remove plane from origin airport"""
        if self.plane in self.origin.planes:
            self.origin.planes.remove(self.plane)
        print(f"Flight {self.id} has taken off from {self.origin.city}")
    
    def land(self):
        """Execute landing - add plane to destination airport and update location"""
        self.destination.planes.append(self.plane)
        self.plane.current_location = self.destination
        
        # Remove this flight from plane's next flights since it's completed
        if self in self.plane.next_flights:
            self.plane.next_flights.remove(self)
        
        print(f"Flight {self.id} has landed at {self.destination.city}")

class Airplane:
    def __init__(self, id: int, current_location: 'Airport', company: 'Airline'):
        self.id = id
        self.current_location = current_location
        self.company = company
        self.next_flights: List[Flight] = []
        
        # Add plane to airport and airline
        current_location.planes.append(self)
        company.planes.append(self)
    
    def fly(self, destination: 'Airport'):
        """Make the airplane take off and land if a flight is scheduled for this destination"""
        # Find the next flight to the specified destination
        for flight in self.next_flights:
            if flight.destination == destination:
                flight.take_off()
                flight.land()
                return
        
        print(f"No scheduled flight found from {self.current_location.city} to {destination.city}")
    
    def location_on_date(self, date: date) -> 'Airport':
        """Returns where the plane will be on this date"""
        # If no flights scheduled or all flights are after the date, return current location
        if not self.next_flights or self.next_flights[0].date > date:
            return self.current_location
        
        # Find the last flight that happens on or before the specified date
        last_location = self.current_location
        for flight in self.next_flights:
            if flight.date <= date:
                last_location = flight.destination
            else:
                break
        
        return last_location
    
    def available_on_date(self, date: date, location: 'Airport') -> bool:
        """Returns True if the plane can fly from this location on this date"""
        # Check if plane will be at the location on that date
        if self.location_on_date(date) != location:
            return False
        
        # Check if plane already has a flight on that date
        for flight in self.next_flights:
            if flight.date == date:
                return False
        
        return True

# Example usage and demonstration
if __name__ == "__main__":
    # Create airlines
    delta = Airline("DL", "Delta Air Lines")
    american = Airline("AA", "American Airlines")
    
    # Create airports
    jfk = Airport("JFK")
    lax = Airport("LAX")
    ord = Airport("ORD")
    atl = Airport("ATL")
    
    # Create airplanes
    plane1 = Airplane(101, jfk, delta)
    plane2 = Airplane(202, lax, american)
    plane3 = Airplane(303, ord, delta)
    
    # Schedule some flights
    print("Scheduling flights...")
    flight1 = jfk.schedule_flight(lax, date(2024, 1, 15))
    flight2 = lax.schedule_flight(ord, date(2024, 1, 16))
    flight3 = ord.schedule_flight(atl, date(2024, 1, 17))
    
    # Demonstrate the system
    print("\n" + "="*50)
    print("AIR TRAFFIC MANAGEMENT SYSTEM DEMONSTRATION")
    print("="*50)
    
    # Show airport info
    jfk.info(date(2024, 1, 10), date(2024, 1, 20))
    
    # Check plane locations on specific dates
    print(f"Plane {plane1.id} location on Jan 14, 2024: {plane1.location_on_date(date(2024, 1, 14)).city}")
    print(f"Plane {plane1.id} location on Jan 16, 2024: {plane1.location_on_date(date(2024, 1, 16)).city}")
    
    # Check availability
    print(f"Plane {plane1.id} available at JFK on Jan 14: {plane1.available_on_date(date(2024, 1, 14), jfk)}")
    print(f"Plane {plane1.id} available at JFK on Jan 15: {plane1.available_on_date(date(2024, 1, 15), jfk)}")
    
    # Execute a flight
    print("\nExecuting a flight:")
    if flight1:
        plane1.fly(lax)
    
    # Show updated airport status
    print(f"\nPlanes at JFK: {[plane.id for plane in jfk.planes]}")
    print(f"Planes at LAX: {[plane.id for plane in lax.planes]}")