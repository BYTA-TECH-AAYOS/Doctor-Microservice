package com.bytatech.ayoos.doctor.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

/**
 * A ContactInfo.
 */
@Entity
@Table(name = "contact_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "contactinfov11")
public class ContactInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "website_url")
    private String websiteURL;

    @Column(name = "facebook_url")
    private String facebookURL;

    @Column(name = "twitter_url")
    private String twitterURL;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWebsiteURL() {
        return websiteURL;
    }

    public ContactInfo websiteURL(String websiteURL) {
        this.websiteURL = websiteURL;
        return this;
    }

    public void setWebsiteURL(String websiteURL) {
        this.websiteURL = websiteURL;
    }

    public String getFacebookURL() {
        return facebookURL;
    }

    public ContactInfo facebookURL(String facebookURL) {
        this.facebookURL = facebookURL;
        return this;
    }

    public void setFacebookURL(String facebookURL) {
        this.facebookURL = facebookURL;
    }

    public String getTwitterURL() {
        return twitterURL;
    }

    public ContactInfo twitterURL(String twitterURL) {
        this.twitterURL = twitterURL;
        return this;
    }

    public void setTwitterURL(String twitterURL) {
        this.twitterURL = twitterURL;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ContactInfo contactInfo = (ContactInfo) o;
        if (contactInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contactInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContactInfo{" +
            "id=" + getId() +
            ", websiteURL='" + getWebsiteURL() + "'" +
            ", facebookURL='" + getFacebookURL() + "'" +
            ", twitterURL='" + getTwitterURL() + "'" +
            "}";
    }
}
