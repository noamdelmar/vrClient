import React, { useState, useEffect } from 'react';
import { MenuContainer, MenuItem } from './styles';
import httpCommon from '../../services/http-common';

export default function Home() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    //TAGS FUNCTIONS
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
            const res = await httpCommon.get('/tags/getTags', { data })
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

    //FILES FUNCTIONS
    const handleFileUpload = async () => {
        try {
            if (!selectedFile) {
                console.error('No file selected');
                return;
            }

            const formData = new FormData();
            formData.append('file', selectedFile);

            const res = await httpCommon.post('files/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('File uploaded successfully');
            return res.data.id
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    const createFile = async () => {
        try {
            const content = 'Oli is the best dog';
            const name = './oliver.txt';
            const mimeType = 'text/plain';

            const formData = new FormData();
            formData.append('file', new Blob([content], { type: mimeType }), name);

            const res = await httpCommon.post('/files/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return res.data.id
        } catch (err) {
            console.error('Error creating file: ', err);
        }
    };

    const getFiles = async () => {
        try {
            let id = 17;
            const res = await httpCommon.get(`/files/get?id=${id}`)
            setSelectedFile(res.data.content)
            console.log(res.data);
        } catch (err) {
            console.error('Error geting file: ', err);
        }
    }

    const updateFile = async () => {
        try {
            if (!selectedFile) {
                console.error('No file selected');
                return;
            }
            const formData = new FormData();
            formData.append('file', selectedFile);


            const id = 17;

            const res = await httpCommon.put(`/files/update?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            )
            console.log(res)
        } catch (err) {
            console.error('Error updating file: ', err);
        }
    }

    const deleteFile = async () => {
        try {

            const id = 18;
            const res = await httpCommon.delete(`/files/delete?id=${id}`);

            console.log(res);
        } catch (err) {
            console.error('error deleting files: ', err);
        }
    }


    //FAULT TYPE FUNCTION
    const createFaultType = async () => {
        const data = {
            name: 'SIMBA',
            description: 'Best dog ever'
        }
        try {
            const res = await httpCommon.post('/faultTypes/create', data);
            console.log(res);
        } catch (err) {
            console.error('error creating fault type: ', err);
        }
    }

    const getFaultTypes = async () => {
        try {
            let id;
            const res = await httpCommon.get(`/faultTypes/get?id=${id}`)
            console.log(res);
        } catch (err) {
            console.error('error retrieving fault types: ', err);
        }
    }

    const updateFaultType = async () => {
        try {
            const data = {
                id: 3,
                name: 'name',
                value: 'Mikolas'
            }

            const res = await httpCommon.put('/faultTypes/update', data)

            console.log(res);
        } catch (err) {
            console.error('Error updating fault type: ', err);
        }
    }

    const deleteFaultType = async () => {
        try {
            const id = 2;
            const res = await httpCommon.delete(`/faultTypes/delete?id=${id}`);
            console.log(res);
        } catch (err) {
            console.error('error deleting fault type:', err);
        }
    }

    //GAME FUNCTION
    const createGame = async () => {
        try {
            const imageId = await handleFileUpload()
            const data = {
                name: 'simba',
                description: 'best dog',
                imageId: imageId,
                estimated_time: '20 minuts',
                visible: true
            }
            const res = await httpCommon.post('/games/create', data);
            console.log(res);
        } catch (err) {
            console.error('error creating game', err);
        }
    }

    const getGame = async () => {
        try {
            const data = {
                name: 'visible',
                value: true
            }
            const res = await httpCommon.get(`/games/get?data=${JSON.stringify(data)}`);
            console.log(res);
        } catch (err) {
            console.error('error geting game: ', err);
        }
    }

    const updateGame = async () => {
        try {
            const data = {
                id: 1,
                name: 'visible',
                value: false
            }
            const res = await httpCommon.put('/games/update', data)
            console.log(res);
        } catch (err) {
            console.error('error updating game', err);
        }
    }

    const deleteGame = async () => {
        try {
            const id = 2;

            const res = await httpCommon.delete(`/games/delete?id=${id}`);
            console.log(res);
        } catch (err) {
            console.error('error deleting game: ', err);
        }
    }

    //FAULT FUNCTIONS 
    const createFault = async () => {

    }

    useEffect(() => {
        // getFaultTypes()
        // createFaultType()
        // deleteTag()
        // updateTag()
        // createTag()
        // getTag()
    })



    const testFunctions = () => {
        // updateFaultType()
        // deleteFaultType()
        // deleteFile()
        // deleteGame()
        // updateGame()
    }
    return (
        <>
            <MenuContainer>
                <MenuItem onClick={() => testFunctions()} selected={true}>מתחילים</MenuItem>
                <MenuItem>שימוש</MenuItem>
                <MenuItem>מוצרים</MenuItem>
                <MenuItem>תקלות</MenuItem>
            </MenuContainer>
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={createGame}>Upload File</button>
            </div>
            <img src={`data:image/jpeg;base64,${selectedFile}`} alt="File" />
        </>
    )
}