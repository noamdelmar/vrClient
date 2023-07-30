import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/popup/popup_context_provider';
import httpCommon from '../../services/http-common';
import { WhiteContainer, Container, SearchContainer, Title } from './styles';
import FaultTypeRow from '../../components/Rows/FaultTypeRow';
import TypePopup from '../../components/CreatePopup/popup/TypePopup';
import TitleRow from '../../components/Rows/TitleRow';
import Search from '../../components/Search/Search';
import AddButton from '../../components/AddButton/AddButton';

export default function FaultType() {
    const { showPopup, hidePopup } = useAppContext();
    const [existingFaultType, setExistingFaultType] = useState();
    const [faultTypes, setFaultType] = useState();
    const TITLES = ['שם', 'תיאור', '']

    useEffect(() => {
        //GET ALL FAULT TYPES
        const getFaultTypes = async () => {
            try {
                const res = await httpCommon.get(`/faultTypes/get`)
                setExistingFaultType(res.data)
                setFaultType(res.data);
            } catch (err) {
                console.error('error retrieving fault types: ', err);
            }
        }
        getFaultTypes()
    }, [])

    //CREATE NEW FAULT TYPE
    const createFaultType = async (data) => {
        try {
            await httpCommon.post('faultTypes/create', data);
            hidePopup();
        } catch (err) {
            console.error('error creating fault type: ', err);
        }
    }

    const handleSearch = (search) => {
        const lowerCaseSearch = search.toLowerCase();
        const queryArray = existingFaultType.filter(type => type.name.toLowerCase().includes(lowerCaseSearch));
        setFaultType(queryArray);
    };

    //SET FAULT TYPES BACK TO ALL FAULT TYPES
    useEffect(() => {
        if (faultTypes?.length == 0) {
            setFaultType(existingFaultType)
        }
    }, [faultTypes])
    return (
        <Container>
            <WhiteContainer>
                <SearchContainer>
                    <Search handleChange={handleSearch} />
                    <Title>סוגי תקלות</Title>
                </SearchContainer>
                <TitleRow titles={TITLES} />
                {faultTypes?.map((type) => {
                    return <FaultTypeRow type={type} />
                })}
                <AddButton handleClick={() => showPopup(<TypePopup name='יצירת סוג תקלה' submit={createFaultType} />)} />
            </WhiteContainer>
        </Container>
    )
}