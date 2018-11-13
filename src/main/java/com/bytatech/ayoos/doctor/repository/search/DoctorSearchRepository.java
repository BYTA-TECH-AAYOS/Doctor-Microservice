package com.bytatech.ayoos.doctor.repository.search;

import com.bytatech.ayoos.doctor.domain.Doctor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;

/**
 * Spring Data Elasticsearch repository for the Doctor entity.
 */
public interface DoctorSearchRepository extends ElasticsearchRepository<Doctor, Long> {
	Page<Doctor> findByLocationNear(Point point, Distance value, Pageable pageable);
	Page<Doctor> findByLocationWithin(Point point, Distance value, Pageable pageable);


}
