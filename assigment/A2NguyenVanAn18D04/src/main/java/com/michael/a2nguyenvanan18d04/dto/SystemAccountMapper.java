package com.michael.a2nguyenvanan18d04.dto;

import com.michael.a2nguyenvanan18d04.models.Role;
import com.michael.a2nguyenvanan18d04.models.SystemAccount;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class SystemAccountMapper {

    public SystemAccountDTO toDTO(SystemAccount account) {
        if (account == null) {
            return null;
        }
        
        SystemAccountDTO dto = new SystemAccountDTO();
        dto.setAccountId(account.getAccountId());
        dto.setAccountName(account.getAccountName());
        dto.setAccountEmail(account.getAccountEmail());
        dto.setActive(account.isActive());
        
        // Convert roles to String set
        if (account.getRoles() != null) {
            Set<String> roleNames = account.getRoles().stream()
                    .map(Enum::toString)
                    .collect(Collectors.toSet());
            dto.setRoles(roleNames);
        }
        
        // Don't include password in DTO for security
        
        return dto;
    }

    public SystemAccount toEntity(SystemAccountDTO dto) {
        if (dto == null) {
            return null;
        }
        
        SystemAccount account = new SystemAccount();
        account.setAccountId(dto.getAccountId());
        account.setAccountName(dto.getAccountName());
        account.setAccountEmail(dto.getAccountEmail());
        account.setAccountPassword(dto.getAccountPassword());
        account.setActive(dto.getActive() != null ? dto.getActive() : false);
        
        // Convert String roles back to Role enum
        if (dto.getRoles() != null) {
            Set<Role> roles = dto.getRoles().stream()
                    .map(Role::valueOf)
                    .collect(Collectors.toSet());
            account.setRoles(roles);
        }
        
        return account;
    }
}
