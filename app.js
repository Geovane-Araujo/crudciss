/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'CissProcSel.Application',

    name: 'CissProcSel',

    requires: [
        // This will automatically load all classes in the CissProcSel namespace
        // so that application classes do not need to require each other.
        'CissProcSel.*'
    ],

    // The name of the initial view to create.
    mainView: 'CissProcSel.view.main.Main'
});
