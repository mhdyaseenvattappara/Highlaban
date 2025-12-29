import { NextResponse } from 'next/server';
import { storageService } from '@/lib/storage-service';

export const dynamic = 'force-dynamic';

const getUsers = async () => {
    const users = await storageService.getData<any[]>('users');
    return users || [];
};

const saveUsers = async (users: any[]) => {
    await storageService.saveData('users', users);
};

export async function GET() {
    const users = await getUsers();
    return NextResponse.json(users.map((u: any) => {
        const { password, ...safeUser } = u;
        return safeUser;
    }));
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const users = await getUsers();

        // Basic validation
        if (users.some((u: any) => u.username === body.username)) {
            return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
        }

        const newUser = {
            id: Date.now().toString(),
            ...body,
            // If image is a local path (starts with /uploads), it's fine. 
            // If it's undefined, use avatar.
            image: body.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(body.name)}&background=random`
        };

        users.push(newUser);
        await saveUsers(users);

        const { password, ...safeUser } = newUser;
        return NextResponse.json({ success: true, user: safeUser });
    } catch (error) {
        console.error('Failed to create user:', error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const users = await getUsers();
        const index = users.findIndex((u: any) => u.id === body.id);

        if (index === -1) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        // Only update password if a new one is provided
        const updateData = { ...body };
        if (!updateData.password || updateData.password.trim() === '') {
            delete updateData.password;
        }

        // Update fields
        users[index] = { ...users[index], ...updateData };
        await saveUsers(users);

        const { password, ...safeUser } = users[index];
        return NextResponse.json({ success: true, user: safeUser });
    } catch (error) {
        console.error('Failed to update user:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        let users = await getUsers();

        if (users.find((u: any) => u.id === id)?.role === 'super_admin' && users.filter((u: any) => u.role === 'super_admin').length <= 1) {
            return NextResponse.json({ error: 'Cannot delete the last Super Admin' }, { status: 400 });
        }

        users = users.filter((u: any) => u.id !== id);
        await saveUsers(users);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete user:', error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}
