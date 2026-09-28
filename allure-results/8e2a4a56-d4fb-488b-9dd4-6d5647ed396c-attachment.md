# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: AccessDenyAPI.spec.js >> gmail user sees Access Denied when viewing yahoo user booking
- Location: tests\AccessDenyAPI.spec.js:17:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
  4  | const API_URL  = 'https://api.eventhub.rahulshettyacademy.com/api';
  5  | 
  6  | const YAHOO_USER = { email: 'gdheena1@yahoo.com', password: 'Ajith@12345' };
  7  | const GMAIL_USER = { email: 'gdheena1@gmail.com', password: 'Dheena@12' };
  8  | 
  9  | async function loginAs(page, user) {
  10 |   await page.goto(`${BASE_URL}/login`);
  11 |   await page.getByPlaceholder('you@email.com').fill(user.email);
  12 |   await page.getByLabel('Password').fill(user.password);
  13 |   await page.locator('#login-btn').click();
  14 |   await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
  15 | }
  16 | 
  17 | test('gmail user sees Access Denied when viewing yahoo user booking', async ({ page, request }) => {
  18 | 
  19 |   // ── Step 1: Login as Yahoo user via API and get token ─────────────────────
  20 |   const loginRes = await request.post(`${API_URL}/auth/login`, {
  21 |     data: { 
  22 |         email: YAHOO_USER.email, 
  23 |         password: YAHOO_USER.password 
  24 |     },
  25 |   });
> 26 |   expect(loginRes.ok()).toBeTruthy();
     |                         ^ Error: expect(received).toBeTruthy()
  27 |   const { token } = await loginRes.json();
  28 | 
  29 |   // ── Step 2: Fetch events via API to get a valid event ID ──────────────────
  30 |   const eventsRes = await request.get(`${API_URL}/events`, {
  31 |     headers: { Authorization: `Bearer ${token}` },
  32 |   });
  33 |   expect(eventsRes.ok()).toBeTruthy();
  34 |   const eventsData = await eventsRes.json();
  35 |   const eventId = eventsData.data[0].id;
  36 | 
  37 |   // ── Step 3: Create a booking via API as Yahoo user ────────────────────────
  38 |   const bookingRes = await request.post(`${API_URL}/bookings`, {
  39 |     headers: { Authorization: `Bearer ${token}` },
  40 |     data: {
  41 |       eventId,
  42 |       customerName:  'Yahoo User',
  43 |       customerEmail: YAHOO_USER.email,
  44 |       customerPhone: '9999999999',
  45 |       quantity:      1,
  46 |     },
  47 |   });
  48 |   expect(bookingRes.ok()).toBeTruthy();
  49 |   const yahooBookingId = (await bookingRes.json()).data.id;
  50 | 
  51 |   console.log(`Yahoo booking created via API. ID: ${yahooBookingId}`);
  52 | 
  53 |   // ── Step 4: Login as Gmail user via UI ────────────────────────────────────
  54 |   await loginAs(page, GMAIL_USER);
  55 | 
  56 |   // ── Step 5: Navigate directly to Yahoo's booking URL as Gmail user ────────
  57 |   await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, { waitUntil: 'networkidle' });
  58 | 
  59 |   // ── Step 6: Validate Access Denied ───────────────────────────────────────
  60 |   await expect(page.getByText('Access Denied')).toBeVisible();
  61 |   await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();
  62 | });
```