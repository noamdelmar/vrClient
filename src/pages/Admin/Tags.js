import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/popup/popup_context_provider';
import httpCommon from '../../services/http-common';
import { WhiteContainer, Container } from './styles';
import TagRow from '../../components/Rows/TagRow';
import TypePopup from '../../components/CreatePopup/popup/TypePopup';

export default function Tags() {
    const { showPopup, hidePopup } = useAppContext();
    const [existingTags, setTags] = useState();

    useEffect(() => {
        const getTag = async () => {
            try {
                const res = await httpCommon.get('/tags/get')
                setTags(res.data)
            } catch (err) {
                console.error('error creating tag:', err);
            }
        }
        getTag()
    }, [])


    const createTag = async (form) => {
        try {
            const res = await httpCommon.post('tags/create', form)
            console.log(res);
            hidePopup()
        } catch (err) {
            console.error('error creating tag:', err);
        }
    }

    return (
        <Container>
            <WhiteContainer>
                <div>קטגוריות</div>
                {existingTags?.map((tag) => {
                    return <TagRow tag={tag} />
                })}
            </WhiteContainer>
            <div onClick={() => showPopup(<TypePopup name='יצירת קטגוריה' submit={createTag} />)}>יצירת קטגוריה</div>
        </Container>
    )
}