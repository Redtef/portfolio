import { visit } from 'unist-util-visit';
import { load } from 'js-yaml';

// Use `any` for the AST and file types to avoid type conflicts across
// differing @types packages in the dependency graph after upgrading.
export default function extractFrontmatter() {
  return (tree: any, file: any) => {
    visit(tree, 'yaml', (node: any) => {
      //@ts-ignore
      file.data.frontmatter = load(node.value);
    });
  };
}
