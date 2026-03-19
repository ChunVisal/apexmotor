# ApexMotor 🚗

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=firebase)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

## Modern Car Marketplace for Tech-Savvy Buyers

A full-stack car e-commerce platform built for the Cambodian market, allowing users to effortlessly browse, list, and manage their vehicle sales.

---

### 🌐 Live Demo & Deployment

- **Live Site GitHub:** [https://joenarthan.github.io/apexmotor/](https://joenarthan.github.io/apexmotor/)  
- **Live Site Netlify:** [https://apexmotor.netlify.app](https://apexmotor.netlify.app)  
- **Custom Domain:** [https://www.apexmotor.shop](https://www.apexmotor.shop)  

_Hosted on Netlify with continuous deployment from GitHub._

---

### ✨ Key Features

- **Authentication:** Secure user sign-up, login, and session management.  
- **Peer-to-Peer Marketplace:** Users can effortlessly list their own cars for sale, browse listings from other users, and manage their inventory from a personal dashboard.
- **Dynamic Search & Filtering:** Advanced filters (price, year, location, etc.) for easy browsing.  
- **Real-time Interactions:** Instant notifications when cars are wishlisted.  
- **User Dashboard:** Manage personal car listings (add, edit, delete).  
- **Image Management:** Upload & optimize images with Cloudinary.  
- **Responsive & SEO-Ready:** Works on all devices with meta tags + structured data for discoverability.  

---

### 📸 Screenshots

![Homepage](<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ab508964-a66f-484a-889b-68ab889ba326" />
)  
![Car Detail](<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/e0014701-5fea-4ea8-ae32-84607b5e2ae1" />
)  
![User Dashboard](<img width="1888" height="898" alt="image" src="https://github.com/user-attachments/assets/d9bc32a2-fa18-483a-afbc-6bef7eea877e" />
)  

---

### 🛠️ Tech Stack

**Frontend:**  

- React (Vite)  
- TailwindCSS  

**Backend:**  

- Firebase (Firestore, Authentication)  
- Node.js / Express (if API endpoints required)  

**State Management:**  

- React Hooks & Context API  

**Other Tools:**  

- React Router  
- React Icons / Heroicons  
- Cloudinary (media storage & optimization)  

---

### 📂 Project Structure

```bash
Apexmotor/
├── public/                # Static assets
├── src/
│   ├── components/        # UI components (CarCard, Navbar)
│   ├── context/           # Global state (Auth, Wishlist)
│   ├── pages/             # Pages (Home, CarDetails, Sellcar)
│   ├── assets/            # Images, fonts, static files
│   ├── firebase/          # Firebase configuration
│   └── App.jsx            # Main app component
└── README.md
