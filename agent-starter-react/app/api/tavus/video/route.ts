import { NextRequest, NextResponse } from 'next/server';

const TAVUS_API_URL = 'https://tavusapi.com/v2/videos';

export async function POST(req: NextRequest) {
    
  try {
    const { script, background_source_url } = await req.json();

    if (!script) {
      return NextResponse.json({ error: 'Missing "script" parameter' }, { status: 400 });
    }

    const callback_url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tavus/webhook`;



    const response = await fetch(TAVUS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': "a69c44572f7d4131bfc080925fa15db3",
      },
      body: JSON.stringify({
        replica_id: "rca8a38779a8",
        script,
        background_source_url,
        webhook_url: callback_url, // 👈 Tavus will call this when done
      }),
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      console.error('Tavus API error:', data);
      return NextResponse.json({ error: data }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
