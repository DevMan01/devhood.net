// Single source of truth for the social links on the landing card.
// Add or remove entries here — the UI iterates this list.
export type Social = {
  id: string;
  label: string;
  href: string;
  // Inline SVG keeps things dependency-free and lets Tailwind color them via currentColor.
  icon: 'github' | 'linkedin' | 'reddit' | 'facebook' | 'strava' | 'alltrails';
};

export const socials: Social[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/DevMan01',
    icon: 'github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tim-c-064b98132/',
    icon: 'linkedin',
  },
  {
    id: 'reddit',
    label: 'Reddit',
    href: 'https://www.reddit.com/user/DevManTim/',
    icon: 'reddit',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/tim.chaffin.353',
    icon: 'facebook',
  },
  {
    id: 'strava',
    label: 'Strava',
    href: 'https://www.strava.com/athletes/88075126',
    icon: 'strava',
  },
  {
    id: 'alltrails',
    label: 'AllTrails',
    href: 'https://www.alltrails.com/members/tim-chaffin-1',
    icon: 'alltrails',
  },
];
