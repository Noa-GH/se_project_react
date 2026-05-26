# 👗 WTWR — What to Wear?

A React-based web application that recommends clothing based on real-time local weather data. Built as part of a full-stack software engineering curriculum, this project demonstrates React component architecture, API integration, stateful UI flows, and responsive design.

🔗 **[Live Demo](https://Noa-GH.github.io/se_project_react/)**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Backend](#backend)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Known Issues & Upcoming Fixes](#known-issues--upcoming-fixes)
- [Roadmap](#roadmap)

---

## Overview

WTWR fetches current weather data from the OpenWeatherMap API and filters a wardrobe of clothing items by weather type — **hot**, **warm**, or **cold** — to recommend what to wear today.

The app includes signed-in user flows, a protected profile page, modal forms for adding items, like/unlike interactions, and an F/C temperature toggle.

---

## Backend

The project includes a local mock item API powered by `json-server` and also supports integration with a full backend repository.

- Local mock item API: `npm run server` serves `db.json` on `http://localhost:3001` (requires `json-server` to be installed globally or otherwise available in your environment)
- Full backend repo: https://github.com/Noa-GH/se_project_express

The frontend is wired for JWT auth and profile endpoints, so the complete auth and ownership experience is available when paired with a compatible backend service.

---

## Features

- 🌤️ **Live weather fetching** via OpenWeatherMap API
- 👔 **Weather-based clothing recommendations** filtered by hot / warm / cold
- 🌡️ **Celsius / Fahrenheit toggle** for temperature display
- 🪟 **Modal-driven item preview and add flow**
- 🔐 **User registration / login** with protected profile route
- 🧑‍💼 **Profile editing** for name and avatar updates
- ❤️ **Like / unlike clothing items** for authenticated users
- 🗑️ **Delete confirmation modal** for owned items
- 🧪 **Form validation** with inline field state and disabled submit controls
- 🚧 **Local JSON server backend** for clothing item CRUD during development
- ⌨️ **Escape key and overlay click to close modals**

---

## Tech Stack

| Layer        | Technology                                           |
| ------------ | ---------------------------------------------------- |
| UI Framework | React 18                                             |
| Build Tool   | Vite 5                                               |
| Styling      | Plain CSS                                            |
| HTTP         | Fetch API (native browser)                           |
| Weather Data | [OpenWeatherMap API](https://openweathermap.org/api) |
| Mock Backend | json-server                                          |
| Linting      | ESLint with React + React Hooks plugins              |
| Font         | Cabinet Grotesk (self-hosted WOFF)                   |
| Deployment   | GitHub Pages                                         |

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
```

### Run locally

```bash
# If json-server is not installed globally, install it first
npm install -g json-server

# Start the local item API server
npm run server

# In another terminal, start the frontend
npm run dev
```

The frontend launches on `http://localhost:3000` by default.

### Available Scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start the local dev server                       |
| `npm run build`   | Build for production                             |
| `npm run preview` | Preview the production build                     |
| `npm run lint`    | Run ESLint across the project                    |
| `npm run server`  | Start json-server for local `/items` API storage |

---

## Project Structure

```
src/
├── assets/              # Icons, fonts, and weather images
├── components/
│   ├── App/             # Root component, routing, app state
│   ├── Header/          # Header with weather, nav, login/profile
│   ├── Main/            # Weather card + filtered clothing list
│   ├── Footer/          # Footer with developer credit and year
│   ├── WeatherCard/     # Displays temperature and weather image
│   ├── ItemCard/        # Individual clothing card UI
│   ├── ItemModal/       # Selected item preview and delete action
│   ├── AddItemModal/    # Add-garment modal wrapper
│   ├── RegisterModal/   # Sign up modal
│   ├── LoginModal/      # Log in modal
│   ├── EditProfileModal/# Profile edit modal
│   ├── DeleteConfirmationModal/ # Confirm deletion modal
│   ├── SideBar/         # Profile sidebar actions
│   ├── ClothesSection/  # Authenticated user's item list
│   ├── ProtectedRoute/  # Route guard for authenticated pages
│   ├── ToggleSwitch/    # Temperature unit switch
│   └── ModalWithForm/   # Shared modal form with validation
└── utils/
    ├── api.js           # Weather and item CRUD API helpers
    ├── auth.js          # Register, login, token validation
    ├── constants.js     # Default coordinates and API key
    └── validation/      # Form validation schema and utilities
```

---

## Known Issues & Upcoming Fixes

### 🌥️ Weather Card Image Scaling

The weather card image may require additional responsive tuning in some viewport sizes.

### 🔒 Backend auth integration

The frontend is prepared for JWT auth and profile routes, but pairing with a compatible backend server is required for full registration, login, and token validation.

---

## Roadmap

- [x] Fix weather card image responsiveness
- [x] Implement form input validation (name + URL fields)
- [x] Enable/disable submit button based on form validity
- [x] Add ability to delete clothing items
- [x] Add Celsius/Fahrenheit temperature toggle
- [ ] Connect to a backend server for persistent auth and item storage
- [ ] Improve mobile-responsive layout further

---

## Author

**Noah Ford**
Built as part of the TripleTen Software Engineering program.
