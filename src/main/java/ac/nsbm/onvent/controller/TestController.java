package ac.nsbm.onvent.controller;

import ac.nsbm.onvent.model.entity.User;
import ac.nsbm.onvent.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final UserRepository userRepository;

    public TestController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/addTestUser")
    public ResponseEntity<Map<String, Object>> addTestUser() {
        try {
            // Create a test user with unique email
            User user = new User();
            String uniqueId = UUID.randomUUID().toString().substring(0, 8);
            user.setName("Test User " + uniqueId);
            user.setEmail("test" + uniqueId + "@example.com");
            user.setPassword("testpassword");

            // Save to database
            User savedUser = userRepository.save(user);

            // Prepare response
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "User saved successfully");
            response.put("userId", savedUser.getId());
            response.put("userName", savedUser.getName());
            response.put("userEmail", savedUser.getEmail());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error saving user: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}