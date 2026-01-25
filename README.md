# 🚀 Full-Stack Bootcamp Portfolio

<div align="center">

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.0-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Comprehensive collection of advanced exercises demonstrating expertise in modern web development**

[View Projects](#-projects) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Contact](#-contact)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Projects](#-projects)
  - [Prompt Engineering](#-prompt-engineering)
  - [Redux Toolkit Applications](#-redux-toolkit-applications)
  - [React + TypeScript](#-react--typescript)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [What I Learned](#-what-i-learned)
- [Contact](#-contact)

---

## 🎯 Overview

This repository contains a complete portfolio of **13 advanced exercises** across three major domains:

- **Prompt Engineering**: 13 exercises demonstrating mastery of AI prompt crafting
- **Redux Toolkit**: 5 full-stack applications with state management
- **React + TypeScript**: 15+ components across 3 difficulty levels

**Total**: 50+ files, ~3,500 lines of production-ready code

---

## 🚀 Projects

### 📝 Prompt Engineering

Comprehensive exercises covering advanced AI prompt techniques:

#### **Basic Level (6 Exercises)**
1. **Vague Prompt Optimization** - Transform unclear prompts into precise, actionable instructions
2. **Multi-Part Quiz Generation** - Create educational content with age-appropriate constraints
3. **Context Enhancement** - Apply 6 types of context for better AI outputs
4. **Style Matching** - Implement conversational AI for customer support
5. **Constraint Control** - Enforce strict format, length, and tone requirements
6. **Hallucination Mitigation** - Prevent AI fabrications with source-grounding techniques

#### **Gold Level (6 Advanced Exercises)**
- Chain-of-Thought debugging
- Few-shot prompting patterns
- AlignedCoT reasoning comparison
- Multi-step document pipelines
- Bias reduction through role prompting
- Conversational agents with memory

#### **Ninja Level**
- **LLM Document Assistant** - Full Python implementation with:
  - Few-shot + Chain-of-Thought summarization
  - Role-based Q&A with context memory
  - Self-reflection and multi-agent critique

📂 **Location**: `prompt eng/`

---

### 🔴 Redux Toolkit Applications

Five fully functional applications demonstrating state management expertise:

#### **1. Todo List** 
*Basic Level - `redux exersice-2/exercisexp/`*
- CRUD operations (add, toggle, remove)
- Form validation
- Modern card-based UI
- **Tech**: Redux Toolkit, React

#### **2. Store Inventory (Gold)**
*Gold Level - `redux exersice-2/exersicexp-gold/`*
- Entity adapter for normalized state
- Automatic sorting
- Efficient selector patterns
- **Tech**: Redux Toolkit, Entity Adapter

#### **3. Advanced Inventory (Ninja)**
*Ninja Level - `redux exersice-2/exersicexp-ninja/`*
- 🎨 Theme switching (Light/Dark/Ninja)
- 📊 Category filtering
- ⚡ Inline quantity editing
- 🗑️ Delete confirmations
- **Tech**: Redux Toolkit, Multi-slice architecture

#### **4. Daily Planner**
*`redux exersice-2/planner/`*
- 📅 Date-based task organization
- ✏️ Edit/toggle/delete tasks
- 📆 Date picker navigation
- **Tech**: Redux Toolkit, Date management

#### **5. Generic Data Fetcher**
*`redux exersice-2/generic-data-fetcher/`*
- 🔷 Full TypeScript implementation
- 🎭 Render prop pattern
- ⚡ Loading/Error states
- 🌐 API integration
- **Tech**: TypeScript, Redux, Generics

---

### ⚛️ React + TypeScript

Complete component library across three skill levels:

#### **Basic Level** (`react-typesc/exersicexp/`)
- `Greeting` - Props typing
- `UserCard` - Optional props
- `Counter` - State management
- `UserList` - Async data with TypeScript

#### **Gold Level** (`react-typesc/exersicexp-gold/`)
- `MultiStepForm` - useReducer with validation
- `GroceryList` - Generic list management
- `BookFinder` - API integration with error handling

#### **Ninja Level** (`react-typesc/exersicexp-ninja/`)
- `UserProfile` - Controlled components with validation
- `SurveyFeedback` - Complex form state
- `ContactForm` - Multi-field validation
- `ContactContext` - Context API + useReducer
- `RefExample` - useRef and imperative handles

**All configured with modern JSX transform** - No React imports needed!

---

## 🛠 Tech Stack

### **Frontend**
- ⚛️ React 19.0
- 🔷 TypeScript 5.6
- 🔴 Redux Toolkit 2.0
- ⚡ Vite 6.0

### **Styling**
- 🎨 CSS3 with modern features
- 🌈 Custom theming systems
- 📱 Responsive design
- ✨ Glassmorphism & gradients

### **AI/Prompt Engineering**
- 🤖 OpenAI GPT integration
- 🐍 Python 3.x
- 📊 Prompt optimization frameworks

### **Tools**
- 📦 npm/Node.js
- 🔧 ESLint
- 🔥 Hot Module Replacement (HMR)

---

## 📥 Installation

### **Prerequisites**
- Node.js 18+ and npm
- Git
- Python 3.x (for Prompt Engineering projects)

### **Quick Start**

1. **Clone the repository**
```bash
git clone https://github.com/mebratu21-arch/bootcamp.git
cd bootcamp
```

2. **Install dependencies** (for any React/Redux project)
```bash
cd "redux exersice-2/[project-name]"
npm install
npm run dev
```

3. **For TypeScript projects**
```bash
cd "react-typesc/[level]"
npm install
npm run dev
```

### **Running Multiple Projects**
Run on different ports to test simultaneously:
```bash
# Terminal 1
cd "redux exersice-2/exersicexp-ninja"
npm run dev -- --port 5173

# Terminal 2
cd "redux exersice-2/planner"
npm run dev -- --port 5172

# Terminal 3
cd "react-typesc/exersicexp-ninja"
npm run dev -- --port 5174
```

---

## 📁 Project Structure

```
bootcamp/
├── prompt eng/
│   ├── exersicexp/              # 6 basic exercises
│   ├── exersicexp-gold/         # Gold level prompts
│   └── exercisexp-ninja/        # LLM Document Assistant
├── redux exersice-2/
│   ├── exercisexp/              # Todo List
│   ├── exersicexp-gold/         # Inventory (Entity Adapter)
│   ├── exersicexp-ninja/        # Advanced Inventory (Themes)
│   ├── planner/                 # Daily Planner
│   └── generic-data-fetcher/    # TypeScript Data Fetcher
└── react-typesc/
    ├── exersicexp/              # Basic React TS
    ├── exersicexp-gold/         # Gold React TS
    └── exersicexp-ninja/        # Ninja React TS
```

---

## ✨ Key Features

### **Code Quality**
- ✅ TypeScript for type safety
- ✅ ESLint for code consistency
- ✅ Modern React patterns (hooks, context)
- ✅ Clean, maintainable architecture

### **State Management**
- ✅ Redux Toolkit best practices
- ✅ Normalized state with Entity Adapter
- ✅ Efficient selectors and memoization
- ✅ Multi-slice architectures

### **UI/UX**
- ✅ Responsive design (mobile-first)
- ✅ Multiple theme support
- ✅ Smooth animations and transitions
- ✅ Accessible components (ARIA labels)

### **Performance**
- ✅ Code splitting with Vite
- ✅ Optimized re-renders
- ✅ Lazy loading
- ✅ Fast HMR

---

## 📸 Screenshots

### Redux Ninja - Advanced Inventory
*Theme switching with glassmorphism design*

### Daily Planner
*Date-based task management with modern UI*

### TypeScript Projects
*Type-safe React components with full IntelliSense*

---

## 💡 What I Learned

Through these exercises, I've developed expertise in:

### **Prompt Engineering**
- Crafting precise, constraint-based prompts
- Implementing few-shot and chain-of-thought patterns
- Mitigating AI hallucinations
- Building conversational agents with memory

### **Redux Toolkit**
- Slice-based architecture
- Entity normalization patterns
- Async thunks and middleware
- Selector optimization

### **React + TypeScript**
- Advanced typing patterns (generics, discriminated unions)
- Context API with useReducer
- Ref handling and imperative APIs
- Form validation and state management

### **Modern Web Development**
- Component composition
- Performance optimization
- Responsive design systems
- Accessibility best practices

---

## 📧 Contact

**Mebratu** - [@mebratu21-arch](https://github.com/mebratu21-arch)

📧 Email: [mebratu21@example.com](mailto:mebratu21@example.com)  
💼 LinkedIn: [Connect with me](https://linkedin.com/in/mebratu)  
🌐 Portfolio: [View my work](https://mebratu21-arch.github.io)

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Built with ❤️ using React, TypeScript, and Redux Toolkit**

</div>
