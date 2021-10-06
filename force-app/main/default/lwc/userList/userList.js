import { LightningElement, wire, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getContacts from '@salesforce/apex/UserHelper.getContacts';

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
            label: 'Destructive',
            variant: 'destructive',
            class: 'scaled-down',
            name: 'delete'
        }
    }
];

export default class UserList extends LightningElement {
    data = [];
    @track contactRecord = {};
    @track isEditModalOpen;
    @track refreshTable;

    @track usrs={Id: "", Name: ""};
    columns = columns;
    @track refreshTable;


    @track clickedContact={
        Id:"",
        Name: "",
        Phone: "",
        Email: ""
    };

    // retrieving the data using wire service
    @wire(getContacts, {})
    relations(result) {
        this.refreshTable = result;
        if (result.data) {
            this.usrs = result.data;
            //this.emptyList = true;
        }
        refreshApex(this.refreshTable);
    };

    // handleFieldChange(e) {
    //     this.contactRecord[e.currentTarget.fieldName] = e.target.value;
    // }

    getSelectedName(event) {
        console.log('here');
        const row = event.detail.row;
        this.clickedContact = row;
        if (event.detail.action.name == 'update'){
            this.openEditModal();
        } else {
            console.log('Delete button');
            this.isModalDeleteOpen = true;
        }
    }

    handleSuccess(event) {
        this.closeModal();
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: event.detail.apiName + ' updated.',
                variant: 'success',
            }),
        );
    }
    openEditModal(){
        this.isEditModalOpen = true;
    }
    closeModal(){
        this.isEditModalOpen = false;
    }
}