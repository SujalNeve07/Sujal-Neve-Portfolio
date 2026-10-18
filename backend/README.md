# Sujal Neve Portfolio - Spring Boot Backend

Production-ready, lightweight Spring Boot service powering the interactive Contact section of Sujal Neve's Developer Portfolio.

## Architecture Highlights
- **Java 21 LTS** with **Spring Boot 3.3.5**.
- **Jakarta Bean Validation (`@Valid`)** ensuring name, email, subject, and message conformance.
- **Spring Mail (`JavaMailSender`)** dispatching real SMTP inquiries with `Reply-To` directed to the visitor.
- **Anti-Bot Protection:** Honeypot field trap rejecting automated web crawlers.
- **In-Memory Rate Limiting:** Sliding-window algorithm protecting endpoints without external dependencies.
- **Zero Database Persistence:** Inquiries are forwarded immediately via email without storage overhead or credential leaks.

## Prerequisites
- **JDK 21 LTS** installed and configured.
- **Apache Maven 3.8+**.

## Quick Start

### 1. Configure Environment Variables
Copy `.env.example` or export the variables in your shell:
```bash
export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=587
export SMTP_USERNAME=sujal.neve07@gmail.com
export SMTP_PASSWORD=your_app_password
export MAIL_TO=sujal.neve07@gmail.com
export CORS_ALLOWED_ORIGINS=http://localhost:5173
```

### 2. Compile & Run
```bash
# Compile and package
mvn clean package

# Run the executable jar
java -jar target/portfolio-backend-1.0.0.jar
```
Or directly with the Spring Boot plugin:
```bash
mvn spring-boot:run
```

## API Endpoints

### `POST /api/contact`
Receives contact inquiries, checks rate limits, and sends email.

**Request Payload:**
```json
{
  "name": "Alex Mercer",
  "email": "alex@example.com",
  "subject": "Backend Engineering Collaboration",
  "message": "Hi Sujal, I reviewed your Banking Portal API repository and would like to discuss an opportunity.",
  "honeypot": ""
}
```

**Responses:**
- `200 OK`: Message delivered.
- `400 Bad Request`: Validation failure or bot detected via honeypot.
- `429 Too Many Requests`: Client IP exceeded rate limit.
- `503 Service Unavailable`: SMTP provider transmission error.

### `GET /api/health`
Health check endpoint returning application status.
