package com.lihe.api.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lihe.api.web.rest.TestUtil;

public class RolePermissionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RolePermission.class);
        RolePermission rolePermission1 = new RolePermission();
        rolePermission1.setId(1L);
        RolePermission rolePermission2 = new RolePermission();
        rolePermission2.setId(rolePermission1.getId());
        assertThat(rolePermission1).isEqualTo(rolePermission2);
        rolePermission2.setId(2L);
        assertThat(rolePermission1).isNotEqualTo(rolePermission2);
        rolePermission1.setId(null);
        assertThat(rolePermission1).isNotEqualTo(rolePermission2);
    }
}
