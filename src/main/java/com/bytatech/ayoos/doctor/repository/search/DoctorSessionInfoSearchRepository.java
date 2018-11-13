package com.bytatech.ayoos.doctor.repository.search;

import com.bytatech.ayoos.doctor.domain.DoctorSessionInfo;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DoctorSessionInfo entity.
 */
public interface DoctorSessionInfoSearchRepository extends ElasticsearchRepository<DoctorSessionInfo, Long> {
}
