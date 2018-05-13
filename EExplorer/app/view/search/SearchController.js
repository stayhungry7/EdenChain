/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('EExplorer.view.search.SearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ctlSearch',
    requires: [],

    control: 
    {
        '*': {
            onSearchItemDBClick: 'showTXDetail',
            onClickSearchData: 'onClickSearchData',
            onClickSearchTX: 'onClickSearchTX',
        }
    },

    init: function()
    {
        console.log('SearchController.init');
        //EExplorer.ux.Mediator.on('onCmdShow', this.onCmdOpenView, this);
    },

    updateView: function()
    {
        console.log('SearchController.updateView');
    },

    doSearch: function(query_type,value)
    {
        var _this = this;

        console.log('SearchController.doSearch');
        var store_tx = this.getViewModel().getStore('storeTransaction');

        store_tx.load(
        {
            scope: this,
            params: { 'tx_id': value },
            callback: function(records,operation, success) 
            {
                console.log(records);
                var msg = 'About ' +records.length.toString() + ' results';
                _this.lookupReference('lbl_search_result').setFieldLabel(msg);
            }
        });
    },

    showTXDetail: function(record) 
    {
        console.log('SearchController.showTXDetail',record);

        console.log('SearchController.showTXDetail2',record);

        var a_controller = EExplorer.app.getController('EController');
        a_controller.movePage('EExplorer.view.transaction.Transaction', {'data':record} );
    },



    onSearchItemDBClick: function(record)
    {
        console.log('SearchController.onSearchItemDBClick',record);
        this.showTXDetail(record);
    },

    onClickParameter: function(grid,row_index,col_index)
    {
        console.log('StateController.onClickParameter');

        var a_record = grid.getStore().getAt(row_index);
        console.log(a_record);

        var a_controller = EExplorer.app.getController('EController');
        //a_controller.showPage(2,{data:a_record});        
    },

    onClickStateRefresh: function()
    {

    },

    onClickSearchData: function()
    {
        console.log('SearchController.onClickSearchData');

        var a_value = this.lookupReference('txt_search_keyword').getValue();
        var query_type = 'tx';
        this.doSearch(query_type,a_value);
    },

    onClickSearchTX: function(grid, row_index, col_index)
    {
        console.log('SearchController.onClickSearchTX',grid);

        var record = grid.getStore().getAt(row_index);
        this.showTXDetail(record);
    },

});
