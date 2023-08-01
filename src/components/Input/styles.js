import styled from 'styled-components';
import { Select } from '@mui/material';

export const NameField = styled.div(() => ({
    width: '25%',
    alignSelf: 'flex-end',
    paddingLeft: '1rem',
    lineHeight: '1'
}))

export const FlexContainer = styled.div((props) => ({
    display: 'flex',
    direction: 'rtl',
    marginTop: props.login ? '2rem' : '1rem',
    marginRight: '1rem'
}))

export const ErrorMsg = styled.p((props) => ({
    color: 'rgb(211,47,47)',
    direction: 'rtl',
    paddingRight: '2rem',
    marginTop: '0',
    fontWeight: 'bold',
    ...props.styles
}))

export const StyledSelect = styled(Select)((props) => ({
    borderRadius: '4px',
    border: '1px solid black',
    borderColor: props.error ? 'rgb(211,47,47)' : 'black',
    height: '3rem',
    minWidth: '6rem'
}));
