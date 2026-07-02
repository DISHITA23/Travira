package com.smarttravel.smart_travel.service;


import com.smarttravel.smart_travel.dto.TripRequest;
import com.smarttravel.smart_travel.model.Trip;
import com.smarttravel.smart_travel.model.User;
import com.smarttravel.smart_travel.repository.ExpenseRepository;
import com.smarttravel.smart_travel.repository.TripRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository tripRepository;
    private final ExpenseRepository expenseRepository;

    /**
     * Create new trip
     * @param request Trip creation request
     * @param creator User creating the trip
     * @return Created trip
     */
    @Transactional
    public Trip createTrip(TripRequest request, User creator) {
        // Validate dates
        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }

        Trip trip = new Trip();
        trip.setName(request.getName());
        trip.setDestination(request.getDestination());
        trip.setStartDate(request.getStartDate());
        trip.setEndDate(request.getEndDate());
        trip.setCreator(creator);
        trip.setMemberCount(1); // Creator is the first member

        return tripRepository.save(trip);
    }

    /**
     * Update existing trip
     * @param trip Trip to update
     * @param request Update request
     * @return Updated trip
     */
    @Transactional
    public Trip updateTrip(Trip trip, TripRequest request) {
        if (request.getName() != null && !request.getName().trim().isEmpty()) {
            trip.setName(request.getName());
        }
        if (request.getDestination() != null && !request.getDestination().trim().isEmpty()) {
            trip.setDestination(request.getDestination());
        }
        if (request.getStartDate() != null) {
            trip.setStartDate(request.getStartDate());
        }
        if (request.getEndDate() != null) {
            // Validate that end date is after start date
            if (trip.getStartDate() != null && request.getEndDate().isBefore(trip.getStartDate())) {
                throw new IllegalArgumentException("End date cannot be before start date");
            }
            trip.setEndDate(request.getEndDate());
        }

        return tripRepository.save(trip);
    }

    /**
     * Delete trip
     * @param tripId Trip ID to delete
     */
    @Transactional
    public void deleteTrip(Long tripId) {
        Trip trip = getTripById(tripId);

        // Delete all associated expenses first
        List<Expense> expenses = expenseRepository.findByTrip(trip);
        expenseRepository.deleteAll(expenses);

        // Then delete the trip
        tripRepository.deleteById(tripId);
    }

    /**
     * Get all trips by creator
     * @param creator Trip creator
     * @return List of trips
     */
    public List<Trip> getTripsByCreator(User creator) {
        return tripRepository.findByCreator(creator);
    }

    /**
     * Get trip by ID
     * @param id Trip ID
     * @return Trip entity
     * @throws RuntimeException if trip not found
     */
    public Trip getTripById(Long id) {
        return tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found with id: " + id));
    }

    /**
     * Get all trips (for admin)
     * @return List of all trips
     */
    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    /**
     * Add member to trip
     * @param trip Trip to add member to
     * @return Updated trip
     */
    @Transactional
    public Trip addMemberToTrip(Trip trip) {
        trip.setMemberCount(trip.getMemberCount() + 1);
        return tripRepository.save(trip);
    }

    /**
     * Remove member from trip
     * @param trip Trip to remove member from
     * @return Updated trip
     * @throws RuntimeException if trying to remove last member
     */
    @Transactional
    public Trip removeMemberFromTrip(Trip trip) {
        if (trip.getMemberCount() > 1) {
            trip.setMemberCount(trip.getMemberCount() - 1);
            return tripRepository.save(trip);
        }
        throw new RuntimeException("Cannot remove the last member from trip");
    }

    /**
     * Update member count
     * @param trip Trip to update
     * @param count New member count
     * @return Updated trip
     */
    @Transactional
    public Trip updateMemberCount(Trip trip, Integer count) {
        if (count < 1) {
            throw new IllegalArgumentException("Member count must be at least 1");
        }
        trip.setMemberCount(count);
        return tripRepository.save(trip);
    }

    /**
     * Calculate trip duration in days
     * @param trip Trip to calculate duration for
     * @return Number of days
     */
    public long calculateTripDuration(Trip trip) {
        LocalDate start = trip.getStartDate();
        LocalDate end = trip.getEndDate();
        return ChronoUnit.DAYS.between(start, end) + 1; // +1 to include both start and end dates
    }

    /**
     * Check if trip is active (current date is within trip dates)
     * @param trip Trip to check
     * @return true if active
     */
    public boolean isTripActive(Trip trip) {
        LocalDate now = LocalDate.now();
        return !now.isBefore(trip.getStartDate()) && !now.isAfter(trip.getEndDate());
    }

    /**
     * Check if trip is upcoming
     * @param trip Trip to check
     * @return true if upcoming
     */
    public boolean isTripUpcoming(Trip trip) {
        LocalDate now = LocalDate.now();
        return now.isBefore(trip.getStartDate());
    }

    /**
     * Check if trip is completed
     * @param trip Trip to check
     * @return true if completed
     */
    public boolean isTripCompleted(Trip trip) {
        LocalDate now = LocalDate.now();
        return now.isAfter(trip.getEndDate());
    }

    /**
     * Get trip status as string
     * @param trip Trip to check
     * @return Status string (UPCOMING, ACTIVE, COMPLETED)
     */
    public String getTripStatus(Trip trip) {
        if (isTripUpcoming(trip)) {
            return "UPCOMING";
        } else if (isTripActive(trip)) {
            return "ACTIVE";
        } else if (isTripCompleted(trip)) {
            return "COMPLETED";
        }
        return "UNKNOWN";
    }

    /**
     * Get days remaining until trip starts
     * @param trip Trip to check
     * @return Number of days remaining (negative if trip has started)
     */
    public long getDaysUntilStart(Trip trip) {
        LocalDate now = LocalDate.now();
        return ChronoUnit.DAYS.between(now, trip.getStartDate());
    }

    /**
     * Get days remaining until trip ends
     * @param trip Trip to check
     * @return Number of days remaining (negative if trip has ended)
     */
    public long getDaysUntilEnd(Trip trip) {
        LocalDate now = LocalDate.now();
        return ChronoUnit.DAYS.between(now, trip.getEndDate());
    }

    /**
     * Get comprehensive trip statistics
     * @param trip Trip to analyze
     * @return Map containing various statistics
     */
    public Map<String, Object> getTripStatistics(Trip trip) {
        List<Expense> expenses = expenseRepository.findByTrip(trip);

        // Calculate total expenses
        BigDecimal totalExpenses = expenses.stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Calculate average expense
        BigDecimal avgExpense = expenses.isEmpty()
                ? BigDecimal.ZERO
                : totalExpenses.divide(BigDecimal.valueOf(expenses.size()), 2, BigDecimal.ROUND_HALF_UP);

        // Calculate per person share
        BigDecimal perPersonShare = trip.getMemberCount() > 0
                ? totalExpenses.divide(BigDecimal.valueOf(trip.getMemberCount()), 2, BigDecimal.ROUND_HALF_UP)
                : BigDecimal.ZERO;

        Map<String, Object> stats = new HashMap<>();
        stats.put("tripId", trip.getId());
        stats.put("tripName", trip.getName());
        stats.put("destination", trip.getDestination());
        stats.put("status", getTripStatus(trip));
        stats.put("duration", calculateTripDuration(trip));
        stats.put("memberCount", trip.getMemberCount());
        stats.put("totalExpenses", totalExpenses);
        stats.put("numberOfExpenses", expenses.size());
        stats.put("averageExpense", avgExpense);
        stats.put("perPersonShare", perPersonShare);
        stats.put("daysUntilStart", getDaysUntilStart(trip));
        stats.put("daysUntilEnd", getDaysUntilEnd(trip));
        stats.put("isActive", isTripActive(trip));
        stats.put("isUpcoming", isTripUpcoming(trip));
        stats.put("isCompleted", isTripCompleted(trip));

        return stats;
    }

    /**
     * Check if user is trip creator
     * @param trip Trip to check
     * @param user User to verify
     * @return true if user is creator
     */
    public boolean isUserTripCreator(Trip trip, User user) {
        return trip.getCreator().getId().equals(user.getId());
    }

    /**
     * Validate trip dates
     * @param startDate Start date
     * @param endDate End date
     * @throws IllegalArgumentException if dates are invalid
     */
    public void validateTripDates(LocalDate startDate, LocalDate endDate) {
        if (startDate == null || endDate == null) {
            throw new IllegalArgumentException("Start date and end date are required");
        }

        if (endDate.isBefore(startDate)) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }

        // Optional: Limit trip duration (e.g., max 365 days)
        long duration = ChronoUnit.DAYS.between(startDate, endDate);
        if (duration > 365) {
            throw new IllegalArgumentException("Trip duration cannot exceed 365 days");
        }
    }

    /**
     * Search trips by destination
     * @param creator Trip creator
     * @param destination Destination to search for
     * @return List of matching trips
     */
    public List<Trip> searchTripsByDestination(User creator, String destination) {
        List<Trip> allTrips = getTripsByCreator(creator);
        return allTrips.stream()
                .filter(trip -> trip.getDestination().toLowerCase().contains(destination.toLowerCase()))
                .toList();
    }

    /**
     * Search trips by name
     * @param creator Trip creator
     * @param name Name to search for
     * @return List of matching trips
     */
    public List<Trip> searchTripsByName(User creator, String name) {
        List<Trip> allTrips = getTripsByCreator(creator);
        return allTrips.stream()
                .filter(trip -> trip.getName().toLowerCase().contains(name.toLowerCase()))
                .toList();
    }

    /**
     * Get active trips for user
     * @param creator Trip creator
     * @return List of active trips
     */
    public List<Trip> getActiveTrips(User creator) {
        List<Trip> allTrips = getTripsByCreator(creator);
        return allTrips.stream()
                .filter(this::isTripActive)
                .toList();
    }

    /**
     * Get upcoming trips for user
     * @param creator Trip creator
     * @return List of upcoming trips
     */
    public List<Trip> getUpcomingTrips(User creator) {
        List<Trip> allTrips = getTripsByCreator(creator);
        return allTrips.stream()
                .filter(this::isTripUpcoming)
                .toList();
    }

    /**
     * Get completed trips for user
     * @param creator Trip creator
     * @return List of completed trips
     */
    public List<Trip> getCompletedTrips(User creator) {
        List<Trip> allTrips = getTripsByCreator(creator);
        return allTrips.stream()
                .filter(this::isTripCompleted)
                .toList();
    }

    /**
     * Clone/duplicate a trip
     * @param originalTrip Trip to clone
     * @param user User creating the clone
     * @return Cloned trip
     */
    @Transactional
    public Trip cloneTrip(Trip originalTrip, User user) {
        Trip clonedTrip = new Trip();
        clonedTrip.setName(originalTrip.getName() + " (Copy)");
        clonedTrip.setDestination(originalTrip.getDestination());
        clonedTrip.setStartDate(originalTrip.getStartDate());
        clonedTrip.setEndDate(originalTrip.getEndDate());
        clonedTrip.setCreator(user);
        clonedTrip.setMemberCount(1);

        return tripRepository.save(clonedTrip);
    }
}
