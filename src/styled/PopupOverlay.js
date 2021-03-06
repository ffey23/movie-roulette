import styled from 'styled-components';

const PopupOverlay = styled.div`
  /**
     * Makes loader-wrapper cover whole screen
     */
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
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

export default PopupOverlay;
