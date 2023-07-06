import React from 'react';
import { useAppContext } from './popup_context_provider';
import { PopupContainerStyle, FlexContainer } from '../../components/CreatePopup/popup/styles';

const PopupContainer = () => {
    const { isPopupShown, component } = useAppContext();

    if (!isPopupShown) return null;

    return (
        <FlexContainer>
            <PopupContainerStyle>
                {component}
            </PopupContainerStyle>
        </FlexContainer>
    )
}

export default PopupContainer;