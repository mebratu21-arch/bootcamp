from abc import ABC, abstractmethod

class Temperature(ABC):
    """Base class for temperature units following SOLID principles"""
    
    def __init__(self, value):
        self.value = value
    
    @abstractmethod
    def to_kelvin(self):
        pass
    
    @abstractmethod
    def to_celsius(self):
        pass
    
    @abstractmethod
    def to_fahrenheit(self):
        pass
    
    def __repr__(self):
        return f"{self.__class__.__name__}({self.value})"


class Celsius(Temperature):
    def to_kelvin(self):
        return Kelvin(self.value + 273.15)
    
    def to_celsius(self):
        return self
    
    def to_fahrenheit(self):
        return Fahrenheit((self.value * 9/5) + 32)


class Kelvin(Temperature):
    def to_kelvin(self):
        return self
    
    def to_celsius(self):
        return Celsius(self.value - 273.15)
    
    def to_fahrenheit(self):
        return Fahrenheit((self.value - 273.15) * 9/5 + 32)


class Fahrenheit(Temperature):
    def to_kelvin(self):
        return Kelvin((self.value - 32) * 5/9 + 273.15)
    
    def to_celsius(self):
        return Celsius((self.value - 32) * 5/9)
    
    def to_fahrenheit(self):
        return self


# Example usage
if __name__ == "__main__":
    # Test conversions
    celsius = Celsius(100)
    print(f"{celsius} = {celsius.to_kelvin()} = {celsius.to_fahrenheit()}")
    
    kelvin = Kelvin(373.15)
    print(f"{kelvin} = {kelvin.to_celsius()} = {kelvin.to_fahrenheit()}")
    
    fahrenheit = Fahrenheit(212)
    print(f"{fahrenheit} = {fahrenheit.to_celsius()} = {fahrenheit.to_kelvin()}")