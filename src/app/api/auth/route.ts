
import { NextResponse } from 'next/server';
import { storageService } from '@/lib/storage-service';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('admin_session');

        if (!sessionCookie) {
            return NextResponse.json({ authenticated: false });
        }

        const userId = sessionCookie.value;
        const users = await storageService.getData<any[]>('users');

        if (!users) {
            return NextResponse.json({ authenticated: false });
        }

        const user = users.find((u: any) => u.id === userId);

        if (user) {
            const { password, ...safeUser } = user;
            return NextResponse.json({ authenticated: true, user: safeUser });
        } else {
            return NextResponse.json({ authenticated: false });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Session check failed' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        const users = await storageService.getData<any[]>('users');

        if (!users) {
            return NextResponse.json({ success: false, error: 'User database not found' }, { status: 500 });
        }

        const user = users.find((u: any) => u.username === username && u.password === password);

        if (user) {
            // Set Cookie
            const cookieStore = await cookies();
            cookieStore.set('admin_session', user.id, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 30, // 30 Days
                path: '/',
            });

            const { password, ...safeUser } = user;
            return NextResponse.json({ success: true, user: safeUser });
        } else {
            return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('admin_session');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
    }
}
