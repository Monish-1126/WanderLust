# WanderLust 🏡

A full-stack Airbnb-inspired web application built using the MERN backend stack (MongoDB, Express.js, Node.js) with EJS templating. Users can browse listings, create their own properties, leave reviews, and manage listings securely through authentication and authorization.

## 🌐 Live Demo

**Live Website:** https://wanderlust-2mzy.onrender.com

---

## ✨ Features

- User Authentication (Sign Up, Login, Logout)
- Secure password hashing using Passport.js
- Session management with Express Session & Connect Mongo
- Flash messages for user feedback
- Create, Read, Update and Delete property listings
- Add and delete reviews with ratings
- Authentication and Authorization
- Listing ownership verification
- Review author verification
- Server-side validation using Joi
- MongoDB Atlas integration
- Responsive UI using Bootstrap
- MVC Architecture
- Error handling with custom middleware

---

## 🛠 Tech Stack

### Frontend
- HTML
- CSS
- Bootstrap 5
- EJS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- Passport.js
- Passport Local
- Passport Local Mongoose
- Express Session
- Connect Mongo

### Validation & Utilities
- Joi
- Method Override
- Connect Flash
- Dotenv

---

## 📂 Project Structure

```
controllers/
models/
routes/
views/
public/
middleware.js
app.js
```

---

## 📸 Screenshots

### Home Page

<img width="2880" height="1620" alt="image" src="https://github.com/user-attachments/assets/c9bf19ad-e204-4c97-97fd-7085825a15f5" />

### Listing Details

<img width="2880" height="1620" alt="image" src="https://github.com/user-attachments/assets/86201d26-2bf9-4051-ab31-7c3276c1698d" />


### Create Listing

<img width="2880" height="1620" alt="image" src="https://github.com/user-attachments/assets/dc397706-b53c-4716-815b-1b62f79da6eb" />


### Login

<img width="2880" height="1620" alt="image" src="https://github.com/user-attachments/assets/6c8910eb-12ae-4522-8856-ecf68c64ca68" />


---

## 🚀 Installation

Clone the repository

```bash
git clone https://github.com/Monish-1126/WanderLust/
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
```

Run the application

```bash
node app.js
```

Visit

```
http://localhost:8080/
```

---

## 🔐 Authentication Features

- User Registration
- User Login
- User Logout
- Password Encryption
- Persistent Sessions
- Protected Routes
- Flash Messages

---

## 📋 Authorization

- Only logged-in users can create listings.
- Only listing owners can edit or delete their listings.
- Only logged-in users can post reviews.
- Only review authors can delete their reviews.

---

## 📈 Future Improvements

- Image upload using Cloudinary
- Interactive maps using Mapbox
- Search and filtering
- Wishlist/Favorites
- Booking functionality
- User profile page

---

## 👨‍💻 Author

**Monish Pothani**

GitHub: https://github.com/Monish-1126

---

## 📄 License

This project is built for learning purposes and is not affiliated with Airbnb.
