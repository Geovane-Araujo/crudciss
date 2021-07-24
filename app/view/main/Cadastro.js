Ext.define('CissProcSel.view.main.Cadastro', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.cadastro_ciss1',


  onOkClick: function(){
    eval(params.saveFn)(params);
  },
  onCancel: function(){
    Ext.getCmp('cadastro_form_ciss1').destroy();
  }
});

function load(){
  alert('sdsd');
}

function create_viewcad(params){
  var modal = Ext.create('Ext.window.Window', {
    id: 'cadastro_form_ciss1',
    width: 500,
    title: 'Cadastro de Funcionario',
    modal: true,
    params: params,
    closable: true,
    controller: 'cadastro_ciss1',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    items: [
      {
        xtype: 'form',
        layout: {
          type: 'vbox',
          align: 'stretch'
        },
        flex: 1,
        items: [
          {
            xtype: 'container',
            layout: {
              type: 'hbox',
              align: 'stretch',
            },
            flex: 1,
            items: [
              {
                xtype: 'textfield',
                labelAlign: 'top',
                fieldLabel: 'Nome',
                focusable: false,
                flex: 1,
                margin: '5 5 5 5'
              },
              {
                xtype: 'textfield',
                labelAlign: 'top',
                fieldLabel: 'Sobrenome',
                focusable: false,
                flex: 1.1,
                margin: '5 5 5 5'
              }
            ]
          },
          {
            xtype: 'container',
            layout: {
              type: 'hbox',
              align: 'stretch',
            },
            flex: 1,
            items: [
              {
                xtype: 'textfield',
                labelAlign: 'top',
                fieldLabel: 'Email',
                focusable: false,
                flex: 1,
                margin: '5 5 5 5'
              },
              {
                xtype: 'numberfield',
                labelAlign: 'top',
                fieldLabel: 'NIS',
                focusable: false,
                with: 120,
                margin: '5 5 5 5'
              }
            ]
          }
        ]
      }
    ],
    buttons: [
      {
        text: 'Salvar',
        handler: 'onOkClick'
      },
      {
        text: 'Cancelar',
        handler: 'onCancel'
      }
    ]
  }).show();
  Ext.Function.defer(function () {
    modal.zIndexManager.bringToFront(modal);
  }, 100);
}