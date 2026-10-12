import { Article, Recipe } from '../types';

export const SATELLITE_MAP_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBz1xEKurPqlY78n04ZpMPuL0tSCcfSBoCnYt2W7wTzdN53IOg2d6Oe0yP6UUyV0D-d3Rxh65AOVQorUxdHciaj2oRrUyy-VbPffSrL7uD28qbbgzN-4iuMEMrWHurWObJeqX6guKLy4FbNWTHSuU6D_H8xL9QQdRfSxJDFTDZaPgtQ7LIgBcLnv5q-taNH0b8VwJXsDeABza3WKyZWC_Pap_0bOGjU1OlacKk-_TeVk2cFKo3vmjF_KQ";
export const WILDERNESS_SNOW_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuB75pBE0TyHuwHR118pl36GyGkOMRnUsukCaFMldtX9TFJBM3OYXUDEa8SbRtjQiVvlfegWo7vUAiTr-Pyho7StU21feSmDjJjbzoukLaNw0kUa0eR58Vk3E2oL_uyOGwGeD-o9q-nFOkqTONEOv6V6a3c9Ce5Sg4B58B91lhV3_MBAwtofXYeIMVzbg-15NNEjcWvca0LLXdA9QsVSR5NyiMPNzzStKQrzWXqfJdCKjGj-8zzKDNeCGQ";
export const SHORT_RIBS_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuCYHTxA8Kt094pAuw_OAoYkdOXc6sRYgPTiJ_wOiuey8scSPGeASbJs-jmRF7lL4l5e7Oh-a23kJ4SO8a9FBvDa8u1yAyJX7jGMNdvXCiSQgov2SI0tilDWFGCG2NXespHtZun4G_1QkFuevQeL-S-zBwDjOBmx_JbkPzv3AKhm1azydqtVNTNNc6KUzUFuyqD4M4oAgz5WJWJu-ivMysJtxH32xV39BFM_85Xx0wnbAALL6ZTbHktW5Q";

