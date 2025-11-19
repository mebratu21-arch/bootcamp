import json
from datetime import datetime

def main():
    """
    Main function for JSON manipulation exercise
    """
    # Sample JSON string
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
    
    print("Original JSON:")
    print(sampleJson)
    print("\n" + "="*50)
    
    try:
        # Step 1: Load the JSON string into a Python dictionary
        data = json.loads(sampleJson)
        
        # Step 2: Access the nested "salary" key
        salary = data["company"]["employee"]["payable"]["salary"]
        print(f"Employee salary: ${salary}")
        
        # Step 3: Add "birth_date" key to the employee dictionary
        # Using a sample birth date - you can change this
        data["company"]["employee"]["birth_date"] = "1990-05-15"
        
        # Step 4: Save the modified JSON to a file
        output_file = "modified_employee_data.json"
        
        with open(output_file, 'w') as file:
            json.dump(data, file, indent=4)
        
        print(f"Modified JSON saved to: {output_file}")
        
        # Display the modified JSON
        print("\nModified JSON structure:")
        print(json.dumps(data, indent=4))
        
        # Verify the new key was added
        birth_date = data["company"]["employee"]["birth_date"]
        print(f"\nAdded birth date: {birth_date}")
        
    except KeyError as e:
        print(f"Error: Key not found in JSON structure - {e}")
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON format - {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# Alternative version with more functionality
def advanced_json_exercise():
    """
    Advanced version with more JSON operations
    """
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
    
    print("\n" + "="*50)
    print("ADVANCED JSON EXERCISE")
    print("="*50)
    
    try:
        # Parse JSON
        data = json.loads(sampleJson)
        
        # Access nested values
        employee_name = data["company"]["employee"]["name"]
        salary = data["company"]["employee"]["payable"]["salary"]
        bonus = data["company"]["employee"]["payable"]["bonus"]
        total_compensation = salary + bonus
        
        print(f"Employee: {employee_name}")
        print(f"Salary: ${salary}")
        print(f"Bonus: ${bonus}")
        print(f"Total Compensation: ${total_compensation}")
        
        # Add multiple new fields
        data["company"]["employee"]["birth_date"] = "1990-05-15"
        data["company"]["employee"]["hire_date"] = "2020-03-10"
        data["company"]["employee"]["department"] = "Engineering"
        
        # Calculate and add age (approximate)
        birth_year = int(data["company"]["employee"]["birth_date"][:4])
        current_year = datetime.now().year
        approximate_age = current_year - birth_year
        data["company"]["employee"]["approximate_age"] = approximate_age
        
        # Save to different formats
        output_files = {
            "pretty.json": lambda: json.dump(data, open("pretty.json", "w"), indent=4),
            "compact.json": lambda: json.dump(data, open("compact.json", "w")),
            "sorted_keys.json": lambda: json.dump(data, open("sorted_keys.json", "w"), indent=4, sort_keys=True)
        }
        
        for filename, save_function in output_files.items():
            save_function()
            print(f"Saved: {filename}")
        
        # Display final structure
        print("\nFinal Employee Data Structure:")
        print(json.dumps(data, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # Run basic exercise
    main()
    
    # Run advanced exercise (optional)
    run_advanced = input("\nRun advanced version? (y/n): ").lower()
    if run_advanced == 'y':
        advanced_json_exercise()