package bsu.model.dto;

import bsu.enumProperty.RoleEnum;

public class LoginDto {

    private String login;
    private RoleEnum role;
    private Long userId;

    public LoginDto(RoleEnum role, String login,Long userId ) {
        this.role = role;
        this.login = login;
        this.userId = userId;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public RoleEnum getRole() {
        return role;
    }

    public void setRole(RoleEnum role) {
        this.role = role;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
