import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Secret to validate webhook requests from Sanity
const REVALIDATION_SECRET = process.env.SANITY_REVALIDATE_SECRET

export async function POST(request: NextRequest) {
  try {
    // Verify the secret if configured
    if (REVALIDATION_SECRET) {
      const authHeader = request.headers.get('authorization')
      const secret = authHeader?.replace('Bearer ', '')

      if (secret !== REVALIDATION_SECRET) {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
      }
    }

    // Parse the webhook payload from Sanity
    const body = await request.json()
    const { _type, slug } = body

    // Revalidate based on document type
    if (_type === 'page') {
      if (slug?.current) {
        // Revalidate specific page
        revalidatePath(`/${slug.current}`)
      }
      // Also revalidate homepage in case it's the homepage
      revalidatePath('/')
    } else if (_type === 'navigation') {
      // Navigation affects all pages
      revalidatePath('/', 'layout')
    } else if (_type === 'siteSettings') {
      // Site settings affect all pages
      revalidatePath('/', 'layout')
    } else {
      // Fallback: revalidate everything
      revalidatePath('/', 'layout')
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: _type,
      slug: slug?.current,
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}
