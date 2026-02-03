package com.michael.a2nguyenvanan18d04.controller;


import com.michael.a2nguyenvanan18d04.repositories.SystemAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {



    @Autowired
    private SystemAccountRepository systemAccountRepository;
	

}

