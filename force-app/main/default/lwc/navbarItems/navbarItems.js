import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavbarItems extends LightningElement {
    @track navbarClasses = 'slds-context-bar__item';
    @track accountForm = false;
    @track userList = false;

    navigateToAccountForm(){
        this.disablePages();
        this.accountForm = true;
        //this.activeClass();
    }

    navigateToUserList(){
        this.disablePages();
        this.userList = true;
        //this.activeClass();
    }

    disablePages(){
        this.accountForm = false;
        this.userList = false;
    }

    // get homeClass(){
    //     return this.navbarClasses = 'slds-context-bar__item slds-is-active';
    // }
    // get distributersClass(){
    //     return this.navbarClasses = 'slds-context-bar__item slds-is-active';
    // }
    // get usersClass(){
    //     return this.navbarClasses = 'slds-context-bar__item slds-is-active';
    // }
}