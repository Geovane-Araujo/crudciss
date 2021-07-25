Ext.define('CissProcSel.view.main.Cadastro', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.cadastro_ciss1',


  onOkClick: function(){

    var win = Ext.getCmp('cadastro_form_ciss1');
    win.setLoading(true);

    readControls(params.obj);
    Ext.Ajax.request({
      url: 'http://localhost:8083/v1/savepessoa',
      jsonData: JSON.stringify(params.obj),

      success: function(response){
          var response = Ext.decode(response.responseText);
          if(response.ret === 'success'){
              eval(params.saveFn)(params);
              Ext.getCmp('cadastro_form_ciss1').destroy();
          } else {
              alertError(response.motivo);
          }
          win.setLoading(false);
      },
      failure: function(err){
          alertError(err);
          win.setLoading(false);
      }
    });
  },
  onCancel: function(){
    Ext.getCmp('cadastro_form_ciss1').destroy();
  }
});

function load(params){

  params.win.setLoading(true);

  Ext.Ajax.request({
    method: 'GET',
    url: 'http://localhost:8083/v1/getpessoa/' + params.id,

    success: function(response){
        var response = Ext.decode(response.responseText);
        if(response.ret === 'success'){
            this.params.obj = response.obj;
            create_viewcad(response.obj);
        } else {
            alertError(response.motivo);
        }
        params.win.setLoading(false);
    },
    failure: function(err){
        alertError(Ext.decode(err.responseText));
        params.win.setLoading(false);
    }
  });
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
                id: 'field_nome_cad',
                focusable: false,
                flex: 1,
                margin: '5 5 5 5'
              },
              {
                xtype: 'textfield',
                labelAlign: 'top',
                fieldLabel: 'Sobrenome',
                focusable: false,
                id: 'field_sobrenome_cad',
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
                id: 'field_email_cad',
                focusable: false,
                flex: 1,
                margin: '5 5 5 5'
              },
              {
                xtype: 'numberfield',
                labelAlign: 'top',
                id: 'field_nis_cad',
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
  writeControls(params);
}


function writeControls(params){
  Ext.getCmp('field_nome_cad').setValue(params.nome);
  Ext.getCmp('field_sobrenome_cad').setValue(params.sobrenome);
  Ext.getCmp('field_email_cad').setValue(params.email);
  Ext.getCmp('field_nis_cad').setValue(params.nis);
}

function readControls(params){
  params.nome = Ext.getCmp('field_nome_cad').getValue();
  params.sobrenome = Ext.getCmp('field_sobrenome_cad').getValue();
  params.email = Ext.getCmp('field_email_cad').getValue();
  params.nis = Ext.getCmp('field_nis_cad').getValue();
}