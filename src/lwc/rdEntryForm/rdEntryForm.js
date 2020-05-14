import { LightningElement, api, track } from 'lwc';
import { fireEvent } from 'c/pubsubNoPageRef';

import FIELD_NAME from '@salesforce/schema/npe03__Recurring_Donation__c.Name';
import FIELD_ACCOUNT from '@salesforce/schema/npe03__Recurring_Donation__c.npe03__Organization__c';
import FIELD_CONTACT from '@salesforce/schema/npe03__Recurring_Donation__c.npe03__Contact__c';
import FIELD_DATE_ESTABLISHED from '@salesforce/schema/npe03__Recurring_Donation__c.npe03__Date_Established__c';
import FIELD_STATUS from '@salesforce/schema/npe03__Recurring_Donation__c.Status__c';
import FIELD_RECURRING_TYPE from '@salesforce/schema/npe03__Recurring_Donation__c.RecurringType__c';
import FIELD_INSTALLMENT from '@salesforce/schema/npe03__Recurring_Donation__c.npe03__Installments__c';
import FIELD_AMOUNT from '@salesforce/schema/npe03__Recurring_Donation__c.npe03__Amount__c';
import FIELD_PAYMENT_METHOD from '@salesforce/schema/npe03__Recurring_Donation__c.PaymentMethod__c';
import FIELD_INSTALLMENT_PERIOD from '@salesforce/schema/npe03__Recurring_Donation__c.npe03__Installment_Period__c';
import FIELD_INSTALLMENT_FREQUENCY from '@salesforce/schema/npe03__Recurring_Donation__c.InstallmentFrequency__c';
import FIELD_DAY_OF_MONTH from '@salesforce/schema/npe03__Recurring_Donation__c.Day_of_Month__c';
import FIELD_START_DATE from '@salesforce/schema/npe03__Recurring_Donation__c.StartDate__c';
import FIELD_CAMPAIGN from '@salesforce/schema/npe03__Recurring_Donation__c.npe03__Recurring_Donation_Campaign__c';


import cancel from '@salesforce/label/c.stgBtnCancel';
import save from '@salesforce/label/c.stgBtnSave';

import configureEntryForm from '@salesforce/apex/RD2_entryFormController.configureEntryForm';

export default class rdEntryForm extends LightningElement {
    CUSTOM_LABELS = Object.freeze({
        cancel,
        save
    });

    FIELDS = Object.freeze({
        name : FIELD_NAME.fieldApiName,
        account: FIELD_ACCOUNT.fieldApiName,
        contact : FIELD_CONTACT.fieldApiName,
        recurringType : FIELD_RECURRING_TYPE.fieldApiName,
        dateEstablished : FIELD_DATE_ESTABLISHED.fieldApiName,
        installment : FIELD_INSTALLMENT.fieldApiName,
        status : FIELD_STATUS.fieldApiName,
        amount : FIELD_AMOUNT.fieldApiName,
        paymentMethod : FIELD_PAYMENT_METHOD.fieldApiName,
        period : FIELD_INSTALLMENT_PERIOD.fieldApiName,
        installmentFrequency : FIELD_INSTALLMENT_FREQUENCY.fieldApiName,
        dayOfMonth : FIELD_DAY_OF_MONTH.fieldApiName,
        startDate : FIELD_START_DATE.fieldApiName,
        campaign : FIELD_CAMPAIGN.fieldApiName,
        CurrencyIsoCode : 'CurrencyIsoCode'
    });

    @api parentId;
    @api recordId;

    @track isAutoNamingDisabled;
    @track isMultiCurrencyEnabled;

    listenerEvent = 'rdEntryFormEvent';

   connectedCallback() {
    configureEntryForm().then(response => {
       this.isAutoNamingDisabled = response.isAutoNamingDisabled;
       this.isMultiCurrencyEnabled = response.isMultiCurrencyEnabled;
    })
    .catch(error => {
       
    });
    }

    /*******************************************************************************
    * @description Fires an event to utilDedicatedListener with the cancel action if
    * a dedicated listener event name is provided otherwise dispatches a CustomEvent.
    */
   handleCancel() {
        fireEvent(this.pageRef, 'rdEntryFormEvent', { action: 'cancel' });
    }

    handleSuccess(event) {
        fireEvent(this.pageRef, 'rdEntryFormEvent', { action: 'success', recordId: event.detail.id});
    }
}