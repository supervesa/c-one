export interface StreamItem { id: number; author: string; title: string; text: string; tag: string; faction: 'amppari' | 'kirppu'; orbits: string[]; replyCount?: number; img?: string; }
export const MOCK_STREAM: StreamItem[] = [
  { id: 1, author: "sys_admin", title: "INIT_SEQUENCE", text: "Järjestelmä alustettu. Tarkkaillaan paikallista signaaliliikennettä.", tag: "SYS_LOG", faction: "amppari", orbits: ["sys"], replyCount: 3 },
  { id: 2, author: "kirppu_user", title: "DESIGN_THOUGHT", text: "Asymmetrinen tila digitaaliselle ilmaisulle tuntuu nyt oikealta. Raskaat animaatiot hidastavat vain flow'ta.", tag: "UI_UX", faction: "kirppu", orbits: ["design", "flow"] },
  { id: 3, author: "supervesa", title: "VISUAL_REF", text: "Löysin mielenkiintoisen tekstuurin, joka sopii kellarikerroksen taustalle.", tag: "ASSET", faction: "kirppu", orbits: ["art"], replyCount: 1, img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80" }
];