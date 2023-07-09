import React, { useState } from 'react';
import { useAppContext } from '../../context/popup/popup_context_provider';
import GamePopup from '../../components/CreatePopup/popup/GamePopup';

export default function Games({ handleFileUpload }) {
    const { showPopup, hidePopup, isPopupShown } = useAppContext();

    return (
        <>
            <div onClick={() => showPopup(<GamePopup name='יצירת משחק' handleFileUpload={handleFileUpload} hidePopup={hidePopup} />)}>יצירת משחק</div>
        </>
    )
}