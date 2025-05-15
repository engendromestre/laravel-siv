import { useMenuItems } from '@/Hooks/useMenuItems';
import { Link as InertiaLink, usePage } from '@inertiajs/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

interface MenuContentProps {
    open: boolean;
}

export default function MenuContent({ open }: MenuContentProps) {
    const { url, props } = usePage();
    const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
        false,
    ); // Estado para controle manual

    const getPathFromUrl = (link: string | undefined) => {
        if (!link) return ''; // Retorna uma string vazia se o link for undefined
        try {
            const urlObj = new URL(link);
            return urlObj.pathname;
        } catch (error) {
            return link;
        }
    };

    // Função para verificar se o Accordion deve estar aberto com base na URL atual
    // Função para verificar se o Accordion deve estar aberto com base na URL atual
    const isAccordionExpanded = (subItems: { link: string }[]) => {
        return subItems.some(
            (subItem) => getPathFromUrl(url) === getPathFromUrl(subItem.link),
        );
    };

    // Função para lidar com a expansão manual do Accordion
    const handleAccordionChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpandedAccordion(isExpanded ? panel : false);
        };

    const { mainListItems, secondaryListItems } = useMenuItems();

    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: 'block' }}
                    >
                        <Tooltip
                            title={!open ? item.text : ''}
                            placement="right"
                        >
                            <InertiaLink href={item.link || '#'}>
                                <ListItemButton
                                    selected={
                                        getPathFromUrl(url) ===
                                        getPathFromUrl(item.link)
                                    }
                                    sx={{
                                        justifyContent: open
                                            ? 'initial'
                                            : 'center',
                                        px: open ? 2.5 : 1.5,
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            justifyContent: 'center',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <item.icon
                                            sx={{ fontSize: open ? 24 : 36 }}
                                        />
                                    </ListItemIcon>
                                    {open && (
                                        <ListItemText primary={item.text} />
                                    )}
                                </ListItemButton>
                            </InertiaLink>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
            <List dense>
                {secondaryListItems.map((item, index) => {
                    const panelId = `accordion-panel-${index}`; // ID único para cada Accordion
                    const isExpandedByUrl = isAccordionExpanded(item.subItems); // Verifica se o Accordion deve estar aberto pela URL
                    const showSubItems =
                        props.auth.user.permissions.includes(
                            'admin roles:read',
                        );
                    return showSubItems ? (
                        <Accordion
                            key={index}
                            disableGutters
                            elevation={0}
                            expanded={
                                isExpandedByUrl || expandedAccordion === panelId
                            } // Controla a expansão manual e pela URL
                            onChange={handleAccordionChange(panelId)} // Atualiza o estado manual
                            sx={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                boxShadow: 'none',
                            }}
                        >
                            <AccordionSummary
                                expandIcon={open ? <ExpandMoreIcon /> : null}
                                sx={{
                                    padding: 0,
                                    minHeight: 'auto !important',
                                    '& .MuiAccordionSummary-content': {
                                        margin: 0,
                                    },
                                }}
                            >
                                <ListItem
                                    key={index}
                                    disablePadding
                                    sx={{ display: 'block' }}
                                >
                                    <Tooltip
                                        title={!open ? item.text : ''}
                                        placement="right"
                                    >
                                        <ListItemButton
                                            sx={{
                                                justifyContent: open
                                                    ? 'initial'
                                                    : 'center',
                                                px: open ? 2.5 : 1.5,
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    justifyContent: 'center',
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                <item.icon
                                                    sx={{
                                                        fontSize: open
                                                            ? 24
                                                            : 36,
                                                    }}
                                                />
                                            </ListItemIcon>
                                            {open && (
                                                <ListItemText
                                                    primary={item.text}
                                                />
                                            )}
                                        </ListItemButton>
                                    </Tooltip>
                                </ListItem>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    padding: 0,
                                    margin: 0,
                                }}
                            >
                                <List dense>
                                    {item.subItems.map((subItem, subIndex) => (
                                        <ListItem
                                            key={subIndex}
                                            disablePadding
                                            sx={{ display: 'block' }}
                                        >
                                            <Tooltip
                                                title={
                                                    !open ? subItem.text : ''
                                                }
                                                placement="right"
                                            >
                                                <InertiaLink
                                                    href={subItem.link || '#'}
                                                >
                                                    <ListItemButton
                                                        selected={
                                                            getPathFromUrl(
                                                                url,
                                                            ) ===
                                                            getPathFromUrl(
                                                                subItem.link,
                                                            )
                                                        }
                                                        sx={{
                                                            justifyContent: open
                                                                ? 'initial'
                                                                : 'center',
                                                            px: open
                                                                ? 4.5
                                                                : 1.5,
                                                            transition:
                                                                'all 0.3s ease',
                                                        }}
                                                    >
                                                        <ListItemIcon
                                                            sx={{
                                                                minWidth: 0,
                                                                justifyContent:
                                                                    'center',
                                                                transition:
                                                                    'all 0.3s ease',
                                                            }}
                                                        >
                                                            <subItem.icon
                                                                sx={{
                                                                    fontSize:
                                                                        open
                                                                            ? 20
                                                                            : 30,
                                                                }}
                                                            />
                                                        </ListItemIcon>
                                                        {open && (
                                                            <ListItemText
                                                                primary={
                                                                    subItem.text
                                                                }
                                                            />
                                                        )}
                                                    </ListItemButton>
                                                </InertiaLink>
                                            </Tooltip>
                                        </ListItem>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ) : null;
                })}
            </List>
        </Stack>
    );
}
