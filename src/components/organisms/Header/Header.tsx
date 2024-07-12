import React from 'react';
import Box from 'components/common/Box/Box'
import { IHeaderProps } from './interface'
import { Typography } from 'components/common';

const Header = (props: IHeaderProps) => {
    const { title } = props
    return <Box>
        <Typography id="" variant="h1">
            {title}
        </Typography>
    </Box>
}

export default Header