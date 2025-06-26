# 🥫 Pantry Tracker & 🧑‍🍳 Recipe Recommender

A full-stack project to help reduce food waste by tracking pantry inventory and recommending recipes based on available ingredients.

## 📦 Project Structure
```
pantry-project/
├── pantry-tracker/ # React frontend to manage pantry items
├── recipe-scraper/ # Python scraper to collect and store recipes
└── README.md
```

---

## 🧭 Features Overview

### ✅ Pantry Tracker (Frontend)
- Add, edit, delete pantry items with expiration tracking.
- Visual freshness indicators (fresh, expiring, expired).
- Group items by category (e.g., Dairy, Vegetables).
- View/edit item details in modals.
- Drag and drop items between groups.

### 🍽️ Recipe Recommender (WIP)
- Recommends recipes based on pantry contents.
- Prioritizes:
  - Exact or partial ingredient matches
  - High community ratings (with some variety)
- Plans to support:
  - User ratings and uploads
  - Personalized recommendations

### 🕸️ Recipe Scraper (WIP)
- Scrapes selected recipe websites to build a local recipe database.
- Features:
  - Respects `robots.txt`
  - Random sleeps to avoid bans
  - Resume-safe scraping (start from where it left off)
  - Estimated time to completion
  - Multi-site support
  - Optional Tor/Proxy support for rotating IPs

---

## 🛠️ Tech Stack

| Layer         | Tech                            |
|--------------|----------------------------------|
| Frontend     | React, Vite, CSS Modules         |
| State Mgmt   | React Context API                |
| Backend API  | (Planned) Flask or FastAPI       |
| Scraping     | Python, BeautifulSoup, Requests  |
| Database     | PostgreSQL or SQLite (planned)   |

---

## 🧪 How to Run

### Frontend (Pantry Tracker)
```bash
cd pantry-tracker
npm install
npm run dev
```

### Scraper (Recipe Collector)
```bash
cd recipe-scraper
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python recipe_scraper.py
```

---

## Future Roadmap

- [ ] Full API layer between scraper and frontend
- [ ] Scheduled background scraping
- [ ] User accounts & saved recipes
- [ ] Mobile-first redesign
- [ ] In-app recipe rating and upload
- [ ] Nutritional data integration

---

## 🤝 Contributing
Want to help build this idea into a full product? Pull requests and feedback welcome!
