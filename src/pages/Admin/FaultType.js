import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/popup/popup_context_provider';
import httpCommon from '../../services/http-common';
import { WhiteContainer, Container } from './styles';
import FaultTypeRow from '../../components/Rows/FaultTypeRow';
import TypePopup from '../../components/CreatePopup/popup/TypePopup';

export default function FaultType() {
    const { showPopup, hidePopup } = useAppContext();
    const [existingFaultType, setFaultType] = useState();

    useEffect(() => {
        const getFaultTypes = async () => {
            try {
                const res = await httpCommon.get(`/faultTypes/get`)
                setFaultType(res.data);
            } catch (err) {
                console.error('error retrieving fault types: ', err);
            }
        }

        getFaultTypes()
    }, [])


    const createFaultType = async (data) => {
        try {
            await httpCommon.post('faultTypes/create', data);
            hidePopup();
        } catch (err) {
            console.error('error creating fault type: ', err);
        }
    }
    return (
        <Container>
            <WhiteContainer>
                <div>סוגי תקלות</div>
                {existingFaultType?.map((type) => {
                    return <FaultTypeRow type={type} />
                })}
            </WhiteContainer>
            <div onClick={() => showPopup(<TypePopup name='יצירת סוג תקלה' submit={createFaultType} />)}>יצירת סוג תקלה</div>
        </Container>
    )
}