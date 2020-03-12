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

const popupOverlay = content => `
    /**
     * Makes loader-wrapper cover whole screen
     */
    position: fixed;
    z-index: 10000;
    top: 0;
    width: 100%;
    height: 100vh;
    /**
     * Centers loader
     */
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.6);
`;

export { fromLg, fromMd, popupOverlay };
