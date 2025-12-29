import { NextResponse } from 'next/server';
import { storageService } from '@/lib/storage-service';

export async function GET() {
    try {
        const data = await storageService.getData('story');
        return NextResponse.json(data || {});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load story data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await storageService.saveData('story', body);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save story data' }, { status: 500 });
    }
}
