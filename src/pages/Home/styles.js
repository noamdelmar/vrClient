import styled from 'styled-components';

export const MenuContainer = styled.div(() => ({
    display: 'flex',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    direction: 'rtl',
    justifyContent: 'center'
}))

export const MenuItem = styled.div((props) => ({
    width: '25%',
    textAlign: 'center',
    fontWeight: 'bolder',
    backgroundColor: props.selected ? 'pink' : null,
    borderRadius: '21px',
    padding: '1% 5%'
}))

export const PopupBack = styled.div((props) => ({
    display: props.show ? 'block' : 'none',
    backgroundColor: 'rgba(0,0,0,.4)',
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    zIndex: '-1',
    top: '0',
    left: '0'
}))