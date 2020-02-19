import React from 'react';
import styled from 'styled-components';
import ButtonSkeleton from '@/components/Button/Button';
import { fromLg, fromMd } from '@/styled/mixins';
import PropTypes from 'prop-types';

function BottomButtons({
  showLoadButton,
  showRollButton,
  handleLoadButton,
  handleRollButton,
}) {
  const ButtonsWrapper = styled.div`
    position: relative;
    ${fromMd(`display: flex;`)}
  `;

  // Wrappers needed for centering load button even if roll is in the same level on the right
  const LoadButtonWrapper = styled.div`
    ${fromMd(`
      flex-grow: 1;
      padding-right: 5px;
    `)}
    ${fromLg(`
      padding-right: 0;
      text-align: center;
    `)}
  `;

  const RollButtonWrapper = styled.div`
    ${fromMd(`
      flex-grow: 1;
      padding-left: 5px;
  `)}
    ${fromLg(`
      position: absolute;
      top: 0;
      right: 0;
      padding-left: 0;
  `)}
  `;

  const Button = styled(ButtonSkeleton)`
    width: 100%;
    height: 90px;
    border-width: 0;
    border-radius: 10px;
    font-weight: bold;
    font-size: 2em;
    margin-bottom: 15px;
    ${fromLg(`
      width: 90px;
      height: 90px;
      font-size: 1.5em;
      position: relative;
      text-align: center;
      line-height: 90px;
      border-radius: 50%;
  `)}
  `;

  const renderLoadButton = () => {
    if (!showLoadButton) return null;
    return (
      <LoadButtonWrapper>
        <Button confirm onClick={handleLoadButton} text='Load' />
      </LoadButtonWrapper>
    );
  };

  const renderRollButton = () => {
    if (!showRollButton) return null;
    return (
      <RollButtonWrapper>
        <Button confirm onClick={handleRollButton} text='Roll' />
      </RollButtonWrapper>
    );
  };

  return (
    <ButtonsWrapper>
      {renderLoadButton()}
      {renderRollButton()}
    </ButtonsWrapper>
  );
}

BottomButtons.propTypes = {
  showLoadButton: PropTypes.bool.isRequired,
  showRollButton: PropTypes.bool.isRequired,
  handleLoadButton: PropTypes.func.isRequired,
  handleRollButton: PropTypes.func.isRequired,
};
export default BottomButtons;
