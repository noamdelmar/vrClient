import styled from "styled-components";

export const Container = styled.div((props) => ({
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '100%',
    justifyContent: 'space-between',
    // marginLeft: '3%',
    // marginRight: 'auto',
    height: '5rem',
    alignItems: 'center',
    ...props.styles
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
