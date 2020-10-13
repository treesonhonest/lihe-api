package com.lihe.api.web.rest;

import com.lihe.api.domain.RolePermission;
import com.lihe.api.repository.RolePermissionRepository;
import com.lihe.api.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.lihe.api.domain.RolePermission}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RolePermissionResource {

    private final Logger log = LoggerFactory.getLogger(RolePermissionResource.class);

    private static final String ENTITY_NAME = "rolePermission";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RolePermissionRepository rolePermissionRepository;

    public RolePermissionResource(RolePermissionRepository rolePermissionRepository) {
        this.rolePermissionRepository = rolePermissionRepository;
    }

    /**
     * {@code POST  /role-permissions} : Create a new rolePermission.
     *
     * @param rolePermission the rolePermission to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rolePermission, or with status {@code 400 (Bad Request)} if the rolePermission has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/role-permissions")
    public ResponseEntity<RolePermission> createRolePermission(@RequestBody RolePermission rolePermission) throws URISyntaxException {
        log.debug("REST request to save RolePermission : {}", rolePermission);
        if (rolePermission.getId() != null) {
            throw new BadRequestAlertException("A new rolePermission cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RolePermission result = rolePermissionRepository.save(rolePermission);
        return ResponseEntity.created(new URI("/api/role-permissions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /role-permissions} : Updates an existing rolePermission.
     *
     * @param rolePermission the rolePermission to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rolePermission,
     * or with status {@code 400 (Bad Request)} if the rolePermission is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rolePermission couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/role-permissions")
    public ResponseEntity<RolePermission> updateRolePermission(@RequestBody RolePermission rolePermission) throws URISyntaxException {
        log.debug("REST request to update RolePermission : {}", rolePermission);
        if (rolePermission.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RolePermission result = rolePermissionRepository.save(rolePermission);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, rolePermission.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /role-permissions} : get all the rolePermissions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rolePermissions in body.
     */
    @GetMapping("/role-permissions")
    public List<RolePermission> getAllRolePermissions() {
        log.debug("REST request to get all RolePermissions");
        return rolePermissionRepository.findAll();
    }

    /**
     * {@code GET  /role-permissions/:id} : get the "id" rolePermission.
     *
     * @param id the id of the rolePermission to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rolePermission, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/role-permissions/{id}")
    public ResponseEntity<RolePermission> getRolePermission(@PathVariable Long id) {
        log.debug("REST request to get RolePermission : {}", id);
        Optional<RolePermission> rolePermission = rolePermissionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rolePermission);
    }

    /**
     * {@code DELETE  /role-permissions/:id} : delete the "id" rolePermission.
     *
     * @param id the id of the rolePermission to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/role-permissions/{id}")
    public ResponseEntity<Void> deleteRolePermission(@PathVariable Long id) {
        log.debug("REST request to delete RolePermission : {}", id);
        rolePermissionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
