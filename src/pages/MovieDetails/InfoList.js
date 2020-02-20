import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fromLg } from '@/styled/mixins';
import InfoItem from '@/pages/MovieDetails/InfoItem';

const InfoList = ({ infos }) => {
  const Wrapper = styled.div`
    ${fromLg(`
        max-width: 50%;
    `)}
  `;
  const renderItems = () => infos.map(i => <InfoItem {...i} key={i.name} />);
  return <Wrapper>{renderItems()}</Wrapper>;
};

InfoList.propTypes = {
  infos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};

InfoList.defaultProps = {
  infos: [],
};

export default InfoList;
