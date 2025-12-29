import { NextResponse } from 'next/server';
import { storageService } from '@/lib/storage-service';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await storageService.saveData('page-config', body);
        revalidatePath('/');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to save config:', error);
        return NextResponse.json({ success: false, error: 'Failed to save configuration' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const config = await storageService.getData('page-config');
        return NextResponse.json(config || {});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load configuration' }, { status: 500 });
    }
}
