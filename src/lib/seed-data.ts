import type { Partner, TeamMember } from './data';

// Note: These are without IDs, as Firestore will generate them.
export const initialTeamMembers: Omit<TeamMember, 'id'>[] = [
  {
    name: 'Hüseyn Tahirov',
    role: 'CEO & Founder',
    image:
      'https://media.licdn.com/dms/image/D4D03AQEyzpyQvH6qvg/profile-displayphoto-shrink_800_800/0/1710526848259?e=1721865600&v=beta&t=W0_hXgBv-2y7P3eD5n9b1vQj8cZ_X9oY4sL6gI2jR0k',
    social: {
      linkedin: 'https://www.linkedin.com/in/huseyn-tahirov/',
      twitter: '#',
      instagram: '#',
      facebook: '#',
    },
    aiHint: 'person portrait',
    order: 1,
  },
  {
    name: 'Həmid Şıxverdiyev',
    role: 'Co-Founder',
    image: 'https://placehold.co/250x250.png',
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
      facebook: '#',
    },
    aiHint: 'person portrait',
    order: 2,
  },
    {
    name: 'Hasan Yıldız',
    role: 'Co-Founder',
    image: 'https://placehold.co/250x250.png',
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
      facebook: '#',
    },
    aiHint: 'person portrait',
    order: 3,
  },
    {
    name: 'Melisa Yıldız',
    role: 'Co-Founder',
    image: 'https://placehold.co/250x250.png',
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
      facebook: '#',
    },
    aiHint: 'person portrait',
    order: 4,
  },
    {
    name: 'Eyyub Şenal',
    role: 'Co-Founder',
    image: 'https://placehold.co/250x250.png',
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
      facebook: '#',
    },
    aiHint: 'person portrait',
    order: 5,
  },
];

export const initialPartners: Omit<Partner, 'id'>[] = [
  {
    name: 'STEAM Naxçıvan',
    logo: 'https://i.hizliresim.com/iv8v13u.png',
    aiHint: 'education logo',
    order: 1,
  },
  {
    name: 'SUP VC',
    logo: 'https://sup.vc/wp-content/uploads/2021/08/sup-logo-colored.svg',
    aiHint: 'venture capital logo',
    order: 2,
  },
  {
    name: 'Rəqəmsal İnkişaf və Nəqliyyat Nazirliyi',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/R%C9%99q%C9%99msal_%C4%B0nki%C5%9Faf_v%C9%99_N%C9%99qliyyat_Nazirliyi_loqo.svg/2560px-R%C9%99q%C9%99msal_%C4%B0nki%C5%9Faf_v%C9%99_N%C9%99qliyyat_Nazirliyi_loqo.svg.png',
    aiHint: 'ministry logo',
    order: 3,
  },
  {
    name: 'Naxçıvan Dövlət Universiteti',
    logo: 'https://rector.ndu.edu.az/wp-content/uploads/2024/04/NDU-Logo-DE-Tr-Eng-1.png',
    aiHint: 'university logo',
    order: 4,
  },
  {
    name: 'Startup Grind Azerbaijan',
    logo: 'https://images.squarespace-cdn.com/content/v1/5a59322b6957da9a35a585cc/1517424692796-062A73M751V561S294M3/SG-Wordmark-2018-Black.png',
    aiHint: 'startup community logo',
    order: 5,
  },
];
