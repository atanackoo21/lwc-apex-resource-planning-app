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
    @AuraEnabled(cacheable=false)
    public static String deleteAccount(Account acc) {
        try {
            Database.DeleteResult deletedAccount = Database.delete(acc, true);
        } catch(Exception e) {
            System.debug('Exception: ' + e);
            return e.getMessage();
        } 
        return 'Successfully deleting';
    }
    @AuraEnabled(cacheable=false)
    public static String insertAccount(Account acc) {
        try {
            insert acc;
        } catch(Exception e) {
            System.debug('Exception: ' + e);
            return e.getMessage();
        } 
        return 'Successfully adding';
    }
}
