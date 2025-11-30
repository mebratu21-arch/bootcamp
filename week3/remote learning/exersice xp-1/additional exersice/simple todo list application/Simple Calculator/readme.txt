# Simple Calculator Project

## 1. 🚀 Project Overview

This is a simple, browser-based calculator designed to perform basic arithmetic operations (addition, subtraction, multiplication, and division). It features a modern, clean UI layout similar to a standard handheld calculator and includes a powerful **Memory feature** for handling intermediate results.

### Features
* **Basic Arithmetic:** Addition (+), Subtraction (-), Multiplication (x), Division (/).
* **Clear Functions:** All Clear (AC) and Clear Entry (C).
* **Sign Toggle:** Change the sign of the current number (±).
* **Memory Functions (Bonus Objective):**
    * **M+** (Memory Add): Adds the current display value to the stored memory.
    * **M-** (Memory Subtract): Subtracts the current display value from the stored memory.
    * **MR** (Memory Recall): Displays the value currently held in memory.
    * **MC** (Memory Clear): Resets the stored memory value to zero.

---

## 2. 💻 Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Structure and Semantic layout of the calculator interface. |
| **CSS3** | Styling, button colors, and responsive Grid layout for the keys. |
| **JavaScript (ES6+)** | Core functionality, DOM manipulation, and handling all user events and calculation logic. |

---

## 3. ⚙️ Installation and Setup

This is a purely front-end project and requires no complex installation or dependencies.

### Prerequisites

You only need a modern web browser (e.g., Chrome, Firefox, Edge, Safari).

### Running the Project

1.  **Clone or Download:** Get the project files (or create the following three files) in a local folder:
    * `index.html` (The structure)
    * `style.css` (The visual design)
    * `script.js` (The logic)
2.  **Open:** Locate the `index.html` file and double-click it.
3.  The calculator will open directly in your default web browser.

---

## 4. 💡 Usage

### Basic Operations

1.  Enter the **first number**.
2.  Click an **operator** button (+, -, x, /).
3.  Enter the **second number**.
4.  Click the **equals (=)** button to see the result.

### Control and Clear

| Button | Action |
| :--- | :--- |
| **AC** (All Clear) | Clears the current display, resets all calculation states, and clears the memory. |
| **C** (Clear Entry) | Clears only the currently displayed number, allowing for corrections without losing the ongoing calculation. |
| **±** (Negate) | Toggles the sign of the displayed number (positive to negative, or vice-versa). |

### Memory Functions

The memory is designed to hold a single numerical value for later use.

1.  **Calculate** a number you wish to save (e.g., calculate `5 * 5 = 25`).
2.  Click **M+** to add 25 to the memory (or **M-** to subtract it).
3.  Perform another calculation.
4.  To use the stored number, click **MR** (Memory Recall). The stored value will appear on the display, ready to be used as the next operand.
5.  Click **MC** to clear the memory (resets memory to 0).

---

## 5. 🤝 Contribution

Feel free to fork the repository and contribute! Suggestions for improvements, especially regarding calculation precision, error handling, or advanced features (like percentage or square root), are welcome.

---

## 6. 📝 License

This project is licensed under the MIT License - see the LICENSE file (if you create one) for details.