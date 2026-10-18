package com.sujalneve.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactRequest {

    @NotBlank(message = "Name is required.")
    @Size(max = 100, message = "Name must not exceed 100 characters.")
    private String name;

    @NotBlank(message = "Email address is required.")
    @Email(message = "Please provide a valid email address.")
    @Size(max = 100, message = "Email must not exceed 100 characters.")
    private String email;

    @NotBlank(message = "Subject is required.")
    @Size(max = 150, message = "Subject must not exceed 150 characters.")
    private String subject;

    @NotBlank(message = "Message content is required.")
    @Size(max = 5000, message = "Message must not exceed 5000 characters.")
    private String message;

    /**
     * Anti-bot honeypot field.
     * Invisible on legitimate browser UI. If populated by an automated scraper/bot, request is rejected.
     */
    private String honeypot;

    public ContactRequest() {
    }

    public ContactRequest(String name, String email, String subject, String message, String honeypot) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.honeypot = honeypot;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name != null ? name.trim() : null;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email != null ? email.trim() : null;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject != null ? subject.trim() : null;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message != null ? message.trim() : null;
    }

    public String getHoneypot() {
        return honeypot;
    }

    public void setHoneypot(String honeypot) {
        this.honeypot = honeypot;
    }
}
