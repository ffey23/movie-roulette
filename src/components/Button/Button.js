import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = ({ onClick, children, ...rest }) => {
  const colorConfirm = '#6495ed';
  const colorConfirmLight = '#729eee';
  const colorConfirmDark = '#527ac2';
  const colorConfirmText = '#fff';
  const Button = styled.button`
    :hover {
      cursor: pointer;
    }

    ${props =>
      props.confirm &&
      `
      border: none;
      background-color: ${colorConfirm};
      background: linear-gradient(135deg, ${colorConfirm}, ${colorConfirmDark});
      color: ${colorConfirmText};
      &:hover {       
        background-color: ${colorConfirmLight};
        background: linear-gradient(135deg, ${colorConfirmLight}, ${colorConfirm});
      } 
    `}
  `;

  return (
    <Button onClick={onClick} {...rest}>
      {children}
    </Button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
};

export default Button;
