import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/popup/popup_context_provider';
import httpCommon from '../../services/http-common';
import { WhiteContainer, Container, SearchContainer, Title } from './styles';
import TagRow from '../../components/Rows/TagRow';
import TypePopup from '../../components/CreatePopup/popup/TypePopup';
import TitleRow from '../../components/Rows/TitleRow';
import Search from '../../components/Search/Search';
import AddButton from '../../components/AddButton/AddButton';

export default function Tags() {
    const { showPopup, hidePopup } = useAppContext();
    const [existingTags, setExistingTags] = useState();
    const [tags, setTags] = useState();
    const TITLES = ['שם', 'תיאור', '']

    useEffect(() => {
        //GET ALL TAGS
        const getTag = async () => {
            try {
                const res = await httpCommon.get('/tags/get')
                setExistingTags(res.data)
                setTags(res.data)
            } catch (err) {
                console.error('error creating tag:', err);
            }
        }
        getTag()
    }, [])

    //CREATE A NEW TAG
    const createTag = async (form) => {
        try {
            const res = await httpCommon.post('tags/create', form)
            hidePopup()
        } catch (err) {
            console.error('error creating tag:', err);
        }
    }

    //SEARCH TAG BY QUERY
    const handleSearch = (search) => {
        const lowerCaseSearch = search.toLowerCase();
        const queryArray = existingTags.filter(tag => tag.name.toLowerCase().includes(lowerCaseSearch));
        setTags(queryArray)
    }

    //SET TAGS BACK TO ALL TAGS
    useEffect(() => {
        if (tags?.length == 0) {
            setTags(existingTags)
        }
    }, [tags])

    return (
        <Container>
            <WhiteContainer>
                <SearchContainer>
                    <Search handleChange={handleSearch} />
                    <Title>קטגוריות</Title>
                </SearchContainer>
                <TitleRow titles={TITLES} />
                {tags?.map((tag) => {
                    return <TagRow tag={tag} />
                })}
                <AddButton handleClick={() => showPopup(<TypePopup name='יצירת קטגוריה' submit={createTag} />)} />
            </WhiteContainer>
        </Container>
    )
}