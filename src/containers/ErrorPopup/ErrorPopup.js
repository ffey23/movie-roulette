import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dismissError } from '@/redux/error/actions';
import Button from '@/components/Button/Button';
import { ReactComponent as Cross } from '@/assets/images/cross.svg';
import { colors } from '@/styled/variables';
import { popupOverlay } from '@/styled/mixins';

export class ErrorPopup extends Component {
  static propTypes = {
    error: PropTypes.exact({
      title: PropTypes.string,
      message: PropTypes.string,
    }),
  };

  render() {
    if (!this.props.error) {
      document.body.style.overflow = 'auto';
      return null;
    }

    document.body.style.overflow = 'hidden';
    const { title, message } = this.props.error;

    const Wrapper = styled.div`
      ${popupOverlay}
    `;

    const Popup = styled.div`
      background-color: white;
      width: 320px;
      border-radius: 5px;
      overflow: hidden;
      text-align: center;
    `;

    const Header = styled.div`
      height: 35px;
      background-color: ${colors.primary};
    `;

    const IconWrapper = styled.div`
      padding: 20px;
    `;
    const Icon = styled.div`
      width: 50px;
      height: 50px;
      margin: auto;
      > svg {
        fill: red;
      }
    `;

    const Title = styled.h3`
      margin-bottom: 10px;
    `;

    const Message = styled.p`
      margin-bottom: 5px;
    `;

    const ButtonWrapper = styled.div`
      padding: 10px;
    `;
    const ButtonStyled = styled(Button)`
      height: 35px;
      width: 50%;
      font-weight: bold;
      border-radius: 3px;
    `;

    return (
      <Wrapper>
        <Popup>
          <Header></Header>
          <IconWrapper>
            <Icon>
              <Cross />
            </Icon>
          </IconWrapper>
          <Title>{title}</Title>
          <Message>{message}</Message>
          <ButtonWrapper>
            <ButtonStyled onClick={this.props.dismissError} confirm>
              Ok
            </ButtonStyled>
          </ButtonWrapper>
        </Popup>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  dismissError: () => dispatch(dismissError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPopup);
