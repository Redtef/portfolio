export enum ContactType {
  github = 'github',
  linkedin = 'linkedin',
  twitter = 'twitter',
  // youtube = 'youtube',
  email = 'email',
  // buymeacoffee = 'buymeacoffee',
}

export interface Contact {
  twitter: string;
  site: string;
  calendly?: string;
  links: Record<ContactType, string>;
}

export const contact: Contact = {
  twitter: '@hamzaT44',
  site: 'hamzatakouit.com',
  calendly: 'https://calendly.com/',
  links: {
    github: 'https://github.com/redtef',
    linkedin: 'https://linkedin.com/in/hamzatakouit',
    twitter: 'https://twitter.com/hamzat44',
    // youtube: 'https://www.youtube.com/',
    email: 'mailto:hamzatakouit@gmail.com',
    // buymeacoffee: 'https://www.buymeacoffee.com/',
  },
};
