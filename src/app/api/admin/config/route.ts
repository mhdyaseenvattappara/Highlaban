import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const configPath = path.join(process.cwd(), 'src', 'data', 'page-config.json');

        fs.writeFileSync(configPath, JSON.stringify(body, null, 2), 'utf8');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to save config:', error);
        return NextResponse.json({ success: false, error: 'Failed to save configuration' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const configPath = path.join(process.cwd(), 'src', 'data', 'page-config.json');
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load configuration' }, { status: 500 });
    }
}
