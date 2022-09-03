import VendorIntegrationBillBuilder from './bill/buyin/VendorIntegrationBillBuilder';
import VendorBillSettlement from './bill/buyin/VendorBillSettlement.js';
import UploadPayExcel from './bill/sale/UploadPayExcel';
import UploadBankExcel from './bill/sale/UploadBankExcel';
import TransferContract from './TransferContract';
import TableEditCom from './tableEditCom';
import TableAddCom from './tableAddCom';
import SwportsInnerLink from './SwportsInnerLink';
import SwitchSummary from './SwitchSummary';
import Settlementdetail from './bill/sale/settlementdetail';
import SetLocateYearAndMonth from './SetLocateYearAndMonth';
import SearchTableModal from '@/routes/commonAntTable/components/commonTableCom/searchTableComponents/searchTableModal.js';
import RoleAsign from './RoleAsign';
import ResourceUsage from './bill/sale/ResourceUsage';
import ResetPassword from './ResetPassword';
import ResellerBillViewer from './Resell/ResellerBillViewer';
import ResellerBillCreater from './Resell/ResellerBillCreater';
import RefreshTable from './refreshTable';
import ProductTree from './ProdTree.js';
import PrepayContractBillCreater from './bill/sale/PrepayContractBillCreater';
import PostpayContractBillCreater from './bill/sale/PostpayContractBillCreater';
import PortTpl from './device/PortTpl';
import PaymentSettlement from './bill/sale/PaymentSettlement';
import PayBuyin from './bill/sale/PayBuyin';
import OneKeyPaperBillBuyin from './bill/buyin/OneKeyPaperBillBuyin';
import OneKeyPaperBill from './bill/sale/OneKeyPaperBill';
import OneKeyContractBill from './bill/sale/OneKeyContractBill';
import OneKeyBuyInContractBill from './bill/buyin/OneKeyBuyInContractBill';
import OneBuyInContractBillCreater from './bill/sale/OneBuyInContractBillCreater';
import Odfsummary from './Odfsummary';
import ODFPortBatchadd from './ODFPortBatchadd';

import Exportexcel from './exportExcelRemote';
import DeleteData from './deleteData';
import CustPaperBillPrinterDebug from './bill/sale/CustPaperBillPrinterDebug';
import CustPaperBillPrinter from './bill/sale/CustPaperBillPrinter';
import CustIntegrationBillBuilder from './bill/sale/CustIntegrationBillBuilder';
import CustContractsBillAndPaymentSummary from './bill/sale/CustContractsBillAndPaymentSummary';
import ContractRelatedResources from './bill/sale/ContractRelatedResources';
import ContractBillPrinter from './bill/sale/ContractBillPrinter';
import BuyResItemList from './bill/buyin/BuyResItemList';
import BuyinSinglePrePay from './bill/buyin/BuyinSinglePrePay';
import BuyinSinglePostPay from './bill/buyin/BuyinSinglePostPay';
import BuyinItemAdd from './BuyinItemAdd';
import ButtonForbiddenCFG from './ButtonForbiddenCFG';
import buttonDetail from './buttonDetail';
import BillSettlement from './bill/sale/BillSettlement';
import AddReselerItemUsage from './Resell/AddReselerItemUsage';
import ContractWarn from './ContractWarn';
import clearIBM from './clearIBM';
import SetBankItemStatus from './SetBankItemStatus';
import SetRsBillingState from './SetRsBillingState';

import React from 'react';

export default class AddAllFiles extends React.Component {
    constructor(props) {
        super(props);
        console.log('🚀 ~ file: BuyinItemAdd.js ~ line 12 ~ BuyinItemAdd ~ constructor ~ props', props.refreshTable);
        this.init = this.init.bind(this);
    }

    render() {
        console.log(this.init);
        return <div></div>;
    }
}
