import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUser } from './PocketBase/PocketBase';

export async function middleware(request: NextRequest) {

    const isLoggedIn:any = await getUser(request.cookies as any);
    console.log(isLoggedIn)
    if (request.nextUrl.pathname && request.nextUrl.pathname.startsWith("/login")) {
        // If already logged in and the request is to go to the login page,
        // Skip it and redirect to the home page.
        if (isLoggedIn.id) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return;
    }

    if (!isLoggedIn.id) {
        // If not logged in, redirect them to the login page.
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Continue without any request changes.
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};