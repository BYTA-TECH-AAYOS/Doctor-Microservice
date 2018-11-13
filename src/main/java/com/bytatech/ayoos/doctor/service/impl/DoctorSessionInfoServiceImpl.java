package com.bytatech.ayoos.doctor.service.impl;

import com.bytatech.ayoos.doctor.service.DoctorSessionInfoService;
import com.bytatech.ayoos.doctor.domain.DoctorSessionInfo;
import com.bytatech.ayoos.doctor.repository.DoctorSessionInfoRepository;
import com.bytatech.ayoos.doctor.repository.search.DoctorSessionInfoSearchRepository;
import com.bytatech.ayoos.doctor.service.dto.DoctorSessionInfoDTO;
import com.bytatech.ayoos.doctor.service.mapper.DoctorSessionInfoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing DoctorSessionInfo.
 */
@Service
@Transactional
public class DoctorSessionInfoServiceImpl implements DoctorSessionInfoService {

    private final Logger log = LoggerFactory.getLogger(DoctorSessionInfoServiceImpl.class);

    private final DoctorSessionInfoRepository doctorSessionInfoRepository;

    private final DoctorSessionInfoMapper doctorSessionInfoMapper;

    private final DoctorSessionInfoSearchRepository doctorSessionInfoSearchRepository;

    public DoctorSessionInfoServiceImpl(DoctorSessionInfoRepository doctorSessionInfoRepository, DoctorSessionInfoMapper doctorSessionInfoMapper, DoctorSessionInfoSearchRepository doctorSessionInfoSearchRepository) {
        this.doctorSessionInfoRepository = doctorSessionInfoRepository;
        this.doctorSessionInfoMapper = doctorSessionInfoMapper;
        this.doctorSessionInfoSearchRepository = doctorSessionInfoSearchRepository;
    }

    /**
     * Save a doctorSessionInfo.
     *
     * @param doctorSessionInfoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DoctorSessionInfoDTO save(DoctorSessionInfoDTO doctorSessionInfoDTO) {
        log.debug("Request to save DoctorSessionInfo : {}", doctorSessionInfoDTO);

        DoctorSessionInfo doctorSessionInfo = doctorSessionInfoMapper.toEntity(doctorSessionInfoDTO);
        doctorSessionInfo = doctorSessionInfoRepository.save(doctorSessionInfo);
        DoctorSessionInfoDTO result = doctorSessionInfoMapper.toDto(doctorSessionInfo);
        doctorSessionInfoSearchRepository.save(doctorSessionInfo);
        return result;
    }

    /**
     * Get all the doctorSessionInfos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DoctorSessionInfoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all DoctorSessionInfos");
        return doctorSessionInfoRepository.findAll(pageable)
            .map(doctorSessionInfoMapper::toDto);
    }


    /**
     * Get one doctorSessionInfo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DoctorSessionInfoDTO> findOne(Long id) {
        log.debug("Request to get DoctorSessionInfo : {}", id);
        return doctorSessionInfoRepository.findById(id)
            .map(doctorSessionInfoMapper::toDto);
    }

    /**
     * Delete the doctorSessionInfo by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DoctorSessionInfo : {}", id);
        doctorSessionInfoRepository.deleteById(id);
        doctorSessionInfoSearchRepository.deleteById(id);
    }

    /**
     * Search for the doctorSessionInfo corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DoctorSessionInfoDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of DoctorSessionInfos for query {}", query);
        return doctorSessionInfoSearchRepository.search(queryStringQuery(query), pageable)
            .map(doctorSessionInfoMapper::toDto);
    }
}
