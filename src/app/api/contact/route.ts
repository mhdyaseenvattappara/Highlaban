
import { NextResponse } from 'next/server';
import { storageService } from '@/lib/storage-service';

export async function POST(request: Request) {
    try {
        const { name, email, phone, subject, message } = await request.json();

        let messages = await storageService.getData<any[]>('messages');
        if (!messages) {
            messages = [];
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
        await storageService.saveData('messages', messages);

        return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error saving message:', error);
        return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
    }
}
