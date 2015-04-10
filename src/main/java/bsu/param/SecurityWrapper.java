package bsu.param;

import bsu.sessionclass.AuthenticatedUser;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityWrapper {
    public static Long getCurrentUserId() {
        return getAuthenticatedEmployee().getUserId();
    }

    private static AuthenticatedUser getAuthenticatedEmployee() {
        return (AuthenticatedUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
