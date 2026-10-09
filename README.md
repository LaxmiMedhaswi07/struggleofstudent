<p align="center">
  <img src="public/official-ss-logo.jpg" alt="Struggle of Student Logo" height="120" />
</p>

<h1 align="center">Struggle of Student (SS)</h1>

<p align="center">
  <strong>A platform built by students, for students.</strong><br/>
  Your Struggles. Your Opportunities. Your Community.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

---

## 📖 About

**Struggle of Student (SS)** is India's grassroots student community and career launchpad — solving academic roadblocks, powering live concerts, delivering bespoke software, and unlocking career placements. This repository contains the full-stack web platform for the SS community.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎓 **Join Community** | Students register with name, email, college, skills & interests. Instant digital membership pass. |
| 💼 **Opportunities Hub** | 10 categories — Internships, Jobs, Campus Ambassador, Volunteering, Events, Talent Showcase, Leadership, Workshops, Projects, Collaborations |
| 📅 **Events System** | Admin-created events with date, location, registration & ticket generation |
| 🙋 **Volunteer System** | Per-event capacity tracking ("8 / 15 slots filled"), auto-disable when full |
| 🎥 **Online Meetings** | Session management with participant capacity, Zoom-link fallback, ready for Zoom API |
| 🎸 **Services** | SS Band, Event Management, IT Solutions, Student Guidance, Career Launchpad & more |
| 🏆 **Student Placements** | Company, roles, student names, and success stories |
| 👥 **Team** | Active member profiles with photo, designation, and bio |
| 🌟 **Leadership** | Founder & Director profiles with responsibilities |
| 🔐 **Admin Dashboard** | Secure token-based login, full CRUD for all entities |

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: JSON file-based DB (`data/db.json`) — auto-seeded on first run
- **Auth**: Custom token-based admin authentication
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/struggle-of-student.git
cd struggle-of-student

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and fill in your values

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory. **Never commit this file.**

```env
# Admin Credentials
ADMIN_EMAIL=admin@struggleofstudent.org
ADMIN_PASSWORD=your_secure_password_here
ADMIN_TOKEN_SECRET=your_random_secret_here

# Optional: Zoom API (for future integration)
# ZOOM_API_KEY=
# ZOOM_API_SECRET=
# ZOOM_ACCOUNT_ID=
```

> An `.env.example` template is included in the repo for reference.

---

## 📁 Project Structure

```
struggle-of-student/
├── public/
│   └── official-ss-logo.jpg     # Official SS brand logo
├── src/
│   ├── app/
│   │   ├── api/                 # All API route handlers
│   │   │   ├── community/
│   │   │   ├── opportunities/
│   │   │   ├── events/
│   │   │   ├── volunteer/
│   │   │   ├── meetings/
│   │   │   ├── services/
│   │   │   ├── team/
│   │   │   ├── leadership/
│   │   │   ├── placements/
│   │   │   ├── stats/
│   │   │   ├── contact/
│   │   │   └── auth/
│   │   ├── admin/               # Admin dashboard page
│   │   ├── layout.tsx
│   │   └── page.tsx             # Main homepage
│   ├── components/
│   │   ├── modals/              # All modal dialogs
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Footer.tsx
│   │   └── ...                  # All section components
│   └── lib/
│       ├── db.ts                # JSON database helpers
│       ├── seed.ts              # Initial seed data
│       ├── auth.ts              # Auth utilities
│       └── types.ts             # TypeScript interfaces
├── data/
│   └── db.json                  # Auto-generated, gitignored
├── .env.local                   # Secrets, gitignored
├── .env.example                 # Template for env vars
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🔑 Admin Dashboard

Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)

**Default credentials (change before deploying):**
| Field | Value |
|---|---|
| Email | `admin@struggleofstudent.org` |
| Password | `admin123456` |

The admin dashboard lets you manage:
- Community members & registrations
- Opportunities (post, edit, open/close)
- Events & registrations
- Volunteer applications & slot capacity
- Online meetings
- Services & enquiries
- Team members & leadership profiles
- Student placement records
- Homepage statistics

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Crafted with ❤️ by the <strong>SS Student Collective</strong><br/>
  <em>YOUR TALENT • YOUR SKILLS • YOUR OPPORTUNITY</em>
</p>
