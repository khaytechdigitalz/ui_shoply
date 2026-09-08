# Storly — Grocery & Multi‑Vendor Ecommerce (React + TypeScript)

A complete, installable **Vite + React + TypeScript + Tailwind CSS v4** ecommerce
storefront, converted from the original Storly Tailwind/HTML/Alpine.js template
and extended into a full customer experience: browsing, cart, checkout, and a
real customer account dashboard with orders, reviews, and address management.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

Requires Node.js 18+.

## Stack

- **Vite + React 19 + TypeScript**, with `@/*` path aliases pointing at `src/`.
- **Tailwind CSS v4** (via `@tailwindcss/vite`), with design tokens (colors,
  fonts) defined in `src/index.css` under `@theme`. See "Changing the base
  color" below.
- **react-router-dom** for routing, including a nested, auth-guarded
  `/account/*` dashboard.
- **swiper** for the full-width hero banner, product carousels, and testimonials.
- **sonner** for all toast notifications (cart, wishlist, compare, auth,
  address book, reviews, newsletter, contact form).
- **lucide-react** for iconography.

## Images: `getImageSrc()`

Every image in the app is resolved through a single helper,
`getImageSrc()` in `src/lib/utils.ts`:

```ts
export function getImageSrc(path?: string | null, fallback = "/images/placeholder.png"): string {
  if (!path) return fallback;
  return path.startsWith("http") ? path : `${API_BASE_URL || ""}/${path}`;
}
```

- Data files store **relative paths** (e.g. `images/products/product-1.jpg`),
  not full URLs.
- If `path` starts with `http`, it's returned as-is (so real CDN/API URLs work
  unchanged).
- Otherwise it's prefixed with `API_BASE_URL` (from `VITE_API_BASE_URL` in
  your `.env` — see `.env.example`). Leave it empty to serve images from this
  app's own `public/images/` folder, which is what this template ships with.
- Missing/empty paths fall back to `public/images/placeholder.png`.

To point the whole app at a real backend/CDN, set `VITE_API_BASE_URL` and
update the `image` fields in `src/data/*.ts` to the paths your API returns.

### Generated demo images

Since no real product photography was provided, this build ships with
**71 generated placeholder images** (40 products, 10 categories, 9 vendor
logos, 4 blog covers, 4 avatars, 3 hero banners) under `public/images/`, each
labeled with its product/category name so they're easy to tell apart while
you swap in real photography.

## Auth & customer dashboard

The old side-drawer login/signup UI has been replaced with real, dedicated
pages (no header/footer chrome):

- `/login`, `/register`, `/forgot-password`, `/otp-verification`, `/reset-password`, `/password-reset-success`

Auth state is a **mocked client-side session** (`StoreContext` — no real
backend is wired up). `login(email)` flips `isAuthenticated` to `true`;
logging in from either `/login` or the register → OTP flow lands you in the
dashboard. Logging out shows a confirmation modal (`components/layout/LogoutModal.tsx`)
before clearing the session.

The dashboard lives under `/account` (`src/pages/account/`), guarded by
`DashboardLayout.tsx` (redirects to `/login` if not authenticated):

- `/account` — Overview (stats + recent orders)
- `/account/orders` — Order list with status filters
- `/account/orders/:orderId` — Order detail, status timeline, and a **review
  form per line item** once the order is Delivered
- `/account/orders/:orderId/receipt` — Printable receipt (`window.print()`)
- `/account/profile` — Name/email/phone/avatar + password change form
- `/account/addresses` — Full address book: add, edit, delete, and set one
  address as default (`components/account/AddressFormModal.tsx`)

Orders and addresses are mock data in `src/data/orders.ts` — wire this up to
a real API when you're ready (types are in `src/types/index.ts`).

## Project structure

```
src/
  components/
    ui/        Reusable primitives: Button, ProductCard, Rating, Accordion,
               Tabs, Drawer, Modal, Dropdown, QuantityStepper, Breadcrumb,
               Container/Section, Logo, brand icons.
    layout/    Header, Footer, MobileMenu, CartDrawer, LogoutModal,
               MobileBottomNav, ScrollToTop, and the root Layout.
    home/      Home-page-only sections: HeroSlider (full-width), CategoryGrid,
               BestSellingTabs, DealsCountdown, ProductSlider,
               TestimonialsSection, BlogSection, TrustBadges.
    account/   AddressFormModal (used by the Addresses dashboard page).
  pages/       One component per top-level route.
  pages/account/  Customer dashboard pages (see above).
  store/       StoreContext — cart, wishlist, compare, auth, addresses,
               reviews, and UI state (drawers/modals), with sonner toasts
               wired into the actions.
  data/        products.ts (40 products), content.ts (10 categories, vendors,
               blog, testimonials, FAQ), orders.ts (mock orders + addresses).
  types/       Shared TypeScript interfaces.
  styles/      custom.css — non-utility CSS extracted from the original
               template (decorative shapes, swiper pagination, range slider).
```

## Changing the base color

Edit the `@theme` block in `src/index.css`. The main tokens are:

```css
--color-primary-main: #04535c;
--color-primary-main-dark: #02414f;
--color-primary-light: #57cec7;
--color-primary-lighter: #c7f6ec;
--color-success-light: #aaf27f; /* text/icon color used on top of primary buttons */
```