export const ARTICLES: Article[] = [
  {
    id: 'saudi-yemeni-airports',
    category: 'World',
    isBreaking: true,
    title: 'Saudi and Yemeni Airports Are Hit in New Round of Strikes',
    subtitle: 'Simultaneous attacks against regional logistics hubs threaten renewed escalation',
    deck: 'At least ten persons were killed in the attacks against the key hubs. Analysts fear this could wreck recent fragile diplomatic efforts to secure lasting stability across the Red Sea and Gulf shipping corridors.',
    author: 'Cynthia Silva and Zach Wasser',
    authorRole: 'International Security Correspondents',
    readTime: '3 MIN READ',
    publishedAt: 'October 12, 2026, 4:18 a.m. ET',
    audioMinutes: 4,
    commentsCount: 384,
    tags: ['Middle East', 'Aviation Security', 'Red Sea Crisis', 'Diplomacy'],
    content: [
      'RIYADH, Saudi Arabia — A coordinated volley of drone and missile strikes struck civilian and cargo terminals at two regional airports across the Saudi-Yemen border early Monday, killing at least 10 people and disrupting vital humanitarian and commercial air traffic across the Arabian Peninsula.',
      'The assaults, which struck the southern Saudi regional airport of Abha and an airfield near Yemen’s port city of Hodeidah, marked the most severe cross-border escalation in months. Witnesses reported thick black plumes of smoke rising above terminal aprons as emergency responders rushed to extinguish blazes on adjacent fuel reservoirs.',
      'Civil aviation authorities grounded all incoming regional flights within minutes, diverting long-haul international corridors away from southern airspace. In Geneva and Washington, diplomats engaged in fragile talks aimed at securing navigational corridors through the Bab el-Mandeb strait warned that the renewed violence could shatter six months of painstaking backchannel negotiations.',
      '“This strikes at the heart of the civilian logistics infrastructure that millions depend on for medical transfers and emergency supplies,” said Tariq al-Harbi, a regional security fellow at the Gulf Research Institute. “If these transportation arteries become chronic targets, the calculation for international carriers shifts dramatically.”',
      'Saudi defense officials stated their air defense batteries intercepted several incoming projectiles over the Asir mountain range, but shrapnel and secondary blasts caused structural damage to terminal maintenance hangars. Meanwhile, Houthi military spokesmen claimed responsibility in a televised communiqué, asserting that the operations targeted military infrastructure embedded within dual-use logistics facilities.',
      'As commercial airlines hurried to reroute transcontinental routes connecting Europe with South Asia, regional fuel prices ticked upward on global commodities desks, reflecting renewed apprehension over prolonged supply disruptions in key maritime choke points.'
    ],
    comments: [
      {
        id: 'c1',
        author: 'Julian M.',
        location: 'London, UK',
        text: 'The fragility of these regional transit hubs has real consequences for global commerce. Rerouting long-haul flights through central Africa adds hours of flight time and metric tons of fuel consumption.',
        timestamp: '2 hours ago',
        likes: 42
      },
      {
        id: 'c2',
        author: 'Amina K.',
        location: 'Dubai, UAE',
        text: 'Civilians bear the brunt of every strike on these transport hubs. The humanitarian transfer flights between Sanaa and Amman are already threadbare.',
        timestamp: '3 hours ago',
        likes: 89
      }
    ]
  },
  {
    id: 'flight-corridors-diverted',
    category: 'World',
    title: 'How Regional Flight Corridors Diverted Tens of Thousands Within Hours',
    deck: 'Commercial airlines scramble to route flights over central Africa and Europe as international civil aviation authorities warn of expanded missile envelopes.',
    author: 'Zach Wasser',
    authorRole: 'Aviation Editor',
    readTime: '4 MIN READ',
    publishedAt: 'October 12, 2026, 3:45 a.m. ET',
    audioMinutes: 4,
    commentsCount: 122,
    tags: ['Aviation', 'Commercial Airlines', 'Airspace Safety'],
    content: [
      'Within ninety minutes of the initial impacts in southern Saudi Arabia, air traffic controllers in Cairo, Dubai, and Jeddah initiated one of the largest sudden rerouting operations in regional aviation history.',
      'Over 240 scheduled flights carrying an estimated 58,000 passengers were forced onto contingency paths. Flights connecting Frankfurt, Paris, and London to Mumbai and Singapore were instructed to bypass the Red Sea corridor entirely, veering south across Egyptian and Sudanese airspace or north over Turkey and Central Asia.',
      '“Airlines operate on thin fuel margins and strict crew duty cycles,” explained Sandra Lindqvist, flight operations director at a major European airline alliance. “When a standard flight corridor of 1,200 miles is shut down without warning, planes must carry thousands of gallons of reserve fuel, reducing payload capacity and cascading delays through international hubs.”',
      'Satellite tracking maps showed the normally dense ribbon of commercial aircraft tracing the western Saudi coast thin out to a complete void by dawn, leaving only reconnaissance drones and military patrol assets on tactical radars.'
    ]
  },
  {
    id: 'saudi-arabia-options-analysis',
    category: 'World',
    isAnalysis: true,
    title: 'Saudi Arabia Has Few Options as Houthis Aim at Heart of Its Ambitions',
    subtitle: 'The strikes present Crown Prince Mohammed bin Salman with a harsh dilemma: strike back or protect mega-projects',
    deck: 'The strikes present Crown Prince Mohammed bin Salman with a harsh dilemma: strike back and imperil his sweeping domestic transformation projects, or endure repeated threats to critical trade infrastructure.',
    author: 'Vivian Nereim',
    authorRole: 'Middle East Bureau Chief',
    readTime: '6 MIN READ',
    publishedAt: 'October 12, 2026, 2:10 a.m. ET',
    imageUrl: SATELLITE_MAP_IMG,
    imageCaption: 'Satellite radar imagery tracks heightened maritime movements near regional transit lanes early on Monday morning.',
    imageCredit: 'European Space Agency & Sentinel Coastal Radar',
    audioMinutes: 6,
    commentsCount: 412,
    tags: ['Saudi Arabia', 'Analysis', 'Geopolitics', 'Red Sea'],
    content: [
      'RIYADH — For Crown Prince Mohammed bin Salman, the strategic vision for modern Saudi Arabia rests on an unshakeable premise: that the kingdom can transform itself into a global tourism, entertainment, and logistics hub that operates far above the perennial conflicts of its neighborhood.',
      'Monday’s airport strikes shattered that comfortable assumption once again.',
      'The Crown Prince now faces an agonizing dilemma that defense analysts have watched brewing for years. If Riyadh launches a punitive military campaign against Houthi command nodes in northern Yemen, it risks drawing retaliatory strikes against shiny new megaprojects, desalination plants, and foreign investment summits in Riyadh and Jeddah. Yet if Saudi Arabia absorbs the blows in silence, it risks signaling vulnerability to rivals across the region.',
      'Over the past three years, the kingdom has invested hundreds of billions of dollars in Vision 2030 initiatives, including Red Sea luxury resort archipelagos located within easy cruise missile range of Yemeni launch pads.',
      '“You cannot build a trillion-dollar international tourism sanctuary while air-raid sirens sound in neighboring provinces,” remarked a Western diplomat based in Riyadh who spoke on condition of anonymity to discuss sensitive regional security assessments.',
      'Furthermore, Riyadh’s diplomatic rapprochement with Tehran was intended to neutralize these exact threats. Monday’s escalations indicate that either Tehran’s influence over Yemeni military commanders is more tenuous than anticipated, or that local factions possess tactical imperatives independent of broader regional detentes.',
      'In the coming days, Saudi policymakers will weigh whether precision air defense reinforcement, coupled with European maritime escort guarantees, will suffice — or if a calculated kinetic response is inevitable.'
    ]
  },
  {
    id: 'geneva-maritime-frameworks',
    category: 'World',
    isLiveUpdate: true,
    title: 'Diplomats Meet in Geneva to Revive Maritime Passage Frameworks',
    deck: 'Delegations from six nations gather behind closed doors following emergency appeals.',
    author: 'Vivian Nereim and Dan Levin',
    readTime: '2 MIN READ',
    publishedAt: 'October 12, 2026, 5:02 a.m. ET',
    content: [
      'GENEVA — Envoys from the United States, Britain, Saudi Arabia, Oman, France, and Egypt convened in an unscheduled emergency session at the Palais des Nations in Geneva on Monday morning.',
      'The delegates are attempting to hammer out an updated code of transit conduct for commercial merchant vessels navigating the southern Red Sea and Gulf of Aden. Under discussion is an international joint insurance reinsurance pool and standardized escort protocols to mitigate spiraling maritime insurance premiums.'
    ]
  },
  {
    id: 'tokyo-inflation-decade-high',
    category: 'Business',
    title: 'Tokyo Inflation Reaches Decade-High as Currency Swings Continue',
    deck: 'Core consumer prices in Japan’s capital outpaced forecasts, putting renewed pressure on the central bank to accelerate interest rate normalization.',
    author: 'Motoko Rich',
    readTime: '2 MIN READ',
    publishedAt: 'October 12, 2026',
    content: [
      'TOKYO — Core consumer inflation in Tokyo rose at its fastest annual clip in more than a decade in September, according to government data released Monday, as surging food import costs and persistent yen weakness compounded pressure on household budgets.',
      'The headline consumer price index for the Tokyo metropolitan area rose 3.4 percent from a year earlier, exceeding the consensus forecast of economists surveyed by financial data providers.',
      'The acceleration is expected to strengthen the Bank of Japan’s resolve to continue lifting benchmark interest rates from near-zero levels, despite cautionary warnings from export manufacturing cartels.'
    ]
  },
  {
    id: 'german-coalition-renewable-quotas',
    category: 'Business',
    title: 'German Coalition Pushes New Renewable Quotas Amid Industrial Backlash',
    deck: 'Berlin’s climate ministries unveiled stringent industrial clean-energy procurement benchmarks, triggering protests from heavy manufacturers.',
    author: 'Melissa Eddy',
    readTime: '3 MIN READ',
    publishedAt: 'October 12, 2026',
    content: [
      'BERLIN — Germany’s governing coalition proposed new mandatory quotas requiring energy-intensive industrial complexes to contract at least 65 percent of their baseload electricity from certified green hydrogen and offshore wind facilities by 2030.',
      'Industrial lobbying groups warned that the compliance timelines could drive chemical and steel fabrication plants to relocate capital investments to North America or Scandinavia, where wholesale clean electricity remains more abundant and less expensive.'
    ]
  },
  {
    id: 'french-rail-high-speed-madrid',
    category: 'World',
    title: 'French Rail Operators Expand High-Speed Cross-Border Routes to Madrid',
    deck: 'New daily direct TGV departures between Paris and Madrid aim to compete directly with short-haul aviation across southwestern Europe.',
    author: 'Liz Alderman',
    readTime: '4 MIN READ',
    publishedAt: 'October 12, 2026',
    content: [
      'PARIS — French national rail operator SNCF, alongside Spain’s Renfe, announced the inauguration of six daily high-speed rail frequencies directly linking Paris Gare de Lyon with Madrid Puerta de Atocha via Barcelona.',
      'The service, which leverages upgraded high-speed track segments across the Pyrenees border, cuts total city-center travel time down to under six hours, presenting travelers with a zero-aviation alternative with a 92 percent lower carbon footprint.'
    ]
  },
  {
    id: 'manchester-city-pressing',
    category: 'The Athletic',
    isSports: true,
    title: 'Manchester City’s Perfect Record Unravels Under Relentless Midfield Pressing',
    subtitle: 'Premier League Tactical Analysis',
    deck: 'An analytical breakdown of tactical adjustments that stunned the reigning champions in stoppage time.',
    author: 'Oliver Kay',
    authorRole: 'Chief Football Writer',
    readTime: '5 MIN READ',
    publishedAt: 'October 12, 2026',
    content: [
      'MANCHESTER, England — For eighty-two minutes at the Etihad Stadium, Manchester City appeared on track to extend their flawless Premier League opening sequence to nine straight victories.',
      'What followed was a masterclass in aggressive, compact spatial denial that dismantled Pep Guardiola’s trademark possession machine in five frantic minutes of stoppage time.',
      'By baiting City’s inverted fullbacks into narrow central channels, the opposition unleashed a four-man coordinated counter-press that intercepted passing angles toward Erling Haaland and exploited wide half-spaces on the turnover.',
      '“We knew if we allowed them time to measure diagonal passes into the half-spaces, we would be ground down,” the opposing manager noted post-match. “The only antidote was total collective intensity on their second phase of build-up.”'
    ]
  },
  {
    id: 'krugman-economic-illusions',
    category: 'Opinion',
    isOpinion: true,
    title: 'The Economic Illusions That Still Refuse to Die in Times of Trade Crises',
    deck: 'Tariffs cannot solve monetary supply misalignments, yet policymakers continuously retreat to antiquated remedies.',
    author: 'Paul Krugman',
    authorRole: 'Opinion Columnist',
    readTime: '5 MIN READ',
    publishedAt: 'October 12, 2026',
    content: [
      'Whenever global supply lines hit turbulence — whether from regional hostilities in the Red Sea or factory closures across the Pacific — a familiar political chorus begins chanting the virtues of punitive trade barriers.',
      'It is an alluring illusion: slap double-digit tariffs on imports, the argument goes, and manufacturing will magically sprout in domestic river valleys overnight.',
      'Except that economics does not work that way. A tariff is not paid by foreign producers in some remote capital; it is paid at the port of entry by domestic wholesalers, which promptly pass those surcharges directly along to consumers buying kitchen appliances and grocery staples.',
      'Worse still, tariffs fail utterly to address the structural imbalances — disparities in national savings rates and currency valuations — that generate trade deficits in the first place. You cannot cure an infection by turning up the room thermostat.'
    ]
  },
  {
    id: 'friedman-red-sea-taiwan',
    category: 'Opinion',
    isOpinion: true,
    title: 'Look Closely at What Just Happened in the Red Sea. Then Look at Taiwan.',
    deck: 'Global maritime bottlenecks are interconnected in manners that conventional military doctrines fail to anticipate.',
    author: 'Thomas L. Friedman',
    authorRole: 'Foreign Affairs Columnist',
    readTime: '6 MIN READ',
    publishedAt: 'October 12, 2026',
    content: [
      'If you want to understand what the next major geopolitical shock looks like, stop reading cold-war military balance sheets and look closely at a live AIS map of commercial cargo ships rounding the Cape of Good Hope.',
      'A non-state militia armed with relatively inexpensive anti-ship drones and GPS spoofers has effectively forced global shipping conglomerates to divert trillions of dollars of container traffic around an entire continent.',
      'Now project that asymmetrical leverage onto the Taiwan Strait or the South China Sea. What happens when commercial maritime insurers simply refuse to write policies for ships entering contested waters? You don’t need an amphibious invasion fleet to trigger a worldwide industrial depression; you only need to make navigation uninsurable.'
    ]
  },
  {
    id: 'douthat-cultural-pessimism',
    category: 'Opinion',
    isOpinion: true,
    title: 'Why Western Cultural Pessimism Has Outlasted the Great Postwar Boom',
    deck: 'A deeper spiritual malaise underpins our ongoing political fragmentations and institutional paralysis.',
    author: 'Ross Douthat',
    authorRole: 'Opinion Columnist',
    readTime: '6 MIN READ',
    publishedAt: 'October 12, 2026',
    content: [
      'For decades, social theorists insisted that material abundance and technological convenience would naturally engender optimism and civic cohesion. Yet across every Western democracy today, the dominant cultural mood is one of profound exhaustion and civilizational declinism.',
      'Why has our pessimism proven so resilient? Part of the answer lies in our inability to imagine a genuinely heroic future that transcends algorithmic optimization and consumer self-actualization.',
      'When society loses its grasp on transcendent collective purposes — whether religious, philosophical, or grand exploratory frontiers — politics degenerates into an unedifying squabble over declining shares of comfort.'
    ]
  },
  {
    id: 'inuit-warming-arctic',
    category: 'Opinion',
    isOpinion: true,
    title: 'What Does It Truly Mean to Be Inuit Now in a Warming Arctic?',
    deck: 'Our ancestors mapped sea ice with words that no longer correspond to the reality of liquid horizons.',
    author: 'Sheila Watt-Cloutier',
    authorRole: 'Guest Essayist, Inuk Activist & Nobel Peace Prize Nominee',
    readTime: '7 MIN READ',
    publishedAt: 'October 12, 2026',
    content: [
      'In Inuktitut, our language holds dozens of precise terms to describe the texture, density, and seasonal temperament of sea ice. Each word is not merely a linguistic novelty; it is an empirical survival manual tested across centuries of dog-sled travel and seal hunting.',
      'Today, as temperatures rise across our northern homelands at four times the global average, that vocabulary is losing its physical referents. We look out from our settlements at bays that should be frozen solid by October, only to see open, black water lapping at the gravel shoreline.',
      'Climate change is not an abstract statistical trend in the Arctic. It is the dissolution of our ancestral highway, our hunting grounds, and our spiritual compass. When the ice vanishes, our very definition of safety and seasonal rhythm is upended.'
    ]
  },
  {
    id: 'epic-wilderness-adventure',
    category: 'The Great Read',
    isGreatRead: true,
    title: 'He Went Out on an Epic Wilderness Adventure. Only His Dogs Came Back.',
    deck: 'For months, authorities and local hunters combed the rugged taiga. The mystery was not merely where he disappeared, but why he ventured into the harshest winter corridor without telling anyone.',
    author: 'Dan Levin',
    authorRole: 'Enterprise & Investigative Reporter',
    readTime: '11 MIN READ',
    publishedAt: 'October 12, 2026',
    imageUrl: WILDERNESS_SNOW_IMG,
    imageCaption: 'The dense taiga forests of the subarctic interior, where temperatures plunged past minus-40 during the winter search.',
    imageCredit: 'Sergei Karpukhin for The New York Times',
    audioMinutes: 11,
    commentsCount: 680,
    tags: ['The Great Read', 'Wilderness', 'Adventure', 'Mystery', 'Survival'],
    content: [
      'WHITEHORSE, Yukon — On a crisp morning in early November, when the rivers were just beginning to crust over with blue shore ice, Aaron Caldwell loaded seventy pounds of dried pemmican, a down sleeping bag, and a handmade cedar sled into the bed of his rusted pickup truck.',
      'He hitched his two veteran Alaskan huskies, Yukon and Silt, to the trace lines. He gave no notice to the regional forest ranger station, left no itinerary on his kitchen table, and powered off his handheld satellite transceiver as soon as he cleared the highway.',
      'Three months later, an indigenous trapper checking marten sets sixty miles north of the nearest gravel trail spotted two gaunt canine shapes bounding along a frozen creek bed. The huskies were emaciated, their paws cracked by jagged pack ice, but they were alive. Of Aaron Caldwell, there was not a single footprint.',
      'What drove an experienced forty-two-year-old surveyor and seasoned woodsman to march into subarctic wilderness at the dawn of polar winter? For friends and family who spent weeks scouring aerial thermographic logs and interviewing remote outfitters, the search yielded tantalizing clues — but few definitive answers.',
      '“Aaron was not running away from life,” his sister Elena told investigators in Whitehorse. “He was pursuing an ideal of solitude that few people in the modern world can even fathom. He wanted to experience the forest when every machine had been silenced by the cold.”',
      'As spring thaw approaches and search teams prepare to re-enter the thawing marshlands, the story has captured the imagination of thousands across the North, standing as a haunting meditation on the allure and peril of untamed wilderness.'
    ]
  }
];

