import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/popup/popup_context_provider';
import httpCommon from '../../services/http-common';
import { WhiteContainer, Container, SearchContainer, Title, RowsContainers } from './styles';
import FaultRow from '../../components/Rows/FaultRow';
import FaultPopup from '../../components/CreatePopup/popup/FaultPopup';
import TitleRow from '../../components/Rows/TitleRow';
import Search from '../../components/Search/Search';
import AddButton from '../../components/AddButton/AddButton';

export default function Fault({ handleFileUpload, handleFileUpdate }) {
    const { showPopup, hidePopup } = useAppContext();
    const [existingFault, setExistingFault] = useState();
    const [faults, setFaults] = useState();
    const TITLES = ['שם', 'תיאור', 'פתרון', 'תמונה', 'קטגוריה', '']

    useEffect(() => {
        //GET ALL FAULTS
        const getFault = async () => {
            try {
                const res = await httpCommon.get('/faults/get')
                setExistingFault(res.data);
                setFaults(res.data)
            } catch (err) {
                console.error('error retrieving fault: ', err);
            }
        }
        getFault()
    }, [])

    //CREATE A NEW FAULT
    const createFault = async (form) => {
        try {
            form['image'] = await handleFileUpload(form.image)
            const res = await httpCommon.post('/faults/create', form);
            hidePopup()

        } catch (err) {
            console.error('error creating fault', err);
        }
    }

    //SEARCH FAULT BY QUERY
    const handleSearch = (search) => {
        const lowerCaseSearch = search.toLowerCase();
        const queryArray = existingFault.filter(fault => fault.name.toLowerCase().includes(lowerCaseSearch));
        setFaults(queryArray)
    }

    //SET FAULTS BACK TO ALL FAULTS
    useEffect(() => {
        if (faults?.length == 0) {
            setFaults(existingFault)
        }
    }, [faults])

    return (
        <Container>
            <WhiteContainer>
                <SearchContainer>
                    <Search handleChange={handleSearch} />
                    <Title> תקלות</Title>
                </SearchContainer>
                <TitleRow titles={TITLES} />
                <RowsContainers>
                    {faults?.map((fault) => {
                        return <FaultRow fault={fault} handleFileUpdate={handleFileUpdate} />
                    })}
                </RowsContainers>
                <AddButton handleClick={() => showPopup(<FaultPopup name='יצירת תקלה' handleFileUpload={handleFileUpload} hidePopup={hidePopup} submit={createFault} />)} />
            </WhiteContainer>
            {/* <div onClick={() => showPopup(<FaultPopup name='יצירת תקלה' handleFileUpload={handleFileUpload} hidePopup={hidePopup} submit={createFault} />)}>יצירת תקלה</div> */}
            {/* <div onClick={() => showPopup(<TypePopup name='יצירת סוג תקלה' submit={createFaultType} />)}>יצירת סוג תקלה</div> */}
        </Container>
    )
}