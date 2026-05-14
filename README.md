# 👗 WTWR — What to Wear?

A React-based web application that recommends clothing based on real-time local weather data. Built as part of a full-stack software engineering curriculum, this project demonstrates React component architecture, API integration, and responsive UI design.

🔗 **[Live Demo](https://Noa-GH.github.io/se_project_react/)**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Known Issues & Upcoming Fixes](#known-issues--upcoming-fixes)
- [Roadmap](#roadmap)

---

## Overview

WTWR fetches live weather data for a given location using the OpenWeatherMap API and filters a wardrobe of clothing items by weather type — **hot**, **warm**, or **cold** — to suggest what you should wear today.

Users can view individual clothing cards in a preview modal, and add new garments through a form modal with radio button selection for weather type.

---

## Backend Repository

**Backend repository:** https://github.com/Noa-GH/se_project_express

The backend is a Node.js/Express REST API connected to a local MongoDB database.
It handles authentication (JWT), clothing item CRUD, and likes.

---

## Features

- 🌤️ **Live weather fetching** via OpenWeatherMap API
- 👔 **Dynamic clothing recommendations** filtered by current temperature
- 🪟 **Modal system** — item preview modal and an add-garment form modal
- ⌨️ **Keyboard support** — press `Escape` to close any open modal
- 🖱️ **Overlay click to close** modals
- 📱 Responsive layout built with CSS Flexbox and Grid

---

## Tech Stack

| Layer          | Technology                                           |
| -------------- | ---------------------------------------------------- |
| UI Framework   | React 18                                             |
| Build Tool     | Vite 5                                               |
| Styling        | Plain CSS (component-scoped)                         |
| HTTP           | Fetch API (native browser)                           |
| Weather Data   | [OpenWeatherMap API](https://openweathermap.org/api) |
| Linting        | ESLint with React + React Hooks plugins              |
| Font           | Cabinet Grotesk (self-hosted WOFF)                   |
| Deployment     | GitHub Pages                                         |
| Assisted Tools | Claude, Gemini, ChatGPT, Co-Pilot, Agentic Managers  |

---

## Getting Started

### Prerequisites

- Node.js `>=18.0.0`
- npm `>=8.0.0`

### Installation

```bash
# Clone the repository
git clone https://github.com/Noa-GH/se_project_react.git

# Navigate into the project directory
cd se_project_react

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will open automatically at `http://localhost:3000`.

### Available Scripts

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Start the local dev server    |
| `npm run build`   | Build for production          |
| `npm run preview` | Preview the production build  |
| `npm run lint`    | Run ESLint across the project |

---

## Project Structure

```
src/
├── assets/              # Icons, fonts, and weather images
├── components/
│   ├── App/             # Root component, state management, API calls
│   ├── Header/          # Site header with date, city, nav, and avatar
│   ├── Main/            # Weather card + clothing recommendations
│   ├── Footer/          # Footer with developer credit and year
│   ├── WeatherCard/     # Displays current temperature and weather image
│   ├── ItemCard/        # Individual clothing card (image + name)
│   ├── ItemModal/       # Preview modal for selected clothing item
│   └── ModalWithForm/   # Add-garment form modal (name, image URL, weather type)
└── utils/
    ├── constants.js     # Default clothing items, coordinates, API key
    └── weatherApi.js    # Fetch wrapper for OpenWeatherMap
```

---

## Known Issues & Upcoming Fixes

### 🌥️ Weather Card Image Scaling

The weather card background image does not scale consistently as the viewport width changes. This is a CSS `object-fit` / responsive sizing issue currently under investigation and will be addressed in an upcoming update.

### 🔒 Form Validation Not Yet Implemented

The add-garment form modal accepts user input but does not yet validate the name field or image URL. Validation logic and error state handling are planned for the next release, scheduled alongside the weather card fix.

### 🔄 API Integration Refinement

Early development involved a hybrid approach to weather fetching — part hardcoded fallback, part async/await — which required significant refactoring. The current implementation uses a clean `fetch` + `.then()` chain with a fallback default state if the API call fails.

---

## Roadmap

- [x] Fix weather card image responsiveness
- [x] Implement form input validation (name + URL fields)
- [x] Enable/disable submit button based on form validity
- [ ] Add ability to delete clothing items
- [ ] Connect to a backend server for persistent item storage
- [ ] Add Celsius/Fahrenheit temperature toggle
- [ ] Mobile-responsive layout improvements

---

## Author

**Noah Ford**
Built as part of the TripleTen Software Engineering program.
