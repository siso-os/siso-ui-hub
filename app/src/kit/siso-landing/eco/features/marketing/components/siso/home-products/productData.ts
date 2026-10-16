// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/home-products/productData.ts)
// Display snapshots, not live counters. Sources are local catalogue/bank records.
// Great_Library_of_SISO/banks/siso-ui-hub/catalogue/picks.json: navigation/command-palette.
export const INSTALL_PICK = {
  name: 'arc:command-palette',
  command: 'npx shadcn@latest add @uiarc/command-palette',
};

// Existing project GitHub org avatars, visually inspected: no faces or identicons.
export const LIBRARIES = [
  { name: 'Lucide', logo: '/logos/ui-hub/lucide-icons.png', kind: 'Icons' },
  { name: 'Magic UI', logo: '/logos/ui-hub/magicuidesign.png', kind: 'Components' },
  { name: 'Phosphor', logo: '/logos/ui-hub/phosphor-icons.png', kind: 'Icons' },
  { name: 'Tabler Icons', logo: '/logos/ui-hub/tabler.png', kind: 'Icons' },
];

// Great_Library_of_SISO/banks/siso-repo-bank/bank/bank_best.jsonl.
// All six records have capability_tag llm-orchestration / category_slug llm-app-framework.
// Stars, licence and reuse_value are the bank's stored values, not GitHub-live claims.
export const REPOS = [
  { name: 'microsoft/agent-framework', stars: 11572, license: 'MIT', reuse: 88 },
  { name: 'TauricResearch/TradingAgents', stars: 88071, license: 'Apache-2.0', reuse: 85 },
  { name: 'FoundationAgents/MetaGPT', stars: 68976, license: 'MIT', reuse: 85 },
  { name: 'agno-agi/agno', stars: 40812, license: 'Apache-2.0', reuse: 85 },
  { name: 'openai/openai-agents-python', stars: 27357, license: 'MIT', reuse: 85 },
  { name: 'agentscope-ai/agentscope', stars: 27104, license: 'Apache-2.0', reuse: 85 },
];

export const LINEAGE = [
  'Sidebar row ← T3 Code (MIT)',
  'Chat minimap ← T3 Code (MIT)',
  'Question cards ← T3 Code + OpenCode',
  'Top tabs ← cmux',
  'Shell layout ← Codex app',
];

