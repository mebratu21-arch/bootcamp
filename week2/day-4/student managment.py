import json
import csv
import os
from datetime import datetime

class StudentManager:
    def __init__(self, data_file="students.json", log_file="system.log"):
        self.data_file = data_file
        self.log_file = log_file
        self.students = self.load_students()
        self.log_action("System started")

    def log_action(self, action):
        """Log system actions to a log file"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with open(self.log_file, 'a') as file:
            file.write(f"[{timestamp}] {action}\n")

    def load_students(self):
        """Load students from JSON file"""
        try:
            with open(self.data_file, 'r') as file:
                students = json.load(file)
                self.log_action(f"Loaded {len(students)} students from file")
                return students
        except FileNotFoundError:
            self.log_action("No existing data file found, starting fresh")
            return []
        except json.JSONDecodeError:
            self.log_action("Error reading data file, starting fresh")
            return []

    def save_students(self):
        """Save students to JSON file"""
        with open(self.data_file, 'w') as file:
            json.dump(self.students, file, indent=4)
        self.log_action(f"Saved {len(self.students)} students to file")

    def add_student(self):
        """Add a new student"""
        print("\n--- Add New Student ---")
        student_id = input("Enter Student ID: ")
        
        # Check if student ID already exists
        if any(student['id'] == student_id for student in self.students):
            print("Error: Student ID already exists!")
            return

        name = input("Enter Name: ")
        age = input("Enter Age: ")
        grade = input("Enter Grade: ")
        email = input("Enter Email: ")

        student = {
            'id': student_id,
            'name': name,
            'age': age,
            'grade': grade,
            'email': email,
            'created_at': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

        self.students.append(student)
        self.save_students()
        print(f"Student {name} added successfully!")
        self.log_action(f"Added student: {name} (ID: {student_id})")

    def view_all_students(self):
        """Display all students"""
        print("\n--- All Students ---")
        if not self.students:
            print("No students found.")
            return

        for i, student in enumerate(self.students, 1):
            print(f"{i}. ID: {student['id']}, Name: {student['name']}, "
                  f"Age: {student['age']}, Grade: {student['grade']}, "
                  f"Email: {student['email']}")

    def search_student(self):
        """Search for a student by ID or name"""
        print("\n--- Search Student ---")
        search_term = input("Enter Student ID or Name: ").lower()

        found_students = [
            student for student in self.students
            if search_term in student['id'].lower() or search_term in student['name'].lower()
        ]

        if found_students:
            print(f"Found {len(found_students)} student(s):")
            for student in found_students:
                print(f"ID: {student['id']}, Name: {student['name']}, "
                      f"Grade: {student['grade']}, Email: {student['email']}")
        else:
            print("No students found matching your search.")

    def update_student(self):
        """Update student information"""
        print("\n--- Update Student ---")
        student_id = input("Enter Student ID to update: ")

        for student in self.students:
            if student['id'] == student_id:
                print(f"Current Info: {student}")
                print("Leave blank to keep current value:")

                student['name'] = input(f"New Name ({student['name']}): ") or student['name']
                student['age'] = input(f"New Age ({student['age']}): ") or student['age']
                student['grade'] = input(f"New Grade ({student['grade']}): ") or student['grade']
                student['email'] = input(f"New Email ({student['email']}): ") or student['email']
                student['updated_at'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

                self.save_students()
                print("Student updated successfully!")
                self.log_action(f"Updated student: {student['name']} (ID: {student_id})")
                return

        print("Student not found!")

    def delete_student(self):
        """Delete a student"""
        print("\n--- Delete Student ---")
        student_id = input("Enter Student ID to delete: ")

        for i, student in enumerate(self.students):
            if student['id'] == student_id:
                deleted_name = student['name']
                del self.students[i]
                self.save_students()
                print(f"Student {deleted_name} deleted successfully!")
                self.log_action(f"Deleted student: {deleted_name} (ID: {student_id})")
                return

        print("Student not found!")

    def export_to_csv(self):
        """Export student data to CSV file"""
        if not self.students:
            print("No students to export!")
            return

        csv_file = "students_export.csv"
        with open(csv_file, 'w', newline='') as file:
            writer = csv.writer(file)
            # Write header
            writer.writerow(['ID', 'Name', 'Age', 'Grade', 'Email', 'Created At'])
            # Write data
            for student in self.students:
                writer.writerow([
                    student['id'],
                    student['name'],
                    student['age'],
                    student['grade'],
                    student['email'],
                    student['created_at']
                ])

        print(f"Data exported to {csv_file} successfully!")
        self.log_action(f"Exported {len(self.students)} students to CSV")

    def generate_report(self):
        """Generate a text report of all students"""
        if not self.students:
            print("No students to generate report!")
            return

        report_file = "students_report.txt"
        with open(report_file, 'w') as file:
            file.write("STUDENT MANAGEMENT SYSTEM REPORT\n")
            file.write("=" * 50 + "\n")
            file.write(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            file.write(f"Total Students: {len(self.students)}\n")
            file.write("=" * 50 + "\n\n")

            for i, student in enumerate(self.students, 1):
                file.write(f"Student #{i}\n")
                file.write(f"  ID: {student['id']}\n")
                file.write(f"  Name: {student['name']}\n")
                file.write(f"  Age: {student['age']}\n")
                file.write(f"  Grade: {student['grade']}\n")
                file.write(f"  Email: {student['email']}\n")
                file.write(f"  Created: {student['created_at']}\n")
                if 'updated_at' in student:
                    file.write(f"  Last Updated: {student['updated_at']}\n")
                file.write("-" * 30 + "\n")

        print(f"Report generated: {report_file}")
        self.log_action("Generated student report")

    def backup_data(self):
        """Create a backup of the data file"""
        if os.path.exists(self.data_file):
            backup_file = f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(self.data_file, 'r') as source:
                with open(backup_file, 'w') as target:
                    target.write(source.read())
            print(f"Backup created: {backup_file}")
            self.log_action(f"Created backup: {backup_file}")
        else:
            print("No data file to backup!")

    def display_menu(self):
        """Display the main menu"""
        print("\n" + "=" * 50)
        print("      STUDENT MANAGEMENT SYSTEM")
        print("=" * 50)
        print("1. Add Student")
        print("2. View All Students")
        print("3. Search Student")
        print("4. Update Student")
        print("5. Delete Student")
        print("6. Export to CSV")
        print("7. Generate Report")
        print("8. Backup Data")
        print("9. View Log")
        print("0. Exit")
        print("=" * 50)

    def view_log(self):
        """Display the system log"""
        try:
            with open(self.log_file, 'r') as file:
                log_content = file.read()
                if log_content:
                    print("\n--- System Log ---")
                    print(log_content)
                else:
                    print("Log file is empty.")
        except FileNotFoundError:
            print("No log file found.")

    def run(self):
        """Main program loop"""
        while True:
            self.display_menu()
            choice = input("Enter your choice (0-9): ")

            if choice == '1':
                self.add_student()
            elif choice == '2':
                self.view_all_students()
            elif choice == '3':
                self.search_student()
            elif choice == '4':
                self.update_student()
            elif choice == '5':
                self.delete_student()
            elif choice == '6':
                self.export_to_csv()
            elif choice == '7':
                self.generate_report()
            elif choice == '8':
                self.backup_data()
            elif choice == '9':
                self.view_log()
            elif choice == '0':
                self.log_action("System shutdown")
                print("Thank you for using Student Management System!")
                break
            else:
                print("Invalid choice! Please try again.")

            input("\nPress Enter to continue...")

# Sample data initialization
def create_sample_data():
    """Create sample data for testing"""
    sample_students = [
        {
            'id': 'S001',
            'name': 'John Doe',
            'age': '20',
            'grade': 'A',
            'email': 'john@example.com',
            'created_at': '2024-01-01 10:00:00'
        },
        {
            'id': 'S002',
            'name': 'Jane Smith',
            'age': '22',
            'grade': 'B+',
            'email': 'jane@example.com',
            'created_at': '2024-01-02 11:00:00'
        }
    ]
    
    with open('students.json', 'w') as file:
        json.dump(sample_students, file, indent=4)
    print("Sample data created!")

# Main execution
if __name__ == "__main__":
    # Uncomment the line below to create sample data on first run
    # create_sample_data()
    
    manager = StudentManager()
    manager.run()