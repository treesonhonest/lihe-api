package com.lihe.api.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lihe.api.web.rest.TestUtil;

public class UserRoleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserRole.class);
        UserRole userRole1 = new UserRole();
        userRole1.setId(1L);
        UserRole userRole2 = new UserRole();
        userRole2.setId(userRole1.getId());
        assertThat(userRole1).isEqualTo(userRole2);
        userRole2.setId(2L);
        assertThat(userRole1).isNotEqualTo(userRole2);
        userRole1.setId(null);
        assertThat(userRole1).isNotEqualTo(userRole2);
    }
}
