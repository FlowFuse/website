import React from "https://esm.sh/react@18.2.0";
import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts";

async function loadGoogleFont(font, text) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error('failed to load font data');
}

export default async (request) => {
  const { searchParams } = new URL(request.url);

  // Get parameters from URL
  const title = searchParams.get('title') || 'Handbook';
  const description = searchParams.get('description') || '';
  const section = searchParams.get('section') || '';

  // Combine all text for font loading
  const allText = `${title} ${description} ${section} Handbook`;

  // Load Heebo font
  const heeboFontData = await loadGoogleFont('Heebo:wght@400;600', allText);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          padding: '60px',
          fontFamily: 'Heebo',
        }}
      >
        {/* Header with logo and badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          {/* FlowFuse Logo */}
          <img
            src="https://flowfuse.com/handbook/images/logos/ff-icon--light.png"
            width="80"
            height="80"
            alt="FlowFuse"
          />

          {/* Handbook badge with section */}
          <div
            style={{
              fontSize: '48px',
              color: '#6B7280',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <span style={{ color: '#111827' }}>Handbook</span>
            {section && (
              <>
                <span style={{ color: '#D1D5DB' }}>•</span>
                <span style={{ textTransform: 'capitalize', color: '#9CA3AF' }}>{section}</span>
              </>
            )}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: '#111827',
            lineHeight: 1.1,
            marginBottom: '30px',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </div>

        {/* Description with fade effect */}
        {description && (
          <div
            style={{
              position: 'relative',
              maxWidth: '100%',
            }}
          >
            <div
              style={{
                fontSize: '38px',
                color: '#6B7280',
                lineHeight: 1.4,
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 5,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {description}
            </div>
            {/* Fade gradient overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '80px',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Heebo',
          data: heeboFontData,
          style: 'normal',
        },
      ],
      headers: {
        'Cache-Control': 'public, max-age=604800, immutable', // 1 week cache
      },
    }
  );
};

export const config = {
  path: "/og-image",
};
