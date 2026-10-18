package com.sujalneve.portfolio.controller;

import com.sujalneve.portfolio.dto.ApiResponse;
import com.sujalneve.portfolio.dto.ContactRequest;
import com.sujalneve.portfolio.service.EmailDeliveryException;
import com.sujalneve.portfolio.service.EmailService;
import com.sujalneve.portfolio.service.RateLimiterService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ContactController {

    private final EmailService emailService;
    private final RateLimiterService rateLimiterService;

    public ContactController(EmailService emailService, RateLimiterService rateLimiterService) {
        this.emailService = emailService;
        this.rateLimiterService = rateLimiterService;
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse> health() {
        return ResponseEntity.ok(ApiResponse.ok("Portfolio Backend is active and running."));
    }

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse> submitContact(
            @Valid @RequestBody ContactRequest request,
            HttpServletRequest servletRequest
    ) {
        // Honeypot trap check for automated spam bots
        if (request.getHoneypot() != null && !request.getHoneypot().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Spam submission rejected."));
        }

        // IP Extraction for Rate Limiting
        String clientIp = extractClientIp(servletRequest);
        if (!rateLimiterService.isAllowed(clientIp)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(ApiResponse.error("Too many messages sent. Please wait a few minutes before trying again or email sujal.neve07@gmail.com directly."));
        }

        // Dispatch Email
        emailService.sendContactEmail(request);

        return ResponseEntity.ok(
                ApiResponse.ok("Thank you for reaching out! Your message has been delivered directly to Sujal Neve.")
        );
    }

    private String extractClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isEmpty() || "unknown".equalsIgnoreCase(xfHeader)) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }
}