// The UI Hub card (ui-hub/). Counted 9 Oct 2026 unless a line says otherwise; every number names where it was read.
// GL = Great_Library_of_SISO/banks. UI index = _data/siso-landing/research/ui-index (ledger.jsonl + SUMMARY.md, 8 Oct).
export const UI_HUB = {
  // UI index: 53,843 ledger rows; 43,751 of them are GitHub repos (id gh:*), re-checked live on GitHub 8 Oct.
  // Coverage: 36,602 of an estimated 48,859 GitHub UI repos over 100 stars (SUMMARY.md, capture-recapture).
  indexed: 53843, githubRepos: 43751, coverage: '75%',
  // GL siso-component-bank: index.jsonl (8,538 components from 853 authors; the repo description says 6,212 ship TSX source).
  bank: { components: 8538, authors: 853, withSource: 6212 },
  // Kinds in the catalogue view. Components: index.jsonl classification.category, counted over the 3,508 classified rows.
  // Themes: GL siso-ui-base/registry/skills/index.json (67 design themes, bergside/awesome-design-skills, MIT), grouped by
  // visualStyle. Images: bank slugs with "background" (155); Poly Haven API counts by type (997 HDRIs, 866 textures, 521
  // models; also in the UI index ledger); ambientCG API type=Material numberOfResults (2,014). 3D: bank rows whose code
  // depends on three / @react-three/* (87) or @paper-design/shaders / ogl (26).
  kinds: [
    { key: 'components', label: 'Components', groups: [
      { key: 'hero', label: 'Heroes', n: 244 }, { key: 'card', label: 'Cards', n: 456 }, { key: 'input', label: 'Inputs', n: 904 },
      { key: 'navigation', label: 'Navigation', n: 264 }, { key: 'data-display', label: 'Data display', n: 632 },
      { key: 'pricing', label: 'Pricing', n: 50 }, { key: 'feedback', label: 'Feedback', n: 237 }, { key: 'overlay', label: 'Overlays', n: 141 },
    ] },
    { key: 'themes', label: 'Themes', groups: [
      { key: 'modern', label: 'Modern', n: 31 }, { key: 'clean', label: 'Clean', n: 31 }, { key: 'high-contrast', label: 'High contrast', n: 21 },
      { key: 'playful', label: 'Playful', n: 20 }, { key: 'minimal', label: 'Minimal', n: 18 }, { key: 'bold', label: 'Bold', n: 12 },
    ] },
    { key: 'images', label: 'Images', groups: [
      { key: 'backgrounds', label: 'Backgrounds', n: 155 }, { key: 'ph-hdris', label: 'HDRI skies', n: 997 },
      { key: 'ph-textures', label: 'Textures', n: 866 }, { key: 'acg', label: 'Materials', n: 2014 },
    ] },
    { key: '3d', label: '3D', groups: [
      { key: '3d-threejs', label: 'three.js', n: 87 }, { key: '3d-shaders', label: 'Shaders', n: 26 }, { key: 'ph-models', label: '3D models', n: 521 },
    ] },
  ],
  // Six real items per group. Components: the most-used per category with a preview (one per author), from index.jsonl
  // (name, author, classification tags, whether source is held). Previews are the bank's own, resized to 256x160 webp in
  // public/siso-img/ui-hub/. Poly Haven and ambientCG items are CC0, most downloaded first, thumbnails from their CDNs.
  items: {
    'input': [
      { id: 'easemize__glass-button', name: 'Glass button', by: '@easemize', tags: ['glass-morphism', 'gradient'], code: true },
      { id: 'ravikatiyar162__sky-toggle', name: 'Sky toggle', by: '@ravikatiyar162', tags: ['illustration', 'gradient'], code: true },
      { id: 'hurerag24__bolt-style-chat', name: 'Bolt style chat', by: '@hurerag24', tags: ['glass-morphism', 'gradient', 'hover-glow'], code: true },
      { id: 'arihantcodes_1f7b8c4d__multistep-form', name: 'Multistep form', by: '@arihantcodes_1f7b8c4d', tags: ['flat', 'minimalist'], code: true },
      { id: 'originui__slider', name: 'Slider', by: '@originui', tags: ['hover-glow', 'keyboard-nav'], code: false },
      { id: 'omrohilla6__cinematic-theme-switcher', name: 'Cinematic theme switcher', by: '@omrohilla6', tags: ['click-reveal'], code: true },
    ],
    'card': [
      { id: 'designali-in__glowing-shadow', name: 'Glowing shadow', by: '@designali-in', tags: ['dark', 'gradient', 'hover-glow'], code: true },
      { id: 'ruixen.ui__card-stack', name: 'Card stack', by: '@ruixen.ui', tags: ['3d', 'gradient', 'hover-glow'], code: true },
      { id: 'minhxthanh__interactive-selector', name: 'Interactive selector', by: '@minhxthanh', tags: ['click-reveal', 'scroll-animate'], code: true },
      { id: 'kavikatiyar__bento-product-features', name: 'Bento product features', by: '@kavikatiyar', tags: ['minimalist', 'flat'], code: true },
      { id: 'easemize__spotlight-card', name: 'Spotlight card', by: '@easemize', tags: ['glass-morphism', 'gradient', 'hover-glow'], code: true },
      { id: 'koustubhayadiyala36__morphing-card-stack', name: 'Morphing card stack', by: '@koustubhayadiyala36', tags: ['glass-morphism', 'gradient', 'drag'], code: true },
    ],
    'hero': [
      { id: 'lovesickfromthe6ix__horizon-hero-section', name: 'Horizon hero section', by: '@lovesickfromthe6ix', tags: ['3d', 'dark', 'scroll-animate'], code: true },
      { id: 'ravikatiyar162__animated-shader-hero', name: 'Animated shader hero', by: '@ravikatiyar162', tags: ['gradient', '3d', 'mouse-tracked'], code: true },
      { id: 'larsen66__hero-futuristic', name: 'Hero futuristic', by: '@larsen66', tags: ['3d', 'dark', 'scroll-animate'], code: true },
      { id: 'reuno-ui__hero', name: 'Hero', by: '@reuno-ui', tags: ['glass-morphism', 'dark', 'hover-glow'], code: true },
      { id: 'prashantsom75__scroll-morph-hero', name: 'Scroll morph hero', by: '@prashantsom75', tags: ['scroll-animate', 'morph'], code: true },
      { id: 'kokonutd__shape-landing-hero', name: 'Shape landing hero', by: '@kokonutd', tags: [], code: false },
    ],
    'navigation': [
      { id: 'originui__dropdown-menu', name: 'Dropdown menu', by: '@originui', tags: ['flat'], code: false },
      { id: 'easemize__limelight-nav', name: 'Limelight nav', by: '@easemize', tags: ['minimalist', 'flat', 'click-reveal'], code: true },
      { id: 'jshguo__sidebar-component', name: 'Sidebar component', by: '@jshguo', tags: ['flat', 'minimalist', 'click-reveal'], code: true },
      { id: 'sean0205__stepper', name: 'Stepper', by: '@sean0205', tags: ['minimalist', 'flat', 'click-reveal'], code: true },
      { id: 'preetsuthar17__navbar-1', name: 'Navbar 1', by: '@preetsuthar17', tags: ['minimalist', 'gradient', 'hover-glow'], code: false },
      { id: 'aghasisahakyan1__mini-navbar', name: 'Mini navbar', by: '@aghasisahakyan1', tags: ['dark', 'minimalist', 'hover-glow'], code: false },
    ],
    'data-display': [
      { id: 'danielpetho__text-rotate', name: 'Text rotate', by: '@danielpetho', tags: ['minimalist'], code: false },
      { id: 'serafimcloud__hero-with-mockup', name: 'Hero with mockup', by: '@serafimcloud', tags: ['flat', 'minimalist'], code: false },
      { id: 'sean0205__badge-2', name: 'Badge 2', by: '@sean0205', tags: ['flat', 'minimalist'], code: true },
      { id: 'anurag-mishra22__interactive-bento-gallery', name: 'Interactive bento gallery', by: '@anurag-mishra22', tags: ['minimalist', 'gradient', 'click-reveal'], code: false },
      { id: 'meschacirung__faqs-component', name: 'Faqs component', by: '@meschacirung', tags: ['minimalist', 'flat', 'click-reveal'], code: true },
      { id: 'dillionverma__animated-shiny-text', name: 'Animated shiny text', by: '@dillionverma', tags: ['gradient', 'scroll-animate'], code: false },
    ],
    'pricing': [
      { id: 'ravikatiyar162__pricing', name: 'Pricing', by: '@ravikatiyar162', tags: ['gradient', 'minimalist', 'hover-glow'], code: true },
      { id: 'ln-dev7__pricing-interaction', name: 'Pricing interaction', by: '@ln-dev7', tags: [], code: false },
      { id: 'jatin-yadav05__pricing-component', name: 'Pricing component', by: '@jatin-yadav05', tags: ['minimalist', 'flat'], code: true },
      { id: '0xUrvish__pricing-card', name: 'Pricing card', by: '@0xUrvish', tags: ['minimalist', 'flat', 'hover-glow'], code: true },
      { id: 'kokonutd__creative-pricing', name: 'Creative pricing', by: '@kokonutd', tags: ['illustration', 'colorful'], code: false },
      { id: 'ruixen.ui__pricing-module', name: 'Pricing module', by: '@ruixen.ui', tags: ['flat', 'minimalist'], code: true },
    ],
    'feedback': [
      { id: 'sean0205__alert-1', name: 'Alert 1', by: '@sean0205', tags: ['flat', 'minimalist'], code: true },
      { id: 'anurag-mishra22__progress-indicator', name: 'Progress indicator', by: '@anurag-mishra22', tags: ['click-reveal'], code: false },
      { id: 'remcostoeten__interactive-empty-state', name: 'Interactive empty state', by: '@remcostoeten', tags: ['minimalist', 'gradient-border', 'hover-glow'], code: false },
      { id: 'itaizeilig__tetris-loader', name: 'Tetris loader', by: '@itaizeilig', tags: ['minimalist', 'mono'], code: true },
      { id: 'info-mdshakeeb__preloader', name: 'Preloader', by: '@info-mdshakeeb', tags: [], code: true },
      { id: 'ibelick__text-scramble', name: 'Text scramble', by: '@ibelick', tags: ['scroll-animate', 'click-reveal'], code: false },
    ],
    'overlay': [
      { id: 'originui__dialog', name: 'Dialog', by: '@originui', tags: [], code: false },
      { id: 'chetanverma16__floating-action-menu', name: 'Floating action menu', by: '@chetanverma16', tags: ['minimalist', 'flat', 'click-reveal'], code: false },
      { id: 'aymanch-03__user-dropdown', name: 'User dropdown', by: '@aymanch-03', tags: ['minimalist', 'flat', 'click-reveal'], code: true },
      { id: 'ibelick__morphing-popover', name: 'Morphing popover', by: '@ibelick', tags: ['morph', 'click-reveal'], code: false },
      { id: 'jatin-yadav05__3d-folder', name: '3d folder', by: '@jatin-yadav05', tags: ['glass-morphism', '3d', 'hover-glow'], code: true },
      { id: 'dillionverma__hero-video-dialog', name: 'Hero video dialog', by: '@dillionverma', tags: ['click-reveal', 'morph'], code: false },
    ],
    '3d-threejs': [
      { id: 'designali-in__shader-animation', name: 'Shader animation', by: '@designali-in', tags: ['gradient', 'morph'], code: true },
      { id: 'dhileepkumargm__anomalous-matter-hero', name: 'Anomalous matter hero', by: '@dhileepkumargm', tags: ['3d', 'gradient', 'parallax'], code: true },
      { id: 'chowlol202__globe-hero', name: 'Globe hero', by: '@chowlol202', tags: ['minimalist', 'scroll-animate'], code: true },
      { id: 'reuno-ui__background-paper-shaders', name: 'Background paper shaders', by: '@reuno-ui', tags: ['3d', 'gradient', 'scroll-animate'], code: false },
      { id: 'muhammad-binsalman__ethereal-beams-hero', name: 'Ethereal beams hero', by: '@muhammad-binsalman', tags: ['3d', 'gradient'], code: false },
      { id: 'minhxthanh__animated-shader-background', name: 'Animated shader background', by: '@minhxthanh', tags: ['gradient', '3d'], code: true },
    ],
    '3d-shaders': [
      { id: 'chowlol202__liquid-metal-hero', name: 'Liquid metal hero', by: '@chowlol202', tags: ['minimalist', 'flat', 'hover-glow'], code: true },
      { id: 'designali-in__hero-shader', name: 'Hero shader', by: '@designali-in', tags: [], code: true },
      { id: 'ruixen.ui__wave-background', name: 'Wave background', by: '@ruixen.ui', tags: ['gradient', '3d', 'scroll-animate'], code: true },
      { id: 'isaiahbjork__voice-powered-orb', name: 'Voice powered orb', by: '@isaiahbjork', tags: ['flat', 'minimalist'], code: true },
      { id: 'shailendrakumar19999__cosmic-plasma-web', name: 'Cosmic plasma web', by: '@shailendrakumar19999', tags: ['gradient', '3d', 'hover-glow'], code: false },
      { id: 'reuno-ui__hero', name: 'Hero', by: '@reuno-ui', tags: ['glass-morphism', 'dark', 'hover-glow'], code: true },
    ],
    'backgrounds': [
      { id: 'manuarora700__aurora-background', name: 'Aurora background', by: '@manuarora700', tags: [], code: false },
      { id: 'kokonutd__background-paths', name: 'Background paths', by: '@kokonutd', tags: [], code: false },
      { id: 'reuno-ui__background-paper-shaders', name: 'Background paper shaders', by: '@reuno-ui', tags: ['3d', 'gradient', 'scroll-animate'], code: false },
      { id: 'minhxthanh__animated-shader-background', name: 'Animated shader background', by: '@minhxthanh', tags: ['gradient', '3d'], code: true },
      { id: 'manuarora700__background-gradient-animation', name: 'Background gradient animation', by: '@manuarora700', tags: [], code: false },
      { id: 'minhxthanh__shader-background', name: 'Shader background', by: '@minhxthanh', tags: ['gradient', '3d', 'morph'], code: true },
    ],
    'ph-hdris': [
      { id: 'ph-kloofendal_48d_partly_cloudy_puresky', name: 'Kloofendal 48d Partly Cloudy (Pure Sky)', by: 'Greg Zaal, Jarod Guest' },
      { id: 'ph-moonless_golf', name: 'Moonless Golf', by: 'Greg Zaal' },
      { id: 'ph-brown_photostudio_02', name: 'Brown Photostudio 02', by: 'Sergej Majboroda' },
      { id: 'ph-lilienstein', name: 'Lilienstein', by: 'Andreas Mischok' },
      { id: 'ph-studio_small_09', name: 'Studio Small 09', by: 'Sergej Majboroda' },
      { id: 'ph-dikhololo_night', name: 'Dikhololo Night', by: 'Greg Zaal' },
    ],
    'ph-textures': [
      { id: 'ph-plywood', name: 'Plywood', by: 'Rob Tuytel' },
      { id: 'ph-coast_sand_rocks_02', name: 'Coast Sand Rocks 02', by: 'Rob Tuytel' },
      { id: 'ph-brown_mud_leaves_01', name: 'Brown Mud Leaves 01', by: 'Rob Tuytel' },
      { id: 'ph-laminate_floor_02', name: 'Laminate Floor 02', by: 'Dario Barresi, Charlotte Baglioni' },
      { id: 'ph-wood_table_001', name: 'Wood Table 001', by: 'Dimitrios Savva, Rico Cilliers' },
      { id: 'ph-concrete_floor_worn_001', name: 'Concrete Floor Worn 001', by: 'Dimitrios Savva, Rico Cilliers' },
    ],
    'ph-models': [
      { id: 'ph-grass_medium_01', name: 'Grass Medium 01', by: 'Rob Tuytel, Rico Cilliers' },
      { id: 'ph-tree_small_02', name: 'Tree Small 02', by: 'Rico Cilliers' },
      { id: 'ph-jacaranda_tree', name: 'Jacaranda Tree', by: 'Rob Tuytel, Rico Cilliers' },
      { id: 'ph-Camera_01', name: 'Camera 01', by: 'Rajil Jose Macatangay' },
      { id: 'ph-potted_plant_02', name: 'Potted Plant 02', by: 'Rico Cilliers' },
      { id: 'ph-grass_bermuda_01', name: 'Grass Bermuda 01', by: 'Rico Cilliers' },
    ],
    'acg': [
      { id: 'acg-Wood096', name: 'Wood 096', by: 'ambientCG' },
      { id: 'acg-Bricks105', name: 'Bricks 105', by: 'ambientCG' },
      { id: 'acg-Ground112', name: 'Ground 112', by: 'ambientCG' },
      { id: 'acg-Ground111', name: 'Ground 111', by: 'ambientCG' },
      { id: 'acg-Fabric084', name: 'Fabric 084', by: 'ambientCG' },
      { id: 'acg-Ground110', name: 'Ground 110', by: 'ambientCG' },
    ],
  } as Record<string, { id: string; name: string; by: string; tags?: string[]; code?: boolean }[]>,
  // Themes: name, then primary / secondary / surface / text from each theme's tokens, and its display font.
  themes: {
    'modern': [
      { name: 'agentic', c: ['#FF5701', '#F6F6F1', '#FFFFFF', '#111827'], font: 'Playfair Display' },
      { name: 'basic', c: ['#A855F7', '#0A1829', '#FFFFFF', '#0A1829'], font: 'Oswald' },
      { name: 'bento', c: ['#FAD4C0', '#80A1C1', '#FFF5E6', '#111827'], font: 'Inter' },
      { name: 'claude', c: ['#141413', '#FAF9F6', '#FFFFFF', '#111827'], font: 'Anthropic Sans' },
      { name: 'claymorphism', c: ['#3B82F6', '#FFFFFF', '#FFFFFF', '#1C398E'], font: 'Poppins' },
      { name: 'codex', c: ['#000000', '#ffffff', '#FFFFFF', '#111827'], font: 'Open Sans' },
    ],
    'clean': [
      { name: 'cafe', c: ['#5D4432', '#E9E3DD', '#F9F7F5', '#3E2B1E'], font: 'Poppins' },
      { name: 'dramatic', c: ['#8B5CF6', '#F43F5E', '#09090B', '#FAFAFA'], font: 'Outfit' },
      { name: 'enterprise', c: ['#0C5CAB', '#0a4a8a', '#09090b', '#fafafa'], font: 'IBM Plex Sans' },
      { name: 'glassmorphism', c: ['#1856FF', '#3A344E', '#FFFFFF', '#141414'], font: 'Plus Jakarta Sans' },
      { name: 'immersive', c: ['#00592B', '#0023D1', '#FFFFFF', '#111827'], font: 'Oswald' },
      { name: 'impeccable', c: ['#CC8800', '#C55221', '#FFFFFF', '#111827'], font: 'Chakra Petch' },
    ],
    'high-contrast': [
      { name: 'matrix', c: ['#2DB58A', '#0B0C14', '#FFFFFF', '#111827'], font: 'Space Mono' },
      { name: 'mono', c: ['#37F712', '#00A6F4', '#E7E5E4', '#78716B'], font: 'Space Mono' },
      { name: 'neobrutalism', c: ['#FDC800', '#432DD7', '#FBFBF9', '#1C293C'], font: 'Inter' },
      { name: 'neon', c: ['#BBF351', '#00BCFF', '#FFFFFF', '#111827'], font: 'STIX Two Text' },
      { name: 'neumorphism', c: ['#006666', '#F1F2F5', '#E7E5E4', '#1E2938'], font: 'Space Mono' },
      { name: 'pacman', c: ['#2A3FE5', '#F4B9B0', '#000000', '#111827'], font: 'Press Start 2P' },
    ],
    'playful': [
      { name: 'contemporary', c: ['#C800DF', '#E60076', '#FFFFFF', '#111827'], font: 'Jost' },
      { name: 'doodle', c: ['#49B6E5', '#263D5B', '#FFFFFF', '#111827'], font: 'Delius Swash Caps' },
      { name: 'expressive', c: ['#db2777', '#2563eb', '#FFFFFF', '#111827'], font: 'IBM Plex Mono' },
      { name: 'fiction', c: ['#222222', '#FFE9CE', '#FFFFFF', '#111827'], font: 'Cossette Texte' },
      { name: 'friendly', c: ['#F2D9DC', '#D9F2D8', '#FFFFFF', '#111827'], font: 'Noto Serif Display' },
      { name: 'gradient', c: ['#990FFA', '#E60076', '#FFFFFF', '#111827'], font: 'Space Grotesk' },
    ],
    'minimal': [
      { name: 'flat', c: ['#F2673C', '#8B5CF6', '#FFFFFF', '#111827'], font: 'Inter' },
      { name: 'material', c: ['#6442D6', '#C8B3FD', '#FFFFFF', '#111827'], font: 'Roboto' },
      { name: 'minimal', c: ['#0C0C09', '#312C85', '#F4F4F1', '#0C0C09'], font: 'Inter' },
      { name: 'modern', c: ['#553F83', '#111111', '#553F83', '#ffffff'], font: 'IBM Plex Serif' },
      { name: 'paper', c: ['#111111', '#8B5CF6', '#FFFFFF', '#111827'], font: 'Montserrat' },
      { name: 'shadcn', c: ['#000000', '#111111', '#FFFFFF', '#111827'], font: 'Geist' },
    ],
    'bold': [
      { name: 'bold', c: ['#0077BC', '#009866', '#111111', '#111827'], font: 'Archivo Black' },
      { name: 'brutalism', c: ['#DD614C', '#DAA144', '#FFFFFF', '#111827'], font: 'Darker Grotesque' },
      { name: 'fantasy', c: ['#0250CC', '#FDC800', '#FFFFFF', '#111827'], font: 'New Rocker' },
      { name: 'lingo', c: ['#58cc02', '#ce82ff', '#FFFFFF', '#3c3c3c'], font: 'Nunito' },
      { name: 'power', c: ['#FAFAFA', '#FAFAFA', '#000000', '#ffffff'], font: 'Oswald' },
      { name: 'pulse', c: ['#EA580B', '#F59E0B', '#FDBA74', '#EA580C'], font: 'Limelight' },
    ],
  } as Record<string, { name: string; c: string[]; font: string }[]>,
  // The wall of sources. 21st.dev: the bank. GitHub: UI index gh:* rows. shadcn: the official registry directory (430).
  // Iconify: 239 open icon sets; per-set icon counts from api.iconify.design/collections (9 Oct). Fontsource: 2,100 open
  // families (api.fontsource.org). Poly Haven: 997 + 866 + 521. ambientCG: 2,900 (ledger, API numberOfResults).
  // Library rows: components held in the bank from that library's 21st.dev author (aceternity-ui is @manuarora700's,
  // magic-ui @dillionverma's, origin-ui @originui's, kokonut-ui @kokonutd's; ledger rows web:21st.dev/@author/library/*).
  sources: [
    { name: '21st.dev', logo: '/logos/ui-hub/21st-dev.png', n: 8538, unit: 'components' },
    { name: 'GitHub', logo: 'github', n: 43751, unit: 'UI repos' },
    { name: 'shadcn/ui', logo: '/logos/ui-hub/shadcn-ui.png', n: 430, unit: 'registries' },
    { name: 'Iconify', logo: '/logos/ui-hub/iconify.png', n: 239, unit: 'icon sets' },
    { name: 'Fontsource', logo: '/logos/ui-hub/fontsource.png', n: 2100, unit: 'fonts' },
    { name: 'Poly Haven', logo: '/logos/ui-hub/polyhaven.png', n: 2384, unit: 'CC0 assets' },
    { name: 'ambientCG', logo: '/logos/ui-hub/ambientcg.png', n: 2900, unit: 'CC0 assets' },
    { name: 'Aceternity UI', logo: '/logos/ui-hub/aceternity.png', n: 87, unit: 'components' },
    { name: 'Magic UI', logo: '/logos/ui-hub/magicuidesign.png', n: 61, unit: 'components' },
    { name: 'Kokonut UI', logo: '/logos/ui-hub/kokonut-labs.png', n: 56, unit: 'components' },
    { name: 'Origin UI', logo: '/logos/ui-hub/origin-space.png', n: 49, unit: 'components' },
    { name: 'Phosphor', logo: '/logos/ui-hub/phosphor-icons.png', n: 9072, unit: 'icons' },
    { name: 'Tabler Icons', logo: '/logos/ui-hub/tabler.png', n: 6238, unit: 'icons' },
    { name: 'Hugeicons', logo: '/logos/ui-hub/hugeicons.png', n: 6065, unit: 'icons' },
    { name: 'Remix Icon', logo: '/logos/ui-hub/remix-design.png', n: 3188, unit: 'icons' },
    { name: 'Lucide', logo: '/logos/ui-hub/lucide-icons.png', n: 1869, unit: 'icons' },
  ],
  // UI index SUMMARY.md "Counts per category": the ten largest of its 19 categories (ledger rows).
  categories: [
    ['Component libraries', 16270], ['Mobile UI', 7514], ['Templates', 4431], ['3D and WebGL', 4023], ['Animation', 3923],
    ['Charts', 3386], ['Fonts', 3064], ['Colour and tokens', 2163], ['Shaders', 1705], ['Icons', 1328],
  ] as [string, number][],
  // Skills: real names. ui-pick, ui-iteration-round and component-review-gallery are in the siso-skills-hub
  // registry (54 skills, registry/skills_registry.json, 9 Oct); ui-bank, design-lab and living-asset are installed skills (~/.claude/skills).
  // Descriptions and first lines are their SKILL.md text, shortened only at a sentence or clause end. Tags are the registry's;
  // ui-bank and design-lab have none in their frontmatter, so none are shown.
  skillsMade: 54,
  skills: [
    { name: 'ui-pick', desc: 'Rank the 137 curated UI components against a stated need in one ~1.5s parallel Jev call for $0.0006.',
      tags: 'ui, components, ranking, jev, 21st, design', head: 'ui-pick',
      body: 'One narrow Jev question per component, all in one parallel request. Returns a ranked shortlist with each pick’s URL and Shaan’s original note.' },
    { name: 'ui-bank', desc: 'Shaan’s curated UI component bank (21st.dev picks with his verbatim notes + 300 rubric-rated candidates), with per-project presets.',
      tags: '', head: 'ui-bank — the curated component bank',
      body: 'The 7,949-corpus tools stay in registry/21st/ (find.mjs); this skill is only the hand-picked layer.' },
    { name: 'design-lab', desc: 'Build a live, hosted, side-by-side comparison page so a human picks a UI/design direction by LOOKING at rendered options instead of reading names or prose.',
      tags: '', head: 'Design Lab — let them pick by looking',
      body: 'The output is one hosted URL showing every option rendered live, side by side, from the real component source, with the real app’s numbers in it.' },
    { name: 'living-asset', desc: 'Design and build a premium, alive, state-driven UI asset that feels 3D (mascot face, assistant orb, status character, animated logo) as one SVG + CSS engine driven by data attributes.',
      tags: 'frontend, design, animation, svg, mascot, 3d', head: 'Living asset: a face that feels alive, in SVG + CSS',
      body: '## 1. Shape of the work: rounds, not one shot' },
    { name: 'component-review-gallery', desc: 'Build a client-facing web gallery that shows several design options for one component using the client’s real brand assets, and publishes it to a shareable URL they can open on a phone.',
      tags: 'frontend, design-review, client-work, cloudflare-pages', head: 'Component review gallery',
      body: 'Give a client one link that shows the same component built several different ways, with their own logo, copy, links and artwork, and a Desktop/Mobile switch.' },
    { name: 'ui-iteration-round', desc: 'Run one round of UI iteration on pages or widgets Shaan has seen: his words first, shots before at his ratio, at least five specified improvement ideas per item.',
      tags: 'frontend, design-review, ui-iteration, before-after', head: 'One UI iteration round',
      body: 'Shots before, at least five specified improvement ideas per item (his own first), one coder, shots after, then a before/after page.' },
  ],
  // ui-pick, run for real on 9 Oct 2026: python3 pick.py "a notifications dropdown in the top bar".
  pickRun: {
    need: 'a notifications dropdown in the top bar', head: '138 components, 2762ms, $0.00063',
    rows: [['0.76', 'popover-notifications', '@anubra266'], ['0.69', 'notifications-with-avatars', '@originui'], ['0.66', 'notifications-menu', '@ahmedmayara'], ['0.46', 'action-dropdown', '@moumensoliman']] as [string, string, string][],
  },
  // Live previews: every URL loaded in camofox on 9 Oct 2026 (title read, page shot). Corner Café is the live business site; the
  // seven looks are linked from corner-cafe-six.siso-sites.pages.dev; the games layer is 136 games (DNA.md, its index page).
  // Both are built with the site kit in the siso-ui-hub repo (kits/siso-site-kit).
  previews: [
    { title: 'Corner Café', note: 'Live site', url: 'https://sisolabs.space/', img: 'site-cornerCafe' },
    { title: 'Cosy', note: 'One of its 7 looks', url: 'https://sisolabs.space/', img: 'site-cosy' },
    { title: 'Premium dark', note: 'One of its 7 looks', url: 'https://sisolabs.space/', img: 'site-premium-dark' },
    { title: 'Playful', note: 'One of its 7 looks', url: 'https://sisolabs.space/', img: 'site-playful' },
    { title: 'Street', note: 'One of its 7 looks', url: 'https://sisolabs.space/', img: 'site-street' },
    { title: 'Games layer', note: '136 games from its menu', url: 'https://games.siso-sites.pages.dev/', img: 'site-games' },
  ],
  // The ways in. Open source: the public component bank. CLI: its find.mjs (public, main). Skills: ui-pick and ui-bank.
  // MCP: none built (no MCP server in siso-ui-hub, siso-component-bank or siso-ui-base, checked 9 Oct), so it says soon.
  repoUrl: 'https://github.com/siso-os/siso-component-bank',
  cliUrl: 'https://github.com/siso-os/siso-component-bank/blob/main/find.mjs',
};

