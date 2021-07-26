
Ext.define('CissProcSel.view.main.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'explorergrid',
  requires: [
      'CissProcSel.store.Store'
  ],
  store: {
      type: 'explorer'
  },
  route: '',
  loadmask: true,
  stateful: true,
  columns: [
    { text: 'ID',  dataIndex: 'id' },
      { text: 'Nome',  dataIndex: 'nome', flex: 1  },
      { text: 'Sobrenome', dataIndex: 'sobrenome'},
      { text: 'Email', dataIndex: 'email', flex: 1 },
      { text: 'Nis', dataIndex: 'nis'}
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
        dataDynamicGrid(e);
      },
      rowdblclick: function(){
        onSelected();
      }, 
  }
});

function onSelected(){
  alert('d');
}

function dataDynamicGrid(e){
  var params = {
    route: e.route,
    paging: 1,
    filters: '',
    orders: 'Order by id desc'
  }

  e.setLoading(true);
  Ext.Ajax.request({
      url: 'http://localhost:8083/v1/dynamic',
      jsonData: JSON.stringify(params),

      success: function(response){
          var response = Ext.decode(response.responseText);
          if(response.ret === 'success'){
            var grid = e.getStore();
            e.setStore(response.obj.obj);
            e.getStore().reload();
          } else {
              alertError(response.motivo);
          }
          e.setLoading(false);
      },
      failure: function(err){
          alertError(err);
      }
  });
}

function deleteDynamicGrid(e,selections){
  var ids = '';
  selections.forEach(element => {
    ids += element.data.id + ',';
  });

  ids = ids.substring(0,(ids.length - 1));
  var params = {
    ids: ids,
    tablebase: e.tablebase
  }

  e.setLoading(true);
  Ext.Ajax.request({
      url: 'http://localhost:8083/v1/deleteregisters',
      jsonData: JSON.stringify(params),

      success: function(response){
          var response = Ext.decode(response.responseText);
          if(response.ret === 'success'){
            dataDynamicGrid(Ext.getCmp('gridcad'));
          } else {
              alertError(response.motivo);
          }
          e.setLoading(false);
      },
      failure: function(err){
          alertError(err);
      }
  });
}