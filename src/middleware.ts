import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const password = process.env.SITE_PASSWORD
  if (!password) return NextResponse.next()

  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Basic ')) {
    const encoded = authHeader.slice(6)
    const decoded = atob(encoded)
    const colonIndex = decoded.indexOf(':')
    const pwd = colonIndex !== -1 ? decoded.slice(colonIndex + 1) : ''
    if (pwd === password) return NextResponse.next()
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Monika Libera", charset="UTF-8"',
    },
  })
}

export const config = {
  matcher: [
    '/((?!studio|_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
