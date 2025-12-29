\# Identity Authority Core (IAC)



The Identity Authority Core (IAC) is the single authoritative system for human identity and role truth across General Administration applications. It persists immutable person identities and append-only role histories while enforcing institutional rules.



\## Requirements



\- Node.js 18+



\## Setup



```bash

npm install

npm start

```



The service listens on `PORT` (default `3000`).



\## Core Rules Enforced



\- Person identity is immutable and never implies employment.

\- Only `StaffRole` defines employment.

\- `EngagementRole` (candidate/trainee) is never employment.

\- Trainee roles originate \*\*only\*\* from the GA training institute.

\- Only HRMS can create/end `StaffRole`.

\- Ended roles never reactivate.

\- Roster systems are read-only consumers.

\- All role transitions are auditable.



If a person does not have an active `StaffRole` in the current GA, they do not exist for operational systems.



\## HTTP API



Base path: `/api`



\### Health



`GET /health`



\### Person



`POST /api/person`



Headers: `x-system: HRMS`



Body:

```json

{

&nbsp; "nationalId": "A-100200300",

&nbsp; "fullName": "Amina Okoro",

&nbsp; "dateOfBirth": "1986-04-11"

}

```



`GET /api/person/:id`



\### Engagement Roles



`POST /api/engagement`



Headers: `x-system: GA\_TRAINING\_APP | EXAMS\_APP`



Body:

```json

{

&nbsp; "personId": "person-id",

&nbsp; "type": "trainee",

&nbsp; "source": "ga",

&nbsp; "instituteId": "GA\_TRAINING\_INSTITUTE",

&nbsp; "startDate": "2024-03-01"

}

```



`GET /api/engagement?personId=...`



\### Staff Roles



`POST /api/staff`



Headers: `x-system: HRMS`



Body:

```json

{

&nbsp; "personId": "person-id",

&nbsp; "staffType": "officer",

&nbsp; "gaId": "GA-CORE",

&nbsp; "unitId": "unit-001",

&nbsp; "rank": "Lt",

&nbsp; "startDate": "2024-01-01"

}

```



`POST /api/staff/:id/end`



Headers: `x-system: HRMS`



Body:

```json

{

&nbsp; "personId": "person-id",

&nbsp; "gaId": "GA-CORE",

&nbsp; "endDate": "2025-01-01"

}

```



`GET /api/staff?gaId=GA-CORE\&status=active`

