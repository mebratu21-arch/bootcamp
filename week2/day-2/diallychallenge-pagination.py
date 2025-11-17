import math

class Pagination:
    """A class to simulate a basic pagination system"""
    
    def __init__(self, items=None, page_size=10):
        """
        Initialize the Pagination class
        
        Args:
            items (list, optional): List of items to paginate. Defaults to None.
            page_size (int, optional): Number of items per page. Defaults to 10.
        """
        self.items = items if items is not None else []
        self.page_size = page_size
        self.current_page = 1  # 1-based indexing for user-facing
        self.total_pages = math.ceil(len(self.items) / self.page_size) if self.items else 1
    
    def get_visible_items(self):
        """
        Returns the list of items visible on the current page
        
        Returns:
            list: Items on the current page
        """
        start_idx = (self.current_page - 1) * self.page_size
        end_idx = start_idx + self.page_size
        return self.items[start_idx:end_idx]
    
    def go_to_page(self, page_num):
        """
        Goes to the specified page number (1-based indexing)
        
        Args:
            page_num (int): Page number to navigate to
            
        Raises:
            ValueError: If page_num is out of range
        """
        if page_num < 1 or page_num > self.total_pages:
            raise ValueError(f"Page {page_num} is out of range. Available pages: 1 to {self.total_pages}")
        self.current_page = page_num
        return self
    
    def first_page(self):
        """Navigates to the first page"""
        self.current_page = 1
        return self
    
    def last_page(self):
        """Navigates to the last page"""
        self.current_page = self.total_pages
        return self
    
    def next_page(self):
        """Moves one page forward if not on the last page"""
        if self.current_page < self.total_pages:
            self.current_page += 1
        return self
    
    def previous_page(self):
        """Moves one page backward if not on the first page"""
        if self.current_page > 1:
            self.current_page -= 1
        return self
    
    def __str__(self):
        """
        Returns a string displaying items on current page, each on a new line
        """
        visible_items = self.get_visible_items()
        return '\n'.join(str(item) for item in visible_items)
    
    def __repr__(self):
        """String representation of the Pagination object"""
        return f"Pagination(items={len(self.items)} items, page_size={self.page_size}, current_page={self.current_page}/{self.total_pages})"
    
    # Additional utility methods
    def get_current_page_info(self):
        """Returns current page number and total pages"""
        return f"Page {self.current_page} of {self.total_pages}"
    
    def get_page_info(self):
        """Returns detailed page information"""
        total_items = len(self.items)
        start_idx = (self.current_page - 1) * self.page_size + 1
        end_idx = min(self.current_page * self.page_size, total_items)
        return f"Showing items {start_idx}-{end_idx} of {total_items} (Page {self.current_page} of {self.total_pages})"


# Test function to demonstrate all features
def test_pagination():
    """Comprehensive test of the Pagination class"""
    print(" TESTING PAGINATION SYSTEM")
    print("=" * 50)
    
    # Test data
    alphabetList = list("abcdefghijklmnopqrstuvwxyz")
    
    # Test 1: Basic initialization and first page
    print("\n1. Basic initialization with page size 4:")
    p = Pagination(alphabetList, 4)
    print(f"   Initial page items: {p.get_visible_items()}")
    print(f"   Page info: {p.get_page_info()}")
    
    # Test 2: Next page navigation
    print("\n2. After next_page():")
    p.next_page()
    print(f"   Items: {p.get_visible_items()}")
    print(f"   Page info: {p.get_page_info()}")
    
    # Test 3: Method chaining
    print("\n3. Method chaining - 3x next_page():")
    result = p.next_page().next_page().next_page().get_visible_items()
    print(f"   Items: {result}")
    
    # Test 4: Last page
    print("\n4. Going to last page:")
    p.last_page()
    print(f"   Items: {p.get_visible_items()}")
    print(f"   Page info: {p.get_page_info()}")
    
    # Test 5: First page and previous page
    print("\n5. First page and previous page (should stay on first):")
    p.first_page().previous_page()
    print(f"   Items: {p.get_visible_items()}")
    
    # Test 6: Go to specific page
    print("\n6. Going to page 3:")
    p.go_to_page(3)
    print(f"   Items: {p.get_visible_items()}")
    
    # Test 7: String representation
    print("\n7. String representation (__str__):")
    print(str(p))
    
    # Test 8: Error handling
    print("\n8. Error handling:")
    try:
        p.go_to_page(10)  # Should raise ValueError
    except ValueError as e:
        print(f"    Correctly caught error: {e}")
    
    try:
        p.go_to_page(0)  # Should raise ValueError
    except ValueError as e:
        print(f"    Correctly caught error: {e}")
    
    # Test 9: Empty list
    print("\n9. Empty list test:")
    empty_p = Pagination([], 5)
    print(f"   Items: {empty_p.get_visible_items()}")
    print(f"   Page info: {empty_p.get_page_info()}")
    
    # Test 10: Complex method chaining
    print("\n10. Complex method chaining:")
    p2 = Pagination(alphabetList, 4)
    p2.first_page().next_page().next_page().go_to_page(5).previous_page()
    print(f"   Final items: {p2.get_visible_items()}")
    print(f"   Current page: {p2.get_current_page_info()}")


# Additional demonstration with different data types
def advanced_demo():
    """Demonstrate pagination with different types of data"""
    print("\n" + "=" * 50)
    print(" ADVANCED DEMONSTRATION")
    print("=" * 50)
    
    # Numbers
    print("\n1. Paginating numbers 1-20:")
    numbers = list(range(1, 21))
    p_num = Pagination(numbers, 5)
    print(f"   Page 1: {p_num.get_visible_items()}")
    p_num.next_page()
    print(f"   Page 2: {p_num.get_visible_items()}")
    
    # Strings
    print("\n2. Paginating words:")
    words = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"]
    p_words = Pagination(words, 3)
    print(f"   All pages for words:")
    for page in range(1, p_words.total_pages + 1):
        p_words.go_to_page(page)
        print(f"   Page {page}: {p_words.get_visible_items()}")
    
    # Custom objects
    print("\n3. Paginating custom data:")
    class Person:
        def __init__(self, name, age):
            self.name = name
            self.age = age
        def __str__(self):
            return f"{self.name} ({self.age})"
    
    people = [Person("Alice", 25), Person("Bob", 30), Person("Charlie", 35),
              Person("Diana", 28), Person("Eve", 32)]
    p_people = Pagination(people, 2)
    print("   People pagination:")
    for page in range(1, p_people.total_pages + 1):
        p_people.go_to_page(page)
        print(f"   Page {page}:")
        for person in p_people.get_visible_items():
            print(f"     - {person}")


if __name__ == "__main__":
    # Run comprehensive tests
    test_pagination()
    
    # Run advanced demonstration
    advanced_demo()
    
    # Interactive example
    print("\n" + "=" * 50)
    print(" INTERACTIVE EXAMPLE")
    print("=" * 50)
    
    # Create pagination with alphabet
    alphabet = list("abcdefghijklmnopqrstuvwxyz")
    paginator = Pagination(alphabet, 5)
    
    print("Navigating through alphabet with 5 items per page:")
    print(paginator.get_page_info())
    
    # Demonstrate method chaining as requested in bonus
    print("\nDemonstrating method chaining:")
    print("p.next_page().next_page().next_page().get_visible_items()")
    result = paginator.first_page().next_page().next_page().next_page().get_visible_items()
    print(f"Result: {result}")