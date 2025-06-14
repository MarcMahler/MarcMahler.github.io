# Contact Form with Email Notification

This is a Next.js application that provides a contact form which sends email notifications when users submit their information using FormSubmit API.

## Features

- Simple, responsive contact form
- Form validation
- Email notifications sent to a specified email address
- No server-side code or email credentials required (uses FormSubmit API)
- Styled with CSS-in-JS

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd WaedivolleyWebsite
```

### 2. Install dependencies

```bash
npm install
```

### 3. About FormSubmit API

This application uses [FormSubmit](https://formsubmit.co/) to handle form submissions and email notifications. FormSubmit is a free service that allows you to:

- Receive form submissions directly to your email
- No server-side code or email credentials required
- Works with static sites (like GitHub Pages)
- Includes spam protection with CAPTCHA
- Customizable success/error redirects

The form is pre-configured to send submissions to marc.mahler@gmx.ch. To change this to your own email, modify the form's action attribute in `pages/index.js`.

**Note:** When you submit the form for the first time to a new email address, FormSubmit will send a confirmation email to that address. You'll need to confirm your email before you start receiving form submissions.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the contact form.

### 5. Build for production

```bash
npm run build
```

## Deployment

One of the key advantages of using FormSubmit is that it works with static site exports, allowing you to deploy your contact form to GitHub Pages, Netlify, or any static hosting service.

### Static Site Deployment (Recommended)

For static site deployment (GitHub Pages, Netlify, etc.):

1. Modify the `next.config.js` file:
   ```js
   const nextConfig = {
     output: 'export',
   };
   ```

2. Build the application:
   ```bash
   npm run build
   ```

3. The static site will be generated in the `out` directory, which you can deploy to any static hosting service.

4. For GitHub Pages, you can use:
   ```bash
   npm run deploy
   ```

### Server-Side Rendering

For server-side rendering (Vercel, AWS, etc.):

1. Modify the `next.config.js` file:
   ```js
   const nextConfig = {
     // No output: 'export' option
   };
   ```

2. Deploy according to your hosting provider's instructions.

**Note:** With FormSubmit, both deployment methods work equally well since no server-side API routes are required for the contact form functionality.

## Customization

### Changing the Recipient Email

To change the recipient email address, modify the form's action attribute in `pages/index.js`:

```jsx
<form action="https://formsubmit.co/your-email@example.com" method="POST">
```

Replace `your-email@example.com` with your own email address.

### FormSubmit Configuration Options

The form includes several FormSubmit configuration options as hidden fields:

```jsx
<input type="hidden" name="_next" value={nextUrl} /> // Redirect URL after submission
<input type="hidden" name="_subject" value="New Contact Form Submission" /> // Email subject
<input type="hidden" name="_captcha" value="true" /> // Enable/disable CAPTCHA
<input type="hidden" name="_template" value="table" /> // Email template format
```

You can customize these options:

- `_next`: URL to redirect after form submission
- `_subject`: Subject line for the email
- `_captcha`: Set to "false" to disable CAPTCHA
- `_template`: Email template format ("table", "box", or "plain")

For more options, visit the [FormSubmit documentation](https://formsubmit.co/).

### Adding More Form Fields

To add more form fields:

1. Add the field to the form in `pages/index.js`
2. Add the field to the formData state
3. Update the handleChange function if needed

FormSubmit will automatically include all form fields in the email notification.

### Styling

To change the styling, modify the CSS in the `<style jsx>` section in `pages/index.js`.

## Troubleshooting

### Common FormSubmit Issues

#### First-Time Submission

When you submit the form for the first time to a new email address:
- FormSubmit will send a confirmation email to that address
- You must click the confirmation link before receiving any form submissions
- Check your spam folder if you don't see the confirmation email

#### Form Not Submitting

If the form doesn't submit properly:

1. **Check the email address in the form action**
   - Make sure the email in `<form action="https://formsubmit.co/your-email@example.com">` is correct
   - The email must be confirmed with FormSubmit

2. **CAPTCHA issues**
   - If you've disabled CAPTCHA and are experiencing spam, re-enable it
   - If CAPTCHA isn't displaying correctly, try a different browser

3. **Redirect not working**
   - Make sure the `_next` URL is valid and accessible
   - For static sites, use absolute URLs instead of relative paths

#### Email Notifications Not Received

If you're not receiving email notifications:

1. **Check your spam/junk folder**
   - FormSubmit emails might be filtered as spam initially
   - Add FormSubmit to your safe senders list

2. **Confirm your email address**
   - Make sure you've clicked the confirmation link in the initial email from FormSubmit

3. **Form field validation**
   - Ensure all required fields are properly filled out
   - Check that the email field contains a valid email format

## License

ISC
