
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const messagesPath = path.join(process.cwd(), 'src', 'data', 'messages.json');

        if (!fs.existsSync(messagesPath)) {
            return NextResponse.json([]);
        }

        const fileContent = fs.readFileSync(messagesPath, 'utf8');
        const messages = JSON.parse(fileContent);

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
        const messagesPath = path.join(process.cwd(), 'src', 'data', 'messages.json');

        if (!fs.existsSync(messagesPath)) {
            return NextResponse.json({ success: true });
        }

        let messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));

        if (clearAll === 'true') {
            fs.writeFileSync(messagesPath, JSON.stringify([], null, 2));
            return NextResponse.json({ success: true });
        }

        if (id) {
            messages = messages.filter((msg: any) => msg.id !== id);
            fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
    }
}
