package com.michael.a2nguyenvanan18d04.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SystemAccountDTO {
    private Long accountId;
    private String accountName;
    private String accountEmail;
    private String accountPassword;
    private Boolean active;
    private Set<String> roles;
}
