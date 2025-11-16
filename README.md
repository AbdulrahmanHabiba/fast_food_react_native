# 🍔 Food Ordering App

<div align="center">

**Built with Expo · React Native · Appwrite · Zustand · TypeScript**

A fully featured mobile food ordering application with authentication, product browsing, customizations, cart management, and clean UI.

</div>

## ✨ Features

### 🍽️ Menu & Browsing
- Browse categories and menu items
- View details with images, price, and description
- Menu customizations (size, addons, extras)
- Dynamic related customizations

### 🛒 Cart System
- Add items with unique customization sets
- Increase/decrease quantity
- Items with different customizations count separately
- Cart state persists during session

### 🔍 Search
- Full-text search on menu items
- Fast and responsive UI

### 🔐 Authentication
- Email + Password authentication
- Persistent login session
- Auto-redirect based on auth state
- Google OAuth ready

### 👤 Profile
- Display user information
- Order history
- Upload profile images

### 🎨 UI/UX
- NativeWind (TailwindCSS)
- Modern, clean design
- Reusable components
- Smooth transitions

## 🧱 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Mobile Framework** | Expo (React Native) |
| **Routing** | expo-router |
| **Styling** | NativeWind (TailwindCSS) |
| **State Management** | Zustand |
| **Backend** | Appwrite (Auth, DB, Storage) |
| **Language** | TypeScript |

## 📂 Project Structure

```
app/
├── (auth)/
│   ├── sign-in.tsx
│   └── sign-up.tsx
├── (tabs)/
│   ├── index.tsx      # Home
│   ├── search.tsx
│   ├── cart.tsx
│   └── profile.tsx
└── _layout.tsx

components/
store/
lib/
```

## 🗃️ Appwrite Setup

### Environment Variables

```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=YOUR_PROJECT_ID
```

### Required Collections

| Collection Name | Purpose |
|----------------|---------|
| `user` | User document linked by accountId |
| `categories` | Food categories |
| `menu` | Menu items |
| `customization` | Addons, sizes, extras |
| `menu_customization` | Linking table |

## 🚀 Running the App

**Install dependencies:**
```bash
pnpm install
```

**Start in development:**
```bash
pnpm expo start
```

**Start offline:**
```bash
pnpm expo start --offline
```

## 📦 Building APK

**Install EAS CLI:**
```bash
pnpm add -D eas-cli
```

**Login:**
```bash
eas login
```

**Configure project:**
```bash
eas build:configure
```

**Build APK (Android):**
```bash
eas build -p android --profile preview
```

## 🧑‍💻 Author

**Abdulrahman Habiba**  
Front-End / Mobile Developer  
React · React Native · Expo · TypeScript