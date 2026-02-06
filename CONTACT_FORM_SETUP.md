# Contact Form Setup Instructions

## Overview
The contact form on contact.html has been configured to use Formspree for secure email delivery without browser warnings.

## Setup Steps

### 1. Create Formspree Account
1. Go to https://formspree.io
2. Sign up for a free account using taxforgeteam@gmail.com
3. Verify your email address

### 2. Create Form Endpoint
1. In your Formspree dashboard, click "New Form"
2. Name it "TaxForge Contact Form"
3. Set the email address to: taxforgeteam@gmail.com
4. Copy the form endpoint URL (looks like: https://formspree.io/f/XXXXXXXX)

### 3. Update Contact Form
1. Open contact.html
2. Replace the action URL in line 100 with your actual Formspree endpoint:
   ```html
   <form id="contact-form" name="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### 4. Configure Auto-Reply (Optional)
In Formspree dashboard:
1. Go to your form settings
2. Enable "Auto-reply"
3. Use this template:
   ```
   Subject: We received your inquiry - Reference {{inquiry_id}}

   Hi {{name}},

   Thank you for contacting TaxForge! We've received your inquiry with reference ID: {{inquiry_id}}

   Our team will review your message and get back to you within 24 hours.

   Best regards,
   The TaxForge Team
   ```

## Features Implemented

### Security
- Removed insecure mailto: action
- Uses HTTPS POST to Formspree service
- No browser security warnings
- Proper CORS handling

### Autofill Support
- Added `autocomplete="name"` for name field
- Added `autocomplete="email"` for email field
- Enables browser autofill functionality

### Inquiry Tracking
- Unique inquiry ID format: `TF-{timestamp}-{random}`
- Example: `TF-1738838400000-A7B9C2D`
- ID is generated client-side and sent with each submission
- ID is displayed to user upon successful submission
- Can be used in auto-reply emails for tracking

### User Experience
- Shows success message with inquiry ID
- Shows error message if submission fails
- Disables submit button during submission
- Form resets after successful submission
- Visual feedback with color-coded status messages

## Alternative: Web3Forms
If you prefer not to use Formspree, you can use Web3Forms:
1. Sign up at https://web3forms.com
2. Get your access key
3. Replace form action with: `https://api.web3forms.com/submit`
4. Add hidden field: `<input type="hidden" name="access_key" value="YOUR_KEY">`

## Testing
1. Fill out the form on contact.html
2. Submit and note the inquiry ID
3. Check taxforgeteam@gmail.com for the email
4. Email should include the inquiry ID for reference

## Support
For issues, contact Formspree support or check their documentation at https://help.formspree.io
