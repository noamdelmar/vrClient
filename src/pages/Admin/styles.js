import styled from 'styled-components';

export const WhiteContainer = styled.div(() => ({
    width: '40rem',
    height: '30rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    textAlign: 'right',
    marginTop: '2rem',
    padding: '1.2rem',
    overflowY: 'auto'
}))

export const Container = styled.div((porps) => ({
    width: '80%',
    height: '100%',
    backgroundColor: '#eaebef',
    textAlign: '-webkit-center',
    position: 'fixed',
    ...porps.styles
}))

export const SearchContainer = styled.div(() => ({
    display: 'flex',
    alignItems: 'center',
    textAlignLast: 'justify',
    paddingBottom: '1rem'
}))

export const Title = styled.h1(() => ({
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '4.2rem',
    direction: 'rtl',
    paddingRight: '1rem'
}));

