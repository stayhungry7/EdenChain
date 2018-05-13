/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('EExplorer.view.block.BlockController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ctlBlock',
    reference: 'ctlBlock',
    requires: [
        //'EExplorer.ux.*'
    ],

    control: {
        '*': {
            updateBlockDetail: 'updateBlockDetail',
            onClickBlockRefresh: 'onClickBlockRefresh',
            onClickBlockBack: 'onClickBlockBack',
            onClickBlockCopy: 'onClickBlockCopy',
            onPanelCollapse: 'onPanelCollapse',
            onPanelBeforeExpand: 'onPanelBeforeExpand',
            onPanelExpand: 'onPanelExpand',
            onBlockItemDblClick: 'onBlockItemDblClick',
            onPagingClick: 'onPagingClick',            
            onPagingChange: 'onPagingChange',            
        }
    },

    init: function()
    {
        console.log('BlockController.init');
        //EExplorer.ux.Mediator.on('onCmdShow', this.onCmdOpenView, this);
    },

    updateView: function(param)
    {
        console.log('BlockController.updateView');
        if (param) {

        }
    },

    clearAll: function()
    {
        this.lookupReference('grid_block_list').getStore().reload();        
        
        this.lookupReference('grid_block_batch').getStore().reload();
        this.lookupReference('grid_prev_block_batch').getStore().reload();

        this.clearForm('form_block_detail');
        this.clearForm('form_prev_block_detail');
    },

    setPropertyData: function (data_name) 
    {
        var grid = this.lookup('prob_block_detail'),
            view = this.getView(),
            vm = this.getViewModel();
        var data = vm.data[data_name];
        console.log(data.source);

        grid.setSource(data.source, data.config);
        grid.update();
    },

    clearForm: function(ref_form)
    {
        var a_controller = EExplorer.app.getController('EController');
        a_controller.clearFormPanel(this,ref_form);
    },

    drawChart:function(period)
    {
        var _this = this;

        EExplorer.service.Helper.getData(30,
            function(status,response) 
            {
                json_data = JSON.parse(response.responseText);
                EExplorer.service.Helper.drawChart(_this,'chart_block',json_data.data.data);
            },
        );
    },




    updateBlockRecord: function(record,prefix)
    {
        console.log('BlockController.updateBlockRecord',record);
        
        this.lookupReference('txt_'+prefix+'block_id').setValue(record.data.header_signature);
        this.lookupReference('txt_'+prefix+'signer_public_key').setValue(record.data.signer_public_key);
        this.lookupReference('txt_'+prefix+'previous_block_id').setValue(record.data.previous_block_id);
        this.lookupReference('txt_'+prefix+'batch_ids').setValue(record.data.batch_ids);
        this.lookupReference('txt_'+prefix+'block_num').setValue(record.data.block_num);
        this.lookupReference('txt_'+prefix+'consensus').setValue(record.data.consensus);
        this.lookupReference('txt_'+prefix+'state_root_hash').setValue(record.data.state_root_hash);
        this.lookupReference('txt_'+prefix+'batch_count').setValue(record.data.batch_count);
        this.lookupReference('txt_'+prefix+'transaction_count').setValue(record.data.transaction_count);
    },

    updateBlockHeaderRecord: function(record)
    {
        this.lookupReference('txt_block_header_no').setValue(record.internalId);
        this.lookupReference('txt_block_header_id').setValue(record.data.header_signature);
        this.lookupReference('txt_block_previous_block_id').setValue(record.data.previous_block_id);
        //this.lookupReference('txt_'+prefix+'batch_ids').setValue(record.data.batch_ids);
        //this.lookupReference('txt_'+prefix+'block_num').setValue(record.data.block_num);
        this.lookupReference('txt_block_batch_count').setValue(record.data.batch_count);
        this.lookupReference('txt_block_transaction_count').setValue(record.data.transaction_count);
    },

    updateBlockDetail: function(record)
    {
        console.log('BlockController.updateBlockDetail',record);
        
        var a_controller = EExplorer.app.getController('EController');
        a_controller.doCardNavigation(this,1);

        EExplorer.service.Helper.updateBottomBar(record,'footer_block','Block ID',record.data.header_signature,function() {});

        this.getViewModel().data.record = record;

        var store_block = this.getViewModel().getStore('storeBlock');
        var prev_record = store_block.findRecord('header_signature',record.data.previous_block_id);

        console.log('prev_record',prev_record);

        this.updateBlockRecord(record,'');
        this.updateBlockHeaderRecord(record);
        this.updateBlockGrid('grid_block_batch',record);

        this.drawChart(30);

    },

    updateBlockGrid: function(grid_name,record) 
    {
        console.log('BlockController.updateBlockGrid');

        var store_batch = this.getViewModel().getStore('storeBatch');

        var arr_data = [], batch_size = 0, batch_key = '', batch_id = '';

        for (var i=0;i<record.data.batch_ids.length;i++)
        {
            batch_id = record.data.batch_ids[i];
            var a_record = store_batch.findRecord('header_signature',batch_id);
            
            batch_key = '';
            batch_size = 0;
            if (a_record) {
                batch_size = a_record.data.size;
                batch_key = a_record.data.signer_public_key;
            }
            arr_data.push([batch_id,batch_size,batch_key]);
            //json_data.push({"batch_id":record.data.batch_ids[i]});
        }

        var a_store = Ext.create('Ext.data.ArrayStore', {
            fields: [
                {name:'batch_id'},
                {name:'size'},
                {name:'signer_public_key'},
            ],
        });

        a_store.loadData(arr_data);

        this.lookupReference(grid_name).setStore(a_store);
    },

    moveToBatchPage:function(record)
    {
        var store_batch = this.getViewModel().getStore('storeBatch');
        var a_record = store_batch.findRecord('header_signature',record.data.batch_id);

        var a_controller = EExplorer.app.getController('EController');
        a_controller.movePage('EExplorer.view.batch.Batch',{'data':a_record});
    },




    onClickBatch: function(grid,row_index,col_index)
    {
        console.log('BlockController.onClickBatch',grid);
        var a_record = grid.getStore().getAt(row_index);
        this.moveToBatchPage(a_record);       
    },

    onClickPrevBatch: function(grid,row_index,col_index)
    {
        console.log('BlockController.onClickPrevBatch',grid);
        var a_record = grid.getStore().getAt(row_index);
        console.log(a_record);

        var a_controller = EExplorer.app.getController('EController');
        a_controller.showPage(2,{data:a_record});        
    },

    onClickBlockRefresh: function()
    {
        this.clearAll();
    },

    onClickBlockBack: function()
    {
        console.log('BlockController.onClickBlockBack');
        var a_controller = EExplorer.app.getController('EController');
        a_controller.doCardNavigation(this,0);
    },

    onClickBlockCopy: function()
    {
        console.log('BlockController.onClickBlockCopy');
        //var a_controller = EExplorer.app.getController('EController');
        EExplorer.service.Helper.copyToClipboard();
        Ext.Msg.alert('Success', 'Copy to clipboard.', Ext.emptyFn);
    },

    onPanelCollapse: function(panel,direction,animate,eOpts)
    {
        console.log('BlockController.onPanelCollapse',panel,direction);
        a_panel = this.lookupReference('pnl_block_chart');
        //a_panel.collapse('left');
        a_panel.show();
    },

    onPanelBeforeExpand: function(panel,animate,eOpts)
    {
        console.log('BlockController.onPanelBeforeExpand',panel);
        a_panel = this.lookupReference('pnl_block_chart');
        a_panel.hide();
    },

    onPanelExpand: function(panel,animate,eOpts)
    {
        console.log('BlockController.onPanelExpand',panel);

        var record = this.getViewModel().data.record;
        var store_block = this.getViewModel().getStore('storeBlock');
        var prev_record = store_block.findRecord('header_signature',record.data.previous_block_id);

        if (prev_record) {
            this.updateBlockRecord(prev_record,'prev_');
            this.updateBlockGrid('grid_prev_block_batch',prev_record);
        }

        a_panel = this.lookupReference('pnl_block_previous');
        a_panel.update();

    },

    onBlockItemDblClick: function(record)
    {
        console.log('BlockController.onBlockItemDblClick',record);
        this.moveToBatchPage(record);
    },

    onPagingClick: function(btn_text)
    {
        console.log('BlockController.onPagingClick',btn_text);
    },

    onPagingChange: function(slider, new_value,old_value)
    {
        console.log('BlockController.onPagingChange',slider);
    },

});
