public without sharing class AccountHelper {
    public AccountHelper() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [Select Name, Phone, BillingStreet, BillingCity, Email__c from Account];
    }
    @AuraEnabled(cacheable=false)
    public static Boolean updateAccount(Account acc) {
        update acc;
        return true;
    }
    
}
