import { SvgIconComponent } from '@mui/icons-material';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Link, Typography } from '@mui/material';
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

interface BreadcrumbItem {
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
                        {item.label}
                    </Typography>
                ) : (
                    <Link
                        key={index}
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href={route(item.href as string)}
                    >
                        {item.icon &&
                            React.createElement(item.icon, {
                                fontSize: 'small',
                            })}
                        {item.label}
                    </Link>
                );
            })}
        </StyledBreadcrumbs>
    );
}
