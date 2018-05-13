/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('EExplorer.Application', {
    extend: 'Ext.app.Application',

    name: 'EExplorer',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    requires: [
    ],

    controllers: [
        'EController',
        //'MainController',
        //'TxdetailController'
    ],

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
