import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log('🔔 Tavus Webhook received:', body);

    // Example: body contains { video_id, status, video_url, thumbnail_url, ... }

    // You can persist the video info in your DB here:
    // await db.video.update({ where: { id: body.video_id }, data: { status: body.status, url: body.video_url } });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
