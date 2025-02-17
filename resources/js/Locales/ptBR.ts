const ptBR = {
    components: {
        MuiDataGrid: {
            defaultProps: {
                localeText: {
                    toolbarQuickFilterPlaceholder: 'Pesquisar',
                    // Traduções padrão
                    noRowsLabel: 'Nenhuma linha',
                    noResultsOverlayLabel: 'Nenhum resultado encontrado.',
                    errorOverlayDefaultLabel: 'Ocorreu um erro.',

                    // Paginação
                    labelRowsPerPage: 'Linhas por página:',
                    labelDisplayedRows: ({ from = 0, to = 0, count = 0 }) =>
                        `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`,

                    footerRowSelected: (count = 0) =>
                        count !== 1
                            ? `${count.toLocaleString()} linhas selecionadas`
                            : `${count.toLocaleString()} linha selecionada`,
                    footerTotalRows: (count = 0) => `Total de linhas: ${count}`,
                    footerTotalVisibleRows: (
                        visibleCount = 0,
                        totalCount = 0,
                    ) =>
                        `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()} linhas`,

                    // Toolbar
                    toolbarDensity: 'Densidade',
                    toolbarDensityLabel: 'Densidade',
                    toolbarDensityCompact: 'Compacto',
                    toolbarDensityStandard: 'Padrão',
                    toolbarDensityComfortable: 'Confortável',

                    toolbarFilters: 'Filtros',
                    toolbarFiltersLabel: 'Mostrar filtros',
                    toolbarFiltersTooltipHide: 'Ocultar filtros',
                    toolbarFiltersTooltipShow: 'Mostrar filtros',
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    toolbarFiltersTooltipActive: (count) =>
                        count !== 1
                            ? `${count} filtros ativos`
                            : `${count} filtro ativo`,

                    toolbarExport: 'Exportar',
                    toolbarExportLabel: 'Exportar',
                    toolbarExportCSV: 'Baixar como CSV',
                    toolbarExportPrint: 'Imprimir',

                    toolbarColumns: 'Colunas',
                    toolbarColumnsLabel: 'Mostrar seletor de colunas',

                    // Colunas
                    columnsPanelTextFieldLabel: 'Encontrar coluna',
                    columnsPanelTextFieldPlaceholder: 'Título da coluna',
                    columnsPanelDragIconLabel: 'Reordenar coluna',
                    columnsPanelShowAllButton: 'Mostrar todas',
                    columnsPanelHideAllButton: 'Ocultar todas',

                    // Filtros
                    filterPanelAddFilter: 'Adicionar filtro',
                    filterPanelDeleteIconLabel: 'Excluir',
                    filterPanelOperator: 'Comparar com',
                    filterPanelOperatorAnd: 'E',
                    filterPanelOperatorOr: 'Ou',
                    filterPanelColumns: 'Coluna',
                    filterPanelInputLabel: 'Valor',
                    filterPanelInputPlaceholder: 'Valor do filtro',

                    // Operadores de filtro
                    filterOperatorContains: 'Contém', // Tradução de "Contains"
                    filterOperatorNotContains: 'Não contém', // Tradução de "Not contains"
                    filterOperatorStartsWith: 'Começa com', // Tradução de "Starts with"
                    filterOperatorEndsWith: 'Termina com', // Tradução de "Ends with"
                    filterOperatorEquals: 'É igual a', // Tradução de "Is"
                    filterOperatorDoesNotContain: 'Não é igual a', // Tradução de "Is not"
                    filterOperatorAfter: 'Depois de', // Tradução de "Is after"
                    filterOperatorOnOrAfter: 'Em ou depois de', // Tradução de "Is on or after"
                    filterOperatorBefore: 'Antes de', // Tradução de "Is before"
                    filterOperatorOnOrBefore: 'Em ou antes de', // Tradução de "Is on or before"
                    filterOperatorIsEmpty: 'É vazio', // Tradução de "Is empty"
                    filterOperatorIsNotEmpty: 'Não é vazio', // Tradução de "Is not empty"
                    filterOperatorIsAnyOf: 'É qualquer um de', // Tradução de "Is any of"

                    // Column menu text
                    columnMenuLabel: 'Menu',
                    columnMenuShowColumns: 'Exibir colunas',
                    columnMenuManageColumns: 'Gerir colunas',
                    columnMenuFilter: 'Filtrar',
                    columnMenuHideColumn: 'Ocultar',
                    columnMenuUnsort: 'Desfazer ordenação',
                    columnMenuSortAsc: 'Ordenar do menor para o maior',
                    columnMenuSortDesc: 'Ordenar do maior para o menor',

                    // Adicione suas traduções personalizadas aqui
                    customText: 'Texto personalizado',
                    customButtonLabel: 'Botão personalizado',
                },
            },
        },
    },
};

export default ptBR;
