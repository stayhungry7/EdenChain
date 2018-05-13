/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('EExplorer.view.batch.BatchController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ctlBatch',

    requires: [
        //'EExplorer.ux.*'
    ],

    control: {
        '*': {
            updateBatchDetail:'updateBatchDetail',
            onClickBatchRefresh:'onClickBatchRefresh',
            onClickBatchCopy: 'onClickBatchCopy',
            onClickBatchBack: 'onClickBatchBack',
            onBatchItemDblClick: 'onBatchItemDblClick',
            onPagingClick: 'onPagingClick',            
            onPagingChange: 'onPagingChange',            
        }
    },


    init: function()
    {
        console.log('BatchController.init');
    },

    updateView: function(param)
    {
        console.log('BatchController.updateView',param.data.batch_id);

        if (! param) {
            return;
        }

        this.updateBatchDetail(param.data);
    },

    clearForm: function(ref_form)
    {
        var a_controller = EExplorer.app.getController('EController');
        a_controller.clearFormPanel(this,ref_form);
    },

    clearAll: function()
    {
        this.clearForm('form_batch_detail');

        this.lookupReference('grid_batch_list').getStore().reload();        
        this.lookupReference('grid_batch_tx').getStore().reload();
    },

    drawChart:function(period)
    {
        var _this = this;

        EExplorer.service.Helper.getData(30,
            function(status,response) 
            {
                json_data = JSON.parse(response.responseText);
                EExplorer.service.Helper.drawChart(_this,'chart_batch',json_data.data.data);
            },
        );
    },

    updateBatchDetail: function(record)
    {
        console.log('BatchController.updateBatchDetail',record);

        this.lookupReference('txt_batch_id').setValue(record.data.header_signature);
        this.lookupReference('txt_batch_size').setValue(record.data.size);
        this.lookupReference('txt_batch_signer_public_key').setValue(record.data.signer_public_key);
        this.lookupReference('txt_batch_transaction_ids').setValue(record.data.transaction_ids);
        //this.lookupReference('txt_batch_transactions').setValue(record.data.transactions);

        this.updateTransactionGrid(record);
        this.drawChart(30);
    },

    updateTXGridinBatch: function(record)
    {
        var store_tx = this.getViewModel().getStore('storeTransaction');

        var arr_data = [], tx_namespace='',
            tx_input_size = 0, tx_output_size = 0,tx_key = '', tx_id = '';

        for (var i=0;i<record.data.transactions.length;i++)
        {
            var a_tx = record.data.transactions[i];

            console.log('updateTXGridinBatch',a_tx);

            tx_id = a_tx.header_signature;
            tx_namespace = a_tx.header.family_name;
            tx_key = a_tx.header.signer_public_key;
            tx_input_size = a_tx.header.inputs.length;
            tx_output_size = a_tx.header.outputs.length;

            arr_data.push([tx_namespace,tx_id,tx_input_size,tx_output_size]);
            //json_data.push({"batch_id":record.data.batch_ids[i]});
        }

        var a_store = Ext.create('Ext.data.ArrayStore', {
            fields: [
                {name:'namespace'},
                {name:'tx_id'},
                {name:'input_size'},
                {name:'output_size'},
            ],
        });

        a_store.loadData(arr_data);

        this.lookupReference('grid_batch_tx').setStore(a_store);      
    },

    updateTransactionGrid: function(record) 
    {
        console.log('BatchController.updateTransactionGrid',record);

        var a_controller = EExplorer.app.getController('EController');
        a_controller.doCardNavigation(this,1);
        EExplorer.service.Helper.updateBottomBar(record,'footer_batch','Batch ID',record.data.header_signature,function() {});

        this.updateBatchHeaderRecord(record);
        this.updateTXGridinBatch(record);
    },

    updateBatchHeaderRecord: function(record)
    {
        this.lookupReference('txt_batch_header_no').setValue(record.internalId);
        this.lookupReference('txt_batch_header_id').setValue(record.data.header_signature);
        this.lookupReference('txt_batch_header_size').setValue(record.data.size);
        this.lookupReference('txt_batch_header_signer_public_key').setValue(record.data.signer_public_key);
    },

    showTransactionPage: function(tx_id)
    {
        var store_tx = this.getViewModel().getStore('storeTransaction');
        var record = store_tx.findRecord('transaction_id',tx_id);

        var a_controller = EExplorer.app.getController('EController');
        a_controller.movePage('EExplorer.view.transaction.Transaction', {'data':record} );
    },




    onClickTransaction: function(grid,row_index,col_index)
    {
        console.log('BatchController.onClickTransaction');
        var record = grid.getStore().getAt(row_index);

        this.showTransactionPage(record.data.tx_id);
    },

    onClickBatchRefresh: function()
    {
        console.log('BatchController.onClickBatchRefresh');
        this.clearAll();
    },

    onClickBatchCopy: function()
    {
        console.log('BatchController.onClickBatchCopy');
        EExplorer.service.Helper.copyToClipboard();
        Ext.Msg.alert('Success', 'Copy to clipboard.', Ext.emptyFn);        
    },

    onClickBatchBack: function()
    {
        console.log('BatchController.onClickBatchBack');
        var a_controller = EExplorer.app.getController('EController');
        a_controller.doCardNavigation(this,0);
    },

    onBatchItemDblClick: function(record)
    {
        console.log('BatchController.onBatchItemDblClick',record);

        this.showTransactionPage(record.data.tx_id);
    },

    onPagingClick: function(btn_text)
    {
        console.log('BatchController.onPagingClick',btn_text);
    },

    onPagingChange: function(slider, new_value,old_value)
    {
        console.log('BatchController.onPagingChange',slider);
    },

});
