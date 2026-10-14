# Book Your Appointment

Book Your Appointment is a healthcare clinic web application built with React. Visitors can explore the clinic and its services, while patients can register, book in-person or video appointments, and manage their appointments. Doctors have a separate dashboard for reviewing and managing appointment records.

## Features

- Clinic homepage with service highlights and an automatically rotating information section
- About, Services, Blog, and Learn More pages
- Patient registration and login
- Patient dashboard with appointment booking, reserved appointments, document upload, and logout sections
- Multi-step appointment booking with visit type, date and time selection, patient details, document upload for video visits, and payment confirmation
- Doctor login and dashboard with upcoming appointments, archive, and management sections
- Video-call pages for appointment meetings
- Appointment data stored through a local JSON Server API, with browser storage used as a fallback

## Tech Stack

- React 19
- Vite
- React Router
- Redux Toolkit and React Redux
- JSON Server
- CSS Modules
- Motion, Lottie, and React Simple Typewriter
- React Calendar and Font Awesome

## Getting Started

### Prerequisites

- Node.js and npm

### Install dependencies

```bash
npm install
```

### Start the application

Run the JSON Server and the Vite development server in separate terminals from the project directory.

Terminal 1:

```bash
npm run server
```

This starts the JSON Server at `http://localhost:3001`, using `db.json` for appointment data. Vite proxies the app's `/api` requests to this server.

Terminal 2:

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

### Other commands

```bash
npm run lint       # Run ESLint
npm run build      # Create a production build in dist/
npm run preview    # Preview the production build locally
```

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Homepage |
| `/about-us` | About the clinic |
| `/services` | Clinic services |
| `/blog` | Blog |
| `/LearnMore` | Additional clinic information |
| `/appointments` | Appointment booking |
| `/register` | Patient registration |
| `/login` | Patient login |
| `/patient/dashboard` | Patient dashboard |
| `/doctor/login` | Doctor login |
| `/doctor/dashboard` | Doctor dashboard |
| `/video-call/:roomName` | Video-call room |

## Project Structure

```text
src/
  components/appointments/  Appointment booking and document components
  contexts/                 Authentication context, login, and registration
  feature/patients/         Redux slices for appointment and patient form state
  layouts/                  Shared navigation, page layouts, and footer
  pages/                    Homepage, clinic pages, and patient/doctor dashboards
  utils/                    Authentication, appointment storage, and booking helpers
db.json                     Local JSON Server data
```

## Data Storage

User and session information is stored in the browser's `localStorage`. Appointment requests use the JSON Server endpoint proxied by Vite; browser storage provides a fallback if the API is unavailable. The included data is intended for local development and demonstration.
