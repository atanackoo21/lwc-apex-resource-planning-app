import { LightningElement, wire, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getContacts from '@salesforce/apex/UserHelper.getContacts';
import deleteContact from '@salesforce/apex/UserHelper.deleteContact';

const columns = [
    { label: 'Name', fieldName: 'Name',  type: 'text'},
    { label: 'Phone', fieldName: 'Phone', type: 'text' },
    { label: 'Email', fieldName: 'Email', type: 'text' },
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
            label: 'Delete',
            variant: 'destructive',
            class: 'scaled-down',
            name: 'delete'
        }
    }
];

export default class UserList extends LightningElement {
    data = [];
    @track isLoad=false;
    @track contactRecord = {};
    @track isEditModalOpen;
    @track isDeleteModalOpen;
    @track isCreateModalOpen;
    @track refreshTable;

    @track usrs={Id: "", Name: ""};
    columns = columns;
    @track refreshTable;


    @track clickedContact={
        Id:"",
        Name: "",
        Phone: "",
        Email: ""
    }

    // retrieving the data using wire service
    @wire(getContacts, {})
    relations(result) {
        this.refreshTable = result;
        if (result.data) {
            this.usrs = result.data;
            //this.emptyList = true;
        }
        refreshApex(this.refreshTable);
        this.isLoad = true;
    };

    handleFieldChange(e) {
        this.contactRecord[e.currentTarget.fieldName] = e.target.value;
    }

    getSelectedName(event) {
        console.log('here');
        const row = event.detail.row;
        this.clickedContact = row;
        if (event.detail.action.name == 'update'){
            this.openEditModal();
        } else {
            console.log('Delete button');
            this.openDeleteModal();
        }
    }
    submitDelete(event){
        //console.log('1234->' + this.clickedContact.Id);
        deleteContact({ contact : this.clickedContact})
        .then(result =>{
            console.log(result);
            refreshApex(this.refreshTable);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: result == 'Successful delete' ? 'Success' : 'Error deleting record',
                    message: result == 'Successful delete' ? 'Record deleted' : result,
                    variant: result == 'Successful delete' ? 'success' : 'Error',
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
        this.closeModal();
    }
    handleSuccess(event) {
        this.closeModal();
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: event.detail.apiName,
                variant: 'success',
            }),
        );
        refreshApex(this.refreshTable);
    }
    openEditModal(){
        this.isEditModalOpen = true;
    }
    openDeleteModal(){
        this.isDeleteModalOpen = true;
    }
    openCreateModal(){
        this.isCreateModalOpen = true;
    }
    closeModal(){
        this.isEditModalOpen = false;
        this.isDeleteModalOpen = false;
        this.isCreateModalOpen = false;
    }
}