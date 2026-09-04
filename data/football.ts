export type FootballPlayer = {
  slug: "messi" | "xavi" | "iniesta" | "busquets" | "pedri";
  name: string;
  note: string;
  love: string;
  image: string;
  imageAlt: string;
  sourceUrl: string;
  credit: string;
  license: string;
  licenseUrl: string;
};

export const footballPlayers: FootballPlayer[] = [
  {
    slug: "messi",
    name: "Messi",
    note: "why I fell in love",
    love: "Messi is why I fell in love with football. I've watched his clips too many times, and they still don't feel normal.",
    image: "/images/football/messi.jpg",
    imageAlt: "Lionel Messi on the pitch in an Argentina shirt",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Leo_Messi_Argentina_v_Egypt_7_July_2026-1.jpg",
    credit: "Bryan Berlin / WikiPortraits",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    slug: "xavi",
    name: "Xavi",
    note: "I love the control",
    love: "I love how Xavi could own a match without rushing it. He made control feel exciting.",
    image: "/images/football/xavi.jpg",
    imageAlt: "Xavi Hernández walking at FC Barcelona training",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Xavi_Hern%C3%A1ndez_-_001.jpg",
    credit: "Mutari",
    license: "Public domain",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  },
  {
    slug: "iniesta",
    name: "Iniesta",
    note: "I love the calm",
    love: "Iniesta always looked calm, even when everything around him was frantic. I love that about him.",
    image: "/images/football/iniesta.jpg",
    imageAlt: "Andrés Iniesta lifting the World Cup trophy",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Andr%C3%A9s_Iniesta_Argentina_v_Spain_19_July_2026-034_(cropped).jpg",
    credit: "Bryan Berlin / WikiPortraits",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    slug: "busquets",
    name: "Busquets",
    note: "I watch the space",
    love: "Busquets made me pay attention to what happens before the pass. I could watch his turns and body shape all day.",
    image: "/images/football/busquets.jpg",
    imageAlt: "Sergio Busquets wearing number 28 for FC Barcelona in 2008",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sergio_Busquets.jpg",
    credit: "Shay",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  {
    slug: "pedri",
    name: "Pedri",
    note: "the one I watch now",
    love: "Pedri is the player I look for first now. I love how calm and brave he is with the ball. He feels like the next part of the same story.",
    image: "/images/football/pedri.jpg",
    imageAlt: "Pedri on the pitch in a Spain shirt",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Pedri_France_v_Spain_7.24.26-245.jpg",
    credit: "Bryan Berlin / WikiPortraits",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
];
