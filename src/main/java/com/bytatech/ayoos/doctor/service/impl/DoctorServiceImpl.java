package com.bytatech.ayoos.doctor.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bytatech.ayoos.doctor.domain.Doctor;
import com.bytatech.ayoos.doctor.domain.DoctorSessionInfo;
import com.bytatech.ayoos.doctor.domain.ProfileInfo;
import com.bytatech.ayoos.doctor.domain.ReservedSlot;
import com.bytatech.ayoos.doctor.domain.SlotStatus;
import com.bytatech.ayoos.doctor.repository.DoctorRepository;
import com.bytatech.ayoos.doctor.repository.ProfileInfoRepository;
import com.bytatech.ayoos.doctor.repository.ReservedSlotRepository;
import com.bytatech.ayoos.doctor.repository.SlotStatusRepository;
import com.bytatech.ayoos.doctor.repository.search.DoctorSearchRepository;
import com.bytatech.ayoos.doctor.repository.search.ProfileInfoSearchRepository;
import com.bytatech.ayoos.doctor.repository.search.ReservedSlotSearchRepository;
import com.bytatech.ayoos.doctor.service.DoctorService;
import com.bytatech.ayoos.doctor.service.ReservedSlotService;
import com.bytatech.ayoos.doctor.service.UserService;
import com.bytatech.ayoos.doctor.service.dto.DoctorDTO;
import com.bytatech.ayoos.doctor.service.mapper.DoctorMapper;

/**
 * Service Implementation for managing Doctor.
 */
@Service
@Transactional
public class DoctorServiceImpl implements DoctorService {

	private final Logger log = LoggerFactory.getLogger(DoctorServiceImpl.class);

	private final DoctorRepository doctorRepository;

	private final DoctorMapper doctorMapper;
	@Autowired
	ReservedSlotService reservedSlotService;

	@Autowired
	ReservedSlotRepository reservedSlotRepository;

	@Autowired
	ReservedSlotSearchRepository reservedSlotSearchRepository;

	@Autowired
	UserService userService;

	@Autowired
	ProfileInfoRepository profileInfoRepository;
	
	@Autowired
	SlotStatusRepository slotStatusRepository;
	
	@Autowired
	ProfileInfoSearchRepository profileInfoSearchRepository;

	private final DoctorSearchRepository doctorSearchRepository;

	public DoctorServiceImpl(DoctorRepository doctorRepository, DoctorMapper doctorMapper,
			DoctorSearchRepository doctorSearchRepository) {
		this.doctorRepository = doctorRepository;
		this.doctorMapper = doctorMapper;
		this.doctorSearchRepository = doctorSearchRepository;
	}

	/**
	 * Save a doctor.
	 *
	 * @param doctorDTO
	 *            the entity to save
	 * @return the persisted entity
	 */
	@Override
	public DoctorDTO save(DoctorDTO doctorDTO) {

		boolean newDoctor = true;
		ProfileInfo doctorProfileInfo;
		Doctor doctor;
		DoctorDTO result=null;
		
		
		List<ProfileInfo> profileInfos = profileInfoRepository.findAll();
		
		for (ProfileInfo profileInfo : profileInfos) {
			
			if(profileInfo.getProfileName()!=null){
			
				
				if (profileInfo.getProfileName().equals(userService.getCurrentUserLogin())) {
					
					newDoctor = false;
				}
			}
		}

		if (newDoctor) { 

			ProfileInfo profile = new ProfileInfo();
			profile.setProfileName(userService.getCurrentUserLogin());
			doctorProfileInfo = profileInfoRepository.save(profile);
			profileInfoSearchRepository.save(profile);

			doctor = doctorMapper.toEntity(doctorDTO);
			doctor.setProfileInfo(doctorProfileInfo);
			Doctor newdoctor = doctorRepository.save(doctor);
			doctor = doctorRepository.save(newdoctor);
			result = doctorMapper.toDto(doctor);
			doctorSearchRepository.save(doctor);
		}

		if(!newDoctor)
		{
			doctor = doctorMapper.toEntity(doctorDTO);
			log.debug("Request to save Doctor : {}", doctorDTO);
			doctor = doctorRepository.save(doctor);
	
			result = doctorMapper.toDto(doctor);
			doctorSearchRepository.save(doctor);
		}
		
		log.info("returned doctorDTO", doctorDTO);
		
		return result;
	}

