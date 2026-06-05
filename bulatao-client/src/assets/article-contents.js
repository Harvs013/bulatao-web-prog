import bpthevirtual from './bpthevirtual.jpg';
import bpfy from './bpfy.jpg';
import lisavma from './lisavma.jpg';
import bppinkvenom from './bppinkvenom.jpg';
import bprosesoty from './bprosesoty.jpg';

const articles = [
  {
    name: "blackpink-makes-history", // String
    image: bpthevirtual,
    title: "BLACKPINK Makes History With 2022 VMAs Win", //String
    content: [
      "The group won for BLACKPINK The Virtual PUBG.",
      "This is the first year that this category has been included in the award show. So, BLACKPINK has made history as the first artist to win.",
      "Additionally, BLACKPINK is nominated for “Best Group/Group of the Year,” and Lisa has won “Best K-Pop” for her solo song “LALISA.”"
    ],
  },
  {
    name: "blackpink-wins-quadruple-crown",
    image: bpfy,
    title: "BLACKPINK Wins Quadruple Crown With “SQUARE UP”, Second Track “Forever Young” Rising In The Charts",
    content: [
      "The love for BLACKPINK just keeps coming! The group’s first mini-album “SQUARE UP” and it’s title track “DDU-DU DDU-DU” has achieved a Gaon Triple Crown for 2018 week 25, June 17 to 23! #1 on the Albums Chart, #1 on the Digital Combined Chart, #1 on the Streaming Chart and #1 on the Download Chart!",
      "The Gaon Music Chart tabulates the relative weekly popularity of songs or albums in South Korea, and is compiled by the Korea Music Content Association and sponsored by South Korea’s Ministry of Culture.",
      "While “DDU-DU DDU-DU” has already had plenty of recognition – the MV became the fastest video by a K-Pop girl group to reach 10 million views on Youtube, and the song reached #55 on the Billboard Top 100 Music Chart – achieving the Quadruple Crown two weeks after the album was released suggests BLACKPINK is maintaining its status as one of the top girl groups of the year.",
    ],
  },
  {
    name: "blackpink-lisa-vma-win",
    image: lisavma,
    title: "BLACKPINK Lisa’s “Best K-Pop” Win At The 2025 VMAs Triggers Massive Backlash",
    content: [
      "Class components have lifecycle methods: mounting, updating, unmounting.",
      "Key methods include: componentDidMount, componentDidUpdate, componentWillUnmount.",
      "Functional components use the useEffect hook to mimic lifecycle behavior.",
      "Example:\nuseEffect(() => {\n  console.log('Mounted');\n  return () => console.log('Unmounted');\n}, []);"
    ],
  },
  {
    name: "blackpink-breaks-youtube-record",
    title: "Blackpink break own YouTube record with Pink Venom music video",
    image: bppinkvenom,
    content: [
      "SEOUL (KOREA HERALD/ASIA NEWS NETWORK) - Blackpink broke their own record with the music video for Pink Venom on YouTube, according to the platform's official tally.",
      "The video logged 90.4 million views in 24 hours when it was unveiled last Friday (Aug 19), surpassing the record they set in 2020 with the music video for How You Like That (86.3 million views). This is a record for a music video from a female artiste and the third-highest in the world, reported South Korean newspaper The Korea Herald..",
      "The top two spots are held by fellow K-pop band BTS, which racked up 108.2 million views for Butter in the first 24 hours in 2021 and 101.1 million views for Dynamite in 2020.",
      "The Pink Venom music video, from their second studio album Born Pink, out on Sept 16, chalked up 100 million views in about 29 hours, another record for the K-pop girl group."
    ],
  },
  {
    name: "blackpink-rose-song-of-the-year",
    title: "BLACKPINK Rosé’s “Song Of The Year” Win At The VMAs Sparks Massive Reactions",
    image: bprosesoty,
    content: [
      "BLACKPINK’s Rosé has won the Song of the Year award at the MTV VMAs for her song “APT” featuring Bruno Mars.",
      "This memorable moment marks the first time a K-Pop artist has won in this category.",
      "During her acceptance speech, she showed gratitude to those who supported her.",
      "''I can’t believe it. I’m so grateful to Bruno Mars for believing in and supporting me. I’m so happy to receive this award because it’s a moment when all my hard work is rewarded.''"
    ],
  }
];

export default articles;
