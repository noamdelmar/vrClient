import styled from "styled-components";

export const Container = styled.div(() => ({
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '90%',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '5rem',
    alignItems: 'center',
}));

export const Item = styled.div(() => ({
    width: '25%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: 'center'
}))

export const Image = styled.img(() => ({
    width: '35%'
}))