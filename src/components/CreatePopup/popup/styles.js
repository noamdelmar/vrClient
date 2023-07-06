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

