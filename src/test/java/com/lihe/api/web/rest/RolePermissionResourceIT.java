package com.lihe.api.web.rest;

import com.lihe.api.LiheApiApp;
import com.lihe.api.domain.RolePermission;
import com.lihe.api.repository.RolePermissionRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RolePermissionResource} REST controller.
 */
@SpringBootTest(classes = LiheApiApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RolePermissionResourceIT {

    private static final Long DEFAULT_ROLE_ID = 1L;
    private static final Long UPDATED_ROLE_ID = 2L;

    private static final Long DEFAULT_PERMISSION_ID = 1L;
    private static final Long UPDATED_PERMISSION_ID = 2L;

    @Autowired
    private RolePermissionRepository rolePermissionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRolePermissionMockMvc;

    private RolePermission rolePermission;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RolePermission createEntity(EntityManager em) {
        RolePermission rolePermission = new RolePermission()
            .roleId(DEFAULT_ROLE_ID)
            .permissionId(DEFAULT_PERMISSION_ID);
        return rolePermission;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RolePermission createUpdatedEntity(EntityManager em) {
        RolePermission rolePermission = new RolePermission()
            .roleId(UPDATED_ROLE_ID)
            .permissionId(UPDATED_PERMISSION_ID);
        return rolePermission;
    }

    @BeforeEach
    public void initTest() {
        rolePermission = createEntity(em);
    }

    @Test
    @Transactional
    public void createRolePermission() throws Exception {
        int databaseSizeBeforeCreate = rolePermissionRepository.findAll().size();
        // Create the RolePermission
        restRolePermissionMockMvc.perform(post("/api/role-permissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rolePermission)))
            .andExpect(status().isCreated());

        // Validate the RolePermission in the database
        List<RolePermission> rolePermissionList = rolePermissionRepository.findAll();
        assertThat(rolePermissionList).hasSize(databaseSizeBeforeCreate + 1);
        RolePermission testRolePermission = rolePermissionList.get(rolePermissionList.size() - 1);
        assertThat(testRolePermission.getRoleId()).isEqualTo(DEFAULT_ROLE_ID);
        assertThat(testRolePermission.getPermissionId()).isEqualTo(DEFAULT_PERMISSION_ID);
    }

    @Test
    @Transactional
    public void createRolePermissionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rolePermissionRepository.findAll().size();

        // Create the RolePermission with an existing ID
        rolePermission.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRolePermissionMockMvc.perform(post("/api/role-permissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rolePermission)))
            .andExpect(status().isBadRequest());

        // Validate the RolePermission in the database
        List<RolePermission> rolePermissionList = rolePermissionRepository.findAll();
        assertThat(rolePermissionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRolePermissions() throws Exception {
        // Initialize the database
        rolePermissionRepository.saveAndFlush(rolePermission);

        // Get all the rolePermissionList
        restRolePermissionMockMvc.perform(get("/api/role-permissions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rolePermission.getId().intValue())))
            .andExpect(jsonPath("$.[*].roleId").value(hasItem(DEFAULT_ROLE_ID.intValue())))
            .andExpect(jsonPath("$.[*].permissionId").value(hasItem(DEFAULT_PERMISSION_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getRolePermission() throws Exception {
        // Initialize the database
        rolePermissionRepository.saveAndFlush(rolePermission);

        // Get the rolePermission
        restRolePermissionMockMvc.perform(get("/api/role-permissions/{id}", rolePermission.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(rolePermission.getId().intValue()))
            .andExpect(jsonPath("$.roleId").value(DEFAULT_ROLE_ID.intValue()))
            .andExpect(jsonPath("$.permissionId").value(DEFAULT_PERMISSION_ID.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingRolePermission() throws Exception {
        // Get the rolePermission
        restRolePermissionMockMvc.perform(get("/api/role-permissions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRolePermission() throws Exception {
        // Initialize the database
        rolePermissionRepository.saveAndFlush(rolePermission);

        int databaseSizeBeforeUpdate = rolePermissionRepository.findAll().size();

        // Update the rolePermission
        RolePermission updatedRolePermission = rolePermissionRepository.findById(rolePermission.getId()).get();
        // Disconnect from session so that the updates on updatedRolePermission are not directly saved in db
        em.detach(updatedRolePermission);
        updatedRolePermission
            .roleId(UPDATED_ROLE_ID)
            .permissionId(UPDATED_PERMISSION_ID);

        restRolePermissionMockMvc.perform(put("/api/role-permissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRolePermission)))
            .andExpect(status().isOk());

        // Validate the RolePermission in the database
        List<RolePermission> rolePermissionList = rolePermissionRepository.findAll();
        assertThat(rolePermissionList).hasSize(databaseSizeBeforeUpdate);
        RolePermission testRolePermission = rolePermissionList.get(rolePermissionList.size() - 1);
        assertThat(testRolePermission.getRoleId()).isEqualTo(UPDATED_ROLE_ID);
        assertThat(testRolePermission.getPermissionId()).isEqualTo(UPDATED_PERMISSION_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingRolePermission() throws Exception {
        int databaseSizeBeforeUpdate = rolePermissionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRolePermissionMockMvc.perform(put("/api/role-permissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rolePermission)))
            .andExpect(status().isBadRequest());

        // Validate the RolePermission in the database
        List<RolePermission> rolePermissionList = rolePermissionRepository.findAll();
        assertThat(rolePermissionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRolePermission() throws Exception {
        // Initialize the database
        rolePermissionRepository.saveAndFlush(rolePermission);

        int databaseSizeBeforeDelete = rolePermissionRepository.findAll().size();

        // Delete the rolePermission
        restRolePermissionMockMvc.perform(delete("/api/role-permissions/{id}", rolePermission.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RolePermission> rolePermissionList = rolePermissionRepository.findAll();
        assertThat(rolePermissionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
