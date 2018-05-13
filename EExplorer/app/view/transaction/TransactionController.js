/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('EExplorer.view.transaction.TransactionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ctlTransaction',
    requires: [],

    control: {
        '*': {
            updateTransactionDetail: 'updateTransactionDetail',
            onClickTXRefresh: 'onClickTXRefresh',
            onClickTXCopy: 'onClickTXCopy',
            onClickTXBack: 'onClickTXBack',
            onPagingClick: 'onPagingClick',
            onPagingChange: 'onPagingChange',
            onClickParameter: 'onClickParameter',
        }
    },


    init: function()
    {
        console.log('TxdetailController.init');
    },
    
    updateView: function(params)
    {
        console.log('TransactionController.updateView',params);

        if (! params) 
        {
            this.lookupReference('widget_paging_tx').updateWidget(1,2,3);
            return;
        }

        this.updateTransactionDetail(params.data);
    },

    clearForm: function(ref_form)
    {
        var a_controller = EExplorer.app.getController('EController');
        a_controller.clearFormPanel(this,ref_form);
    },

    clearAll: function()
    {
        this.clearForm('form_transaction_detail');

        this.lookupReference('grid_tx_list').getStore().reload();        
        this.lookupReference('grid_tx_parameter').getStore().reload();
    },

    drawChart:function(period)
    {
        var _this = this;

        var a_mask = EExplorer.service.Helper.loadMaskToTarget(_this,'chart_tx','');

        EExplorer.service.Helper.getData(30,
            function(status,response) 
            {
                json_data = JSON.parse(response.responseText);
                EExplorer.service.Helper.drawChart(_this,'chart_tx',json_data.data.data);
            },
        );
    },

    updateTransactionDetail: function(record)
    {
        this.lookupReference('txt_tx_id').setValue(record.data.transaction_id);
        this.lookupReference('txt_tx_size').setValue(record.data.size);
        this.lookupReference('txt_tx_namespace').setValue(record.data.namespace);
        this.lookupReference('txt_tx_payload').setValue(record.data.payload);
        this.lookupReference('txt_tx_nonce').setValue(record.data.nonce);
        this.lookupReference('txt_tx_signer_public_key').setValue(record.data.signer_public_key);
        this.lookupReference('txt_tx_batcher_public_key').setValue(record.data.batcher_public_key);

        this.updateTXGrid(record);
        this.drawChart(30);
    },

    updateTXHeader: function(record)
    {
        this.lookupReference('txt_tx_header_no').setValue(record.internalId);
        this.lookupReference('txt_tx_header_id').setValue(record.data.transaction_id);
        this.lookupReference('txt_tx_header_size').setValue(record.data.size);
        this.lookupReference('txt_tx_header_namespace').setValue(record.data.namespace);
    },

    updateTXGrid: function(record) 
    {
        console.log('TransactionController.updateTXGrid',record);

        var a_controller = EExplorer.app.getController('EController');
        a_controller.doCardNavigation(this,1);

        EExplorer.service.Helper.updateBottomBar(record,'footer_tx','TX ID',record.data.transaction_id,function() {});

        this.updateTXHeader(record);

        var store_tx = this.getViewModel().getStore('storeTransaction');

        var arr_data = [], tx_size = 0, tx_key = '', tx_id = '';

        var items = [];
        items.push(['From',record.data.inputs]);
        items.push(['To',record.data.outputs]);
        items.push(['Dependencies',record.data.dependencies]);

        for (var i=0;i<items.length;i++)
        {
            a_record = items[i][1];
            //console.log('afasdfasdfsdaf',a_record);
            if (! a_record) {
                continue;
            }

            for (var item_index=0;item_index<a_record.length;item_index++)
            {
                tx_id = a_record[item_index];
                arr_data.push([items[i][0],tx_id]);
            }
        }

        var a_store = Ext.create('Ext.data.ArrayStore', {
            fields: [
                {name:'data_type'},
                {name:'tx_id'},
            ],
        });

        a_store.loadData(arr_data);

        this.lookupReference('grid_tx_parameter').setStore(a_store);
    },

    showTransactionPage: function(tx_id)
    {
        var store_tx = this.getViewModel().getStore('storeTransaction');
        var record = store_tx.findRecord('transaction_id',tx_id);

        var a_controller = EExplorer.app.getController('EController');
        a_controller.movePage('EExplorer.view.transaction.Transaction', {'data':record} );
    },





    onClickTXRefresh: function()
    {
        console.log('TransactionController.onClickTXRefresh');
        this.clearAll();
    },

    onClickTXCopy: function()
    {
        console.log('TransactionController.onClickTXCopy');
        EExplorer.service.Helper.copyToClipboard();
        Ext.Msg.alert('Success', 'Copy to clipboard.', Ext.emptyFn);        
    },

    onClickTXBack: function()
    {
        console.log('TransactionController.onClickTXBack');
        var a_controller = EExplorer.app.getController('EController');
        a_controller.doCardNavigation(this,0);
    },

    onPagingClick: function(btn_text)
    {
        console.log('TransactionController.onPagingClick',btn_text);
    },

    onPagingChange: function(slider, new_value,old_value)
    {
        console.log('TransactionController.onPagingChange',slider);
    },

    onClickParameter: function(grid,row_index)
    {
        var record = grid.getStore().getAt(row_index);

        console.log('TransactionController.onClickParameter',record);

        var store_tx = this.getViewModel().getStore('storeTransaction');
        var a_record = store_tx.findRecord('tx_id',record.data.tx_id);

        console.log('TransactionController.onClickParameter2',a_record);

        this.updateTXGrid(a_record);
    },

});
