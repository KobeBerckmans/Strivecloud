# Gamified User Profile Dashboard

A modern, interactive Vue.js application that displays a gamified user profile dashboard with level progression, achievements, and XP tracking. Built with Vue 3, Pinia, and Bootstrap 5.

**This project was created as a test assignment for the Frontend Developer position at Strivecloud.**

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat&logo=vue.js)
![Pinia](https://img.shields.io/badge/Pinia-2.x-FFD700?style=flat&logo=pinia)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?style=flat&logo=bootstrap)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat&logo=vite)

## Features

### Core Components
- **ProfileCard**: User avatar, name, and current level display
- **LevelProgress**: Visual XP progression with circular and linear progress bars
- **AchievementList**: Grid of unlocked achievements with icons and descriptions
- **Dashboard**: Main orchestrating component with data management

### Key Features
- **Gamified Experience**: Level-based progression system with XP tracking
- **Interactive UI**: Hover effects, animations, and responsive design
- **State Management**: Centralized state with Pinia store
- **Mock API**: Simulated API calls with loading and error states
- **Level Up System**: Bonus feature to add XP and trigger level progression
- **Modern Design**: Glassmorphism effects, gradients, and smooth animations

### Dashboard Sections
1. **Header**: Animated title, floating icons, and quick stats
2. **Welcome Section**: Personalized greeting with sparkle animations
3. **Profile & Progress**: User info and XP visualization
4. **Quick Stats**: Modern cards showing key metrics
5. **Achievements**: Grid of unlocked badges and accomplishments
6. **Quick Actions**: XP addition buttons for testing

## Technology Stack

- **Frontend**: Vue 3 with Composition API
- **State Management**: Pinia
- **Styling**: Bootstrap 5 + Custom CSS
- **Build Tool**: Vite
- **Icons**: Bootstrap Icons
- **Development**: Hot Module Replacement (HMR)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/KobeBerckmans/Strivecloud.git
   cd Strivecloud
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## Project Structure

```
Strivecloud/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.vue          # Main dashboard component
│   │   │   ├── ProfileCard.vue        # User profile display
│   │   │   ├── LevelProgress.vue      # XP progress visualization
│   │   │   └── AchievementList.vue    # Achievements grid
│   │   ├── stores/
│   │   │   └── userStore.js           # Pinia store for state management
│   │   ├── data/
│   │   │   └── mockData.js            # Mock API data
│   │   ├── assets/                    # Static assets
│   │   ├── App.vue                    # Root component
│   │   ├── main.js                    # Application entry point
│   │   └── style.css                  # Global styles
│   ├── public/                        # Public assets
│   ├── package.json                   # Dependencies and scripts
│   └── vite.config.js                 # Vite configuration
└── README.md                          # Project documentation
```

## Component Architecture

### Dashboard.vue
- **Purpose**: Main orchestrating component
- **Features**: Data fetching, layout management, quick actions
- **State**: Uses Pinia store for centralized state management

### ProfileCard.vue
- **Purpose**: Display user profile information
- **Features**: Avatar, name, level badge, XP display
- **Props**: None (uses store data)

### LevelProgress.vue
- **Purpose**: Visualize XP progression
- **Features**: Circular progress ring, linear progress bar, XP stats
- **Bonus**: Add XP button for testing level progression

### AchievementList.vue
- **Purpose**: Display user achievements
- **Features**: Responsive grid, achievement cards, statistics
- **Data**: Fetches from mock API

## Mock API

The application uses a mock API structure with the following endpoints:

### GET /user/profile
```javascript
{
  "name": "Alex Smith",
  "avatar_url": "https://...",
  "level": 12,
  "current_xp": 1450,
  "xp_to_next_level": 2000
}
```

### GET /user/achievements
```javascript
[
  {
    "id": 1,
    "title": "First Step",
    "description": "Completed your first task.",
    "icon_url": "https://..."
  }
]
```

## Usage

### Basic Usage
1. **View Dashboard**: Open the application to see the gamified dashboard
2. **Check Progress**: Monitor your level and XP progress
3. **Browse Achievements**: View unlocked achievements and badges
4. **Test Level Up**: Use quick action buttons to add XP and test progression

### Level Up System
- Click "+50 XP", "+100 XP", or "+200 XP" buttons
- Watch the progress bars update in real-time
- Experience automatic level-up when XP threshold is reached
- New achievements are automatically added on level up

## Build & Deployment

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```


## Features Showcase

### Visual Elements
- **Glassmorphism**: Modern glass-like effects with backdrop blur
- **Gradients**: Beautiful color transitions throughout the UI
- **Animations**: Smooth hover effects, floating icons, and transitions
- **Responsive Design**: Mobile-first approach with Bootstrap grid

### Interactive Features
- **Real-time Updates**: XP changes reflect immediately
- **Hover Effects**: Cards lift and glow on interaction
- **Loading States**: Spinners and skeleton screens
- **Error Handling**: Graceful error messages and retry options

### Gamification
- **Level System**: Progressive leveling with increasing XP requirements
- **Achievement Unlocking**: Automatic achievement creation on level up
- **Progress Visualization**: Multiple progress indicators (circular, linear, bars)
- **Statistics Tracking**: Comprehensive stats display

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Kobe Berckmans**
- GitHub: [@KobeBerckmans](https://github.com/KobeBerckmans)

## Acknowledgments

- Vue.js team for the amazing framework
- Pinia for excellent state management
- Bootstrap for the UI components
- Vite for the fast build tool
- All contributors and testers

---

**Built with Vue.js, Pinia, and Bootstrap 5**