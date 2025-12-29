import { NextResponse } from 'next/server';
import { storageService } from '@/lib/storage-service';
import { revalidatePath } from 'next/cache';

export async function GET() {
    try {
        const data = await storageService.getData('products');
        return NextResponse.json(data || []);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await storageService.saveData('products', body);
        revalidatePath('/');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save products' }, { status: 500 });
    }
}
