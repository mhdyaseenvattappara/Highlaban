import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const productsPath = path.join(process.cwd(), 'src', 'data', 'products.json');
        const data = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const productsPath = path.join(process.cwd(), 'src', 'data', 'products.json');
        fs.writeFileSync(productsPath, JSON.stringify(body, null, 2), 'utf8');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save products' }, { status: 500 });
    }
}
