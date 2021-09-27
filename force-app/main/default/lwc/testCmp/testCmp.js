import { LightningElement } from 'lwc';

export default class TestCmp extends LightningElement {
    connectedCallback(){
        console.log('Hello load.');
    }
}