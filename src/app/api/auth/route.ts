
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        const usersPath = path.join(process.cwd(), 'src', 'data', 'users.json');

        if (!fs.existsSync(usersPath)) {
            return NextResponse.json({ success: false, error: 'User database not found' }, { status: 500 });
        }

        const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
        const user = users.find((u: any) => u.username === username && u.password === password);

        if (user) {
            // In a real app, set a secure HTTP-only cookie here.
            // For this mock implementation, we return user info for client-side storage
            const { password, ...safeUser } = user;
            return NextResponse.json({ success: true, user: safeUser });
        } else {
            return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
    }
}
