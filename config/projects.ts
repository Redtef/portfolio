import { Maybe, Tuple } from '../types';
import { Stack } from './stack';

export type Deployment = {
  web?: string;
  android?: string;
  ios?: string;
};

export interface SubProject {
  title: string;
  description: string;
  repository: Maybe<string>;
  deployment: Deployment;
}

export const defaultDimensions: Tuple<number> = [450, 220];

export interface Project {
  title: string;
  slug: string;
  website: string;
  banner: string;
  description: string;
  shortDescription?: string;
  repository: Maybe<string>;
  stack: Stack[];
  dimensions?: Tuple<number>; // Tuple of [height, width]
  screenshots: string[];
  deployment: Deployment;
  subProjects: SubProject[];
}

export const projects: Project[] = [
  {
    title: 'PlaceHolder Title',
    slug: 'placeholder',
    banner: '/static/projects/placeholder/banner.png',
    website: 'https://github.com/redtef',
    description:
      'Placeholder project while i create decent projects to showcase.',
    shortDescription:
      'Placeholder project while i create decent projects to showcase.',
    repository: 'https://github.com/redtef',
    stack: [
      Stack.java,
      Stack.typescript,
      Stack.react,
      Stack.spring,
      Stack.kubernetes,
      Stack.docker,
    ],
    dimensions: [360, 640],
    screenshots: [],
    deployment: {
      web: '#',
    },
    subProjects: [],
  },
];
