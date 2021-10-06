public with sharing class UserHelper {
    public UserHelper() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [Select Name, Phone, Email from Contact];
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
