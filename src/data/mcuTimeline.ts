export interface TimelineEntry {
  id: string;
  title: string;
  phase: string;
  chronologicalYear: string;
  releaseYear: number;
  summary: string;
  keyEvents: string[];
  characters: string[];
  youtubeEmbedId: string;
  theme: "ironman" | "cap" | "thor" | "guardians" | "avengers";
  isAlternateTimeline?: boolean;
}

export const mcuTimeline: TimelineEntry[] = [
  {
    id: "cap-first-avenger",
    title: "Captain America: The First Avenger",
    phase: "Phase 1",
    chronologicalYear: "1943–1945",
    releaseYear: 2011,
    summary: "Steve Rogers, a frail but courageous young man, is transformed into the peak human Super-Soldier known as Captain America during World War II. He battles the ruthless Red Skull, leader of the rogue Hydra science division, who seeks world domination using the cosmic Tesseract. Through immense sacrifice, Rogers crashes a bomber into the Arctic ice, preserving himself for the future.",
    keyEvents: [
      "Creation of the Super-Soldier Serum by Dr. Abraham Erskine.",
      "Hydra harnesses the power of the Tesseract (Space Stone).",
      "Steve Rogers is frozen in Arctic ice for nearly 70 years."
    ],
    characters: ["Steve Rogers / Captain America", "Peggy Carter", "Bucky Barnes", "Johann Schmidt / Red Skull", "Howard Stark", "Dr. Abraham Erskine"],
    youtubeEmbedId: "gj5oWzp3tyU",
    theme: "cap"
  },
  {
    id: "captain-marvel",
    title: "Captain Marvel",
    phase: "Phase 3",
    chronologicalYear: "1995",
    releaseYear: 2019,
    summary: "Carol Danvers, an amnesiac Kree warrior, crashes onto Earth in 1995 and teams up with Nick Fury to uncover her forgotten human past. She discovers she gained spectacular cosmic powers from an explosion involving the Tesseract. Realizing the truth about the Kree-Skrull war, Danvers unlocks her full binary potential to defend the innocent and inspires Fury's future Avengers Initiative.",
    keyEvents: [
      "Nick Fury meets his first super-powered hero and conceives the Avengers Initiative.",
      "Carol Danvers fully unlocks her powers derived from the Tesseract.",
      "The Skrull refugees are aided in finding a safe sanctuary across the stars."
    ],
    characters: ["Captain Marvel", "Nick Fury", "Phil Coulson", "Talos", "Yon-Rogg"],
    youtubeEmbedId: "0LHxvxdRnYc",
    theme: "avengers"
  },
  {
    id: "iron-man-1",
    title: "Iron Man",
    phase: "Phase 1",
    chronologicalYear: "2010",
    releaseYear: 2008,
    summary: "Billionaire weapons inventor Tony Stark is captured by terrorists in Afghanistan and witnesses the devastation caused by his own munitions. Building a miniaturized Arc Reactor and an armored suit to escape, he returns home to cease weapons manufacturing and perfects the advanced Mark III armor. He defeats his treacherous mentor Obadiah Stane and famously declares to the press, 'I am Iron Man.'",
    keyEvents: [
      "Invention of the miniaturized Arc Reactor and the Iron Man armor.",
      "Tony Stark publicly reveals his identity as Iron Man.",
      "Nick Fury approaches Stark regarding the Avengers Initiative."
    ],
    characters: ["Iron Man", "Pepper Potts", "James Rhodes", "Obadiah Stane", "Nick Fury"],
    youtubeEmbedId: "8ugaeA-nMTc",
    theme: "ironman"
  },
  {
    id: "iron-man-2",
    title: "Iron Man 2",
    phase: "Phase 1",
    chronologicalYear: "2011",
    releaseYear: 2010,
    summary: "Facing intense government pressure to hand over the Iron Man technology and suffering from palladium toxicity, Tony Stark must confront his family's past and a vengeful physicist named Ivan Vanko. With the help of Natasha Romanoff and Nick Fury, Stark synthesizes a brand-new element to power his suit safely. He teams up with James Rhodes, now wearing the War Machine armor, to defeat Vanko's drone army.",
    keyEvents: [
      "Tony Stark synthesizes a new chemical element created by his father Howard Stark.",
      "Natasha Romanoff goes undercover as Stark's assistant.",
      "James Rhodes adopts the War Machine mantle."
    ],
    characters: ["Iron Man", "War Machine", "Black Widow", "Nick Fury", "Justin Hammer", "Whiplash"],
    youtubeEmbedId: "wKtcmiifycU",
    theme: "ironman"
  },
  {
    id: "incredible-hulk",
    title: "The Incredible Hulk",
    phase: "Phase 1",
    chronologicalYear: "2011",
    releaseYear: 2008,
    summary: "Fugitive scientist Bruce Banner seeks a cure for the gamma radiation mutation that transforms him into the monstrous Hulk whenever his heart rate rises. Pursued relentlessly by General Thaddeus Ross and the military, Banner's blood is used to transform soldier Emil Blonsky into the Abomination. Banner willingly unleashes the Hulk to defeat the Abomination in Harlem and flees into hiding.",
    keyEvents: [
      "Bruce Banner attempts to control and cure his gamma transformation.",
      "Emil Blonsky becomes the Abomination via a flawed Super-Soldier variant.",
      "Tony Stark approaches General Ross regarding a special team being put together."
    ],
    characters: ["Bruce Banner / Hulk", "General Ross", "Emil Blonsky", "Betty Ross"],
    youtubeEmbedId: "xbqNb2PFKKA",
    theme: "avengers"
  },
  {
    id: "thor-1",
    title: "Thor",
    phase: "Phase 1",
    chronologicalYear: "2011",
    releaseYear: 2011,
    summary: "The arrogant God of Thunder, Thor, is stripped of his divine powers and banished to Earth by his father Odin after reigniting a dormant war with the Frost Giants. Unworthy to lift his enchanted hammer Mjolnir, Thor learns humility and self-sacrifice alongside astrophysicist Jane Foster. He sacrifices himself to save his friends from the Destroyer, regaining his powers to stop his adopted brother Loki.",
    keyEvents: [
      "Thor is banished to Earth and learns true heroism and humility.",
      "Loki discovers his true heritage as a Frost Giant and attempts to seize the throne of Asgard.",
      "S.H.I.E.L.D. confiscates Jane Foster's research and takes possession of the crash site."
    ],
    characters: ["Thor", "Loki", "Jane Foster", "Odin", "Hawkeye", "Phil Coulson"],
    youtubeEmbedId: "JOddp-nlNvQ",
    theme: "thor"
  },
  {
    id: "the-avengers",
    title: "The Avengers",
    phase: "Phase 1",
    chronologicalYear: "2012",
    releaseYear: 2012,
    summary: "When Loki steals the Tesseract to lead a Chitauri alien invasion of Earth, S.H.I.E.L.D. Director Nick Fury activates the Avengers Initiative. Iron Man, Captain America, Thor, Hulk, Black Widow, and Hawkeye must overcome their intense egos and conflicting ideologies to assemble as a team. They successfully defend New York City in a legendary battle that alters the world forever.",
    keyEvents: [
      "The formation of the original six Avengers.",
      "The Battle of New York introduces humanity to hostile alien civilizations.",
      "Tony Stark redirects a nuclear warhead into an alien portal, initiating his prolonged PTSD."
    ],
    characters: ["Iron Man", "Captain America", "Thor", "Hulk", "Black Widow", "Hawkeye", "Loki", "Nick Fury"],
    youtubeEmbedId: "eOrNdBpGMv8",
    theme: "avengers"
  },
  {
    id: "iron-man-3",
    title: "Iron Man 3",
    phase: "Phase 2",
    chronologicalYear: "2012",
    releaseYear: 2013,
    summary: "Struggling with severe post-traumatic stress disorder following the Battle of New York, Tony Stark builds an obsession with creating dozens of automated Iron Man suits. His life is shattered by a mysterious terrorist known as the Mandarin, forcing Stark to rely on his raw genius and ingenuity without his armor. He uncovers the true mastermind behind the explosive Extremis virus and overcomes his inner demons.",
    keyEvents: [
      "Tony Stark overcomes his reliance on the armor and destroys the Iron Legion as a clean slate.",
      "Aldrich Killian utilizes the volatile Extremis genetic restructuring treatment.",
      "Stark undergoes surgery to remove the remaining shrapnel near his heart."
    ],
    characters: ["Iron Man", "Pepper Potts", "War Machine", "Aldrich Killian", "Trevor Slattery"],
    youtubeEmbedId: "Ke1Y3P9D0Bc",
    theme: "ironman"
  },
  {
    id: "thor-dark-world",
    title: "Thor: The Dark World",
    phase: "Phase 2",
    chronologicalYear: "2013",
    releaseYear: 2013,
    summary: "As the Nine Realms align during the Convergence, an ancient race of Dark Elves led by Malekith awakens to plunge the universe into eternal darkness using a fluid weapon known as the Aether. When Jane Foster accidentally becomes the host of the Aether, Thor brings her to Asgard for protection. He forms an uneasy alliance with the imprisoned Loki to thwart Malekith across multiple dimensions.",
    keyEvents: [
      "The Aether is revealed to be the Reality Stone.",
      "Loki fakes his death in battle and secretly usurps Odin's place on the throne of Asgard.",
      "The Reality Stone is delivered to the Collector on Knowhere for safekeeping."
    ],
    characters: ["Thor", "Loki", "Jane Foster", "Odin", "Malekith", "The Collector"],
    youtubeEmbedId: "npvJ9FTgZbM",
    theme: "thor"
  },
  {
    id: "cap-winter-soldier",
    title: "Captain America: The Winter Soldier",
    phase: "Phase 2",
    chronologicalYear: "2014",
    releaseYear: 2014,
    summary: "Steve Rogers struggles to navigate the moral ambiguities of modern espionage while working for S.H.I.E.L.D. alongside Natasha Romanoff. When Nick Fury is targeted by assassins, Rogers uncovers a terrifying conspiracy: Hydra has secretly infiltrated S.H.I.E.L.D. at its highest levels for decades. Teamed with the Falcon, Cap must dismantle Project Insight and face the mysterious assassin known as the Winter Soldier—his brainwashed best friend Bucky Barnes.",
    keyEvents: [
      "The complete collapse of S.H.I.E.L.D. following the public exposure of Hydra's infiltration.",
      "Bucky Barnes is revealed to be alive as Hydra's premier brainwashed assassin.",
      "Sam Wilson adopts the winged combat exo-suit to become the Falcon."
    ],
    characters: ["Captain America", "Black Widow", "Falcon", "Winter Soldier", "Nick Fury", "Alexander Pierce"],
    youtubeEmbedId: "7SlILk2WMTI",
    theme: "cap"
  },
  {
    id: "guardians-1",
    title: "Guardians of the Galaxy",
    phase: "Phase 2",
    chronologicalYear: "2014",
    releaseYear: 2014,
    summary: "Brash space adventurer Peter Quill finds himself the target of a relentless bounty hunt after stealing a mysterious orb coveted by Ronan the Accuser, a radical Kree warlord. To evade Ronan, Quill is forced into an uneasy truce with a quartet of disparate misfits: Rocket, Groot, Gamora, and Drax the Destroyer. Discovering the orb houses the cosmic Power Stone, the unlikely heroes put their lives on the line to save the galaxy.",
    keyEvents: [
      "The formation of the Guardians of the Galaxy.",
      "Thanos makes his presence known through his proxy enforcers Ronan and Gamora.",
      "The Nova Corps safeguards the Power Stone on Xandar."
    ],
    characters: ["Star-Lord", "Gamora", "Drax", "Rocket Rocket", "Groot", "Ronan", "Thanos"],
    youtubeEmbedId: "d96cjJhvlMA",
    theme: "guardians"
  },
  {
    id: "guardians-2",
    title: "Guardians of the Galaxy Vol. 2",
    phase: "Phase 2",
    chronologicalYear: "2014",
    releaseYear: 2017,
    summary: "Set just months after their initial victory, the Guardians travel the outer reaches of the cosmos while struggling to keep their newfound family together. Peter Quill encounters his biological father, an ancient and immensely powerful Celestial named Ego. As old foes become crucial allies, Quill discovers Ego's sinister cosmic expansion plan and must rely on his chosen family to defeat a literal planet.",
    keyEvents: [
      "Ego is revealed as a Celestial who planted expansion seeds across thousands of worlds.",
      "Yondu Udonta sacrifices himself to save Quill, proving himself as Quill's true father figure.",
      "Mantis joins the Guardians of the Galaxy."
    ],
    characters: ["Star-Lord", "Gamora", "Drax", "Rocket Rocket", "Groot", "Yondu", "Mantis", "Ego"],
    youtubeEmbedId: "duGqrYw4usE",
    theme: "guardians"
  },
  {
    id: "age-of-ultron",
    title: "Avengers: Age of Ultron",
    phase: "Phase 2",
    chronologicalYear: "2015",
    releaseYear: 2015,
    summary: "Attempting to create a global peacekeeping artificial intelligence using Loki's scepter, Tony Stark and Bruce Banner inadvertently unleash Ultron, a sentient android obsessed with achieving peace through human extinction. The Avengers must reassemble to stop Ultron's cataclysmic plan in Sokovia. Along the way, they encounter the super-powered twins Wanda and Pietro Maximoff and witness the birth of the Vision.",
    keyEvents: [
      "The creation of the Vision using the Mind Stone housed inside Loki's scepter.",
      "The destruction of Sokovia, which directly incites international demand for superhero oversight.",
      "Wanda Maximoff joins the Avengers following the tragic death of her brother Pietro."
    ],
    characters: ["Iron Man", "Captain America", "Thor", "Hulk", "Black Widow", "Hawkeye", "Wanda Maximoff", "Vision", "Ultron"],
    youtubeEmbedId: "tmeOjFno6Do",
    theme: "avengers"
  },
  {
    id: "ant-man",
    title: "Ant-Man",
    phase: "Phase 2",
    chronologicalYear: "2015",
    releaseYear: 2015,
    summary: "Master thief Scott Lang is recruited by veteran scientist Hank Pym to don a specialized suit that allows the wearer to shrink in scale but increase immensely in strength. Pym's former protégé, Darren Cross, is on the verge of weaponizing similar shrinking technology known as the Yellowjacket armor. Lang must pull off a daring corporate heist to destroy Cross's research and secure the secrets of the Pym Particles.",
    keyEvents: [
      "Scott Lang successfully inherits the Ant-Man mantle from Hank Pym.",
      "Lang successfully breaches the subatomic Quantum Realm and manages to return.",
      "The Avengers facility is breached during a brief scuffle with the Falcon."
    ],
    characters: ["Ant-Man", "Hank Pym", "Hope van Dyne", "Yellowjacket", "Falcon"],
    youtubeEmbedId: "pWdKf3MneyI",
    theme: "ironman"
  },
  {
    id: "cap-civil-war",
    title: "Captain America: Civil War",
    phase: "Phase 3",
    chronologicalYear: "2016",
    releaseYear: 2016,
    summary: "Mounting collateral damage from Avengers operations prompts the United Nations to pass the Sokovia Accords, establishing a governing body to oversee and direct the team. This fractures the Avengers into two opposing factions: one led by Tony Stark supporting oversight, and another led by Steve Rogers defending autonomy. The rift deepens when Helmut Zemo frames Bucky Barnes for terrorism, leading to a brutal, deeply personal clash.",
    keyEvents: [
      "The introduction of the Sokovia Accords fractures the Avengers into warring factions.",
      "King T'Challa of Wakanda is introduced as the Black Panther.",
      "Peter Parker is recruited by Tony Stark, introducing Spider-Man to the wider MCU."
    ],
    characters: ["Captain America", "Iron Man", "Black Widow", "Winter Soldier", "Falcon", "Black Panther", "Spider-Man", "Wanda Maximoff", "Vision", "Ant-Man", "Helmut Zemo"],
    youtubeEmbedId: "dKrVegVI0Us",
    theme: "cap"
  },
  {
    id: "black-widow",
    title: "Black Widow",
    phase: "Phase 4",
    chronologicalYear: "2016",
    releaseYear: 2021,
    summary: "Following the events of the Leipzig airport clash in Civil War, a fugitive Natasha Romanoff is forced to confront the darker parts of her ledger when a dangerous conspiracy tied to her past arises. Pursued by the relentless Taskmaster, Natasha reunites with her estranged Russian 'family'—Yelena Belova, Alexei Shostakov (Red Guardian), and Melina Vostokoff—to completely dismantle the secretive Red Room academy.",
    keyEvents: [
      "The complete destruction of General Dreykov's Red Room and the liberation of the mind-controlled Widows.",
      "Yelena Belova is introduced as Natasha's fiercely loyal sister figure.",
      "Natasha procures a Quinjet to aid in breaking her imprisoned Avengers out of the Raft."
    ],
    characters: ["Black Widow", "Yelena Belova", "Red Guardian", "Melina Vostokoff", "Taskmaster"],
    youtubeEmbedId: "ybji16u608U",
    theme: "avengers"
  },
  {
    id: "black-panther",
    title: "Black Panther",
    phase: "Phase 3",
    chronologicalYear: "2016",
    releaseYear: 2018,
    summary: "Following the tragic death of his father in Vienna, T'Challa returns home to the technologically advanced, secretive African nation of Wakanda to take his rightful place as King. However, his reign is swiftly challenged by Erik Killmonger, a fierce American operative with a deeply personal claim to the throne. Killmonger seeks to use Wakanda's vibranium weapons to start a global revolution.",
    keyEvents: [
      "T'Challa defends his throne and inherits the mantle of Black Panther.",
      "Wakanda ends its centuries-old isolationist policy and shares its advanced technological knowledge with the world.",
      "Bucky Barnes is granted sanctuary in Wakanda to heal his damaged mind."
    ],
    characters: ["Black Panther", "Erik Killmonger", "Shuri", "Nakia", "Okoye", "Everett Ross", "Ulysses Klaue"],
    youtubeEmbedId: "xjDjIWPwcPU",
    theme: "avengers"
  },
  {
    id: "spiderman-homecoming",
    title: "Spider-Man: Homecoming",
    phase: "Phase 3",
    chronologicalYear: "2016",
    releaseYear: 2017,
    summary: "Thrilled by his experience with the Avengers, young Peter Parker returns home to Queens, trying to balance his normal high school life with his crime-fighting duties as Spider-Man under the watchful eye of Tony Stark. Peter encounters a dangerous new underground threat in Adrian Toomes, the Vulture, who builds deadly weaponry utilizing scavenged alien Chitauri technology.",
    keyEvents: [
      "Peter Parker learns that he must be a true hero with or without Stark's high-tech suit.",
      "Tony Stark invites Peter to officially join the Avengers, but Peter humbly declines to remain a friendly neighborhood hero.",
      "Pepper Potts and Tony Stark publicly reunite during a press conference."
    ],
    characters: ["Spider-Man", "Iron Man", "Vulture", "Ned Leeds", "Happy Hogan", "Aunt May"],
    youtubeEmbedId: "U0D3AOldjMU",
    theme: "ironman"
  },
  {
    id: "doctor-strange",
    title: "Doctor Strange",
    phase: "Phase 3",
    chronologicalYear: "2016–2017",
    releaseYear: 2016,
    summary: "World-renowned neurosurgeon Dr. Stephen Strange suffers career-ending nerve damage in a horrific car accident. Seeking a miracle cure, he travels to Kamar-Taj in Nepal, where he is taken in by the Ancient One and introduced to the hidden world of mystic arts and alternate dimensions. Strange must master his magical potential to defend Earth against Kaecilius and the dread dimensional ruler Dormammu.",
    keyEvents: [
      "Stephen Strange masters the mystic arts and inherits the Cloak of Levitation.",
      "The Eye of Agamotto is revealed to house the Time Stone.",
      "Strange uses a time loop to bargain with Dormammu, forcing the entity to abandon its invasion of Earth."
    ],
    characters: ["Doctor Strange", "The Ancient One", "Mordo", "Wong", "Kaecilius", "Dormammu"],
    youtubeEmbedId: "HSzx-zryEgM",
    theme: "thor"
  },
  {
    id: "thor-ragnarok",
    title: "Thor: Ragnarok",
    phase: "Phase 3",
    chronologicalYear: "2017",
    releaseYear: 2017,
    summary: "Following the death of Odin, Thor's immensely powerful, imprisoned sister Hela, the Goddess of Death, escapes to claim Asgard and effortlessly shatters Mjolnir. Cast out into space, Thor is enslaved as a gladiator on the garbage world of Sakaar, where he must fight his old teammate, the Incredible Hulk. Thor forms a ragtag team known as the Revengers to escape Sakaar and save the Asgardian populace.",
    keyEvents: [
      "The destruction of Thor's hammer Mjolnir and the realization that his thunder powers reside within himself.",
      "Surtur is willingly unleashed to initiate Ragnarok, utterly destroying the physical realm of Asgard to defeat Hela.",
      "The surviving Asgardian refugees board a giant vessel heading for Earth, only to be intercepted by Thanos."
    ],
    characters: ["Thor", "Hulk", "Loki", "Valkyrie", "Hela", "Grandmaster", "Heimdall", "Korg"],
    youtubeEmbedId: "ue80QwXMRHg",
    theme: "thor"
  },
  {
    id: "antman-and-wasp",
    title: "Ant-Man and the Wasp",
    phase: "Phase 3",
    chronologicalYear: "2018",
    releaseYear: 2018,
    summary: "Under house arrest following his involvement in the Leipzig airport battle, Scott Lang is urgently contacted by Hank Pym and Hope van Dyne, who has embraced the superhero mantle of the Wasp. They discover a working method to navigate the Quantum Realm to rescue Janet van Dyne, who has been trapped subatomically for thirty years. Their mission is threatened by a ghost-like quantum anomaly named Ava Starr.",
    keyEvents: [
      "Janet van Dyne is successfully rescued from the Quantum Realm after thirty years.",
      "Scott Lang enters a portable quantum tunnel to harvest healing particles, only to be trapped when Thanos snaps his fingers.",
      "The Quantum Realm is proven to be a bridge capable of circumventing traditional space-time."
    ],
    characters: ["Ant-Man", "Wasp", "Hank Pym", "Janet van Dyne", "Ghost", "Bill Foster"],
    youtubeEmbedId: "UUkn-enk2RU",
    theme: "ironman"
  },
  {
    id: "infinity-war",
    title: "Avengers: Infinity War",
    phase: "Phase 3",
    chronologicalYear: "2018",
    releaseYear: 2018,
    summary: "The mad titan Thanos embarks on a brutal, sweeping campaign to gather all six Infinity Stones, intending to wipe out half of all life in the universe to restore 'balance'. The fractured Avengers must unite with the Guardians of the Galaxy, Doctor Strange, and the armies of Wakanda to stage a desperate defense across multiple planets. Despite their valiant efforts, Thanos acquires the stones and executes the fateful Snap.",
    keyEvents: [
      "Thanos sacrifices Gamora on Vormir to acquire the Soul Stone.",
      "Thor forges the formidable battle-axe Stormbreaker in Nidavellir.",
      "Thanos executes the Snap, turning half of all living creatures in the universe to dust."
    ],
    characters: ["Iron Man", "Thor", "Captain America", "Doctor Strange", "Star-Lord", "Spider-Man", "Black Panther", "Thanos"],
    youtubeEmbedId: "6ZfuNTqbHE8",
    theme: "avengers"
  },
  {
    id: "endgame",
    title: "Avengers: Endgame",
    phase: "Phase 3",
    chronologicalYear: "2018–2023",
    releaseYear: 2019,
    summary: "Five years after Thanos erased half of all life, a grief-stricken universe remains in ruins. When Scott Lang emerges from the Quantum Realm with a radical theory about time travel, the remaining Avengers regroup to execute a daring 'Time Heist' to retrieve the Infinity Stones from the past. After undoing the Snap, the assembled heroes of the universe stage a climactic, titanic final battle against an invading past version of Thanos.",
    keyEvents: [
      "The successful execution of the Time Heist across 2012, 2013, 2014, and 1970.",
      "Natasha Romanoff sacrifices her life on Vormir to secure the Soul Stone.",
      "Tony Stark utilizes the infinity gauntlet to dust Thanos and his army, sacrificing his life to save the universe."
    ],
    characters: ["Iron Man", "Captain America", "Thor", "Hulk", "Black Widow", "Hawkeye", "Ant-Man", "Thanos"],
    youtubeEmbedId: "TcMBFSGVi1c",
    theme: "avengers"
  },
  {
    id: "loki-series",
    title: "Loki (Season 1 & 2)",
    phase: "Phase 4 & 5",
    chronologicalYear: "Outside Time / Alternate Timeline",
    releaseYear: 2021,
    summary: "Following his escape with the Tesseract during the Avengers' 2012 Time Heist, an alternate variant of Loki is apprehended by the Time Variance Authority (TVA), a bureaucratic organization operating outside of space and time. Alongside Agent Mobius and a female variant named Sylvie, Loki uncovers the dark truth behind the Sacred Timeline, encountering He Who Remains and ultimately sacrificing himself to become the living loom holding the Multiverse together.",
    keyEvents: [
      "Sylvie slays He Who Remains, shattering the Sacred Timeline into an expanding Multiverse.",
      "The introduction of Kang variants across branching multiversal realities.",
      "Loki physically grasps the branching timelines of the multiverse, becoming the legendary God of Stories."
    ],
    characters: ["Loki", "Mobius M. Mobius", "Sylvie", "Ravonna Renslayer", "He Who Remains / Kang"],
    youtubeEmbedId: "NQ1CMrhUG4g",
    theme: "thor",
    isAlternateTimeline: true
  },
  {
    id: "wandavision",
    title: "WandaVision",
    phase: "Phase 4",
    chronologicalYear: "2023",
    releaseYear: 2021,
    summary: "Overwhelmed by profound grief following the death of Vision in Infinity War, Wanda Maximoff unwittingly unleashes immense chaos magic to engulf the suburban town of Westview, New Jersey, in an idyllic sitcom-inspired reality. As S.W.O.R.D. operatives attempt to breach the anomaly, Wanda is forced to confront her deepest traumas, battle the witch Agatha Harkness, and fully embrace her legendary destiny as the Scarlet Witch.",
    keyEvents: [
      "Wanda Maximoff completely awakens her dormant chaos magic to become the fabled Scarlet Witch.",
      "The creation and subsequent awakening of the reconstructed White Vision.",
      "Wanda acquires the legendary dark grimoire known as the Darkhold."
    ],
    characters: ["Wanda Maximoff / Scarlet Witch", "Vision", "Agatha Harkness", "Monica Rambeau", "Darcy Lewis", "Jimmy Woo"],
    youtubeEmbedId: "sj9J2ecsSpo",
    theme: "avengers"
  },
  {
    id: "spiderman-far-from-home",
    title: "Spider-Man: Far From Home",
    phase: "Phase 3",
    chronologicalYear: "2024",
    releaseYear: 2019,
    summary: "Still mourning the immense loss of his mentor Tony Stark, Peter Parker embarks on a summer school trip across Europe, seeking a brief break from superhero duties. However, Nick Fury recruits him to fight elemental monsters alongside Quentin Beck, a mysterious interdimensional warrior known as Mysterio. Peter soon discovers Beck is a disgruntled former Stark employee staging advanced illusion tech to steal E.D.I.T.H. orbital defense drones.",
    keyEvents: [
      "Peter Parker defeats Mysterio and overcomes his crippling insecurity regarding Tony Stark's legacy.",
      "Mysterio releases a doctored video posthumously framing Spider-Man for murder and revealing Peter Parker's secret identity to the world.",
      "Nick Fury is revealed to be operating aboard a deep-space Skrull command station."
    ],
    characters: ["Spider-Man", "Mysterio", "Nick Fury", "MJ", "Ned Leeds", "Happy Hogan"],
    youtubeEmbedId: "Nt9L1jCKGnE",
    theme: "ironman"
  },
  {
    id: "spiderman-no-way-home",
    title: "Spider-Man: No Way Home",
    phase: "Phase 4",
    chronologicalYear: "2024",
    releaseYear: 2021,
    summary: "With his secret identity exposed, Peter Parker's life is turned upside down. He seeks the magical aid of Doctor Strange to cast a spell making the world forget he is Spider-Man. When Peter tampers with the spell, it ruptures the boundaries of the multiverse, pulling in iconic villains from alternate realities. Peter must team up with two alternate universe variants of himself to cure the villains before making the ultimate sacrifice.",
    keyEvents: [
      "Doctor Strange's corrupted memory spell bridges multiple alternate Spider-Man cinematic dimensions.",
      "The tragic death of Aunt May, who imparts the legendary lesson: 'With great power, there must also come great responsibility.'",
      "Peter Parker makes the heartbreaking choice to have the entire world completely forget his existence."
    ],
    characters: ["Spider-Man", "Doctor Strange", "Green Goblin", "Doc Ock", "Electro", "MJ", "Ned Leeds"],
    youtubeEmbedId: "JfVOs4VSpmA",
    theme: "avengers"
  },
  {
    id: "multiverse-of-madness",
    title: "Doctor Strange in the Multiverse of Madness",
    phase: "Phase 4",
    chronologicalYear: "2024",
    releaseYear: 2022,
    summary: "Doctor Strange encounters America Chavez, a young girl with the extraordinary ability to punch star-shaped portals across the multiverse. She is being hunted by Wanda Maximoff, who has been completely corrupted by the Darkhold in her desperate quest to find an alternate reality where her twin children exist. Strange must traverse mind-bending dimensions and face the Illuminati to stop the Scarlet Witch's rampage.",
    keyEvents: [
      "America Chavez demonstrates her unique multiversal traveling capabilities.",
      "The introduction of Earth-838 and the superhero governing council known as the Illuminati.",
      "Wanda Maximoff recognizes past corruption and destroys the Darkhold in every universe."
    ],
    characters: ["Doctor Strange", "Scarlet Witch", "America Chavez", "Wong", "Christine Palmer", "Mordo"],
    youtubeEmbedId: "aWzlQ2N6qqg",
    theme: "thor"
  },
  {
    id: "guardians-3",
    title: "Guardians of the Galaxy Vol. 3",
    phase: "Phase 5",
    chronologicalYear: "2026",
    releaseYear: 2023,
    summary: "The Guardians of the Galaxy are settling into life on Knowhere when their peace is violently upended by an unprovoked attack from Adam Warlock, leaving Rocket gravely injured. To save their friend's life, Peter Quill and the Guardians embark on a dangerous mission to infiltrate the headquarters of Rocket's cruel creator, the High Evolutionary. The journey tests their bonds and results in a heartfelt final disbandment of the original roster.",
    keyEvents: [
      "Rocket's tragic backstory as a genetically engineered test subject of the High Evolutionary is unveiled.",
      "The defeat of the High Evolutionary and the liberation of thousands of genetically modified captives.",
      "The original Guardians officially disband, with Rocket taking the helm as leader of the new Guardians."
    ],
    characters: ["Star-Lord", "Rocket Rocket", "Gamora", "Drax", "Groot", "Mantis", "High Evolutionary", "Adam Warlock"],
    youtubeEmbedId: "u3V5KDHRQvk",
    theme: "guardians"
  }
];
