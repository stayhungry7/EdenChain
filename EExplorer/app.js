/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'EExplorer.Application',

    name: 'EExplorer',

    requires: [
        // This will automatically load all classes in the EExplorer namespace
        // so that application classes do not need to require each other.
        'Ext.grid.*',
        'Ext.slider.*',
        'EExplorer.*'
    ],

    // The name of the initial view to create.
    mainView: 'EExplorer.view.main.Main'
});
