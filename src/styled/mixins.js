import { breakpoints } from './variables';

const fromLg = content => `
    @media screen and (min-width: ${breakpoints.lg}){
        ${content}
    };
`;

const fromMd = content => `
    @media screen and (min-width: ${breakpoints.md}){
        ${content}
    };
`;

export { fromLg, fromMd };
