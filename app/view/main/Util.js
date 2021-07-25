Ext.define('CissProcSel.view.main.Util', {
  extend: 'Ext.app.ViewController',
  alias: 'vielController.util1',
});

function loading(win){

  var loading = new Ext.LoadMask({
      msg    : 'Carregando...',
      target : win,
      flex: 1
  });

  return loading;
}

function alertError(error){
    Ext.Msg.show({
      title:'Erro',
      msg: error,
      icon: Ext.Msg.ERROR,
      buttons: Ext.Msg.OK
  });
}