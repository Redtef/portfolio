import { Colors } from './colors';

export enum Stack {
  // Languages
  java,
  go,
  typescript,
  javascript,
  python,

  // Frontend
  react,
  nextJs,
  reactnative,

  // Backend
  graphql,
  node,
  django,
  spring,

  // Cloud
  aws,
  gcp,
  docker,
  kubernetes,

  // Messaging
  nats,

  // Databases
  arangodb,
  redis,
  postgres,
  mongo,
  sql,

  git,

  // Mobile
  Android,
}

export const LearnStack = [
  Stack.aws,
  Stack.gcp,
  Stack.graphql,
  Stack.redis,
  Stack.node,
];

export const WorkStack = [
  Stack.java,
  Stack.typescript,
  Stack.react,
  Stack.nextJs,
  Stack.kubernetes,
  Stack.docker,
  Stack.postgres,
  Stack.spring,
  Stack.git,
  Stack.sql,
];

type StackInfoMap = {
  value: string;
  color: string;
};

export const StackInfo: Record<Stack, StackInfoMap> = {
  [Stack.git]: {
    value: 'GIT',
    color: Colors.git,
  },
  [Stack.sql]: {
    value: 'SQL',
    color: Colors.sql,
  },
  [Stack.nextJs]: {
    value: 'NextJS',
    color: Colors.nextjs,
  },
  [Stack.spring]: {
    value: 'Spring',
    color: Colors.spring,
  },
  [Stack.java]: {
    value: 'Java',
    color: Colors.java,
  },
  [Stack.Android]: {
    value: 'Android',
    color: Colors.android,
  },
  [Stack.typescript]: {
    value: 'TypeScript',
    color: Colors.typescript,
  },
  [Stack.javascript]: {
    value: 'JavaScript',
    color: Colors.javascript,
  },
  [Stack.go]: {
    value: 'Go',
    color: Colors.go,
  },
  [Stack.react]: {
    value: 'React',
    color: Colors.react,
  },
  [Stack.reactnative]: {
    value: 'React Native',
    color: Colors.reactnative,
  },
  [Stack.graphql]: {
    value: 'GraphQL',
    color: Colors.graphql,
  },
  [Stack.aws]: {
    value: 'AWS',
    color: Colors.aws,
  },
  [Stack.docker]: {
    value: 'Docker',
    color: Colors.docker,
  },
  [Stack.kubernetes]: {
    value: 'Kubernetes',
    color: Colors.kubernetes,
  },
  [Stack.gcp]: {
    value: 'Google Cloud',
    color: Colors.gcp,
  },
  [Stack.python]: {
    value: 'Python',
    color: Colors.python,
  },
  [Stack.node]: {
    value: 'Node',
    color: Colors.node,
  },
  [Stack.django]: {
    value: 'Django',
    color: Colors.django,
  },
  [Stack.nats]: {
    value: 'NATS',
    color: Colors.nats,
  },
  [Stack.arangodb]: {
    value: 'ArangoDB',
    color: Colors.arangodb,
  },
  [Stack.postgres]: {
    value: 'Postgres',
    color: Colors.postgres,
  },
  [Stack.redis]: {
    value: 'Redis',
    color: Colors.redis,
  },
  [Stack.mongo]: {
    value: 'MongoDB',
    color: Colors.mongo,
  },
};
