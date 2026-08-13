// Centralized Visual Asset Configuration
// Utilizes high-resolution cinematic editorial photography & geometric monogram SVGs.

export const imageConfig = {
  heroCourt: '/images/hero_court.jpg',
  legalDesk: '/images/legal_desk.jpg',
  treeEnv: '/images/tree_env.jpg',
  healthCare: '/images/health_care.jpg',

  // Hero section vector backup
  heroLegal: '/images/hero_court.jpg',

  // Geometric Monogram Avatar Generator with Gold Seals
  getAvatarSvg: (name: string, isDemo: boolean = true) => {
    const initials = name
      .replace('Demo Lawyer', 'DL')
      .replace('(আইনজীবী ডেমো', '')
      .split(' ')
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'NF';

    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140">
      <defs>
        <linearGradient id="avatarBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%23064E3B" />
          <stop offset="100%" stop-color="%23022C22" />
        </linearGradient>
        <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%23F59E0B" />
          <stop offset="100%" stop-color="%23B45309" />
        </linearGradient>
      </defs>
      <rect width="140" height="140" rx="20" fill="url(%23avatarBg)" stroke="url(%23goldBorder)" stroke-width="3" />
      <circle cx="70" cy="62" r="38" fill="none" stroke="%23D97706" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.5" />
      <text x="70" y="70" text-anchor="middle" dominant-baseline="middle" fill="%23F59E0B" font-family="serif" font-weight="bold" font-size="34">${initials}</text>
      ${
        isDemo
          ? '<rect x="12" y="108" width="116" height="22" rx="6" fill="%23DC2626"/><text x="70" y="123" text-anchor="middle" fill="%23FFFFFF" font-family="sans-serif" font-size="10" font-weight="bold" letter-spacing="1">DEMO PROFILE</text>'
          : ''
      }
    </svg>`;
  },
};
