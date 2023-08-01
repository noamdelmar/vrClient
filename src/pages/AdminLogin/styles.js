import styled from "styled-components";


export const Container = styled.div((porps) => ({
    width: '100%',
    height: '100%',
    backgroundColor: '#eaebef',
    textAlign: '-webkit-center',
    position: 'fixed',
    top: '0',
    left: '0'
}))

export const WhiteContainer = styled.div(() => ({
    width: '20rem',
    height: '18rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    textAlign: 'right',
    marginTop: '5rem',
    padding: '1.2rem',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
}))

export const Title = styled.div(() => ({
    width: '100%',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: 'bold',
}))
