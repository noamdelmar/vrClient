import React, { useEffect } from 'react';
import { MenuContainer, MenuItem } from './styles';
import httpCommon from '../../services/http-common';

export default function Home() {
    useEffect(() => {
        const createTag = async () => {
            try {
                const newTag = {
                    name: 'שמיקולאס',
                    description: 'מיקולאס'
                }
                const res = await httpCommon.post('tags/create', newTag)
                console.log(res)
            } catch (err) {
                console.error('error creating tag:', err);
            }
        }
        const getTag = async () => {
            try {
                const data = {
                    id: 1
                }
                const res = await httpCommon.get('getTags', { data })
                console.log(res.data)
            } catch (err) {
                console.error('error creating tag:', err);
            }
        }
        const updateTag = async () => {
            const data = {
                id: 1,
                name: 'description',
                value: 'אוליבר'
            }
            try {
                const res = await httpCommon.put('updateTag', data);
                console.log(res);
            } catch (err) {
                console.error('error creating tag:', err);
            }
        }

        const deleteTag = async () => {
            const data = {
                id: 9
            }
            try {
                const res = await httpCommon.delete('deleteTag', { data });
                console.log(res);
            } catch (err) {
                console.error('error deleting tag:', err);
            }
        }
        // deleteTag()
        // updateTag()
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