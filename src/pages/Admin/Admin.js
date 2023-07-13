import React, { useState } from 'react';
import GamePopup from '../../components/CreatePopup/popup/GamePopup';
import FaultPopup from '../../components/CreatePopup/popup/FaultPopup';
import TypePopup from '../../components/CreatePopup/popup/TypePopup';
import { useAppContext } from '../../context/popup/popup_context_provider';
import httpCommon from '../../services/http-common';
import { PopupBack, Container } from '../Home/styles';
import SideBar from '../../components/SideBar/SideBar'
import Games from './Games';

export default function Admin() {
    const { showPopup, hidePopup, isPopupShown } = useAppContext();
    const [selectedPage, setSelctedPage] = useState('games');

    const handleFileUpload = async (image) => {
        try {
            if (!image) {
                console.error('No file selected');
                return;
            }

            const formData = new FormData();
            formData.append('file', image);

            const res = await httpCommon.post('files/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return res.data.id
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    const handleFileUpdate = async (id, image) => {
        try {
            if (!image) {
                console.error('No file selected');
                return;
            }
            const formData = new FormData();
            formData.append('file', image);


            const res = await httpCommon.put(`/files/update?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            )
            console.log(res);
            return res.data.id
        } catch (err) {
            console.error('Error updating file: ', err);
        }
    }

    const createTag = async (form) => {
        try {
            const res = await httpCommon.post('tags/create', form)
            hidePopup()
            console.log(res)
        } catch (err) {
            console.error('error creating tag:', err);
        }

    }

    const createFaultType = async (form) => {
        try {
            const res = await httpCommon.post('/faultTypes/create', form);
            hidePopup()
            console.log(res);
        } catch (err) {
            console.error('error creating fault type: ', err);
        }

    }

    return (
        <Container>
            <SideBar setPage={setSelctedPage} selectedPage={selectedPage} />
            {selectedPage == 'games' ?
                <Games handleFileUpload={handleFileUpload} handleFileUpdate={handleFileUpdate} />
                // <div onClick={() => showPopup(<GamePopup name='יצירת משחק' handleFileUpload={handleFileUpload} hidePopup={hidePopup} />)}>יצירת משחק</div>
                : selectedPage == 'fault' ? <div onClick={() => showPopup(<FaultPopup name='יצירת תקלה' handleFileUpload={handleFileUpload} hidePopup={hidePopup} />)}>יצירת תקלה</div>
                    : selectedPage == 'faultType' ? <div onClick={() => showPopup(<TypePopup name='יצירת קטגוריה' submit={createTag} hidePopup={hidePopup} />)}>יצירת קטגוריה</div>
                        : <div onClick={() => showPopup(<TypePopup name='יצירת סוג תקלה' submit={createFaultType} hidePopup={hidePopup} />)}>יצירת סוג תקלה</div>
            }
            <PopupBack show={isPopupShown} onClick={() => hidePopup()}></PopupBack>
            {/* <div onClick={() => showPopup(<CreatePopup name='יצירת קטגוריה' data={TAG} submit={createTag} />)}>יצירת קטגוריה</div> */}
        </Container>
    )
}