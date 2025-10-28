declare module 'mdx-bundler/client' {
  // Minimal type overrides for getMDXComponent used in this project.
  export function getMDXComponent(code: string): (props?: any) => any;
  // If other exports are used, add them here as needed.
  export type ComponentMap = Record<string, any>;
}
