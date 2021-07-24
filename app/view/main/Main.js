Ext.define('CissProcSel.view.main.Main', {
    extend: 'Ext.Container',
    controller: 'main',
    viewModel: 'main',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'CissProcSel.view.main.MainController',
        'CissProcSel.view.main.MainModel',
    ],
    layout: { 
        align: 'stretch', 
        type: 'vbox' 
    }, 
    items:[
        {
            xtype: 'panel',
            title: 'Ciss Processo Seletivo Crud ExtJs',
            flex: 1,
            layout: { 
                align: 'stretch', 
                type: 'vbox' 
            },
            items: [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: 'Adicionar',
                            cls: 'btnAdicionar',
                            margin: '5 5 5 5',
                            handler: function(b){
                                params = {
                                    nome: 'Geovane',
                                    saveFn: function(b){
                                        alert('sdsd');
                                    }
                                }
                                create_viewcad(params);
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Editar',
                            cls: 'btnEditar',
                            margin: '5 5 0 5',
                        },
                        {
                            xtype: 'button',
                            text: 'Excluir',
                            cls: 'btnExcluir',
                            margin: '5 5 5 5',
                            handler: function(b){
                                load();
                            }
                        },
                    ]
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    store: storeData(),
                    margin: '5 5 5 5',
                    loadmask: true,
                    stateful: true,
                    columns: [
                        { text: 'ID', dataIndex: 'id'},
                        { text: 'Nome', dataIndex: 'nome', flex: 1},
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 360,
                            displayInfo: true,
                            displayMsg: '{0} - {1} de {2}',
                            emptyMsg: "Não Há Dadaos"
                        }
                    ],
                }
            ],
            listeners: {
                beforerender: function (b){
                    storeData();
                }
            }
        }
    ]
});


function storeData () {
    var a = Ext.create('Ext.data.Store', {
        storeId: 'storeData',
        fields: ['id', 'nome'],
        /* filters: [{
            property: 'DelMode',
            value: false
        }], */
        data: [
            { id: 1, nome: 'Geovane' },
            { id: 2, nome: 'Edna' },
            { id: 3, nome: 'Pietra' }
        ]
    });
    return a;
}