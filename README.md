# EventHub Nepal 

A simple **Event Management System** built for a 3rd Semester Web Development university project.
Admins can log in and manage events, attendees, and event registrations for events happening
around Kathmandu, Lalitpur, and Bhaktapur.

---

## 1. Project Overview

EventHub lets a logged-in admin:

- View a dashboard with quick stats (total events, attendees, registrations, upcoming events)
- Create, view, edit, delete **Events**
- Create, view, edit, delete **Attendees**
- Register attendees for events (one attendee can join many events, one event can have many attendees)
- Search events by name and attendees by name

The project is intentionally kept **simple and beginner-friendly** — no Redux, no Context API,
just React Hooks (`useState`, `useEffect`) and the Fetch API, matching a typical 3rd semester syllabus.

---

## 2. Technologies Used

**Frontend**
- React (Vite)
- Tailwind CSS
- React Router DOM
- Fetch API

**Backend**
- Node.js
- Express.js
- JWT (`jsonwebtoken`) for login sessions
- `bcrypt` for password hashing

**Database**
- MySQL (`mysql2` package)

**Tools**
- VS Code
- Postman
- Git

---

## 3. Folder Structure

```text
EventHub/
├── client/                # React frontend (Vite)
│   ├── src/
│   │   ├── api/           # fetch() helper
│   │   ├── components/    # Navbar, EventCard, Forms, etc.
│   │   ├── pages/         # Login, Dashboard, Events, Attendees, etc.
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── server/                 # Express backend
│   ├── config/db.js        # MySQL connection
│   ├── controllers/        # business logic
│   ├── middleware/auth.js  # JWT route protection
│   ├── routes/              # API routes
│   ├── seed.js              # creates the hashed admin login
│   ├── server.js            # app entry point
│   └── package.json
│
├── database/
│   └── eventhub.sql        # database schema + sample data
│
├── EventHub.postman_collection.json
└── README.md
```

---

## 4. Installation Steps

You will need **Node.js** and **MySQL** installed on your computer.

### Clone / open the project
Open the `EventHub` folder in VS Code.

---

## 5. Database Import

1. Open MySQL Workbench (or the `mysql` command line).
2. Run the whole `database/eventhub.sql` file. This will:
   - Create the `eventhub` database
   - Create the `users`, `events`, `attendees`, and `registrations` tables
   - Insert 20 sample Kathmandu Valley events
   - Insert 35 sample attendees
   - Insert sample registrations linking attendees to events

   Command line example:
   ```bash
   mysql -u root -p < database/eventhub.sql
   ```

**Note:** The `users` table starts empty. We create the admin login in the next step using
`bcrypt`, so the password is properly hashed (never stored as plain text).

---

## 6. Running the Server (Backend)

```bash
cd server
npm install
```

1. Copy `.env.example` to `.env` and fill in your MySQL username/password:
   ```bash
   cp .env.example .env
   ```
2. Create the default admin account (only needs to be run once):
   ```bash
   node seed.js
   ```
   This prints the admin username and password once created.
3. Start the server:
   ```bash
   npm run dev
   ```
   The API will run at `http://localhost:5000`.

---

## 7. Running the Client (Frontend)

Open a **new terminal**:

```bash
cd client
npm install
npm run dev
```

The app will run at `http://localhost:5173`.

---

## 8. Using Postman

Import `EventHub.postman_collection.json` into Postman.

1. Run the **Login** request first (`admin` / `admin123`).
2. Copy the `token` from the response.
3. Set the collection variable `token` to that value.
4. All other requests (Events, Attendees, Register, Dashboard) will now work, since they
   send `Authorization: Bearer {{token}}` automatically.

---

## 9. Default Admin Login

| Username | Password |
|----------|----------|
| admin    | admin123 |

(created by running `node seed.js` inside `server/`)

---

## 10. Features

- Secure login with hashed passwords (bcrypt) and JWT-protected routes
- Dashboard with live stats and upcoming events
- Full CRUD for Events (Add / View / Edit / Delete)
- Full CRUD for Attendees (Add / View / Edit / Delete)
- Search events by name, search attendees by name
- Many-to-many Event ↔ Attendee registration system
- Frontend + backend validation (required fields, valid email, valid phone, no duplicate emails)
- Responsive design (mobile, tablet, desktop) using Tailwind CSS

---

## 11. Future Improvements

- Add multiple admin roles (Super Admin vs Event Manager)
- Email confirmation when an attendee registers for an event
- Pagination for large event/attendee lists
- Image upload for event banners
- Export attendee lists to CSV/PDF

---

## Author's Note

This project was built for a university web development course assignment.
