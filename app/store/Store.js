Ext.define('CissProcSel.store.Store', {
  extend: 'Ext.data.Store',

  alias: 'store.explorer',

  fields: [
    'id', 'nome','sobrenome','emai','nis'
  ],
  data: { 
    items: [
      { id: '1', nome: 'Geovane', sobrenome: 'Araújo', email:'geovane@', nis: '123' }
    ]
  },

  proxy: {
      type: 'memory',
      reader: {
          type: 'json',
          rootProperty: 'items'
      }
  }
});