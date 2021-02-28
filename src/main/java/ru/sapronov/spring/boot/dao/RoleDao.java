package ru.sapronov.spring.boot.dao;

import ru.sapronov.spring.boot.models.Role;

/**
 * @author Ivan Sapronov on 27.02.2021
 * @project spring-boot-rest
 */
public interface RoleDao {
    Role getRoleById(long id);

    Role getRoleByName(String role);

    void deleteRole(long id);
}
