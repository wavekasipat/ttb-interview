# ttb interview

## Overall Briefing

- Business requirement: To collect and get customer data and biometric data of customer.
- Technology stack: Depending on candidate capability – free to pick up

## Mandatory Conditions

- Programming language: Node JS
- To use JWT Token for your API services
- API should secure for supporting sensitive data of Customer
- Use RESTFUL Service for development
- Customer sensitive data (such as citizen ID, facial image) should be securely stored in database or in secure file format (Hint: Nobody cannot understand/access this information, except owner)
- API should easy for investigation logs when an incident occurs
- API should be micro-services

## Assignments

### A. Mandatory

1. To design and present your solution architecture of backend API services system which can collect and get customer data.
2. According to your solution architecture in no. A.1 above,
    - To create and demo API service for collecting customer data (name, surname, Citizen ID , biometric data-facial image)
      - Then store them (name, surname, Citizen ID, biometric data-facial image) in database
      - Then keep only the biometric data - facial image in a file with securely format but can be reference with their own reference id in database
    - To create and demo API service for getting customer data by Citizen ID (name, surname , Citizen ID, biometric data-facial image)
3. To explain and present a concept of e-signing/e-signature/e-contract.
4. To explain and present blockchain technology and architecture conceptual. How is your idea to apply the blockchain technology with Banking industry

### B. Optional (For your benefit, we would encourage you to complete them)

1. According to no. A.3 above, create and demo API service for signing document with e-signing/e-signature/e-contract concept then keep in database or data file storage
2. According to no. A.3 above, create and demo API service for getting e-signed document (no. B.1) in database/data file storage
3. To create API service or program to compare 2 facial images and return percentage of their similarity. (EX: compare your face image in ID card with your selfie image)
