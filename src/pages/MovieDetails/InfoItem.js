import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InfoItem = ({ name, content }) => {
  const Wrapper = styled.p`
    margin-bottom: 8px;
  `;
  const Name = styled.span`
    font-weight: bold;
  `;

  return (
    <Wrapper>
      <Name>{name}: </Name>
      <span>{content}</span>
    </Wrapper>
  );
};

InfoItem.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default InfoItem;
