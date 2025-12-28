
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { name, email, phone, subject, message } = await request.json();

        const messagesPath = path.join(process.cwd(), 'src', 'data', 'messages.json');

        let messages = [];
        if (fs.existsSync(messagesPath)) {
            const fileContent = fs.readFileSync(messagesPath, 'utf8');
            try {
                messages = JSON.parse(fileContent);
            } catch (e) {
                messages = [];
            }
        }

        const newMessage = {
            id: Date.now().toString(),
            name,
            email,
            phone,
            subject,
            message,
            date: new Date().toISOString(),
            read: false
        };

        messages.push(newMessage);
        fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));

        return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error saving message:', error);
        return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
    }
}
