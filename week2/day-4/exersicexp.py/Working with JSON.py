import json
from datetime import datetime

def exercise_2():
    """
    Exercise 2: Working with JSON
    - Access nested keys
    - Add new keys
    - Save modified JSON to file
    """
    print("\n" + "="*50)
    print("EXERCISE 2: WORKING WITH JSON")
    print("="*50)
    
    # Given JSON string
    sampleJson = """{ 
       "company":{ 
          "employee":{ 
             "name":"emma",
             "payable":{ 
                "salary":7000,
                "bonus":800
             }
          }
       }
    }"""
    
    # Step 1: Load the JSON string
    try:
        data = json.loads(sampleJson)
        print("✅ JSON string successfully parsed")
    except json.JSONDecodeError as e:
        print(f"❌ Error parsing JSON: {e}")
        return
    
    # Step 2: Access the nested "salary" key
    try:
        salary = data["company"]["employee"]["payable"]["salary"]
        print(f"💰 Salary: {salary}")
    except KeyError as e:
        print(f"❌ Error accessing salary key: {e}")
        return
    
    # Step 3: Add the "birth_date" key
    try:
        # Using a sample birth date (you can change this)
        birth_date = "1990-05-15"  # Format: YYYY-MM-DD
        data["company"]["employee"]["birth_date"] = birth_date
        print(f"🎂 Added birth date: {birth_date}")
    except KeyError as e:
        print(f"❌ Error adding birth date: {e}")
        return
    
    # Step 4: Save the JSON to a file
    try:
        output_filename = "modified_employee_data.json"
        with open(output_filename, 'w') as file:
            json.dump(data, file, indent=4)
        print(f"💾 Modified JSON saved to: {output_filename}")
    except Exception as e:
        print(f"❌ Error saving to file: {e}")
        return
    
    # Display the modified JSON structure
    print("\n📊 MODIFIED JSON STRUCTURE:")
    print(json.dumps(data, indent=2))
    
    # Additional: Verify the file was saved correctly
    try:
        with open(output_filename, 'r') as file:
            saved_data = json.load(file)
            saved_birth_date = saved_data["company"]["employee"]["birth_date"]
            print(f"✅ Verification: Birth date in saved file is '{saved_birth_date}'")
    except Exception as e:
        print(f"❌ Error verifying saved file: {e}")

def enhanced_json_exercise():
    """
    Enhanced version with more functionality
    """
    print("\n" + "="*50)
    print("ENHANCED JSON EXERCISE")
    print("="*50)
    
    # More complex JSON example
    complex_json = """
    {
        "company": {
            "name": "Tech Solutions Inc.",
            "founded": 2010,
            "departments": {
                "engineering": {
                    "manager": "Alice Johnson",
                    "team_size": 15,
                    "projects": ["Web Platform", "Mobile App", "API Services"]
                },
                "sales": {
                    "manager": "Bob Smith", 
                    "team_size": 8,
                    "regions": ["North America", "Europe", "Asia"]
                }
            },
            "employees": [
                {
                    "id": 1,
                    "name": "Emma Davis",
                    "position": "Senior Developer",
                    "salary": 75000,
                    "skills": ["Python", "JavaScript", "SQL"]
                },
                {
                    "id": 2,
                    "name": "Michael Chen",
                    "position": "Sales Executive", 
                    "salary": 60000,
                    "clients": ["ABC Corp", "XYZ Ltd"]
                }
            ]
        }
    }
    """
    
    try:
        # Parse JSON
        company_data = json.loads(complex_json)
        print("✅ Complex JSON parsed successfully")
        
        # Access various nested values
        company_name = company_data["company"]["name"]
        engineering_manager = company_data["company"]["departments"]["engineering"]["manager"]
        first_employee_name = company_data["company"]["employees"][0]["name"]
        first_employee_salary = company_data["company"]["employees"][0]["salary"]
        
        print(f"🏢 Company: {company_name}")
        print(f"👨‍💼 Engineering Manager: {engineering_manager}")
        print(f"👩‍💼 First Employee: {first_employee_name}")
        print(f"💰 First Employee Salary: ${first_employee_salary:,}")
        
        # Add new information
        current_year = datetime.now().year
        company_data["company"]["years_operating"] = current_year - company_data["company"]["founded"]
        
        # Add birth dates to employees
        company_data["company"]["employees"][0]["birth_date"] = "1990-05-15"
        company_data["company"]["employees"][1]["birth_date"] = "1985-11-22"
        
        # Save enhanced data
        with open("enhanced_company_data.json", 'w') as file:
            json.dump(company_data, file, indent=2)
        print("💾 Enhanced company data saved to 'enhanced_company_data.json'")
        
        # Display summary
        print(f"\n📈 Company has been operating for {company_data['company']['years_operating']} years")
        print(f"📊 Total employees: {len(company_data['company']['employees'])}")
        
    except json.JSONDecodeError as e:
        print(f"❌ JSON parsing error: {e}")
    except KeyError as e:
        print(f"❌ Missing key: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

def json_file_operations():
    """
    Additional practice with JSON file operations
    """
    print("\n" + "="*50)
    print("JSON FILE OPERATIONS PRACTICE")
    print("="*50)
    
    # Create a sample JSON file
    sample_data = {
        "students": [
            {
                "name": "John Doe",
                "age": 20,
                "courses": ["Math", "Physics", "Computer Science"],
                "grades": {"Math": 85, "Physics": 90, "Computer Science": 95}
            },
            {
                "name": "Jane Smith", 
                "age": 21,
                "courses": ["Biology", "Chemistry", "English"],
                "grades": {"Biology": 88, "Chemistry": 92, "English": 87}
            }
        ],
        "school": {
            "name": "University of Programming",
            "location": "Tech City",
            "established": 2000
        }
    }
    
    # Write to file
    with open("students_data.json", 'w') as file:
        json.dump(sample_data, file, indent=4)
    print("✅ Sample student data written to 'students_data.json'")
    
    # Read and modify
    with open("students_data.json", 'r') as file:
        loaded_data = json.load(file)
    
    # Add new student
    new_student = {
        "name": "Alex Johnson",
        "age": 19,
        "courses": ["History", "Art", "Music"],
        "grades": {"History": 78, "Art": 95, "Music": 88},
        "birth_date": "2004-03-10"  # Adding birth date
    }
    loaded_data["students"].append(new_student)
    
    # Update school info
    loaded_data["school"]["total_students"] = len(loaded_data["students"])
    
    # Save updated data
    with open("updated_students_data.json", 'w') as file:
        json.dump(loaded_data, file, indent=4)
    print("✅ Updated student data saved to 'updated_students_data.json'")
    
    # Display summary
    print(f"📚 School: {loaded_data['school']['name']}")
    print(f"👥 Total students: {loaded_data['school']['total_students']}")
    for student in loaded_data['students']:
        birth_date = student.get('birth_date', 'Not specified')
        print(f"   - {student['name']} (Birth: {birth_date})")

# Run all exercises
if __name__ == "__main__":
    # Exercise 1
    main()
    
    # Exercise 2
    exercise_2()
    
    # Enhanced exercises (bonus)
    enhanced_json_exercise()
    json_file_operations()