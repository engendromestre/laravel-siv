import { SvgIconComponent } from '@mui/icons-material';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Box, Link, Typography } from '@mui/material';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import { styled } from '@mui/material/styles';
import React from 'react';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
    margin: theme.spacing(1, 0),
    [`& .${breadcrumbsClasses.separator}`]: {
        color: (theme.vars || theme).palette.action.disabled,
        margin: 1,
    },
    [`& .${breadcrumbsClasses.ol}`]: {
        alignItems: 'center',
    },
}));

export interface BreadcrumbItem {
    label: string;
    icon?: SvgIconComponent;
    href?: string;
}

export default function NavbarBreadcrumbs({
    header = [],
}: {
    header?: BreadcrumbItem[];
}) {
    return (
        <StyledBreadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextRoundedIcon fontSize="small" />}
        >
            {header.map((item, index) => {
                const isLast = index === header.length - 1;

                return isLast ? (
                    <Typography
                        key={index}
                        variant="body2"
                        color="inherit"
                        component="span"
                        alignItems="center"
                        display="flex"
                    >
                        {item.icon &&
                            React.createElement(item.icon, {
                                sx: { mr: 0.5 },
                                fontSize: 'inherit',
                            })}
                        <Box component="span" sx={{ mx: 0.5 }}>
                            {item.label}
                        </Box>
                    </Typography>
                ) : (
                    <Link
                        key={index}
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href={route(item.href as string)}
                    >
                        {item.icon && (
                            <>
                                {React.createElement(item.icon, {
                                    fontSize: 'small',
                                })}
                            </>
                        )}
                        <Box component="span" sx={{ mx: 0.5 }}>
                            {item.label}
                        </Box>
                    </Link>
                );
            })}
        </StyledBreadcrumbs>
    );
}
