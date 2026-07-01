import { NextResponse } from "next/server";
import { curatedFanEdits, isSupportedFanEditUrl, parseFanEditSource } from "../../../data/fanEdits";
import { getSupabaseAdmin } from "../../../lib/supabaseServer";

type FanEditRow = {
  id: string;
  video_url: string;
  title: string;
  creator: string | null;
  caption: string | null;
  platform: "youtube" | "tiktok";
  youtube_id: string | null;
  tiktok_id: string | null;
  character: string;
  mood: string;
  team: string;
  duration_label: string | null;
  likes: number;
  saves: number;
  tags: string[];
  status: "pending" | "approved" | "rejected";
  featured: boolean;
  views: number;
  created_at: string;
  moderation_tags: string[];
};

type FanEditRecord = {
  id: string;
  sourceUrl: string;
  title: string;
  creator: string;
  platform: "youtube" | "tiktok";
  youtubeId?: string;
  tiktokId?: string;
  caption: string;
  character: string;
  mood: string;
  team: string;
  durationLabel: string;
  likes: number;
  saves: number;
  tags: string[];
  status: "pending" | "approved" | "rejected" | "curated";
  featured?: boolean;
  views: number;
  createdAt: string;
};

type FanEditInsertRow = {
  video_url: string;
  title: string;
  creator: string | null;
  caption: string;
  platform: "youtube" | "tiktok";
  youtube_id: string | null;
  tiktok_id: string | null;
  character: string;
  mood: string;
  team: string;
  duration_label: string;
  likes: number;
  saves: number;
  tags: string[];
  status: "pending" | "approved" | "rejected";
  featured: boolean;
  views: number;
  moderation_tags: string[];
};

const supabase = () => getSupabaseAdmin();

function mapRow(row: FanEditRow): FanEditRecord {
  return {
    id: row.id,
    sourceUrl: row.video_url,
    title: row.title,
    creator: row.creator || "",
    platform: row.platform,
    youtubeId: row.youtube_id || undefined,
    tiktokId: row.tiktok_id || undefined,
    caption: row.caption || "",
    character: row.character,
    mood: row.mood,
    team: row.team,
    durationLabel: row.duration_label || "--",
    likes: row.likes,
    saves: row.saves,
    tags: row.tags || [],
    status: row.status,
    featured: row.featured,
    views: row.views,
    createdAt: row.created_at,
  };
}

async function ensureSeeded() {
  const fanEditsTable: any = supabase().from("fan_edits");
  const countResult = await fanEditsTable.select("id", { count: "exact", head: true });

  if (countResult.error) {
    throw countResult.error;
  }

  if ((countResult.count || 0) > 0) {
    return;
  }

  const seedRows: FanEditInsertRow[] = curatedFanEdits.map((item) => ({
    video_url: item.sourceUrl,
    title: item.title,
    creator: item.creator,
    caption: item.caption,
    platform: item.platform,
    youtube_id: item.youtubeId || null,
    tiktok_id: item.tiktokId || null,
    character: item.character,
    mood: item.mood,
    team: item.team,
    duration_label: item.durationLabel,
    likes: item.likes,
    saves: item.saves,
    tags: item.tags,
    status: "approved",
    featured: Boolean(item.featured),
    views: 0,
    moderation_tags: [],
  }));

  const seedResult = await fanEditsTable.insert(seedRows as any);
  if (seedResult.error) {
    throw seedResult.error;
  }
}

async function fetchFeed(limit: number, offset: number) {
  const fanEditsTable: any = supabase().from("fan_edits");
  const result = await fanEditsTable
    .select("*")
    .eq("status", "approved")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (result.error) {
    throw result.error;
  }

  return (result.data || []).map((row: FanEditRow) => mapRow(row));
}

async function fetchPending() {
  const fanEditsTable: any = supabase().from("fan_edits");
  const result = await fanEditsTable.select("*").eq("status", "pending").order("created_at", { ascending: false });

  if (result.error) {
    throw result.error;
  }

  return (result.data || []).map((row: FanEditRow) => mapRow(row));
}

export async function GET(request: Request) {
  try {
    await ensureSeeded();

    const url = new URL(request.url);
    const limit = Math.min(Math.max(Number(url.searchParams.get("limit") || 6), 1), 12);
    const offset = Math.max(Number(url.searchParams.get("offset") || 0), 0);
    const [feed, pending] = await Promise.all([fetchFeed(limit, offset), fetchPending()]);

    return NextResponse.json({ feed, pending });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load fan edits.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureSeeded();

    const body = await request.json();
    const videoUrl = typeof body?.videoUrl === "string" ? body.videoUrl.trim() : typeof body?.url === "string" ? body.url.trim() : "";
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const creator = typeof body?.creator === "string" ? body.creator.trim() : "";

    if (!videoUrl || !isSupportedFanEditUrl(videoUrl)) {
      return NextResponse.json({ error: "Please submit a valid YouTube Shorts or TikTok link." }, { status: 400 });
    }

    const parsedSource = parseFanEditSource(videoUrl);
    if (!parsedSource) {
      return NextResponse.json({ error: "The link format is valid, but the video ID could not be extracted." }, { status: 400 });
    }

    const insertPayload: FanEditInsertRow = {
      video_url: videoUrl,
      title: title || "Untitled fan edit",
      creator: creator || null,
      caption: body?.caption || "Pending moderation. This submission will appear in the feed only after admin approval.",
      platform: parsedSource.platform,
      youtube_id: parsedSource.youtubeId || null,
      tiktok_id: parsedSource.tiktokId || null,
      character: typeof body?.character === "string" ? body.character : "Mixed",
      mood: typeof body?.mood === "string" ? body.mood : "Epic",
      team: typeof body?.team === "string" ? body.team : "Mixed",
      duration_label: typeof body?.durationLabel === "string" ? body.durationLabel : "--",
      likes: 0,
      saves: 0,
      tags: Array.isArray(body?.tags) ? body.tags.filter((item: unknown): item is string => typeof item === "string") : [],
      status: "pending",
      featured: false,
      views: 0,
      moderation_tags: [],
    };

    const fanEditsTable: any = supabase().from("fan_edits");
    const insertResult = await fanEditsTable.insert(insertPayload as any).select("*").single();

    if (insertResult.error) {
      return NextResponse.json({ error: insertResult.error.message }, { status: 500 });
    }

    return NextResponse.json({ submission: mapRow(insertResult.data as FanEditRow) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid submission payload.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const id = typeof body?.id === "string" ? body.id : "";
    const action = typeof body?.action === "string" ? body.action : "";
    const moderationTags = Array.isArray(body?.tags)
      ? body.tags.filter((tag: unknown): tag is string => typeof tag === "string").slice(0, 6)
      : [];

    if (!id || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Unsupported moderation action." }, { status: 400 });
    }

    const fanEditsTable: any = supabase().from("fan_edits");
    const updateResult = await fanEditsTable
      .update({
        status: action === "approve" ? "approved" : "rejected",
        moderation_tags: moderationTags,
        tags: moderationTags,
      } as any)
      .eq("id", id)
      .select("*")
      .single();

    if (updateResult.error) {
      return NextResponse.json({ error: updateResult.error.message }, { status: 500 });
    }

    const [feed, pending] = await Promise.all([fetchFeed(12, 0), fetchPending()]);

    return NextResponse.json({
      submission: mapRow(updateResult.data as FanEditRow),
      feed,
      pending,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid moderation payload.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
