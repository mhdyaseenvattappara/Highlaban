
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
