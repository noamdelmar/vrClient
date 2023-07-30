import styled from "styled-components";

export const IconCircle = styled.div(() => ({
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    backgroundColor: 'rgb(30, 37, 246)',
    lineHeight: '3.5',
    transition: '.3s',
    cursor: 'pointer',
    textAlign: 'center',
    bottom: '11rem',
    position: 'fixed',
    ':hover': {
        backgroundColor: '#6e6e6e'
    }
}))