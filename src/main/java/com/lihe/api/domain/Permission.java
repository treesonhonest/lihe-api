package com.lihe.api.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.lihe.api.domain.enumeration.PermissionType;

/**
 * A Permission.
 */
@Entity
@Table(name = "permission")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Permission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "url")
    private String url;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private PermissionType type;

    @OneToMany(mappedBy = "parent")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Permission> permissions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "permissions", allowSetters = true)
    private Permission parent;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Permission name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public Permission url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public PermissionType getType() {
        return type;
    }

    public Permission type(PermissionType type) {
        this.type = type;
        return this;
    }

    public void setType(PermissionType type) {
        this.type = type;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }

    public Permission permissions(Set<Permission> permissions) {
        this.permissions = permissions;
        return this;
    }

    public Permission addPermission(Permission permission) {
        this.permissions.add(permission);
        permission.setParent(this);
        return this;
    }

    public Permission removePermission(Permission permission) {
        this.permissions.remove(permission);
        permission.setParent(null);
        return this;
    }

    public void setPermissions(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    public Permission getParent() {
        return parent;
    }

    public Permission parent(Permission permission) {
        this.parent = permission;
        return this;
    }

    public void setParent(Permission permission) {
        this.parent = permission;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Permission)) {
            return false;
        }
        return id != null && id.equals(((Permission) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Permission{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", url='" + getUrl() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
