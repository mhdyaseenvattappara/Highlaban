
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const locationsPath = path.join(process.cwd(), 'src', 'data', 'locations.json');

        if (!fs.existsSync(locationsPath)) {
            // Return empty list or default if file doesn't exist
            return NextResponse.json([]);
        }

        const fileContent = fs.readFileSync(locationsPath, 'utf8');
        const locations = JSON.parse(fileContent);

        return NextResponse.json(locations);
    } catch (error) {
        console.error('Error fetching locations:', error);
        return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const locations = await request.json();
        const locationsPath = path.join(process.cwd(), 'src', 'data', 'locations.json');

        fs.writeFileSync(locationsPath, JSON.stringify(locations, null, 2));
        revalidatePath('/');

        return NextResponse.json({ success: true, message: 'Locations updated successfully' });
    } catch (error) {
        console.error('Error saving locations:', error);
        return NextResponse.json({ error: 'Failed to save locations' }, { status: 500 });
    }
}
