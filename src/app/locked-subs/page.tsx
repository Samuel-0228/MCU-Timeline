import { cookies } from "next/headers";
import { getSupabaseAdmin } from "../../lib/supabaseServer";
import LockedSubsClient from "./locked-subs-client";

const adminCookieName = "locked-subs-admin";
export const dynamic = "force-dynamic";

async function isAuthorized() {
  const expectedKey = process.env.ADMIN_ROUTE_KEY;
  if (!expectedKey) return false;
  const cookieStore = await cookies();
  return cookieStore.get(adminCookieName)?.value === expectedKey;
}

export default async function LockedSubsPage() {
  if (!process.env.ADMIN_ROUTE_KEY) {
    return (
      <main className="min-h-screen bg-[#05060a] px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-black">Locked Subs admin is not configured</h1>
          <p className="mt-3 text-sm text-white/70">
            Set ADMIN_ROUTE_KEY in your environment to enable the locked admin route.
          </p>
        </div>
      </main>
    );
  }

  if (!(await isAuthorized())) {
    return <LockedSubsClient />;
  }

  const supabase: any = getSupabaseAdmin();
  const [feedResult, pendingResult, countResult] = await Promise.all([
    supabase.from("fan_edits").select("*").eq("status", "approved").order("featured", { ascending: false }).order("created_at", { ascending: false }),
    supabase.from("fan_edits").select("*").eq("status", "pending").order("created_at", { ascending: false }),
    supabase.from("fan_edits").select("id", { count: "exact", head: true }),
  ]);

  if (feedResult.error || pendingResult.error || countResult.error) {
    return (
      <main className="min-h-screen bg-[#05060a] px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-black">Locked Subs load failed</h1>
          <p className="mt-3 text-sm text-white/70">{feedResult.error?.message || pendingResult.error?.message || countResult.error?.message}</p>
        </div>
      </main>
    );
  }

  return (
    <LockedSubsClient
      authorized
      initialFeed={(feedResult.data || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        creator: item.creator || "",
        platform: item.platform,
        sourceUrl: item.video_url,
        youtubeId: item.youtube_id || undefined,
        tiktokId: item.tiktok_id || undefined,
        caption: item.caption || "",
        character: item.character,
        mood: item.mood,
        team: item.team,
        durationLabel: item.duration_label || "--",
        likes: item.likes,
        saves: item.saves,
        tags: item.tags || [],
        status: item.status,
        featured: item.featured,
        createdAt: item.created_at,
      }))}
      initialPending={(pendingResult.data || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        creator: item.creator || "",
        platform: item.platform,
        sourceUrl: item.video_url,
        youtubeId: item.youtube_id || undefined,
        tiktokId: item.tiktok_id || undefined,
        caption: item.caption || "",
        character: item.character,
        mood: item.mood,
        team: item.team,
        durationLabel: item.duration_label || "--",
        likes: item.likes,
        saves: item.saves,
        tags: item.tags || [],
        status: item.status,
        featured: item.featured,
        createdAt: item.created_at,
      }))}
      initialSubmissionCount={countResult.count || 0}
    />
  );
}
