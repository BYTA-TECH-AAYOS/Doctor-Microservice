package com.bytatech.ayoos.doctor.repository;

import com.bytatech.ayoos.doctor.domain.ProfileInfo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProfileInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfileInfoRepository extends JpaRepository<ProfileInfo, Long> {

}
