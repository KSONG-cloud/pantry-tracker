# 🥫 Pantry Tracker

A smart web application to track your pantry items, get expiration alerts, and discover recipes based on what you have at home.

## Features

### Current Features ✅


### Planned Features 🚧
- **Inventory Management**: Add, view, and remove pantry items
- **Expiration Alerts**: Visual warnings for items expiring within 3 days
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean UI**: Modern, intuitive interface with gradient design
- **Recipe Recommendations**: Get recipe suggestions based on available ingredients
- **Recipe Ratings**: Rate recipes and see ratings from other cooking websites
- **Deal Finder**: Get alerts on sales for items you need
- **Shopping Lists**: Create and manage shopping lists
- **Custom Icons**: Add personalized icons for your items
- **Low Inventory Alerts**: Get notified when items are running low
- **Barcode Scanning**: Quick item entry via barcode scanning

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: CSS3 with Grid and Flexbox
- **State Management**: React useState
- **Build Tool**: Vite
- **Version Control**: Git & GitHub

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KSONG-cloud/pantry-tracker.git
   cd pantry-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Usage

1. **Adding Items**: Use the form at the bottom to add new pantry items
2. **Viewing Items**: All items are displayed in cards showing name, quantity, and expiration date
3. **Expiration Alerts**: Items expiring within 3 days are highlighted in red
4. **Removing Items**: Click the "Remove" button on any item card

## Project Structure

```
pantry-tracker/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/     # Reusable UI components (future)
│   ├── pages/         # Different app screens (future)
│   ├── services/      # API calls (future)
│   ├── utils/         # Helper functions (future)
│   ├── App.js         # Main application component
│   ├── App.css        # Main stylesheet
│   └── index.js       # Entry point
├── package.json
└── README.md
```

## Development Roadmap

### Phase 1: Core Functionality (Current)
- [ ] Basic inventory tracking
- [ ] Expiration date alerts
- [ ] Responsive UI design
- [ ] Local storage persistence
- [ ] Search and filter functionality

### Phase 2: Smart Features
- [ ] Recipe API integration
- [ ] Recipe recommendations based on inventory
- [ ] User authentication
- [ ] Recipe rating system

### Phase 3: Advanced Features
- [ ] Deal finder integration
- [ ] Shopping list generation
- [ ] Barcode scanning
- [ ] Custom item icons
- [ ] Nutrition information

### Phase 4: Mobile App
- [ ] React Native version
- [ ] Push notifications
- [ ] Offline functionality

## Contributing

This is a learning project, but suggestions and feedback are welcome! Please feel free to:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/KSONG-cloud/pantry-tracker](https://github.com/KSONG-cloud/pantry-tracker)

## Acknowledgments

- Create React App for the initial setup
- React community for excellent documentation
- All the cooking websites that inspire better meal planning!