const {test, expect} = require('@playwright/test');

test('Assignment', async ({ page }) => {
    const cards = page.locator("#event-card");
    const bookedCards = page.locator("#booking-card");
    const eventName = "Star Gazing Event";
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByRole('textbox', { name: 'Email' }).fill('gdheena1@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Dheena@12');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Browse Events →")).toBeVisible();
    
    //now we are on the dashboard page
    await page.getByTestId('nav-events').click();
  await page.getByRole('button', { name: 'Admin' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();

  //Create event
  await page.getByTestId('event-title-input').fill(eventName);
  await page.getByRole('textbox', { name: 'Describe the event…' }).fill('This is to explore about the sky');
  await page.getByLabel('Category*').selectOption('Festival');
  await page.getByRole('textbox', { name: 'City*' }).fill('Chennai');
  await page.getByRole('textbox', { name: 'Venue*' }).fill('Chennai, green montain');  
  await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2026-09-30T20:57');
  await page.getByLabel('Price ($)*').fill('100');
  await page.getByLabel('Total Seats*').fill('50'); 
  await page.getByPlaceholder('https://…').fill('https://img.magnific.com/premium-photo/group-people-stargazing-with-telescope-clear-night-sky-observing-stars-galaxies-from-field_29120-17276.jpg');
  await page.getByRole('button', { name: '+ Add Event' }).click();
  await expect(page.getByText('Event created!')).toBeVisible();
  const successMessage = await page.getByText('Event created!').textContent();
  console.log(successMessage);
  await page.waitForLoadState("networkidle");
  

  //Find the event and capture seats
  await page.getByTestId('nav-events').click();
  await page.waitForLoadState("networkidle");
  await expect(cards.first()).toBeVisible();

  const titles = await cards.allTextContents();
  console.log(titles);

    const count = await cards.count();
    console.log(count);
    
    for (let i = 0; i < count; ++i) {
        if (await cards.nth(i).locator("h3").textContent() === eventName) {
            await expect(page.getByText("Star Gazing Event")).toBeVisible();
            const seats = await cards.nth(i).getByText('seats available').textContent();
            console.log("Seats available: " + seats);
            // Book the event
            page.pause();
            await cards.nth(i).locator("a").getByText('Book Now').click();
            break;
        }
    }
    const seatsBeforeBooking = await page.getByText('seats available').textContent(); 
    console.log("Seats before booking: " + seatsBeforeBooking);

    //Now we are on the booking page
    await page.getByText('Star Gazing Event').waitFor();
    await expect(page.getByText('Star Gazing Event')).toBeVisible();
    await page.getByLabel('Name*').fill('Dheena');
    await page.getByLabel('Email*').fill('gdheena1@gmail.com');
    await page.getByLabel('Number*').fill('9876543210');
    await page.getByRole('button', { name: 'Confirm Booking' }).click();

    //verify the booking confirmation message
    await expect(page.getByText('Booking Confirmed! 🎉')).toBeVisible();
    const bookingRef = await page.locator('.booking-ref').textContent();
    bookingRef.trim(); // Remove any leading/trailing whitespace
    console.log("Booking Reference: " + bookingRef);

    //verify the booking reference in the My Bookings page
    await page.getByTestId('nav-bookings').click();
    await expect(page).toHaveURL(/bookings/);
    await expect(bookedCards.first()).toBeVisible();

  const bookedTitles = await bookedCards.allTextContents();
  console.log(bookedTitles);

    const totalcards = await bookedCards.count();
    console.log(totalcards);
    
    for (let i = 0; i < totalcards; ++i) {
        if (await bookedCards.nth(i).locator(".booking-ref").textContent() === bookingRef) {
            await expect(bookedCards.nth(i).locator("h3")).toBeVisible();
            await expect(bookedCards.nth(i).locator("h3")).toHaveText(eventName);
            break;
        }
    }

    //verify the seats available after booking
    await page.getByTestId('nav-events').click();
    await page.waitForLoadState("networkidle");
    await expect(cards.first()).toBeVisible();
    for (let i = 0; i < count; ++i) {
        if (await cards.nth(i).locator("h3").textContent() === eventName) {
            await expect(page.getByText("Star Gazing Event")).toBeVisible();
            const seats = await cards.nth(i).getByText('seats available').textContent();
            console.log("Seats available after booking: " + seats);
        }
    }
  




});