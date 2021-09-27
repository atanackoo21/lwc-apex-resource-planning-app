import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavbarItems extends LightningElement {
    @track accountForm = false;

    navigateToAccountForm(){
        this.accountForm = true;
    }
}