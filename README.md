# Architecture Daily Schedule & Companion (PWA)

A minimalist, high-contrast progressive web app built for a 2nd Year Architecture student at Hope Enterprise University College. Powered by the **xAI design system**, **Phosphor Icons**, and **GitHub-backed remote content sync**.

---

## ✨ Features

- **Daily Schedule & Timeline**: Complete 2nd Year Architecture Semester I courses (Mon – Fri) with times, rooms, and instructors.
- **Top Quote for the Day**: Daily encouraging and loving quotes. Tap to open full quote modal with `I ❤️ U` signature.
- **Hero Day Display**: Large English day numbers rendered in `SurGraphics Extra Bold` with left-aligned full date.
- **5-Day School Week Strip**: Quick-jump cards (MON to FRI) with day numbers on top and day abbreviations on bottom.
- **Course Notes & Studio Gear Checklist**: Tap any class card to:
  - View course-specific assignments and due dates.
  - Check off recommended studio drafting tools and materials (pack your bag).
  - Write personal class and crit notes (auto-saved to `localStorage`).
- **Assignments & Tasks Hub (`TASKS`)**:
  - Full overview of all assignments and upcoming submission dates.
  - Personal to-do list with custom task creation and check-off state.
- **Fun Free Day View**: Wednesday mid-week breathing room card with sweet romantic reminder notes.
- **PWA & Offline Ready**: Fast load time, works 100% offline via Service Worker, installable directly to iOS / Android home screens.

---

## 🚀 How to Host on GitHub Pages (Free)

1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com/new) and create a new repository (e.g. `arch-schedule`).
2. **Push this code**:
   ```bash
   git remote add origin https://github.com/<your-username>/arch-schedule.git
   git branch -M main
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - In your repo settings: **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: `main` / `root` → Click **Save**.
   - Your website will be live at `https://<your-username>.github.io/arch-schedule/`!

---

## 💌 How to Send Her Updates Remotely

You can edit [`content.json`](./content.json) directly on GitHub (from your phone or laptop):
- **Add new quotes** to `"quotes"`.
- **Add new assignments / project crits** to `"assignments"` with due dates and descriptions.
- **Update studio gear** for specific classes in `"studio_gear"`.

Whenever she opens the app, it checks for updates and seamlessly syncs your new notes and assignments while preserving her personal checkboxes and local notes!
