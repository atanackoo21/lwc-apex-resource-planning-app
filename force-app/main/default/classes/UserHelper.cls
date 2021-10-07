public with sharing class UserHelper {
    public UserHelper() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [Select Name, Phone, Email from Contact];
    }

    @AuraEnabled(cacheable=false)
    public static String deleteContact(Contact contact) {
        try {
            Database.DeleteResult deletedContact = Database.delete(contact, true);
        } catch(Exception e) {
            System.debug('Exception: ' + e);
            return e.getMessage();
        } 
        return 'Successful delete';
    }
}
