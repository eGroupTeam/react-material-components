export default function appendStylesIntro(text, styles) {
  return `${text}

# CSS

You can override all the class names injected by Material-UI thanks to the \`classes\` property.
This property accepts the following keys:
\`\`\`javascript
${styles}
\`\`\`
`;
}
