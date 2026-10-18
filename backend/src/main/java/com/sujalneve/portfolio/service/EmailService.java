
package com.sujalneve.portfolio.service;

import com.sujalneve.portfolio.dto.ContactRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.util.Map;

@Service
public class EmailService {

    private static final Logger log =
            LoggerFactory.getLogger(EmailService.class);

    private final RestClient resendClient;
    private final String recipientEmail;
    private final String resendApiKey;

    public EmailService(
            @Value("${portfolio.mail.to:sujal.neve07@gmail.com}")
            String recipientEmail,
            @Value("${RESEND_API_KEY:}")
            String resendApiKey
    ) {
        this.recipientEmail = recipientEmail;
        this.resendApiKey = resendApiKey;

        this.resendClient = RestClient.builder()
                .baseUrl("https://api.resend.com")
                .build();
    }

    public void sendContactEmail(ContactRequest request) {
        if (resendApiKey == null || resendApiKey.isBlank()) {
            log.error("Cannot dispatch email: RESEND_API_KEY is not configured.");
            throw new EmailDeliveryException(
                    "Email service is not configured. Please contact "
                            + recipientEmail + " directly."
            );
        }

        String sanitizedSubject = request.getSubject()
                .replaceAll("[\\r\\n]", " ")
                .trim();

        String body = """
                New contact message received from Sujal Neve's Portfolio.

                Sender Name: %s
                Sender Email: %s
                Subject: %s

                Message:
                %s
                """.formatted(
                request.getName(),
                request.getEmail(),
                sanitizedSubject,
                request.getMessage()
        );

        Map<String, Object> payload = Map.of(
                "from", "Portfolio Contact <onboarding@resend.dev>",
                "to", new String[]{recipientEmail},
                "reply_to", request.getEmail(),
                "subject", "[Portfolio Inquiry] " + sanitizedSubject,
                "text", body
        );

        try {
            resendClient.post()
                    .uri("/emails")
                    .header(HttpHeaders.AUTHORIZATION,
                            "Bearer " + resendApiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(payload)
                    .retrieve()
                    .toBodilessEntity();

            log.info("Contact email accepted by Resend.");
        } catch (RestClientException ex) {
            // Avoid logging request contents or API credentials.
            log.error("Resend email delivery request failed: {}",
                    ex.getMessage());
            throw new EmailDeliveryException(
                    "Email delivery failed. Please contact "
                            + recipientEmail + " directly.",
                    ex
            );
        }
    }
}
