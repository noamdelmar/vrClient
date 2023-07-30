import React, { useState } from "react";
import { Container, Item } from './styles';
import TypePopup from "../CreatePopup/popup/TypePopup";
import httpCommon from "../../services/http-common";
import { useAppContext } from '../../context/popup/popup_context_provider';
import More from "../More/More";

export default function FaultTypeRow({ type }) {
    const { showPopup } = useAppContext();

    const updateFaultType = async (update) => {
        const updateData = Object.keys(update);
        const dataArray = updateData.map(key => {
            return { id: update['id'], name: key, value: update[key] }
        })
        console.log(dataArray);

        dataArray.map(async (data) => {
            try {
                const res = await httpCommon.put('faultTypes/update', data)
                console.log(res);
            } catch (err) {
                console.error('Error updating fault type: ', err);
            }
        })
    }

    const deleteFaultType = async () => {
        try {
            const res = await httpCommon.delete(`/faultTypes/delete?id=${type.id}`);
            console.log(res);
        } catch (err) {
            console.error('error deleting fault type:', err);
        }
    }

    return (
        <Container>
            <Item>{type.name}</Item>
            <Item>{type.description}</Item>
            <More
                handleEdit={() => showPopup(<TypePopup name='יצירת סוג תקלה' existingType={type} submit={updateFaultType} />)}
                handleDelete={() => deleteFaultType()}
            />
        </Container>
    )
}


{/* <div onClick={() => showPopup(<CreatePopup name='יצירת קטגוריה' data={TAG} submit={createTag} />)}>יצירת קטגוריה</div> */ }
