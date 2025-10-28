import { visit } from 'unist-util-visit';
import sizeOf from 'image-size';
import fs from 'fs';

// Use `any` for AST node types to avoid type conflicts between different
// @types/unist versions pulled by dependencies during the upgrade.
export default function remarkImgToJsx() {
  return (tree: any) => {
    visit(
      tree,
      // only visit p tags that contain an img element
      (node: any): node is any =>
        node.type === 'paragraph' &&
        node.children.some((n: any) => n.type === 'image'),
      (node: any) => {
        const imageNode: any = node.children.find(
          (n: any) => n.type === 'image',
        );

        // only local files
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          // `image-size` types differ across versions; cast the path to any
          // to avoid TypeScript signature mismatch during migration.
          const dimensions = sizeOf(
            `${process.cwd()}/public${imageNode.url}` as any,
          );

          // Convert original node to next/image
          ((imageNode.type = 'mdxJsxFlowElement'),
            (imageNode.name = 'Image'),
            (imageNode.attributes = [
              { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
              { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
              {
                type: 'mdxJsxAttribute',
                name: 'width',
                value: dimensions.width,
              },
              {
                type: 'mdxJsxAttribute',
                name: 'height',
                value: dimensions.height,
              },
            ]));

          // Change node type from p to div to avoid nesting error
          node.type = 'div';
          node.children = [imageNode];
        }
      },
    );
  };
}
