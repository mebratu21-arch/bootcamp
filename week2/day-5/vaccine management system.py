class Human:
    def __init__(self, id_number, name, age, priority, blood_type):
        self.id_number = id_number
        self.name = name
        self.age = age
        self.priority = priority
        self.blood_type = blood_type
        self.family = []  # For Part 2


class Queue:
    def __init__(self):
        self.humans = []
    
    def add_person(self, person):
        """Add a human to the queue. Priority/60+ go to the front."""
        if person.age > 60 or person.priority:
            # Add at beginning without using list.insert
            self.humans = [person] + self.humans
        else:
            # Add at end
            self.humans = self.humans + [person]
    
    def find_in_queue(self, person):
        """Returns the index of a human in the queue without using list.index"""
        for i, human in enumerate(self.humans):
            if human.id_number == person.id_number:
                return i
        return -1
    
    def swap(self, person1, person2):
        """Swaps person1 with person2 in the queue"""
        idx1 = self.find_in_queue(person1)
        idx2 = self.find_in_queue(person2)
        
        if idx1 != -1 and idx2 != -1:
            # Swap without using list methods that are forbidden
            new_humans = self.humans.copy()
            new_humans[idx1], new_humans[idx2] = new_humans[idx2], new_humans[idx1]
            self.humans = new_humans
    
    def get_next(self):
        """Returns and removes the next human in queue (index 0)"""
        if not self.humans:
            return None
        
        next_person = self.humans[0]
        # Remove first element without using list.pop
        self.humans = self.humans[1:]
        return next_person
    
    def get_next_blood_type(self, blood_type):
        """Returns and removes the first human with specific blood type"""
        for i, human in enumerate(self.humans):
            if human.blood_type == blood_type:
                # Remove this element
                found_person = human
                self.humans = self.humans[:i] + self.humans[i+1:]
                return found_person
        return None
    
    def sort_by_age(self):
        """Sorts queue by priority then age without using built-in sort"""
        if not self.humans:
            return
        
        # Simple bubble sort implementation
        n = len(self.humans)
        for i in range(n):
            for j in range(0, n - i - 1):
                # Compare the two humans
                human1 = self.humans[j]
                human2 = self.humans[j + 1]
                
                # Determine if we need to swap
                swap_needed = False
                
                # Priority people first
                if human1.priority and not human2.priority:
                    # human1 should stay before human2
                    pass
                elif not human1.priority and human2.priority:
                    # human2 should come before human1
                    swap_needed = True
                else:
                    # Both have same priority status, compare age
                    if human1.age < human2.age:
                        # Older should come first, so swap if human1 is younger
                        swap_needed = True
                    # If same age or human1 is older, no swap needed
                
                if swap_needed:
                    # Swap the elements
                    self.humans[j], self.humans[j + 1] = self.humans[j + 1], self.humans[j]