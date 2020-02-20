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
  const Content = styled.span``;
  return (
    <Wrapper>
      <Name>{name}: </Name>
      <Content>{content}</Content>
    </Wrapper>
  );
};

InfoItem.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default InfoItem;
