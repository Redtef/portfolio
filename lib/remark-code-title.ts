import { visit } from 'unist-util-visit';

// Use `any` for the types here to avoid conflicting @types/unist versions
// across the dependency graph. This keeps the runtime behavior intact
// and avoids TypeScript overload/type incompatibility during the upgrade.
export default function remarkCodeTitles() {
  return (tree: any) =>
    visit(tree, 'code', (node: any, index: any, parent: any) => {
      const nodeLang = node.lang || '';
      let language = '';
      let title = '';

      if (nodeLang.includes(':')) {
        language = nodeLang.slice(0, nodeLang.search(':'));
        title = nodeLang.slice(nodeLang.search(':') + 1, nodeLang.length);
      }

      if (!title) {
        return;
      }

      const className = 'remark-code-title';

      const titleNode = {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [
          { type: 'mdxJsxAttribute', name: 'className', value: className },
        ],
        children: [{ type: 'text', value: title }],
        data: { _xdmExplicitJsx: true },
      };

      parent.children.splice(index, 0, titleNode);
      node.lang = language;
    });
}
