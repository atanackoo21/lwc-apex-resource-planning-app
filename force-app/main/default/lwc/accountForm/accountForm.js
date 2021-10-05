import { api, LightningElement , track, wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';

import getAccounts from '@salesforce/apex/AccountHelper.getAccounts';
import updateAccount from '@salesforce/apex/AccountHelper.updateAccount';
import deleteAccount from '@salesforce/apex/AccountHelper.deleteAccount';
import insertAccount from '@salesforce/apex/AccountHelper.insertAccount';


const columns = [
    { label: 'Name', fieldName: 'Name',  type: 'text'},
    { label: 'Phone', fieldName: 'Phone', type: 'text' },
    { label: 'BillingStreet', fieldName: 'BillingStreet', type: 'text' },
    { label: 'BillingCity', fieldName: 'BillingCity', type: 'text' },
    { label: 'Email', fieldName: 'Email__c', type: 'text' },
    {
        label:"",
        type: "button",
        fixedWidth: 150,
        typeAttributes: {
            label: 'View Details',
            variant: 'brand',
            class: 'scaled-down',
            name: 'update'
        }
    },
    {
        label:"",
        type: "button",
        fixedWidth: 150,
        typeAttributes: {
            label: 'Destructive',
            variant: 'destructive',
            class: 'scaled-down',
            name: 'delete'
        }
    }
];

//'../../classes/AccountHelper.getAccounts'
export default class AccountForm extends NavigationMixin(LightningElement) {
    @track isModalOpen;
    @track isModalDeleteOpen;
    @track isNewModalOpen;
    @track clickedAccount={
        Name: "",
        Phone: "",
        Email__c: "",
        BillingCity: "",
        BillingStreet: ""
    };
    
    closeModal(){
        this.isModalOpen = false;
        this.isModalDeleteOpen = false;
        this.isNewModalOpen = false;
    }
    @track acc={Id: "", Name: ""};
    columns = columns;

     // non-reactive variables
     @track refreshTable;

     // retrieving the data using wire service
     @wire(getAccounts, {})
     relations(result) {
         this.refreshTable = result;
         if (result.data) {
             this.acc = result.data;
             //this.emptyList = true;
         }
         refreshApex(this.refreshTable);
     }

    getSelectedName(event) {
        const row = event.detail.row;
        this.clickedAccount = row;
        if (event.detail.action.name == 'update'){
            this.isModalOpen = true;
        } else {
            //to do
            console.log('Delete button');
            this.isModalDeleteOpen = true;
        }
    }

    submitEdit(){
        updateAccount({ acc : this.clickedAccount})
        .then(result =>{
            console.log(result);
            refreshApex(this.refreshTable);
        })
        .catch(error => {
            console.error(error);
        });
        // this.clickedAccount = { ...this.clickedAccount, Name: event.target.value}
        // this.clickedAccount = { ...this.clickedAccount, Phone: event.target.value }
        // this.clickedAccount = { ...this.clickedAccount, Email__c: event.target.value }
        // this.clickedAccount = { ...this.clickedAccount, BillingStreet: event.target.value } 
        // this.clickedAccount = { ...this.clickedAccount, BillingCity: event.target.value } 
        this.isModalOpen = false;
    }

    submitDelete(){
        console.log('1234->' + this.clickedAccount.Id);
        deleteAccount({ acc : this.clickedAccount})
        .then(result =>{
            console.log(result);
            refreshApex(this.refreshTable);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: result == 'Successfully deleting' ? 'Success' : 'Error deleting record',
                    message: result == 'Successfully deleting' ? 'Record deleted' : result,
                    variant: result == 'Successfully deleting' ? 'success' : 'Error',
                    mode: 'pester'
                })
            );
        })
        .catch(error => {
            console.error(error);
        });
        // this.clickedAccount = { ...this.clickedAccount, Name: event.target.value}
        // this.clickedAccount = { ...this.clickedAccount, Phone: event.target.value }
        // this.clickedAccount = { ...this.clickedAccount, Email__c: event.target.value }
        // this.clickedAccount = { ...this.clickedAccount, BillingStreet: event.target.value } 
        // this.clickedAccount = { ...this.clickedAccount, BillingCity: event.target.value } 
        this.isModalDeleteOpen = false;
    }

    submitCreate(){
        const allValid = [...this.template.querySelectorAll('.addNew')]
            .reduce((validSoFar, inputCmp) => {
                        inputCmp.reportValidity();
                        return validSoFar && inputCmp.checkValidity();
            }, true);
        if (allValid) {
         insertAccount({ acc : this.clickedAccount})
         .then(result =>{
             console.log(result);
             refreshApex(this.refreshTable);
             this.dispatchEvent(
                 new ShowToastEvent({
                     title: result == 'Successfully adding' ? 'Success' : 'Error adding record',
                     message: result == 'Successfully adding' ? 'Record added' : result,
                     variant: result == 'Successfully adding' ? 'success' : 'Error',
                     mode: 'pester'
                 })
             );
         })
         .catch(error => {
             console.error(error);
         });
         
         this.isNewModalOpens = false;
        } else {
            console.log('Invalid Input');
        }
    }

    handleChange(event){
        console.log(event.target.value);

        var targetName = event.target.name;

        if(targetName == 'Name'){
            this.clickedAccount = { ...this.clickedAccount, Name: event.target.value}
        } else if(targetName == 'Phone'){
            this.clickedAccount = { ...this.clickedAccount, Phone: event.target.value }
        } else if(targetName == 'Email'){
            this.clickedAccount = { ...this.clickedAccount, Email__c: event.target.value }
        } else if(event.target.name == 'BillingStreet'){
            this.clickedAccount = { ...this.clickedAccount, BillingStreet: event.target.value } 
        } else if(event.target.name == 'BillingCity'){
            this.clickedAccount = { ...this.clickedAccount, BillingCity: event.target.value } 
        }
    }

    handleNew(){
        //this.clickedAccount = null;
        this.isNewModalOpen = true;
    }
}