	/**
	 * Get all the doctors.
	 *
	 * @param pageable
	 *            the pagination information
	 * @return the list of entities
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<DoctorDTO> findAll(Pageable pageable) {
		log.debug("Request to get all Doctors");
		return doctorRepository.findAll(pageable).map(doctorMapper::toDto);
	}

	/**
	 * Get one doctor by id.
	 *
	 * @param id
	 *            the id of the entity
	 * @return the entity
	 */
	@Override
	@Transactional(readOnly = true)
	public Optional<DoctorDTO> findOne(Long id) {
		log.debug("Request to get Doctor : {}", id);
		return doctorRepository.findById(id).map(doctorMapper::toDto);
	}

	/**
	 * Delete the doctor by id.
	 *
	 * @param id
	 *            the id of the entity
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request to delete Doctor : {}", id);
		doctorRepository.deleteById(id);
		doctorSearchRepository.deleteById(id);
	}

	/**
	 * Search for the doctor corresponding to the query.
	 *
	 * @param query
	 *            the query of the search
	 * @param pageable
	 *            the pagination information
	 * @return the list of entities
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<DoctorDTO> search(String query, Pageable pageable) {
		log.debug("Request to search for a page of Doctors for query {}", query);
		return doctorSearchRepository.search(queryStringQuery(query), pageable).map(doctorMapper::toDto);
	}

	@Override
	public void setBusySessionsByProfileNameAndDate(String profileName, LocalDate date) {

		log.debug("add busy sessions on doctor profile for specific date", date);

		Set<DoctorSessionInfo> result = doctorRepository.findSessions(profileName, date);
		
		ZonedDateTime startTime;
		ZonedDateTime endTime;
		DoctorSessionInfo testInfo = new DoctorSessionInfo();

		TreeSet<DoctorSessionInfo> treeSet = new TreeSet<DoctorSessionInfo>();

		for (DoctorSessionInfo si : result) {

			testInfo = si;

			treeSet.add(si);

		}
		startTime = ZonedDateTime.of(date.getYear(), date.getMonthValue(), date.getDayOfMonth(), 00, 00, 00, 00,
				testInfo.getStartTime().getZone());

		endTime = ZonedDateTime.of(date.getYear(), date.getMonthValue(), date.getDayOfMonth(), 23, 00, 00, 00,
				testInfo.getStartTime().getZone());

		for (DoctorSessionInfo sinfo : treeSet) {

			if (startTime.isBefore(sinfo.getStartTime())) {
				CreateBusyReservedSlot(date, startTime, sinfo.getStartTime(), profileName);
				startTime = sinfo.getEndTime();

			}

		}

		if (startTime.isBefore(endTime)) {
			CreateBusyReservedSlot(date, startTime, endTime, profileName);

		}

	}

	@Override
	public Page<DoctorDTO> findByLocationNear(Point point, Distance value, Pageable pageable) {

		return doctorSearchRepository.findByLocationNear(point, value, pageable).map(doctorMapper::toDto);
	}

	@Override
	public Page<DoctorDTO> findByLocationWithin(Point point, Distance value, Pageable pageable) {
		// TODO Auto-generated method stub
		return doctorSearchRepository.findByLocationWithin(point, value, pageable).map(doctorMapper::toDto);
	}

	public void CreateBusyReservedSlot(LocalDate date, ZonedDateTime startTime, ZonedDateTime endTime,
			String profileName) {
		log.debug("<<<<<<<<<<entered>>>>>>>>>>>>>>>>>>>>>>");
		
		ReservedSlot reservedSlot = new ReservedSlot();
		reservedSlot.setDate(date);
		reservedSlot.setDoctor(doctorRepository.findByProfileInfo_ProfileName(profileName));
		reservedSlot.setStartTime(startTime);
		reservedSlot.setEndTime(endTime);
		SlotStatus status = slotStatusRepository.findByStatus("Busy");
		log.info("new slot status is " + status);
		reservedSlot.setSlotStatus(status);

		reservedSlotRepository.save(reservedSlot);
		reservedSlotSearchRepository.save(reservedSlot);

	}

}
