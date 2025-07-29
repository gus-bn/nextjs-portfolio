import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Load environment variables with validation
import 'dotenv-safe/config';

// Validation schema matching the form
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  project: z
    .string()
    .min(10, 'Project description must be at least 10 characters')
    .max(200, 'Project description must be less than 200 characters'),
  message: z
    .string()
    .min(50, 'Message must be at least 50 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  acceptPrivacy: z.boolean().refine((val) => val === true, {
    message: 'Privacy policy must be accepted',
  }),
});

// Rate limiting storage (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
  // In production, you might want to use a more sophisticated method
  // like combining IP with user agent or using a proper rate limiting service
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(key);

  if (!limit || now > limit.resetTime) {
    // Reset the rate limit window (5 submissions per 15 minutes)
    rateLimitMap.set(key, { count: 1, resetTime: now + 15 * 60 * 1000 });
    return false;
  }

  if (limit.count >= 5) {
    return true;
  }

  limit.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const rateLimitKey = getRateLimitKey(request);
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please wait before submitting again.',
          code: 'RATE_LIMITED',
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot spam protection
    if (body.website) {
      // Silently reject spam
      console.log('Spam detected via honeypot field');
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validate the form data
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues,
          code: 'VALIDATION_ERROR',
        },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // Additional spam protection - simple keyword check
    const spamKeywords = ['bitcoin', 'crypto', 'viagra', 'loan', 'investment'];
    const messageText = `${formData.message} ${formData.project}`.toLowerCase();
    const hasSpamKeywords = spamKeywords.some((keyword) =>
      messageText.includes(keyword)
    );

    if (hasSpamKeywords) {
      console.log('Potential spam detected via keyword filtering');
      // You could either reject or flag for manual review
    }

    // Send data to external API endpoint
    try {
      const apiUrl = process.env.API_URL;
      if (!apiUrl) {
        throw new Error('API_URL environment variable is not configured');
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || '',
          project: formData.project,
          message: formData.message,
          acceptPrivacy: formData.acceptPrivacy,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('External API error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error(
          `External API returned ${response.status}: ${response.statusText}`
        );
      }

      const apiResult = await response.json();
      console.log('Successfully sent to external API:', apiResult);
    } catch (apiError) {
      console.error('Failed to send to external API:', apiError);
      // You might want to still return success to user but log the error
      // Or return an error depending on your requirements
      return NextResponse.json(
        {
          error: 'Failed to process your request. Please try again later.',
          code: 'API_ERROR',
        },
        { status: 500 }
      );
    }

    // Log the submission locally as well
    console.log('Contact form submission:', {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      project: formData.project,
      message: formData.message,
      acceptPrivacy: formData.acceptPrivacy,
      timestamp: new Date().toISOString(),
      ip: getRateLimitKey(request),
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for your message! I'll get back to you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error. Please try again later.',
        code: 'SERVER_ERROR',
      },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
