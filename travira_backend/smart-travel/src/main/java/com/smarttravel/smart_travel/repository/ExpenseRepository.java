package com.smarttravel.smart_travel.repository;

import com.smarttravel.smart_travel.model.Expense;
import com.smarttravel.smart_travel.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByTrip(Trip trip);
}