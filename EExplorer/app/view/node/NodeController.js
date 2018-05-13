/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('EExplorer.view.node.NodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ctlNode',
    requires: [],

    control: 
    {
        '*': {
            updateStateDetail: 'updateStateDetail',
            onClickStateRefresh: 'onClickStateRefresh'
        }
    },

    init: function()
    {
        console.log('TxdetailController.init');
        //EExplorer.ux.Mediator.on('onCmdShow', this.onCmdOpenView, this);
    },

    updateStateDetail: function(record)
    {
        this.lookupReference('txt_state_head').setValue(record.data.head);
        this.lookupReference('txt_state_paging_start').setValue(record.data.paging_start);
        this.lookupReference('txt_state_paging_limit').setValue(record.data.paging_limit);

        this.updateParameterGrid(record);
    },

    updateParameterGrid: function(record) 
    {
        console.log('updateParameterGrid',record);

        var store_tx = this.getViewModel().getStore('storeTransaction');

        var arr_data = [], tx_size = 0, tx_key = '', tx_id = '';

        for (var i=0;i<record.data.data.length;i++)
        {
            var a_record = record.data.data[i];

            arr_data.push([a_record.address,a_record.data]);
        }

        var a_store = Ext.create('Ext.data.ArrayStore', {
            fields: [
                {name:'address'},
                {name:'data'},
            ],
        });

        a_store.loadData(arr_data);

        this.lookupReference('grid_state_parameter').setStore(a_store);
    },

    onClickParameter: function(grid,row_index,col_index)
    {
        console.log('StateController.onClickParameter');

        var a_record = grid.getStore().getAt(row_index);
        console.log(a_record);

        var a_controller = EExplorer.app.getController('EController');
    },

    onClickStateRefresh: function()
    {

    },
});
