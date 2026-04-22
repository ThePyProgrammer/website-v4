export type PersonLink = {
  type: 'linkedin' | 'github' | 'website';
  url: string;
};

export type Role = {
  kind: 'work' | 'education';
  label: string;
};

export type Person = {
  key: string;
  name: string;
  ping: string;
  previous?: Role;
  current?: Role;
  incoming?: Role;
  links?: PersonLink[];
};

const PEOPLE: Person[] = [
  {
    key: 'panshul',
    name: 'Panshul Sharma',
    ping: 'Panshul',
    links: [
      { type: 'linkedin', url: 'https://www.linkedin.com/in/panshul-sharma/' },
      { type: 'github', url: 'https://github.com/Panshul42' },
    ],
    previous: {
      kind: 'education',
      label: "NUS High School"
    },
    incoming: {
      kind: 'education',
      label: 'CalTech'
    }
  },
  {
    key: 'chuping',
    name: 'Mu Chuping',
    ping: 'Chuping',
    links: [
      { type: 'linkedin', url: 'https://www.linkedin.com/in/chuping-mu-2bb96a20b/' },
      { type: 'github', url: 'https://github.com/qwerty-sapien' }
    ],
    previous: {
      kind: 'education',
      label: "NUS High School"
    },
    incoming: {
      kind: 'education',
      label: 'Cambridge Nat. Sci.'
    }
  },
  {
    key: 'jiajie',
    name: 'Lee Jia Jie',
    ping: 'Jia Jie',
    links: [
      { type: 'linkedin', url: 'https://www.linkedin.com/in/lee-jia-jie/' },
      { type: 'github', url: 'https://github.com/mkofdwu' },
      { type: 'website', url: 'https://mkofdwu.github.io/' }
    ],
    previous: {
      kind: 'education',
      label: "NUS High School"
    },
    incoming: {
      kind: 'education',
      label: 'NUS CS'
    }
  },
  {
    key: 'jiangpang',
    name: 'Jiang Pang',
    ping: 'Jiang Pang',
    links: [
      { type: 'linkedin', url: 'https://www.linkedin.com/in/jiang-pang-3213161b6/' },
      { type: 'github', url: 'https://github.com/jiangpang0910' }
    ],
    current: { 
      kind: 'work',
      label: 'Research Engineer @ Pragnition Labs' 
    },
    incoming: {
      kind: 'education',
      label: 'Columbia Math'
    }
  },
  { 
    key: 'yupin',
    name: 'Quek Yu Pin',
    ping: 'Yu Pin',
    links: [
      { type: 'github', url: 'https://github.com/h1810126' }
    ],
    current: {
      kind: 'work',
      label: 'Research Engineer @ Pragnition Labs'
    },
    incoming: {
      kind: 'education',
      label: 'NUS CS'
    }
  },
  {
    key: 'ethanc',
    name: 'Ethan Chew Ming Hong',
    ping: 'Ethan',
    links: [
      { type: 'linkedin', url: 'https://www.linkedin.com/in/ethan-chew/' },
      { type: 'github', url: 'https://github.com/Ethan-Chew' },
      { type: 'website', url: 'https://www.ethanchew.com/' }
    ],
    previous: {
      kind: 'work',
      label: 'Software Dev Intern @ AETHER'
    }
  },
  {
    key: 'enjia',
    name: 'Wu Enjia',
    ping: 'Enjia',
    links: [
      { type: 'linkedin', url: 'https://www.linkedin.com/in/wuenjia/' },
      { type: 'github', url: 'https://github.com/enjiawu' },
      { type: 'website', url: 'https://wuenjia.com/' }
    ],
    current: {
      kind: 'work',
      label: 'AI Research Intern @ AETHER'
    }
  },
];

const BY_KEY = new Map(PEOPLE.map((p) => [p.key, p]));

export function getPerson(key: string): Person | undefined {
  return BY_KEY.get(key.toLowerCase());
}