export const RECIPE_DATA: Recipe = {
  id: 'slow-braised-citrus-short-ribs',
  title: 'Slow-Braised Citrus Short Ribs With Star Anise',
  author: 'Melissa Clark',
  deck: 'A rich winter supper that develops deep flavor over five fragrant hours.',
  imageUrl: SHORT_RIBS_IMG,
  rating: 4.8,
  ratingCount: 1420,
  prepTime: '30 mins',
  cookTime: '4 hrs 30 mins',
  totalTime: '5 hrs',
  servings: 6,
  ingredients: [
    { amount: '4 to 4½ lbs', item: 'Bone-in beef short ribs, cut flanken or English style' },
    { amount: '2 tbsp', item: 'Neutral cooking oil (grapeseed or avocado)' },
    { amount: '2 large', item: 'Shallots or yellow onions, roughly chopped' },
    { amount: '4 cloves', item: 'Garlic, smashed and peeled' },
    { amount: '2-inch knob', item: 'Fresh ginger, unpeeled and sliced into coins' },
    { amount: '4 whole', item: 'Star anise pods' },
    { amount: '2 strips', item: 'Wide orange peel (avoiding bitter white pith)' },
    { amount: '1 cup', item: 'Freshly squeezed orange juice' },
    { amount: '½ cup', item: 'Dry sherry, Shaoxing wine, or dry red wine' },
    { amount: '⅓ cup', item: 'Low-sodium soy sauce or tamari' },
    { amount: '2 tbsp', item: 'Dark brown sugar or pure maple syrup' },
    { amount: '2 cups', item: 'Low-sodium beef bone broth' },
    { amount: 'To taste', item: 'Flaky sea salt and freshly cracked black pepper' }
  ],
  instructions: [
    {
      step: 1,
      title: 'Sear the Ribs',
      text: 'Season short ribs generously on all sides with salt and pepper. In a large Dutch oven over medium-high heat, heat oil until shimmering. Sear ribs in batches until deeply browned on all sides, about 4 to 5 minutes per side. Transfer browned meat to a plate and pour off all but 2 tablespoons of rendered fat.',
      timerMinutes: 12
    },
    {
      step: 2,
      title: 'Build the Aromatics',
      text: 'Reduce heat to medium. Add chopped shallots, smashed garlic, and sliced ginger. Cook, stirring frequently, until fragrant and lightly caramelized, about 3 minutes. Toss in the star anise and orange peel strips, toasting them for 1 minute until fragrant.',
      timerMinutes: 4
    },
    {
      step: 3,
      title: 'Deglaze and Simmer',
      text: 'Pour in the wine, scraping up all browned fond from the bottom of the pot. Simmer until reduced by half, about 3 minutes. Stir in the fresh orange juice, soy sauce, brown sugar, and beef bone broth. Bring to a gentle boil.',
      timerMinutes: 5
    },
    {
      step: 4,
      title: 'Slow Oven Braise',
      text: 'Preheat oven to 300°F (150°C). Return the short ribs and accumulated juices to the pot, nestling them meat-side down into the liquid. Cover tightly with a heavy lid and transfer to the oven. Braise undisturbed until the beef is meltingly tender and slips off the bone with a fork, 3½ to 4 hours.',
      timerMinutes: 210
    },
    {
      step: 5,
      title: 'Reduce Sauce and Serve',
      text: 'Transfer ribs carefully to a warm serving platter. Skim excess fat from the braising liquid. Simmer sauce on the stovetop over medium heat until glossy and slightly thickened, about 8 minutes. Spoon luscious citrus-anise sauce over the ribs and serve alongside steamed jasmine rice or creamy polenta.',
      timerMinutes: 8
    }
  ],
  nutrition: {
    calories: 680,
    fat: '44g',
    protein: '52g',
    carbs: '14g'
  },
  chefsNote: 'Star anise and fresh citrus peel create an intoxicating aroma that cuts through the luxurious richness of the beef short ribs. This braise is even better made a day ahead and chilled, which also makes skimming excess fat effortless.'
};
