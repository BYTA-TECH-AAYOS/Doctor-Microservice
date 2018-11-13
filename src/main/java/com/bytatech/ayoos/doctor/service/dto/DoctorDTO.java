package com.bytatech.ayoos.doctor.service.dto;

import java.io.Serializable;
import java.util.Objects;

import org.springframework.data.elasticsearch.annotations.GeoPointField;

/**
 * A DTO for the Doctor entity.
 */
public class DoctorDTO implements Serializable {

	private Long id;

	private String specialisation;
	@GeoPointField
	private String location;

	private Long profileInfoId;

	private Long contactInfoId;

	private Long doctorSettingsId;

	private Long workspaceId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSpecialisation() {
		return specialisation;
	}

	public void setSpecialisation(String specialisation) {
		this.specialisation = specialisation;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Long getProfileInfoId() {
		return profileInfoId;
	}

	public void setProfileInfoId(Long profileInfoId) {
		this.profileInfoId = profileInfoId;
	}

	public Long getContactInfoId() {
		return contactInfoId;
	}

	public void setContactInfoId(Long contactInfoId) {
		this.contactInfoId = contactInfoId;
	}

	public Long getDoctorSettingsId() {
		return doctorSettingsId;
	}

	public void setDoctorSettingsId(Long doctorSettingsId) {
		this.doctorSettingsId = doctorSettingsId;
	}

	public Long getWorkspaceId() {
		return workspaceId;
	}

	public void setWorkspaceId(Long workspaceId) {
		this.workspaceId = workspaceId;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}

		DoctorDTO doctorDTO = (DoctorDTO) o;
		if (doctorDTO.getId() == null || getId() == null) {
			return false;
		}
		return Objects.equals(getId(), doctorDTO.getId());
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(getId());
	}

	@Override
	public String toString() {
		return "DoctorDTO{" + "id=" + getId() + ", specialisation='" + getSpecialisation() + "'" + ", location='"
				+ getLocation() + "'" + ", profileInfo=" + getProfileInfoId() + ", contactInfo=" + getContactInfoId()
				+ ", doctorSettings=" + getDoctorSettingsId() + ", workspace=" + getWorkspaceId() + "}";
	}
}
