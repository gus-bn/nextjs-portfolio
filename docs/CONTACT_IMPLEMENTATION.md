# Contact Section Implementation

## Overview

The Contact section implements a comprehensive contact form with validation, spam protection, and accessibility features.

## Features Implemented

### ✅ Task 8.1: Contact Form with Validation

- **React Hook Form Integration**: Uses React Hook Form for efficient form state management
- **Zod Validation Schema**: Comprehensive validation with custom error messages
- **Real-time Validation**: Form validates on change with immediate feedback
- **Character Counting**: Live character counters for message and project fields
- **Loading States**: Proper loading indicators during form submission
- **Success/Error States**: Clear feedback for submission results

### ✅ Task 8.2: Contact Information and Alternative Methods

- **Contact Info Cards**: Responsive cards displaying contact methods
- **Email Integration**: Direct mailto links with proper accessibility
- **Location Information**: Available worldwide with remote collaboration note
- **Response Time**: Clear expectations set for communication
- **Website Link**: Link to company website with external link indicators
- **Social Media Integration**: Connected to header social links via constants

### ✅ Task 8.3: Form Security and Spam Protection

- **Honeypot Protection**: Hidden field to catch automated spam
- **Rate Limiting**: Server-side rate limiting (5 submissions per 15 minutes)
- **Keyword Filtering**: Basic spam keyword detection
- **CSRF Protection**: Implicit protection via Next.js API routes
- **Input Sanitization**: Zod validation prevents malicious input
- **Accessibility Compliance**: Full ARIA labels, fieldset/legend structure

## Technical Implementation

### Form Validation Schema

```typescript
const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  project: z.string().min(10).max(200),
  message: z.string().min(50).max(1000),
});
```

### API Endpoint

- **Route**: `/api/contact`
- **Method**: POST
- **Rate Limiting**: IP-based with 15-minute windows
- **Validation**: Server-side Zod validation
- **Spam Protection**: Multiple layers of protection

### Accessibility Features

- **ARIA Labels**: All form elements properly labeled
- **Error Associations**: Errors linked to fields via `aria-describedby`
- **Focus Management**: Proper focus indicators and keyboard navigation
- **Screen Reader Support**: Semantic HTML and proper announcements
- **Reduced Motion**: Respects user motion preferences

### Security Measures

1. **Client-side Protection**:

   - Honeypot field (hidden from users)
   - Form validation prevents malicious input
   - AutoComplete disabled on honeypot

2. **Server-side Protection**:
   - Rate limiting by IP address
   - Zod validation schema
   - Keyword-based spam filtering
   - Request size limits (implicit via Next.js)

## Usage

The Contact component is integrated into the main page and includes:

1. **Contact Information Cards** (left column on desktop)
2. **Contact Form** (right column, spans 2/3 on desktop)
3. **Responsive Layout** (stacked on mobile)
4. **Animated Interactions** (Framer Motion animations)

## Testing

To test the contact form:

1. **Valid Submission**: Fill all required fields properly
2. **Validation Testing**: Try invalid emails, short messages, etc.
3. **Spam Protection**: Try rapid submissions or spam keywords
4. **Accessibility**: Test with keyboard navigation and screen readers

## Future Enhancements

- [ ] Email service integration (SendGrid, Nodemailer)
- [ ] Database storage for submissions
- [ ] Admin dashboard for message management
- [ ] reCAPTCHA integration for enhanced spam protection
- [ ] Email confirmation to users
- [ ] File attachment support

## Dependencies

- `react-hook-form`: Form state management
- `@hookform/resolvers`: Zod resolver integration
- `zod`: Schema validation
- `framer-motion`: Animations
- `lucide-react`: Icons

## Configuration

Contact information is configured in `/src/lib/constants.ts`:

```typescript
export const SITE_CONFIG = {
  links: {
    email: 'mailto:gustavo@thegurucompany.com',
    // ... other links
  },
};
```
