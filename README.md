# CareConnect - Caregiving Services Platform

CareConnect is a comprehensive web platform designed to connect users with professional caregivers for various needs, including baby care, elderly care, and support for sick individuals. The application facilitates seamless service booking, secure account management, and an administrative dashboard for business oversight.

## 🚀 Features

### for Users
- **Browse Services**: View detailed service descriptions for Baby Care, Elderly Care, and Sick Person Care.
- **Book a Service**: Easy-to-use booking form with:
  - Date & Time selection.
  - Duration picker (2hrs to 24hrs).
  - **Detailed Location**: Structured address input (Division, District, City, Area, Details) for precise service delivery.
  - Payment simulation.
- **My Bookings**: Track booking status (Pending, Confirmed, Completed) and view history.
- **Authentication**: Secure Login and Registration system.

### for Admins
- **Dashboard**: Overview of business metrics.
- **Manage Bookings**: Accept or Reject booking requests.
- **Payment History**: View a log of all successful transactions and total revenue.
- **Manage Users**: View and manage registered users.
- **Manage Services**: Add, edit, or remove service offerings.

## 💻 Technology Stack

This project is built using modern web development technologies to ensure performance, scalability, and developer experience.

### Frontend
- **Framework**: [Next.js 16+](https://nextjs.org/) [React.js] (https://reactjs.org/)(App Router)
- **Language**: JavaScript (ES6+) 
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) (Toast notifications)

### Backend
- **Server**: Next.js API Routes (Serverless functions)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ODM**: [Mongoose](https://mongoosejs.com/) or Native MongoDB Driver (Hybrid approach)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Credentials Provider)

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18 or higher)
- npm, pnpm, or yarn
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Injamhossan/care-connect.git
   cd care-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` or `.env.local` file in the root directory and add the following variables:
   ```env
   # Database
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/care_connect

   # Authentication
   NEXTAUTH_SECRET=your_super_secret_key
   NEXTAUTH_URL=http://localhost:3000

   # API
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open Browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📂 Project Structure

```
src/
├── app/                  # Next.js App Router pages & API routes
│   ├── admin/            # Admin dashboard routes
│   ├── api/              # Backend API endpoints (auth, bookings, services)
│   ├── dashboard/        # User dashboard routes
│   ├── login/            # Authentication pages
│   └── ...
├── components/           # Reusable React components
│   ├── admin/            # Admin-specific components (Sidebar, etc.)
│   ├── common/           # Shared components (Loader, Navbar, Footer)
│   └── home/             # Landing page sections
├── lib/                  # Utility functions & configurations (db, auth)
├── models/               # Mongoose/DB models (User, Booking, Service)
└── style/                # Global styles (Tailwind directives)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
