#  Global Country Explorer

A modern, interactive web application that allows users to explore countries worldwide in real time. Built as a **Hackathon Project (MVP → Full App)** using **HTML, CSS, Vanilla JavaScript**, and the **REST Countries API**.

---



 **Repository:** [https://github.com/mebratu21-arch/bootcamp/tree/main/personal%20project/hackatoon](https://github.com/mebratu21-arch/bootcamp/tree/main/personal%20project/hackatoon)

---

##  Features

* **Real-time country data** fetched from the REST Countries API
*  **Search by country name** (instant filtering)
*  **Filter by region**: Africa, Asia, Europe, Americas, Oceania
*  **Sort countries**:

  * Alphabetical (A → Z, Z → A)
  * Population (Ascending / Descending)
*  **Clickable country cards** with a detailed modal view:

  * Flag
  * Capital
  * Subregion
  * Population
  * Languages
*  **Dark / Light mode toggle**
* **Persistent user preferences** using LocalStorage
*  **Fully responsive design** (desktop & mobile)

---

##  Tech Stack

* **HTML5**
* **CSS3** (Responsive Design + Dark/Light Mode)
* **Vanilla JavaScript (ES6+)**
* **REST Countries API** – [https://restcountries.com/](https://restcountries.com/)
* **LocalStorage** for saving user preferences

---

##  Project Structure

```text
global-country-explorer/
│
├── index.html
│
├── assets/
│   ├── icons/
│   └── images/
│
├── css/
│   ├── styles.css
│   ├── dark-mode.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── api.js
│   ├── ui.js
│   ├── filters.js
│   ├── modal.js
│   └── storage.js
│
├── README.md
└── .gitignore

```

---

##  How It Works

1. On page load, the app fetches all countries from the REST Countries API
2. Data is rendered as country cards
3. Users can:

   * Search by name
   * Filter by region
   * Sort results
4. Clicking a country opens a modal with detailed information
5. User preferences (theme, search, filter, sort) are saved automatically in LocalStorage

---

##  LocalStorage Usage

The app stores the following preferences:

* `theme` → dark / light
* `searchValue` → last search input
* `selectedRegion` → chosen region filter
* `sortOption` → selected sort method

These settings persist across page reloads.

---

##  How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/mebratu21-arch/bootcamp.git
```

2. Navigate into the project folder:

```bash
cd global-country-explorer
```

3. Open `index.html` in your browser:

```bash
open index.html
```

*or simply double-click the file*

> No build tools or dependencies required.


##  License

This project is open source and available under the **MIT License**.

---

##  Acknowledgments

* REST Countries API
* Hackathon organizers & mentors

---

###  Author

** Mebratu**
GitHub: [https://github.com/mebratu21-arch](https://github.com/mebratu21-arch)

---

 If you like this project, consider giving it a star!
