import { NextResponse } from 'next/server';
import { storageService } from '@/lib/storage-service';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const url = await storageService.uploadFile(file, 'uploads');

        return NextResponse.json({
            success: true,
            url
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
