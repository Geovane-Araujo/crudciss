Ext.define('CissProcSel.view.main.Cadastro', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.cadastro_ciss1',


  onOkClick: function(){

    if(!formValidate_funcionario())
      return;

    var win = Ext.getCmp('cadastro_form_ciss1');
    win.setLoading(true);

    readControls(win.params);
    Ext.Ajax.request({
      url: sisUrlRoute+'savepessoa',
      jsonData: JSON.stringify(win.params.obj),

      success: function(response){
          var response = Ext.decode(response.responseText);
          if(response.ret === 'success'){
              eval(win.params.saveFn)(win.params);
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

function formValidate_funcionario(){

  var re = /\S+@\S+\.\S+/;
  
  if(!Ext.getCmp('form_funcionario').isValid()){
    alertError('Campos Sem Preenchimento');
    return false
  }
  else if(!re.test(Ext.getCmp('field_email_cad').getValue())){
    alertError('Campo e-mail com valor inválido');
    Ext.getCmp('field_email_cad').isFocusable(true);
    return false;
  } 
  return true;

}

function load_funcionario(params){


  params.win.setLoading(true);

  Ext.Ajax.request({
    method: 'GET',
    url: sisUrlRoute+'getpessoa/' + params.id,

    success: function(response){
        var response = Ext.decode(response.responseText);
        if(response.ret === 'success'){
            params.obj = response.obj;
            create_viewcad(params);
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
        id: 'form_funcionario',
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
                enforceMaxLength: 30,
                maxLength: 30,
                minLength: 2,
                allowBlank: false,
                flex: 1,
                margin: '5 5 5 5'
              },
              {
                xtype: 'textfield',
                labelAlign: 'top',
                fieldLabel: 'Sobrenome',
                enforceMaxLength: 50,
                maxLength: 50,
                minLength: 2,
                allowBlank: false,
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
                allowBlank: false,
                focusable: true,
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
  Ext.getCmp('field_nome_cad').setValue(params.obj.nome);
  Ext.getCmp('field_sobrenome_cad').setValue(params.obj.sobrenome);
  Ext.getCmp('field_email_cad').setValue(params.obj.email);
  Ext.getCmp('field_nis_cad').setValue(params.obj.nis);
}

function readControls(params){
  params.obj.nome = Ext.getCmp('field_nome_cad').getValue();
  params.obj.sobrenome = Ext.getCmp('field_sobrenome_cad').getValue();
  params.obj.email = Ext.getCmp('field_email_cad').getValue();
  params.obj.nis = Ext.getCmp('field_nis_cad').getValue();
}