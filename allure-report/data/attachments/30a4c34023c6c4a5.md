# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CodeAssignment2.spec.js >> refund eligible for single ticket booking
- Location: tests\CodeAssignment2.spec.js:17:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'Browse Events →' })
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('link', { name: 'Browse Events →' }) with timeout 40000ms
  - waiting for getByRole('link', { name: 'Browse Events →' })
  - Test ended.

```

```yaml
- text: RSA Rahul Shetty Academy eventhub.app
- img "EventHub app preview"
- list:
  - listitem: ⚡ Live REST APIs — test real endpoints, not mocks
  - listitem: 🔒 Isolated sandbox — your data, your tests, no conflicts
  - listitem: 🎫 Auth, CRUD, bookings — flows you'll face on the job
  - listitem: 🤖 Built for Selenium, Playwright, RestAssured & more
- paragraph: 50,000+
- paragraph: QA engineers trained worldwide
- 'heading "The #1 QA Practice Hub for Automation Engineers" [level=2]'
- paragraph: EventHub is a production-grade practice app designed so you can sharpen your testing skills on real-world scenarios — before your next interview or project.
- link "API Documentation (Swagger)":
  - /url: https://api.eventhub.rahulshettyacademy.com/api/docs
  - img
  - text: API Documentation (Swagger)
- img
- heading "Sign in to EventHub" [level=1]
- paragraph: Enter your credentials to continue
- text: Email
- textbox "Email":
  - /placeholder: you@email.com
  - text: rahulshetty1@gmail.com
- text: Password
- textbox "Password":
  - /placeholder: ••••••
  - text: Magiclife1!
- paragraph: ⚠️ Looks like you're using sample test credentials!
- paragraph:
  - text: Looks like you are directly running tests without changing credentials.
  - link "Sign up now":
    - /url: /register
  - text: to create your own login credentials, update them in the test & run again. Good luck! 🚀
- button "Sign In"
- paragraph:
  - text: Don't have an account?
  - link "Register":
    - /url: /register
- paragraph:
  - text: A practice environment by
  - link "RahulShettyAcademy.com":
    - /url: https://rahulshettyacademy.com
  - text: — used by QA engineers worldwide to master automation testing.
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const BASE_URL   = 'https://eventhub.rahulshettyacademy.com';
  4  | 
  5  | // Change these to match a registered account in your local sandbox
  6  | const GMAIL_USER = { email: 'rahulshetty1@gmail.com', password: 'Magiclife1!' };
  7  | 
  8  | async function loginAndGoToBooking(page) {
  9  |   await page.goto(`${BASE_URL}/login`);
  10 |   await page.getByLabel('Email').fill(GMAIL_USER.email);
  11 |   await page.getByPlaceholder('••••••').fill(GMAIL_USER.password);
  12 |   await page.locator('#login-btn').click();
> 13 |   await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
     |                                                                     ^ Error: expect(locator).toBeVisible() failed
  14 | }
  15 | 
  16 | // ── Test 1: 1 ticket → eligible ───────────────────────────────────────────────
  17 | test('refund eligible for single ticket booking', async ({ page }) => {
  18 |   await loginAndGoToBooking(page);
  19 | 
  20 |   // Book event with 1 ticket via UI
  21 |   await page.goto(`${BASE_URL}/events`);
  22 |   await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();
  23 | 
  24 | 
  25 |   await page.getByLabel('Full Name').fill('Test User');
  26 |   await page.locator('#customer-email').fill(GMAIL_USER.email);
  27 |   await page.getByPlaceholder('+91 98765 43210').fill('9999999999');
  28 |   await page.locator('.confirm-booking-btn').click();
  29 | 
  30 |   // Navigate to booking detail
  31 |   await page.getByRole('link', { name: 'View My Bookings' }).click();
  32 |   await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  33 |   await page.getByRole('link', { name: 'View Details' }).first().click();
  34 |   await expect(page.getByText('Booking Information')).toBeVisible();
  35 | 
  36 |   // Validate booking ref first letter matches event name first letter
  37 |   const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
  38 |   const eventTitle = await page.locator('h1').innerText();
  39 |   expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));
  40 | 
  41 |   await page.locator('#check-refund-btn').click();
  42 | 
  43 |   // Spinner must appear immediately
  44 |   await expect(page.locator('#refund-spinner')).toBeVisible();
  45 | 
  46 |   // Wait for spinner to disappear after 4s
  47 |   await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });
  48 | 
  49 |   // Validate eligible message
  50 |   const result = page.locator('#refund-result');
  51 |   await expect(result).toBeVisible();
  52 |   await expect(result).toContainText('Eligible for refund');
  53 |   await expect(result).toContainText('Single-ticket bookings qualify for a full refund');
  54 | });
  55 | 
  56 | // ── Test 2: 3 tickets → not eligible ─────────────────────────────────────────
  57 | test('refund not eligible for group ticket booking', async ({ page }) => {
  58 |   await loginAndGoToBooking(page);
  59 | 
  60 |   // Book event with 3 tickets via UI
  61 |   await page.goto(`${BASE_URL}/events`);
  62 |   await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();
  63 | 
  64 | 
  65 |   // Increase quantity to 3
  66 |   await page.locator('button:has-text("+")').click();
  67 |   await page.locator('button:has-text("+")').click();
  68 | 
  69 |   await page.getByLabel('Full Name').fill('Test User');
  70 |   await page.locator('#customer-email').fill(GMAIL_USER.email);
  71 |   await page.getByPlaceholder('+91 98765 43210').fill('9999999999');
  72 |   await page.locator('.confirm-booking-btn').click();
  73 | 
  74 |   // Navigate to booking detail
  75 |   await page.getByRole('link', { name: 'View My Bookings' }).click();
  76 |   await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  77 |   await page.getByRole('link', { name: 'View Details' }).first().click();
  78 |   await expect(page.getByText('Booking Information')).toBeVisible();
  79 | 
  80 |   // Validate booking ref first letter matches event name first letter
  81 |   const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
  82 |   const eventTitle = await page.locator('h1').innerText();
  83 |   expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));
  84 | 
  85 |   await page.locator('#check-refund-btn').click();
  86 | 
  87 |   // Spinner must appear immediately
  88 |   await expect(page.locator('#refund-spinner')).toBeVisible();
  89 | 
  90 |   // Wait for spinner to disappear after 4s
  91 |   await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });
  92 | 
  93 |   // Validate ineligible message
  94 |   const result = page.locator('#refund-result');
  95 |   await expect(result).toBeVisible();
  96 |   await expect(result).toContainText('Not eligible for refund');
  97 |   await expect(result).toContainText('Group bookings (3 tickets) are non-refundable');
  98 | });
```