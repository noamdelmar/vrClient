import styled from "styled-components";

export const Container = styled.div(() => ({
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '100%',
    justifyContent: 'space-between',
    // marginLeft: '3%',
    // marginRight: 'auto',
    height: '5rem',
    alignItems: 'center',
}));

export const Item = styled.div((props) => ({
    width: '20%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    ...props.styles
}))

export const Image = styled.img(() => ({
    width: '35%'
}))

export const DropDown = styled.div(() => ({
    width: '3rem',
    height: '4rem',
    border: '1px solid black',
    position: 'absolute',
    marginTop: '-.5rem'
}))

export const DropItem = styled.div(() => ({
    height: '2rem',
    cursor: 'pointer',
    lineHeight: '2',
    color: 'black',
    ':hover': {
        backgroundColor: 'pink'
    }
}))