import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0F172A',
          backgroundImage: 'linear-gradient(45deg, #0F172A 0%, #1E293B 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '1100px',
            padding: '0 60px',
          }}
        >
          {/* Robot Icon Placeholder */}
          <div
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '100px',
              backgroundColor: '#06B6D4',
              border: '8px solid #0891B2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                color: '#0F172A',
                fontSize: '72px',
                fontWeight: 'bold',
              }}
            >
              🤖
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginLeft: '60px',
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: '56px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: '1',
                marginBottom: '16px',
              }}
            >
              GUSTAVO
            </div>
            <div
              style={{
                fontSize: '56px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: '1',
                marginBottom: '24px',
              }}
            >
              BEAUREGARD
            </div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 600,
                color: '#06B6D4',
                marginBottom: '20px',
              }}
            >
              CTO, Founder & Tech Evangelist
            </div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 400,
                color: '#94A3B8',
                marginBottom: '24px',
              }}
            >
              AI Specialist | 18+ Years Experience | 40+ Team Leader
            </div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#06B6D4',
              }}
            >
              gush.dev
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
