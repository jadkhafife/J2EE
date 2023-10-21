package org.sid.bankaccountservice.mappers;

import org.sid.bankaccountservice.dto.BankAccountResponseDTO;
import org.sid.bankaccountservice.entities.BankAccount;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class AccountMapper {
    public BankAccountResponseDTO fromBankAccountToBankAccountResponseDTO(BankAccount bankAccount) {
        BankAccountResponseDTO bankAccountResponseDTO = new BankAccountResponseDTO();
        BeanUtils.copyProperties(bankAccount, bankAccountResponseDTO);
        return bankAccountResponseDTO;
    }

//    public BankAccount fromBankAccountResponseDTOToBankAccount(BankAccountResponseDTO bankAccountResponseDTO) {
//        BankAccount bankAccount = new BankAccount();
//        BeanUtils.copyProperties(bankAccountResponseDTO, bankAccount);
//        return bankAccount;
//    }
}
