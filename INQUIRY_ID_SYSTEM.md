# Inquiry ID Tracking System

## Format
Inquiry IDs follow this format: `TF-{timestamp}-{random}`

### Components
- **Prefix**: `TF` (TaxForge)
- **Timestamp**: Unix timestamp in milliseconds (13 digits)
- **Random**: 7-character alphanumeric string (uppercase)

### Example
`TF-1738838400000-A7B9C2D`

## Features

### Unique Identification
- Each form submission generates a unique ID
- Timestamp ensures chronological ordering
- Random component prevents collisions

### Client-Side Generation
- ID is generated in the browser when page loads
- New ID generated after each successful submission
- Sent as hidden field with form data

### Use Cases

1. **Customer Reference**
   - User receives ID in success message
   - Can reference ID when following up

2. **Auto-Reply Integration**
   - Include ID in confirmation emails
   - Use Formspree template variable: `{{inquiry_id}}`

3. **Tracking & Analytics**
   - Parse timestamp from ID for submission time
   - Track inquiry volume by date
   - Associate follow-ups with original inquiry

4. **Database/CRM Integration**
   - Use as primary key or reference field
   - Link multiple interactions to same inquiry
   - Search and filter by inquiry ID

## Implementation

### JavaScript Generation (contact.html:149-153)
```javascript
function generateInquiryId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9).toUpperCase();
  return `TF-${timestamp}-${random}`;
}
```

### Form Field (contact.html:103)
```html
<input type="hidden" name="inquiry_id" id="inquiry_id" value="" />
```

### Success Message Display (contact.html:174)
```javascript
formStatus.innerHTML = `<strong>Success!</strong> Your inquiry has been received. Reference ID: <strong>${inquiryIdField.value}</strong><br>We'll get back to you shortly.`;
```

## Email Template for Auto-Reply

Subject: `We received your inquiry - Reference {{inquiry_id}}`

Body:
```
Hi {{name}},

Thank you for contacting TaxForge! We've received your inquiry with reference ID: {{inquiry_id}}

Our team will review your message and get back to you within 24 hours.

Best regards,
The TaxForge Team

---
Reference ID: {{inquiry_id}}
Submitted: {{date}}
```

## Future Enhancements

- Store inquiry IDs in backend database
- Create admin dashboard to view all inquiries by ID
- Add API endpoint to query inquiry status
- Send automated status updates via email
- Integrate with CRM system (HubSpot, Salesforce, etc.)
