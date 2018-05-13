/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('EExplorer.view.console.Console', {
    extend: 'Ext.container.Container',
    xtype: 'viewConsole',
    controller: 'ctlConsole',
    title: 'Console',
    reference: 'view_console',

    requires: [
        'EExplorer.store.Blocks',
    ],


    viewModel: {
        type: 'modConsole'
    },

    items: 
    [
        {
            xtype: 'panel',
            title: 'EdenChain Console',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            //bodyPadding: 20,
            flex: 1,
            dockedItems: 
            [],
            items:
            [
                {
                    xtype: 'form',
                    height: 90,
                    fieldDefaults: {
                        labelAlign: 'left',
                        labelWidth: 120,
                        width: '100%',
                    },
                    buttons: 
                    [
                        { 
                            text:'Add Block',
                            handler: function () {
                                this.fireEvent('onClickAdd');
                            }
                        },
                        { text:'Clear' },
                        { 
                            text:'Execute',
                            handler: function() {
                                this.fireEvent('onClickExecute');    
                            }
                        },
                    ],            
                    items: 
                    [
                        {
                            xtype: 'textfield',
                            readOnly: false,
                            allowBlank: false,
                            fieldLabel: 'Command',
                            name: 'txt_console_cmd',
                            reference: 'txt_console_cmd',
                            emptyText: '',
                        }
                    ]
                },
                {
                    xtype: 'form',
                    //layout: 'fit',
                    //flex: 1,
                    fieldDefaults: {
                        labelAlign: 'left',
                        labelWidth: 120,
                        width: '100%',
                    },
                    buttons: 
                    [
                        { text:'Clear' },
                    ],                        
                    items: 
                    [
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Output',
                            name: 'txt_console_output',
                            emptyText: '',
                            readOnly: true,
                            autoScroll: true,
                            grow: true,
                        }
                    ]
                }

            ]            
        },
        {
            xtype: 'panel',
            title: 'Test',
        }
    ]
});
