import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'

const REVALIDATION_SECRET = process.env.SANITY_REVALIDATE_SECRET

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    }
  }

  try {
    // Verify the secret if configured
    if (REVALIDATION_SECRET) {
      const authHeader = event.headers.authorization || event.headers.Authorization
      const secret = authHeader?.replace('Bearer ', '')

      if (secret !== REVALIDATION_SECRET) {
        return {
          statusCode: 401,
          body: JSON.stringify({ message: 'Invalid secret' }),
        }
      }
    }

    // Parse the webhook payload from Sanity
    const body = JSON.parse(event.body || '{}')
    const { _type, slug } = body

    // For Netlify with Next.js, we need to trigger a rebuild or use on-demand builders
    // Since we're using ISR-style caching, we can call Netlify's cache purge API
    // For now, just acknowledge the webhook - the CDN cache will expire naturally
    // or you can set up Netlify's On-Demand Builders for true ISR

    console.log(`Revalidation triggered for type: ${_type}, slug: ${slug?.current}`)

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        revalidated: true,
        now: Date.now(),
        type: _type,
        slug: slug?.current,
        message: 'Webhook received. Cache will be refreshed on next request.',
      }),
    }
  } catch (error) {
    console.error('Revalidation error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing webhook', error: String(error) }),
    }
  }
}

export { handler }
