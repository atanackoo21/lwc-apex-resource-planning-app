import { LightningElement , track} from 'lwc';
import getAccounts from '@salesforce/apex/AccountHelper.getAccounts';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    { label: 'Id', fieldName: 'Id', type: 'text' },
    { label: 'Name', fieldName: 'Name',  type: 'text'},
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
export default class AccountForm extends LightningElement {
    @track acc={Id: "4", Name: "h"};
    columns = columns;
    
    connectedCallback(){
        //getAccounts();
        getAccounts()
        .then(result =>{
            this.acc=result;
            console.log(this.acc[0].Id + " " + this.acc[0].Name);
        })
        .catch(error => {
            console.log('Eror');
        });
    }

    getSelectedName(event) {
        const row = event.detail.row;
        console.log(' action --->' + event.detail.action.name);
        console.log((row.Id));

        if (event.detail.action.name == 'update'){
            this.navigateToCustomRecordPage(row.Id);
        } else {
            //to do
            console.log('Delete button');
        }
    }

    navigateToCustomRecordPage(id){
        console.log('hhh');
        this[NavigationMixin.Navigate]({
            type: 'standard_recordPage',
            attributes: {
                recordId: id,
                objectApiName: 'Account',
                actionName: 'edit'
            }
        })
    }

    handleSelect(){
        alert('Button clicked');
    }
}