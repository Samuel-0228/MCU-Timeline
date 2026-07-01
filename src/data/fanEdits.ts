export type FanEditPlatform = "youtube" | "tiktok";

export type FanEditMood = "Epic" | "Sad" | "Funny" | "Intense" | "Inspirational";

export type FanEditTeam = "Avengers" | "Iron Man" | "Captain America" | "Thor" | "Guardians" | "Black Widow" | "Mixed";

export interface FanEditEntry {
  id: string;
  title: string;
  creator: string;
  platform: FanEditPlatform;
  sourceUrl: string;
  youtubeId?: string;
  tiktokId?: string;
  caption: string;
  character: string;
  mood: FanEditMood;
  team: FanEditTeam;
  durationLabel: string;
  likes: number;
  saves: number;
  views: number;
  tags: string[];
  featured?: boolean;
  status?: "curated" | "approved" | "pending" | "rejected";
  createdAt?: string;
}

export const fanEditFilterOptions = {
  characters: ["All", "Iron Man", "Captain America", "Thor", "Hulk", "Black Widow", "Guardians", "Avengers"],
  moods: ["All", "Epic", "Sad", "Funny", "Intense", "Inspirational"],
  teams: ["All", "Avengers", "Iron Man", "Captain America", "Thor", "Guardians", "Black Widow", "Mixed"],
} as const;

export const fanEditTagSuggestions = [
  "Iron Man",
  "Captain America",
  "Thor",
  "Avengers",
  "Guardians",
  "Sad edits",
  "Epic edits",
  "Funny edits",
  "Cinematic",
  "Character study",
];

export const curatedFanEdits: FanEditEntry[] = [
  {
    id: "fan-edit-iron-man-rescue",
    title: "Iron Man",
    creator: "Curated by Avengers Timeline",
    platform: "youtube",
    sourceUrl: "https://www.youtube.com/shorts/2Eh-mlxaQ3o",
    youtubeId: "2Eh-mlxaQ3o",
    caption: "Tony Stark's origin, suit-up energy, and swagger packed into a clean, high-impact edit.",
    character: "Iron Man",
    mood: "Epic",
    team: "Iron Man",
    durationLabel: "0:42",
    likes: 1842,
    saves: 311,
    views: 18940,
    tags: ["Iron Man", "Epic edits", "Cinematic"],
    featured: true,
    status: "curated",
  },
  {
    id: "fan-edit-cap-serum",
    title: "Captain America: Worthiness Cut",
    creator: "Curated by Avengers Timeline",
    platform: "youtube",
    sourceUrl: "https://www.youtube.com/shorts/gj5oWzp3tyU",
    youtubeId: "gj5oWzp3tyU",
    caption: "A focused tribute to Steve Rogers becoming the heart of the MCU.",
    character: "Captain America",
    mood: "Inspirational",
    team: "Captain America",
    durationLabel: "0:38",
    likes: 1598,
    saves: 287,
    views: 16210,
    tags: ["Captain America", "Inspirational", "Character study"],
    featured: true,
    status: "curated",
  },
  {
    id: "fan-edit-thor-lightning",
    title: "Thor: God of Thunder After Dark",
    creator: "Curated by Avengers Timeline",
    platform: "youtube",
    sourceUrl: "https://www.youtube.com/shorts/JOddp-nlNvQ",
    youtubeId: "JOddp-nlNvQ",
    caption: "Lightning, bass drops, and god-tier entrances built for short-form replay.",
    character: "Thor",
    mood: "Epic",
    team: "Thor",
    durationLabel: "0:45",
    likes: 1310,
    saves: 245,
    views: 14780,
    tags: ["Thor", "Epic edits", "Cinematic"],
    status: "curated",
  },
  {
    id: "fan-edit-avengers-assemble",
    title: "Avengers Assemble: One Shot Energy",
    creator: "Curated by Avengers Timeline",
    platform: "youtube",
    sourceUrl: "https://www.youtube.com/shorts/eOrNdBpGMv8",
    youtubeId: "eOrNdBpGMv8",
    caption: "The team-up that still hits like a final boss reveal.",
    character: "Avengers",
    mood: "Intense",
    team: "Avengers",
    durationLabel: "0:55",
    likes: 2075,
    saves: 439,
    views: 24890,
    tags: ["Avengers", "Intense", "Epic edits"],
    featured: true,
    status: "curated",
  },
  {
    id: "fan-edit-guardians-emotional",
    title: "Guardians: Found Family in 45 Seconds",
    creator: "Curated by Avengers Timeline",
    platform: "youtube",
    sourceUrl: "https://www.youtube.com/shorts/d96cjJhvlMA",
    youtubeId: "d96cjJhvlMA",
    caption: "A cosmic, emotional cut that leans into the Guardians' found-family vibe.",
    character: "Guardians",
    mood: "Sad",
    team: "Guardians",
    durationLabel: "0:44",
    likes: 1220,
    saves: 266,
    views: 13560,
    tags: ["Guardians", "Sad edits", "Found family"],
    status: "curated",
  },
  {
    id: "fan-edit-black-widow-shadow",
    title: "Black Widow: Shadow Work",
    creator: "Curated by Avengers Timeline",
    platform: "youtube",
    sourceUrl: "https://www.youtube.com/shorts/wKtcmiifycU",
    youtubeId: "wKtcmiifycU",
    caption: "A sleek, high-contrast cut for Natasha Romanoff's cold precision and quiet pain.",
    character: "Black Widow",
    mood: "Intense",
    team: "Black Widow",
    durationLabel: "0:36",
    likes: 983,
    saves: 188,
    views: 11420,
    tags: ["Black Widow", "Intense", "Cinematic"],
    status: "curated",
  },
];

export function isSupportedFanEditUrl(url: string) {
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
    return host.includes("youtube.com") || host === "youtu.be" || host.includes("tiktok.com");
  } catch {
    return false;
  }
}

export function parseFanEditSource(url: string): {
  platform: FanEditPlatform;
  youtubeId?: string;
  tiktokId?: string;
} | null {
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();

    if (host.includes("youtube.com") || host === "youtu.be") {
      const shortPathMatch = parsed.pathname.match(/^\/shorts\/([A-Za-z0-9_-]{6,})/);
      if (shortPathMatch?.[1]) {
        return { platform: "youtube", youtubeId: shortPathMatch[1] };
      }

      const watchId = parsed.searchParams.get("v");
      if (watchId) {
        return { platform: "youtube", youtubeId: watchId };
      }

      const youtuBeMatch = parsed.pathname.match(/^\/([A-Za-z0-9_-]{6,})/);
      if (youtuBeMatch?.[1]) {
        return { platform: "youtube", youtubeId: youtuBeMatch[1] };
      }

      return null;
    }

    if (host.includes("tiktok.com")) {
      const videoMatch = parsed.pathname.match(/\/video\/(\d+)/);
      if (videoMatch?.[1]) {
        return { platform: "tiktok", tiktokId: videoMatch[1] };
      }

      return { platform: "tiktok" };
    }

    return null;
  } catch {
    return null;
  }
}
