import styled from 'styled-components'

export const FlexContainer = styled.div(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
}));

export const PopupContainerStyle = styled.div(() => ({
    width: '20rem',
    height: 'auto',
    minHeight: '15rem',
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '1rem',
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto'
}));

export const Title = styled.h1(() => ({
    fontSize: '1.2rem',
    textAlign: 'center',
    width: '100%'
}));

export const SaveButton = styled.div(() => ({
    width: '5rem',
    height: '2rem',
    borderRadius: '1rem',
    backgroundColor: 'rgb(30, 37, 246)',
    color: 'white',
    textAlign: 'center',
    lineHeight: '2',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '1rem',
    marginTop: '1.5rem',
    cursor: 'pointer',
    transition: '.3s',
    fontWeight: 'bold',
    ':hover': {
        backgroundColor: '#6e6e6e'
    }
}));
