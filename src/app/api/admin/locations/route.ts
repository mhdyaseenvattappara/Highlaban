
import { NextResponse } from 'next/server';
import { storageService } from '@/lib/storage-service';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const locations = await storageService.getData('locations');
        return NextResponse.json(locations || []);
    } catch (error) {
        console.error('Error fetching locations:', error);
        return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const locations = await request.json();
        await storageService.saveData('locations', locations);
        revalidatePath('/');

        return NextResponse.json({ success: true, message: 'Locations updated successfully' });
    } catch (error) {
        console.error('Error saving locations:', error);
        return NextResponse.json({ error: 'Failed to save locations' }, { status: 500 });
    }
}
