import React, { useEffect } from 'react';
import { MenuContainer, MenuItem } from './styles';
import httpCommon from '../../services/http-common';

export default function Home() {
    useEffect(() => {
        const createTag = async () => {
            try {
                const newTag = {
                    name: 'שטח',
                    description: 'תוצרים בנושא שטח'
                }
                const res = await httpCommon.post('createTag', newTag)
            } catch (err) {
                console.error('error creating tag:', err);
            }
        }
        const getTag = async () => {
            try {
                const idQuery = {
                    id: 1
                }
                const query = new URLSearchParams(idQuery).toString();
                const res = await httpCommon.get(`/getTags?${query}`)
                console.log(res.data)
            } catch (err) {
                console.error('error creating tag:', err);
            }
        }
        const updateTag = async () => {
            try {
                const data = {
                    id: 1,
                    name: 'name',
                    value: 'אוליבר'
                }
                const res = await httpCommon.put('updateTag', data);
                console.log(res);
            } catch (err) {
                console.error('error creating tag:', err);
            }
        }
        updateTag()
        // createTag()
        // getTag()
    })
    return (
        <MenuContainer>
            <MenuItem selected={true}>מתחילים</MenuItem>
            <MenuItem>שימוש</MenuItem>
            <MenuItem>מוצרים</MenuItem>
            <MenuItem>תקלות</MenuItem>
        </MenuContainer>
    )
}