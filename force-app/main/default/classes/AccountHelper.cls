public with sharing class AccountHelper {
    public AccountHelper() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [Select Id, Name from Account];
    }
}