export const PRODUCTS = [
  {
    product: 'ui-hub', overline: 'SISO UI Hub', title: 'Every UI worth reusing, in one catalogue', href: '/ui-hub/',
    tabs: ['Pick by looking', 'Source library command', "Index other people's UI"],
    footer: '28 picks · 11 libraries indexed · 1,182 items', video: 'https://publicassets.foreplay.co/cta-swipe-file.mov',
  },
  {
    product: 'os', overline: 'SISO OS', title: 'The OS our agents run on', href: '/agent-base/',
    tabs: ['Swappable modules', 'Browser built in', 'Credited, file by file'],
    // Requested 25 / 100 / 44 counts are absent from the approved DNA facts. Use labels until sourced.
    footer: 'Swappable modules · Browser built in · File-by-file lineage', video: 'https://publicassets.foreplay.co/cta-spyder.mov',
  },
  {
    product: 'library', overline: 'Great Library of SISO', title: 'Search the work behind modern software', href: '/great-library/',
    tabs: ['Rated repos', 'People Graph', 'Components'],
    footer: '23,778 rated repos · 339,217 people · 8,538 components', video: 'https://publicassets.foreplay.co/cta-discovery.mov',
  },
  {
    // Slot for the Skills Hub card (lane skills-hub-card) until it lands; drawn by the shared ProductCard. Data: skills-hub.json.
    product: 'skills', overline: 'Skills Hub', title: 'The skills our agents run on, yours to install', href: 'https://github.com/siso-os/siso-skills-hub',
    tabs: ['Every skill in one hub', 'Install in one line', 'By category'],
    footer: '54 skills · 8 categories · open source', video: '',
  },
  {
    // Rendered by agency/AgencyCard (its own globe panel); these fields only keep the shared type whole.
    product: 'agency', overline: 'SISO Agency', title: 'Agents build sites for every industry', href: '/industries/',
    tabs: ['Sites around the world', 'Open any site', 'Every industry ranked'],
    footer: '213 sites built · 3,665 industries ranked', video: '',
  },
] as const;
