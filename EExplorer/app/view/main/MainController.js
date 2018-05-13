/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('EExplorer.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    requires: [],

    control: 
    {
        '*': {
            onClickDashboard: 'onClickDashboard',
            onClickBlock: 'onClickBlock',
            onClickBatch: 'onClickBatch',
            onClickTX: 'onClickTX',
            onClickState: 'onClickState',
            onClickSearch: 'onClickSearch',

            onShow: 'onShow',
            onBeforeRender: 'onBeforeRender',
            onAfterRender: 'onAfterRender',
            onResize: 'onResize',
        }
    },

    onShow: function()
    {
        console.log('MainController.onShow');
    },

    onAfterRender: function()
    {
        var a_height = this.getView().height;
        console.log('MainController.onAfterRender',a_height);

    },

    onBeforeRender: function()
    {
        console.log('MainController.onBeforeRender');

        var a_controller = EExplorer.app.getController('EController');
        a_button = this.lookupReference('btn_main_dashboard');
        a_button.click();
    },

    onResize: function(view, width, height, oldWidth, oldHeight, eOpts)
    {
        //console.log('MainController.onResize',height);
    },

    onItemSelected: function (sender, record) 
    {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) 
    {
        if (choice === 'yes') {
            //
        }
    },

    onDetailTransactionView: function() 
    {
        console.log('onDetailTransactionView');
    },

    onClickSearch: function()
    {
        console.log('MainController.onClickSearch');
        var a_controller = EExplorer.app.getController('EController');
        a_controller.updateView('EExplorer.view.search.Search','');
    },

    onClickDashboard: function()
    {
        console.log('MainController.onClickDashboard');
        var a_controller = EExplorer.app.getController('EController');
        a_controller.updateView('EExplorer.view.dashboard.Dashboard','');
    },

    onClickBlock: function()
    {
        console.log('MainController.onClickBlock');
        var a_controller = EExplorer.app.getController('EController');
        a_controller.updateView('EExplorer.view.block.Block','');
    },

    onClickBatch: function()
    {
        console.log('MainController.onClickBatch');
        var a_controller = EExplorer.app.getController('EController');
        a_controller.updateView('EExplorer.view.batch.Batch','');
    },

    onClickTX: function()
    {
        console.log('MainController.onClickTX');
        var a_controller = EExplorer.app.getController('EController');
        a_controller.movePage('EExplorer.view.transaction.Transaction',null);
    },

    onClickState: function()
    {
        console.log('MainController.onClickState');
        var a_controller = EExplorer.app.getController('EController');
        a_controller.updateView('EExplorer.view.state.State','');
    },

});
