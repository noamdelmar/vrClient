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