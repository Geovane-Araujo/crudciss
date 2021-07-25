Ext.define('CissProcSel.view.main.Main', {
    extend: 'Ext.Container',
    controller: 'main',
    viewModel: 'main',
    xtype: 'app-main',

    layout: { 
        align: 'stretch', 
        type: 'vbox' 
    }, 
    items:[
        {
            xtype: 'panel',
            id: 'panel_principal1',
            title: 'Ciss Processo Seletivo Crud ExtJs',
            flex: 1,
            layout: { 
                align: 'stretch', 
                type: 'vbox' 
            },
            items: [
                {
                    xtype: 'panel',
                    id: 'panel_principal2',
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
                                    win: Ext.getCmp('panel_principal1'),
                                    id: -100,
                                    nome: 'Geovane',
                                    saveFn: function(b){
                                        alert('sdsd');
                                    }
                                }
                                load(params);
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
                            }
                        },
                    ]
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    id: 'gridcad',
                    store: Ext.data.StoreManager.lookup('storeData'),
                    //store: getAllData(1),
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
                    listeners: {
                        afterrender: function(e){
                        }
                    }
                }
            ],
            listeners: {
                beforerender: function(e){
                    storeData();
                },
                afterrender: function(e){
                    getAllData(1);
                }
            }
        }
    ]
});

function getAllData(paging){

    var params = {
        route: 'mnu_funcionario',
        paging: paging,
        filters: '',
        orders: 'Order by id desc'
    }
    var mask = loading(Ext.getCmp('panel_principal2'));

    Ext.Ajax.request({
        url: 'http://localhost:8083/v1/dynamic',
        jsonData: JSON.stringify(params),

        success: function(response){
            var response = Ext.decode(response.responseText);
            if(response.ret === 'success'){
                var store = Ext.getCmp('gridcad').getStore();
                store.getStore().reload();

            } else {
                alertError(response.motivo);
            }
        },
        failure: function(err){
            alertError(err);
        }
    });
}
function storeData() {
    Ext.create('Ext.data.Store', {
        storeId: 'storeData',
        fields: ['id', 'nome'],
        data: []
    });
}