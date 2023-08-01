import React, { useState } from 'react';
import { useAppContext } from '../../context/popup/popup_context_provider';
import httpCommon from '../../services/http-common';
import { PopupBack, Container } from '../Home/styles';
import SideBar from '../../components/SideBar/SideBar'
import Games from './Games';
import Tags from './Tags';
import FaultType from './FaultType';
import Fault from './Fault';
import { useMainContext } from '../../context/user/userContext';
import { Navigate } from 'react-router-dom';

export default function Admin() {
    const { hidePopup, isPopupShown } = useAppContext();
    const [selectedPage, setSelctedPage] = useState('fault');
    const user = JSON.parse(localStorage.getItem('user'));

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

    console.log(user);

    return (
        <Container>
            <SideBar setPage={setSelctedPage} selectedPage={selectedPage} />
            {selectedPage == 'games' ?
                <Games handleFileUpload={handleFileUpload} handleFileUpdate={handleFileUpdate} />
                // <div onClick={() => showPopup(<GamePopup name='יצירת משחק' handleFileUpload={handleFileUpload} hidePopup={hidePopup} />)}>יצירת משחק</div>
                : selectedPage == 'fault' ?
                    <Fault handleFileUpload={handleFileUpload} handleFileUpdate={handleFileUpdate} />
                    // <div onClick={() => showPopup(<FaultPopup name='יצירת תקלה' handleFileUpload={handleFileUpload} hidePopup={hidePopup} />)}>יצירת תקלה</div>
                    : selectedPage == 'faultType' ?
                        <FaultType />
                        //  <div onClick={() => showPopup(<TypePopup name='יצירת קטגוריה' submit={createTag} hidePopup={hidePopup} />)}>יצירת קטגוריה</div>
                        :
                        <Tags />
                // <div onClick={() => showPopup(<TypePopup name='יצירת סוג תקלה' submit={createFaultType} hidePopup={hidePopup} />)}>יצירת סוג תקלה</div>
            }
            <PopupBack show={isPopupShown} onClick={() => hidePopup()}></PopupBack>
            {!user ? <Navigate to={'/'} replace={true} /> : null}
            {/* <div onClick={() => showPopup(<CreatePopup name='יצירת קטגוריה' data={TAG} submit={createTag} />)}>יצירת קטגוריה</div> */}
        </Container>
    )
}