import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = ({ onClick, text, css, ...rest }) => {
  const colorConfirm = '#6495ed';
  const colorConfirmLight = '#729eee';
  const colorConfirmDark = '#527ac2';
  const colorConfirmText = '#fff';
  const Button = styled.button`
    ${props =>
      props.confirm &&
      `
      background-color: ${colorConfirm};
      background: linear-gradient(135deg, ${colorConfirm}, ${colorConfirmDark});
      color: ${colorConfirmText};
      &:hover {       
        background-color: ${colorConfirmLight};
        background: linear-gradient(135deg, ${colorConfirmLight}, ${colorConfirm});
      } 
      box-shadow: 3px 7px 9px #777, inset 0px 2px 3px #fff;
    `}
  `;

  return (
    <Button onClick={onClick} {...rest}>
      {text}
    </Button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  css: PropTypes.string,
};

export default Button;
