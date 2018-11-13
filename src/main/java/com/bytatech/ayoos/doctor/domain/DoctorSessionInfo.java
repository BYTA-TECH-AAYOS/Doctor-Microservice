/*package com.bytatech.ayoos.doctor.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Objects;


*//**
 * A DoctorSessionInfo.
 *//*
@Entity
@Table(name = "doctor_session_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "doctorsessioninfov11")
public class DoctorSessionInfo implements Serializable,Comparable<DoctorSessionInfo>  {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "start_time")
    private ZonedDateTime startTime;

    @Column(name = "end_time")
    private ZonedDateTime endTime;

    @Column(name = "jhi_interval")
    private ZonedDateTime interval;

    @ManyToOne
    @JsonIgnoreProperties("doctorSessionInfos")
    private Doctor doctor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public DoctorSessionInfo date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public ZonedDateTime getStartTime() {
        return startTime;
    }

    public DoctorSessionInfo startTime(ZonedDateTime startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
    }

    public ZonedDateTime getEndTime() {
        return endTime;
    }

    public DoctorSessionInfo endTime(ZonedDateTime endTime) {
        this.endTime = endTime;
        return this;
    }

    public void setEndTime(ZonedDateTime endTime) {
        this.endTime = endTime;
    }

    public ZonedDateTime getInterval() {
        return interval;
    }

    public DoctorSessionInfo interval(ZonedDateTime interval) {
        this.interval = interval;
        return this;
    }

    public void setInterval(ZonedDateTime interval) {
        this.interval = interval;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public DoctorSessionInfo doctor(Doctor doctor) {
        this.doctor = doctor;
        return this;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
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
        DoctorSessionInfo doctorSessionInfo = (DoctorSessionInfo) o;
        if (doctorSessionInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), doctorSessionInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DoctorSessionInfo{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", interval='" + getInterval() + "'" +
            "}";
    }
    @Override
	public int compareTo(DoctorSessionInfo sessionInfo) {

		Double d1 = 00.00;

		Double d2 = 00.00;
		String s1 = "" + this.getStartTime().getHour() + "." + this.getStartTime().getMinute();

		String s2 = "" + sessionInfo.getStartTime().getHour() + "." + sessionInfo.getStartTime().getMinute();

		d1 = d1.parseDouble(s1);
		d2 = d2.parseDouble(s2);

		return d1.compareTo(d2);
	}
}
*/
package com.bytatech.ayoos.doctor.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DoctorSessionInfo.
 */
@Entity
@Table(name = "doctor_session_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "doctorsessioninfov2")
public class DoctorSessionInfo implements Serializable,Comparable<DoctorSessionInfo> {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	

	@Column(name = "jhi_date")
	
	private LocalDate date;

	@Column(name = "start_time")
	private ZonedDateTime startTime;

	@Column(name = "end_time")
	private ZonedDateTime endTime;

	@Column(name = "jhi_interval")
	private ZonedDateTime interval;

	@ManyToOne
	@JsonIgnoreProperties("doctorSessionInfos")
	private Doctor doctor;

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not
	// remove
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	

	public LocalDate getDate() {
		return date;
	}

	public DoctorSessionInfo date(LocalDate date) {
		this.date = date;
		return this;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public ZonedDateTime getStartTime() {
		return startTime;
	}

	public DoctorSessionInfo startTime(ZonedDateTime startTime) {
		this.startTime = startTime;
		return this;
	}

	public void setStartTime(ZonedDateTime startTime) {
		this.startTime = startTime;
	}

	public ZonedDateTime getEndTime() {
		return endTime;
	}

	public DoctorSessionInfo endTime(ZonedDateTime endTime) {
		this.endTime = endTime;
		return this;
	}

	public void setEndTime(ZonedDateTime endTime) {
		this.endTime = endTime;
	}

	public ZonedDateTime getInterval() {
		return interval;
	}

	public DoctorSessionInfo interval(ZonedDateTime interval) {
		this.interval = interval;
		return this;
	}

	public void setInterval(ZonedDateTime interval) {
		this.interval = interval;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public DoctorSessionInfo doctor(Doctor doctor) {
		this.doctor = doctor;
		return this;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}
	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here, do not remove

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		DoctorSessionInfo doctorSessionInfo = (DoctorSessionInfo) o;
		if (doctorSessionInfo.getId() == null || getId() == null) {
			return false;
		}
		return Objects.equals(getId(), doctorSessionInfo.getId());
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(getId());
	}

	@Override
	public String toString() {
		return "DoctorSessionInfo{" + "id=" + getId() + ",  date='"
				+ getDate() + "'" + ", startTime='" + getStartTime() + "'" + ", endTime='" + getEndTime() + "'"
				+ ", interval='" + getInterval() + "'" + "}";
	}

	@Override
	public int compareTo(DoctorSessionInfo sessionInfo) {

		Double d1 = 00.00;

		Double d2 = 00.00;
		String s1 = "" + this.getStartTime().getHour() + "." + this.getStartTime().getMinute();

		String s2 = "" + sessionInfo.getStartTime().getHour() + "." + sessionInfo.getStartTime().getMinute();

		d1 = d1.parseDouble(s1);
		d2 = d2.parseDouble(s2);

		return d1.compareTo(d2);
	}

}