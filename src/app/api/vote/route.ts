import { NextResponse } from "next/server";

// In-memory global vote store starting with real vote data (0 base)
const globalVotes = {
  captain: 0,
  ironman: 0,
};

export async function GET() {
  return NextResponse.json(globalVotes);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { hero, action, oldHero } = body;

    if (action === "reset") {
      if (oldHero === "captain" && globalVotes.captain > 0) {
        globalVotes.captain -= 1;
      } else if (oldHero === "ironman" && globalVotes.ironman > 0) {
        globalVotes.ironman -= 1;
      }
      return NextResponse.json(globalVotes);
    }

    if (hero === "captain") {
      globalVotes.captain += 1;
    } else if (hero === "ironman") {
      globalVotes.ironman += 1;
    }

    return NextResponse.json(globalVotes);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
