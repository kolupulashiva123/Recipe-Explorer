# Recipe Explorer – Angular Frontend

Modern Single Page Application (SPA) built with Angular 18, TypeScript, HTML5, and CSS3.

## Key Features

- 🎨 **Warm Culinary Palette**: Warm orange (`#E8590C`), rich cream (`#FCFBF7`), forest green (`#1E4D2B`), and crisp typography (Plus Jakarta Sans & Playfair Display).
- 📱 **Mobile-First Responsive Design**: Works seamlessly across desktops, laptops, tablets, iPhones, and Android devices with an adaptive drawer navigation.
- 🔍 **Full-Text Search & Multi-Filter Engine**: Filter dishes by cuisine, meal type, dietary lifestyle, cooking time, and difficulty level with real-time URL synchronization.
- ⚖️ **Dynamic Serving Size Scaler**: Automatically updates all recipe ingredient quantities, units, and grams proportionally when servings are increased or decreased.
- 📋 **Interactive Step-by-Step Cooking Checklist**: Clickable steps with visual progress bar showing cooking completion percentage.
- 💾 **Persistent Client-Side Favorites**: Saves recipes directly in browser `localStorage`, retaining favorites across page reloads without requiring an account or login.
- 🖨️ **Print Mode Optimization**: Clean `@media print` CSS stylesheet formatting recipes for physical kitchen counter reading.

## Tech Stack

- **Framework**: Angular 18 (Standalone Components)
- **Language**: TypeScript 5.5
- **Routing**: Angular Router with component input binding and in-memory scroll restoration
- **HTTP**: Angular HttpClient communicating with Node/Express REST backend
- **State Management**: Reactive RxJS `BehaviorSubject` and browser `localStorage`

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm start
# or: ng serve
```
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### 3. Production Build
```bash
npm run build
```
The build artifacts will be stored in the `dist/frontend` directory.
