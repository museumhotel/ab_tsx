export const breakpoints = {
  mobileS: 320, //20em
  mobileL: 425, //26.5625em
  tabletS: 768, //48em
  tabletL: 960, //60em
  laptop: 1024, //64em
  desktopM: 1440, //90em
  desktopL: 2560, //160em
};

export const mediaQueriesMin = (key: keyof typeof breakpoints) => {
  return (style: TemplateStringsArray | String) =>
    `@media (min-width: ${breakpoints[key]}px) { ${style} }`;
};

export const mediaQueriesMax = (key: keyof typeof breakpoints) => {
  return (style: TemplateStringsArray | String) =>
    `@media (max-width: ${breakpoints[key]}px) { ${style} }`;
};
