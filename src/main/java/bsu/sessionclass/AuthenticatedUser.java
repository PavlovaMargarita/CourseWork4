package bsu.sessionclass;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class AuthenticatedUser extends org.springframework.security.core.userdetails.User {

    private Long userId;

    public AuthenticatedUser(String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, Collection<? extends GrantedAuthority> authorities)
            throws IllegalArgumentException {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, true, authorities);
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
