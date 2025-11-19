import json
from typing import Any, Dict

def load_json_from_string(json_string: str) -> Dict[str, Any]:
    """
    Load JSON from a string with error handling
    """
    try:
        return json.loads(json_string)
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON string: {e}")

def save_json_to_file(data: Dict[str, Any], filename: str, indent: int = 4) -> None:
    """
    Save dictionary to JSON file with error handling
    """
    try:
        with open(filename, 'w') as file:
            json.dump(data, file, indent=indent)
        print(f"Successfully saved JSON to {filename}")
    except Exception as e:
        raise IOError(f"Error saving to {filename}: {e}")

def get_nested_value(data: Dict[str, Any], keys: list) -> Any:
    """
    Safely get nested value from dictionary
    """
    current = data
    for key in keys:
        if isinstance(current, dict) and key in current:
            current = current[key]
        else:
            raise KeyError(f"Key path {keys} not found in data")
    return current

def set_nested_value(data: Dict[str, Any], keys: list, value: Any) -> None:
    """
    Safely set nested value in dictionary
    """
    current = data
    for key in keys[:-1]:
        if key not in current:
            current[key] = {}
        current = current[key]
    current[keys[-1]] = value