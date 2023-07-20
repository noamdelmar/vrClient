import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/popup/popup_context_provider';
import httpCommon from '../../services/http-common';
import { WhiteContainer, Container } from './styles';
import FaultRow from '../../components/Rows/FaultRow';
import FaultPopup from '../../components/CreatePopup/popup/FaultPopup';

export default function Fault({ handleFileUpload, handleFileUpdate }) {
    const { showPopup, hidePopup } = useAppContext();
    const [existingFault, setFault] = useState();

    useEffect(() => {
        const getFault = async () => {
            try {
                const res = await httpCommon.get('/faults/get')
                setFault(res.data);
            } catch (err) {
                console.error('error retrieving fault: ', err);
            }
        }

        getFault()
    }, [])


    const createFault = async (form) => {
        try {
            form['image'] = await handleFileUpload(form.image)
            const res = await httpCommon.post('/faults/create', form);
            hidePopup()

        } catch (err) {
            console.error('error creating fault', err);
        }
    }

    return (
        <Container>
            <WhiteContainer>
                <div>סוגי תקלות</div>
                {existingFault?.map((fault) => {
                    return <FaultRow fault={fault} handleFileUpdate={handleFileUpdate} />
                })}
            </WhiteContainer>
            <div onClick={() => showPopup(<FaultPopup name='יצירת תקלה' handleFileUpload={handleFileUpload} hidePopup={hidePopup} submit={createFault} />)}>יצירת תקלה</div>

            {/* <div onClick={() => showPopup(<TypePopup name='יצירת סוג תקלה' submit={createFaultType} />)}>יצירת סוג תקלה</div> */}
        </Container>
    )
}