import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const res = await fetch(`https://tavusapi.com/v2/videos/${id}`, {
      headers: { 'x-api-key': process.env.TAVUS_API_KEY! },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Tavus API error:', data);
      return NextResponse.json({ error: data }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Status fetch error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
