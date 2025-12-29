
import { NextResponse } from 'next/server';
import { storageService } from '@/lib/storage-service';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        let messages = await storageService.getData<any[]>('messages');

        if (!messages) {
            return NextResponse.json([]);
        }

        // Sort by date desc
        messages.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return NextResponse.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const clearAll = searchParams.get('all');

        let messages = await storageService.getData<any[]>('messages') || [];

        if (clearAll === 'true') {
            await storageService.saveData('messages', []);
            return NextResponse.json({ success: true });
        }

        if (id) {
            messages = messages.filter((msg: any) => msg.id !== id);
            await storageService.saveData('messages', messages);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
    }
}
