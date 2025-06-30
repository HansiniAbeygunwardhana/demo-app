# DemoApp - Technical Assessment

This project is a technical assessment for a Frontend Developer role at Avaier Pvt Ltd, implementing a responsive loan application dashboard based on the provided requirements.

---

## Tech Stack

- **Next.js 15** – React Framework for server-rendered and client-side pages
- **Tailwind CSS** – Utility-first CSS for consistent, responsive styling
- **ShadCN UI** – Accessible, customizable UI components built on Radix primitives
- **Lucide Icons** – Clean, consistent icon set
- **Zustand** – Lightweight state management for active borrower and shared context
- **TypeScript** – Type safety across the project
- **Playwright** – Basic end-to-end testing setup

---

## Why NextJS over ReactJS?

In this project, I chose Next.js over plain React.js to take advantage of built-in server-side rendering, automatic routing, and powerful performance optimizations, all of which are essential for building fast, scalable, production-ready applications.

## 📱 Features & Highlights

✔️ Fully **responsive layout**  
✔️ **3-Column Grid** for desktop, collapses to stacked layout for mobile  
✔️ Modular, reusable React components for maintainability  
✔️ Borrower Pipeline with **tab filters** and dynamic active profile selection  
✔️ Borrower Detail pane with status badges, AI Explainability section, Loan Summary, and escalation actions  
✔️ Broker Overview with key stats, contact actions, onboarding workflow, and AI Assistant toggle  
✔️ Accessible, consistent design using Tailwind and ShadCN  
✔️ Uses **Zustand** for global state to fetching data
✔️ Basic E2E test with Playwright to validate core interactions  

---

## 🧩 Component Breakdown

- `Layout` – Page structure with responsive grid  
- `BorrowerPipeline` – Left panel with tabs, borrower list, and radio section  
- `BorrowerDetail` – Middle panel with borrower information, AI Explainability, and Loan Summary  
- `BrokerOverview` – Right panel with broker stats, contact options, workflow steps, and AI toggle

---

## 📡 API Mock

- Mock API responses based on provided structure (`api/` folder)  
- No backend integration; uses local JSON data for demo  

---

## 🧪 Testing

- Playwright setup for basic end-to-end tests:  
  ✅ Borrower selection updates detail pane  
  ✅ Explainability accordion expands/collapses  
  ✅ Button actions trigger console logs (mocked behavior)  

---

## 🔥 Bonus Features

- Status labels and badges styled with Tailwind  
- Interactive, collapsible components using ShadCN Collapsible 
- Mobile accordion behavior for Broker Info and Workflow  
- Clean iconography via Lucide Icons  
- Well-structured codebase with clear separation of concerns  

---

## ✅ Project Setup

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Run Playwright tests
npm run test:e2e # Playwrite tests have been written assuming the project run on "http://localhost:3000"
```