Tailwind's JIT regenerates every `bg-primary-main`, `text-primary-main`, etc.
class automatically — no component files need to change.

## Notes

- The header, footer, cart drawer, mobile menu, and scroll-to-top button are
  shared components rendered once via the root `Layout`, not duplicated per
  page.
- Repeated content (product cards, categories, nav items, FAQ, order rows) is
  data-driven (`.map()`) rather than hand-copied markup.
- Alpine.js-style interactivity (dropdowns, accordions, tabs, drawers) is
  implemented with React state/hooks — see `components/ui/Accordion.tsx`,
  `Tabs.tsx`, `Dropdown.tsx`, `Drawer.tsx`.

## Admin Dashboard

A complete, separate admin panel lives under `/admin` (`src/admin/`), with its
own login page, sidebar, auth session, and CRUD-style management screens for
every part of the store — all backed by an independent `AdminContext`
(`src/admin/context/AdminContext.tsx`), separate from the customer
`StoreContext`.

**Admin auth is a mocked client-side session**, same pattern as the customer
dashboard — no real backend. Sign in at `/admin/login` with any email/password
(a demo email and password are pre-filled). `AdminLayout` redirects to
`/admin/login` if you're not "signed in."

The admin panel is **code-split** into its own JS chunk (via `React.lazy` in
`App.tsx`), so storefront shoppers never download the admin bundle or its
charting library (`recharts`) — it only loads when someone visits `/admin`.

### Sidebar structure

- **Dashboard** — KPIs, revenue chart, category breakdown, recent orders, top products
- **Catalog Management** — Products (All Products / Create Product), Categories, Brands, Attributes, Product Reviews (moderation)
- **Sales & Orders** — Order Management (status updates + detail drawer), Abandoned Carts, Transactions (with refunds)
- **Marketing & Promotions** — Coupons, Flash Sales
- **Analytics & Reports** — Sales Report, Grossing Products, Earnings (vendor payouts), Refund & Tax
- **User & Access Management** — Customers, Admin Users, Roles & Permissions, Support Tickets (with reply thread)
- **System Settings** — Storefront Settings, SEO Settings, API Settings (keys, webhooks, payment gateway)
- **Account & Security** — Admin Profile Settings, Audit Log, Logout (confirmation modal)

### Where the data lives

All admin data is seeded in `src/admin/data/adminMock.ts` (derived from the
same 40 products / 10 categories used on the storefront, plus admin-only
records like orders, transactions, coupons, tickets, and audit log entries)
and held in-memory by `AdminContext`. Every create/update/delete action shows
a toast and — for sensitive actions — appends an entry to the Audit Log.

This is the natural place to swap in real API calls once the Laravel backend
is built: the context's function signatures (`addProduct`, `updateOrderStatus`,
`refundTransaction`, etc.) are already shaped like what a real API layer would
expose.

## Admin panel updates

- **Excel & PDF export** — every admin data table (`AdminTable`) has an
  Export dropdown (Excel via `xlsx`, PDF via `jspdf` + `jspdf-autotable`).
  Both libraries are dynamically imported on first click, so they don't add
  weight to the initial admin bundle. Columns opt into export via an
  `exportValue` accessor (`src/admin/components/AdminTable.tsx`); columns
  without one (e.g. action buttons) are skipped automatically.
- **Working image uploads** — `src/components/ui/ImageUploadField.tsx` is a
  real file picker (click or drag-and-drop) that shows a live preview via
  `URL.createObjectURL`. It's wired into Create/Edit Product, Categories,
  Brands, SEO Settings (social share image), and both the admin and customer
  profile avatar fields.
- **Dark mode + 10 color presets** — `src/theme/ThemeContext.tsx` manages a
  light/dark mode toggle and a primary/secondary color preset, both
  persisted to `localStorage` and applied instantly, site-wide, by writing
  CSS custom properties onto `<html>` (Tailwind v4 compiles utilities like
  `bg-primary-main` to `var(--color-primary-main)`, so this needs no rebuild).
  The controls live in the admin topbar (`ColorSwitcher.tsx` + a sun/moon
  toggle). Dark mode itself is powered by a `@custom-variant dark` plus a
  global override sheet (`src/styles/dark-mode.css`) that remaps the common
  `bg-white` / `text-gray-*` / `border-gray-*` utilities reused throughout
  the app, so it applies broadly without needing `dark:` classes on every
  single component.
- **Notification center** — the bell icon in the admin topbar
  (`NotificationsDropdown.tsx`) is a real dropdown with mock notifications,
  unread indicators, and a "mark all read" action.
- **Admin Profile Settings** is now three tabs — Account Settings, Password
  Settings, and 2FA Setup — each its own component under
  `src/admin/components/profile/`, composed with the shared `Tabs` UI
  primitive rather than one large page file.
- **Dashboard stat cards** use a tinted background (a lighter shade of each
  card's tone color) instead of plain white, for better visual hierarchy.
- Fixed a layout bug where a couple of modal forms (Attributes, API Settings)
  had an `input` sitting directly beside a button inside a flex row without
  `min-w-0`/`flex-1` — a classic flexbox overflow gotcha that pushed the
  Save button out of view, requiring a horizontal scroll to reach it.
