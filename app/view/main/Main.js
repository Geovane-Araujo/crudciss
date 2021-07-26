Ext.define('CissProcSel.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
});

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
                                    id: -100,
                                    nome: 'Geovane',
                                    saveFn: function(b){
                                        dataDynamicGrid(Ext.getCmp('grid_funcionario'));
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
                            handler: function(b){
                                var obj = Ext.getCmp('grid_funcionario').getSelectionModel().getSelection();
                                if(obj.length > 0){
                                    params = {
                                        win: Ext.getCmp('panel_principal1'),
                                        id: obj[0].data.id,
                                        nome: 'Geovane',
                                        saveFn: function(b){
                                            dataDynamicGrid(Ext.getCmp('grid_funcionario'));
                                        }
                                    }
                                    load(params);
                                } else {
                                    alertError('Nenhum Registro Selecionado');
                                }
                                
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Excluir',
                            cls: 'btnExcluir',
                            margin: '5 5 5 5',
                            handler: function(b){
                                var obj = Ext.getCmp('grid_funcionario').getSelectionModel().getSelection();
                                if(obj.length > 0){
                                    deleteDynamicGrid(Ext.getCmp('grid_funcionario'),obj);

                                } else {
                                    alertError('Nenhum Registro Selecionado');
                                }
                                
                            }
                        },
                    ]
                },
                {
                    xtype: 'explorergrid',
                    flex: 1,
                    route: 'mnu_funcionario',
                    id: 'grid_funcionario',
                    margin: '5 5 5 5',
                    tablebase: 'pessoa'
                }
            ]
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