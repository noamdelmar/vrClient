import styled from 'styled-components';

export const DropDown = styled.div(() => ({
    width: '3rem',
    height: '4rem',
    borderRadius: '5px',
    // border: '1px solid black',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
    position: 'absolute',
    marginTop: '-.5rem'
}))


export const DropItem = styled.div((props) => ({
    height: '2rem',
    cursor: 'pointer',
    lineHeight: '2',
    color: 'black',
    borderRadius: props.top ? '5px 5px 0 0 ' : '0 0 5px 5px',
    ':hover': {
        backgroundColor: 'rgb(30, 37, 246)'
    }
}))