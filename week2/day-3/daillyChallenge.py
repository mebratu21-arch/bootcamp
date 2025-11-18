# daillyChallenge.py

import math

class Circle:
    def __init__(self, radius):
        if radius <= 0:
            raise ValueError("Radius must be positive.")
        self._radius = radius

    @classmethod
    def from_diameter(cls, diameter):
        if diameter <= 0:
            raise ValueError("Diameter must be positive.")
        return cls(diameter / 2)

    @property
    def radius(self):
        return self._radius

    @property
    def diameter(self):
        return self._radius * 2

    @property
    def area(self):
        return math.pi * (self._radius ** 2)

    def __str__(self):
        return f"Circle(radius={self.radius:.2f}, diameter={self.diameter:.2f})"

    def __repr__(self):
        return f"Circle({self.radius})"

    def __add__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return Circle(self.radius + other.radius)

    def __eq__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius == other.radius

    def __gt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius > other.radius

    def __lt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius < other.radius


# ---- Now you can use Circle ----
if __name__ == "__main__":
    c1 = Circle(5)
    c2 = Circle.from_diameter(12)

    print(c1)
    print(c2)
    print("Area c1:", c1.area)
    print("Sum:", c1 + c2)
    print("c1 == c2?", c1 == c2)
    print("c2 > c1?", c2 > c1)

    circles = [Circle(3), Circle.from_diameter(10), Circle(1), Circle.from_diameter(4)]
    print("Sorted circles:")
    for c in sorted(circles):
        print(c)