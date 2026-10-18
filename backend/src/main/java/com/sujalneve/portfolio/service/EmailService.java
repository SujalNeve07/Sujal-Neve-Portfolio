package com.sujalneve.portfolio.service;

import com.sujalneve.portfolio.dto.ContactRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;
    private final String recipientEmail;
    private final String smtpUsername;

    public EmailService(
            JavaMailSender mailSender,
            @Value("${portfolio.mail.to:sujal.neve07@gmail.com}") String recipientEmail,
            @Value("${spring.mail.username:}") String smtpUsername
    ) {
        this.mailSender = mailSender;
        this.recipientEmail = recipientEmail;
        this.smtpUsername = smtpUsername;
    }

    /**
     * Dispatches the contact inquiry directly to Sujal Neve via SMTP.
     * Sets Reply-To header to visitor email for immediate one-click replies.
     * Does NOT persist or log message bodies.
     */
    public void sendContactEmail(ContactRequest request) {
        if (smtpUsername == null || smtpUsername.isBlank()) {
            log.error("Cannot dispatch email: SMTP_USERNAME is not configured.");
            throw new EmailDeliveryException(
                    "SMTP is not yet configured on this server instance. Please reach out directly to " + recipientEmail
            );
        }

        // Prevent header injection attacks
        String sanitizedSubject = request.getSubject().replaceAll("[\\r\\n]", " ").trim();

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(recipientEmail);
        mailMessage.setFrom(smtpUsername);
        mailMessage.setReplyTo(request.getEmail());
        mailMessage.setSubject("[Portfolio Inquiry] " + sanitizedSubject);

        StringBuilder body = new StringBuilder();
        body.append("New contact message received from Sujal Neve's Portfolio:\n");
        body.append("--------------------------------------------------\n");
        body.append("Sender Name:  ").append(request.getName()).append("\n");
        body.append("Sender Email: ").append(request.getEmail()).append("\n");
        body.append("Subject:      ").append(sanitizedSubject).append("\n");
        body.append("--------------------------------------------------\n\n");
        body.append(request.getMessage()).append("\n\n");
        body.append("--------------------------------------------------\n");
        body.append("Direct Reply: You can reply directly to this email to reach ").append(request.getEmail()).append("\n");

        mailMessage.setText(body.toString());

        try {
            mailSender.send(mailMessage);
            log.info("Contact email successfully dispatched for sender [{}]", request.getEmail());
        } catch (MailException ex) {
            log.error("Failed to deliver contact email via SMTP provider: {}", ex.getMessage());
            throw new EmailDeliveryException(
                    "Email transmission encountered an upstream SMTP error. Please contact " + recipientEmail + " directly.",
                    ex
            );
        }
    }
}
