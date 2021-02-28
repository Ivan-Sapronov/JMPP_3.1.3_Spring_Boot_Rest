package ru.sapronov.spring.boot.services;

import ru.sapronov.spring.boot.models.Role;

/**
 * @author Ivan Sapronov on 27.02.2021
 * @project spring-boot-rest
 */
public interface RoleService {

    void deleteRole(long id);

    Role getRoleByName(String role);
}
