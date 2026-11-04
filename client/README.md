# KHB Chatbot — Client (React + Vite)

Port of `admin/views/*.html` MPA to React Router SPA. Same CSS (`src/assets/css/`),
same mock data (`src/data/khb.js`), DOM logic rewritten as React state per page.

## Run

```bash
cd client
npm install
npm run dev   # http://localhost:5173
```

## Structure

```
src/
  assets/css/   # ported verbatim from admin/views/assets/css
  components/   # AppLayout, Sidebar, Topbar, Toast
  context/      # AppContext (user + notifications store)
  data/         # mock data (documents, history, notifications, currentUser)
  lib/          # legacy-*.js reference dumps + small utils
  pages/        # one JSX file per former HTML view
  services/     # api.js mock (swap fetch when backend lands)
  store/        # tiny UI store (sidebar open, toasts)
  App.jsx       # routes
  main.jsx      # entry
  index.css     # font + root only
```

Public routes: `/` `/login` `/register` `/forgot` `/reset` `/widget` `/syarat` `/privasi`.
App routes (Sidebar/Topbar shell): `/dashboard` `/chat` `/knowledge` `/history`
`/notifications` `/settings` `/edit-profile` `/integrasi`.

No Tailwind — custom CSS ported as-is (ponytail: migrate to Tailwind when redesign lands).
