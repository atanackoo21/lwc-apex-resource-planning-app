import { LightningElement , track} from 'lwc';
import getAccounts from '@salesforce/apex/AccountHelper.getAccounts';

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
            name: 'update_button'
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
            name: 'delete_button'
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
        console.log(' action --->' + event.detail.action.name);
        // switch (action.name) {
        //     case 'show_details':
        //         alert('Showing Details: ' + JSON.stringify(row));
        //         break;
        // }
    }

    handleSelect(){
        alert('Button clicked');
    }
}