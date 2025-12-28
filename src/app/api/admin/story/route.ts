import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const storyPath = path.join(process.cwd(), 'src', 'data', 'story.json');

export async function GET() {
    try {
        const data = fs.readFileSync(storyPath, 'utf-8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load story data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        fs.writeFileSync(storyPath, JSON.stringify(body, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save story data' }, { status: 500 });
    }
}
