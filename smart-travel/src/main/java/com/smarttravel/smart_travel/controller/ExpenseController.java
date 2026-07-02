package com.smarttravel.smart_travel.controller;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // Get all expenses for a trip
    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<Expense>> getExpensesByTrip(@PathVariable Long tripId) {
        return ResponseEntity.ok(expenseService.getExpensesByTrip(tripId));
    }

    // Create a new expense
    @PostMapping("/trip/{tripId}")
    public ResponseEntity<Expense> createExpense(
            @PathVariable Long tripId,
            @RequestBody Expense expense) {
        return ResponseEntity.ok(expenseService.createExpense(tripId, expense));
    }

    // Update an expense
    @PutMapping("/{expenseId}")
    public ResponseEntity<Expense> updateExpense(
            @PathVariable Long expenseId,
            @RequestBody Expense expense) {
        return ResponseEntity.ok(expenseService.updateExpense(expenseId, expense));
    }

    // Delete an expense
    @DeleteMapping("/{expenseId}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long expenseId) {
        expenseService.deleteExpense(expenseId);
        return ResponseEntity.ok().build();
    }

    // Scan receipt using OCR (integration with Python AI service)
    @PostMapping("/scan-receipt")
    public ResponseEntity<Map<String, Object>> scanReceipt(
            @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(expenseService.scanReceipt(file));
    }

    // Get expense summary for a trip
    @GetMapping("/trip/{tripId}/summary")
    public ResponseEntity<Map<String, Object>> getExpenseSummary(@PathVariable Long tripId) {
        return ResponseEntity.ok(expenseService.getExpenseSummary(tripId));
    }
}