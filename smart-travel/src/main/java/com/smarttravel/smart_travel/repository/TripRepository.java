package com.smarttravel.smart_travel.repository;


import com.smarttravel.smart_travel.model.Trip;
import com.smarttravel.smart_travel.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByCreator(User creator);
}