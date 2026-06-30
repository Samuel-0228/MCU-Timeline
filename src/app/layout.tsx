import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avengers Timeline | Marvel Cinematic Universe Chronological Guide",
  description: "An immersive, interactive timeline of the Marvel Cinematic Universe (MCU) featuring chronological ordering, official YouTube video recaps, character filtering, and thematic design.",
  keywords: ["Avengers", "MCU", "Timeline", "Marvel", "Chronological", "Iron Man", "Captain America", "Thor", "Guardians of the Galaxy"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans antialiased">
      <body className="min-h-screen flex flex-col selection:bg-lime-300 selection:text-neutral-950">
        {children}
      </body>
    </html>
  );
}
