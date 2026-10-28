// Centralized Visual Asset Configuration
// Utilizes high-resolution cinematic editorial photography & dignified legal insignia.

export const imageConfig = {
  logo: '/images/logo.jpg',
  heroCourt: '/images/hero_court.jpg',
  legalDesk: '/images/legal_desk.jpg',
  treeEnv: '/images/tree_env.jpg',
  healthCare: '/images/health_care.jpg',
  heroLegal: '/images/hero_court.jpg',
  land1: '/images/neki_land_1.jpg',
  land2: '/images/neki_land_2.jpg',
  land3: '/images/neki_land_3.jpg',

  // Curated Professional Advocate Avatars mapped by lawyer ID or name
  getAvatarSvg: (name: string, _isDemo: boolean = false) => {
    // Extract initials or clean title
    const cleanName = name
      .replace('এডভোকেট', '')
      .replace('ব্যারিস্টার', '')
      .replace('মো.', '')
      .replace('বেগম', '')
      .trim();

    const initials = cleanName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0])
      .join('') || 'আই';

    // Different rich gradients based on name length
    const palettes = [
      { bg1: '%23064E3B', bg2: '%23022C22', accent: '%23F59E0B', ring: '%2310B981' }, // Emerald
      { bg1: '%230F172A', bg2: '%231E293B', accent: '%23FBBF24', ring: '%23D97706' }, // Navy Slate
      { bg1: '%231E1B4B', bg2: '%23312E81', accent: '%23F59E0B', ring: '%236366F1' }, // Indigo
      { bg1: '%2314532D', bg2: '%23052E16', accent: '%23FCD34D', ring: '%2322C55E' }, // Forest
    ];

    const chosen = palettes[name.length % palettes.length];

    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
      <defs>
        <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${chosen.bg1}" />
          <stop offset="100%" stop-color="${chosen.bg2}" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%23F59E0B" />
          <stop offset="50%" stop-color="%23FBBF24" />
          <stop offset="100%" stop-color="%23B45309" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.3"/>
        </filter>
      </defs>
      <!-- Background card -->
      <rect width="160" height="160" rx="32" fill="url(%23avatarGrad)" />
      <!-- Outer gold border ring -->
      <circle cx="80" cy="74" r="48" fill="none" stroke="url(%23goldGrad)" stroke-width="2.5" opacity="0.85" />
      <circle cx="80" cy="74" r="43" fill="none" stroke="${chosen.ring}" stroke-width="1" stroke-dasharray="4 3" opacity="0.6" />
      <!-- Scales / Insignia Silhouette -->
      <path d="M80 44 L80 60 M66 50 L94 50 M66 50 L60 62 L72 62 Z M94 50 L88 62 L100 62 Z" fill="none" stroke="${chosen.accent}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.45" />
      <!-- Initials -->
      <text x="80" y="82" text-anchor="middle" dominant-baseline="middle" fill="url(%23goldGrad)" font-family="'Tiro Bangla', serif, sans-serif" font-weight="900" font-size="28" filter="url(%23shadow)">${initials}</text>
      <!-- Bottom Verified Seal Badge -->
      <rect x="22" y="126" width="116" height="22" rx="11" fill="%230F172A" stroke="url(%23goldGrad)" stroke-width="1.2" />
      <circle cx="34" cy="137" r="4" fill="%2310B981" />
      <text x="78" y="141" text-anchor="middle" fill="%23FBBF24" font-family="'Hind Siliguri', sans-serif" font-size="10" font-weight="bold" letter-spacing="0.5">প্যানেল আইনজীবী</text>
    </svg>`;
  },
};
