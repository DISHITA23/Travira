package com.smarttravel.smart_travel.service;

import com.smarttravel.smart_travel.model.Expense;
import com.smarttravel.smart_travel.model.Trip;
import com.smarttravel.smart_travel.model.User;
import com.smarttravel.smart_travel.repository.ExpenseRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    /**
     * Create new expense
     */
    @Transactional
    public Expense createExpense(ExpenseRequest request, Trip trip, User user) {
        Expense expense = new Expense();
        expense.setTrip(trip);
        expense.setPaidBy(user);
        expense.setDescription(request.getDescription());
        expense.setAmount(request.getAmount());
        expense.setReceiptUrl(request.getReceiptUrl());

        return expenseRepository.save(expense);
    }

    /**
     * Update existing expense
     */
    @Transactional
    public Expense updateExpense(Expense expense, ExpenseRequest request) {
        if (request.getDescription() != null) {
            expense.setDescription(request.getDescription());
        }
        if (request.getAmount() != null) {
            expense.setAmount(request.getAmount());
        }
        if (request.getReceiptUrl() != null) {
            expense.setReceiptUrl(request.getReceiptUrl());
        }

        return expenseRepository.save(expense);
    }

    /**
     * Delete expense
     */
    @Transactional
    public void deleteExpense(Long expenseId) {
        expenseRepository.deleteById(expenseId);
    }

    /**
     * Get all expenses for a trip
     */
    public List<Expense> getExpensesByTrip(Trip trip) {
        return expenseRepository.findByTrip(trip);
    }

    /**
     * Calculate total expenses for a trip
     */
    public BigDecimal calculateTotalExpenses(Trip trip) {
        List<Expense> expenses = expenseRepository.findByTrip(trip);
        return expenses.stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    /**
     * Calculate per-person share for a trip
     */
    public BigDecimal calculatePerPersonShare(Trip trip) {
        BigDecimal total = calculateTotalExpenses(trip);
        int memberCount = trip.getMemberCount();

        if (memberCount == 0) {
            return BigDecimal.ZERO;
        }

        return total.divide(BigDecimal.valueOf(memberCount), 2, BigDecimal.ROUND_HALF_UP);
    }

    /**
     * Get expense by ID
     */
    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));
}
}
