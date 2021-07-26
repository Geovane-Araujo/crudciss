Ext.define('CissProcSel.store.Store', {
  extend: 'Ext.data.Store',

  alias: 'store.explorer',

  fields: [
    'id', 'nome','sobrenome','emai','nis'
  ],
  data: { 
    items: []
  },

  proxy: {
      type: 'memory',
      reader: {
          type: 'json',
          rootProperty: 'items'
      }
  }
});