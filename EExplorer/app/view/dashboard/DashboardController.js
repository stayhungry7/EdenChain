/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('EExplorer.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ctlDashboard',

    requires: [
        'EExplorer.store.Blocks'
    ],

    control: {
        '*': {
            onClickBlockMore: 'onClickBlockMore',
            onClickTXMore: 'onClickTXMore',
            onClickDashboardSearch: 'onClickDashboardSearch',
            onSelectTX: 'onSelectTX',
        }
    },


    init: function()
    {
        console.log('DashboardController.init');
        this.loadStores();
    },

    updateView: function()
    {
        console.log('DashboardController.updateView');

    },

    afterRender: function() 
    {
        console.log('DashboardController.onAfterRender');
    },

    loadStores: function()
    {
        var _this = this;

        var a_store_blocks = this.getViewModel().getStore('storeBlock');
        var a_store_batches = this.getViewModel().getStore('storeBatch');
        var a_store_txs = this.getViewModel().getStore('storeTransaction');

        var a_mask = EExplorer.service.Helper.loadMask('');

        a_store_blocks.load(
        {
            scope: this,
            callback: function(records,operation, success) 
            {
                //console.log(records);
                a_store_batches.load({
                    callback: function(records,operation, success) 
                    {
                        //console.log(records);
                        a_store_txs.load({
                            callback: function(records,operation, success) 
                            {
                                //console.log(records);
                                _this.updateDashboard();
                                a_mask.destroy(true);
                            }
                        });
                    }
                });
            }
        });
    },

    getNamespace: function()
    {
        var a_tx = this.getViewModel().getStore('storeTransaction');
        var a_unique = a_tx.collect('namespace')
        //console.log();
        return a_unique;
    },

    updateDashboard: function()
    {
        this.updateWidgets();
        this.drawStatChart();
    },

    updateWidgets: function() 
    {
        console.log('DashboardController.updateWidgets');

        var a_namespace = this.getNamespace();

        this.lookupReference('wgt_namespace').updateWidget(a_namespace.length, 'Namespace');
        this.lookupReference('wgt_blockcount').updateWidget(this.getViewModel().getStore('storeBlock').getCount(), 'Block');
        this.lookupReference('wgt_batchcount').updateWidget(this.getViewModel().getStore('storeBatch').getCount(), 'Batches');
        this.lookupReference('wgt_txcount').updateWidget(this.getViewModel().getStore('storeTransaction').getCount(), 'Transaction');
    },

    getAvgPerBlock: function()
    {
        var a_store_block = this.getViewModel().getStore('storeBlock');

        var sum_tx = 0, sum_batch = 0;
        a_store_block.each(function(record) 
        {
            sum_tx = sum_tx + record.data.transaction_count;
            sum_batch = sum_batch + record.data.batch_count;
        });

        var result = {
            'avg_tx':sum_tx/a_store_block.getCount(),
            'avg_batch':sum_batch/a_store_block.getCount(),
        }
        return result;
    },

    getAvgBatchSize: function()
    {
        var a_store_batch = this.getViewModel().getStore('storeBatch');
        var sum_size = 0;
        a_store_batch.each(function(record) 
        {
            sum_size = sum_size + record.data.size;
        });
        
        var result = {
            'avg_size':sum_size/a_store_batch.getCount()
        }
        return result;
    },

    getAvgTxSize: function()
    {
        var a_store_tx = this.getViewModel().getStore('storeTransaction');
        var sum_size = 0, sum_input = 0, sum_output = 0;

        a_store_tx.each(function(record) 
        {
            //console.log(record);
            sum_size = sum_size + record.data.size;
            sum_input = sum_input + record.data.inputs.length;
            sum_output = sum_output + record.data.outputs.length;
        });
        
        var result = {
            'avg_size':sum_size/a_store_tx.getCount(),
            'avg_input':sum_input/a_store_tx.getCount(),
            'avg_output':sum_output/a_store_tx.getCount()            
        }
        return result;
    },

    drawStatChart: function() 
    {

        var avg_per_block = this.getAvgPerBlock();
        var avg_per_batch = this.getAvgBatchSize();
        var avg_per_tx = this.getAvgTxSize();

        var data_chart = [];
        data_chart.push(['Avg tx count',avg_per_block['avg_tx']]);
        data_chart.push(['Avg batch count',avg_per_block['avg_batch']]);
        data_chart.push(['Avg batch size',avg_per_batch['avg_size']]);
        data_chart.push(['Avg TX size',avg_per_tx['avg_size']]);
        data_chart.push(['Avg TX Input',avg_per_tx['avg_input']]);
        data_chart.push(['Avg TX Output',avg_per_tx['avg_output']]);

        var a_store = Ext.create('Ext.data.ArrayStore', {
            fields: [
                { name: 'name'},
                { name: 'value'}
            ],
            data: data_chart
        });

        this.lookupReference('chart_stat').setStore(a_store);
    },

    drawNamespaceChart: function() 
    {
        var a_tx = this.getViewModel().getStore('storeTransaction');
        var namespaces = this.getNamespace();        
        var data_chart = [];
        var count = 0;
        for (var i=0;i<namespaces.length;i++)
        {
            a_tx.clearFilter(true);
            a_tx.filter('namespace',namespaces[i]);
            data_chart.push([namespaces[i],a_tx.getCount()]);
        }
        a_tx.clearFilter(true);

        var a_store = Ext.create('Ext.data.ArrayStore', {
            fields: [
                { name: 'name'},
                { name: 'value'}
            ],
            data: data_chart
        });

        this.lookupReference('chart_namespace').setStore(a_store);
    },

    onClickBlockMore: function()
    {
        console.log('DashboardController.onClickBlockMore');
        
        var a_controller = EExplorer.app.getController('EController');
        a_controller.showPage(1,{});
    },

    onClickTXMore: function()
    {
        console.log('DashboardController.onClickTXMore');
        var a_controller = EExplorer.app.getController('EController');
        a_controller.movePage('EExplorer.view.transaction.Transaction');
    },

    onClickDashboardSearch: function()
    {
        console.log('DashboardController.onClickSearch');        
        var a_controller = EExplorer.app.getController('EController');
        a_controller.updateView('EExplorer.view.search.Search','');

    },

    onSelectTX: function(grid, rowIndex, colIndex)
    {
        var record = grid.getStore().getAt(rowIndex);

        var params = {'data':record};
        var a_controller = EExplorer.app.getController('EController');
        a_controller.movePage('EExplorer.view.transaction.Transaction',params);
    },

});
