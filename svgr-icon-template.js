const template = (variables, { tpl }) => {
  return tpl`
${variables.imports};

${variables.interfaces};

export const ${variables.componentName.slice(3)} = (${variables.props}) => (
  ${variables.jsx}
);
`;
};

module.exports = template;
