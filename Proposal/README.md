# LogHealthy

[www.loghealthy.com][heroku] **NB:** Visit Production Site

[heroku]: http://www.loghealthy.com/

## Minimum Viable Product

LogHealthy is a web application inspired by Asana that is tailored to diabetic patients and doctors. Patients typically log their blood sugar levels on daily basis to confirm that their medication is at the appropriate level. Their doctors will review these logs and adjust dosage as needed to keep glucose (blood sugar) at a controlled level. This tracking and reviewing process is often done via paper forms; however, this app will aim to streamline the process by utilizing a web platform as a modern alternative.

The app will be built using Ruby on Rails and React.js. By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] New account creation, login, and demo login for patients/doctors
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] The minimally necessary features for an Asana-inspired site: dashboard for log creation/saving, tracking medical progress
- [ ] Hosting on Heroku
- [ ] CSS styling that is satisfactorily visually appealing
- [ ] A production README

## Product Goals and Priorities

LogHealthy will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account as a Patient or Doctor (MVP)
- [ ] Log in / Log out, including as a Patient/Doctor/Demo User (MVP)
- [ ] Create, read, edit, and delete logs tracking glucose levels (MVP)
- [ ] Dashboard view to see all the logs per day (MVP)
- [ ] Dashboard view to see data over extended period of time (MVP)
- [ ] Doctors log in to a dashboard that is organized by patient and will show patient data (MVP)
- [ ] Doctors and patients can communicate via messages through the application (expected feature, but not MVP)

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline for MVPs

### Phase 1: Backend setup and Patient and Doctor Authentication (1 day)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `Patient` model
- [ ] authentication for Patient
- [ ] create `Doctor` model
- [ ] authentication for Doctor
- [ ] Patient and Doctor signup/signin forms for splash page
- implement each auth component, building out the flux loop as needed.
  - [ ] `AccountForms` for Patient and Doctor
  - [ ] `Sidebars` for Patient and Doctor with placeholder content
- [ ] blank landing page after signin for Patient and Doctor
- [ ] Initialize demo account for patient and doctor
- [ ] Implement basic CSS formatting for Splash page, Navbar, and Sidebar

### Phase 2: Logs Feature (1 day)

**Objective:** Logs can be created, read, and edited through the API.

- [ ] create `Log` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for logs (`LogsController`)
- [ ] jBuilder views for logs
- [ ] setup Webpack & Flux scaffold
- implement each log component, building out the flux loop as needed.
  - [ ] `LogsDetailIndex`
  - [ ] `LogsDetailItem`
  - [ ] `LogsDetailForm`
- [ ] create logs view in Patient dashboard and be able to record logs
- [ ] view patient logs in Doctor dashboard
- [ ] Implement basic CSS formatting for Logs components


### Phase 3: Progress Feature (2 days)

**Objective:** Progress can be tracked on patient dashboard and updated seamlessly

- implement each progress component, building out the flux loop as needed.
  - [ ] `ProgressView`
  - [ ] `ProgressGraph`
  - [ ] `ProgressGraphData`
- [ ] implement CSS for progress component

### Phase 4: Patient Settings (0.5 days)

**Objective:** Patient can update profile settings and change doctors

- implement each settings component, building out the flux loop as needed.
  - [ ] `PatientSettings`
  - [ ] `DoctorLookupField`
- [ ] test and update patient profiles through app
- [ ] implement CSS for settings tab

### Phase 5: Doctor Viewing Patients (1.5 days)

**Objective:** Doctors can view all of their patients and access details about their logs

- [ ] Seed database with additional data to test patient and doctor relationships
- implement each component, building out the flux loop as needed.
  - [ ] `PatientsIndex`
  - [ ] `PatientsIndexItem`
  - [ ] `PatientsIndexDetail`
  - [ ] `PatientsSearchbar`
  - [ ] `SelectPatientDetail`
  - [ ] `SelectPatientLogs`
  - [ ] `SelectPatientProgress`
- [ ] implement CSS for Doctors dashboard and patient views
- [ ] test that data is updated accurately among patients and doctors with new logs entered

### Phase 6: Doctor Settings (0.5 days)

**Objective:** Doctor can update profile settings and add patients

- implement each settings component, building out the flux loop as needed.
  - [ ] `ProfilePicture`
  - [ ] `BasicDataForm`
  - [ ] `MedicalBackgroundForm`
- [ ] implement CSS for Doctors settings tab
- [ ] test and update doctor profiles through app

### Phase 8: Final Touches (2.5 days)
- [ ] Check for n+1 queries and eliminate them
- [ ] Implement loading screens for content that takes long to render
- [ ] Polish CSS styles and add transitions for dynamic content and ensure theme is consistent
- [ ] Double check that demo account for patient and doctors work

## Bonus Features (TBD)
- [ ] Doctors and patients can communicate to each other via conversations
- [ ] Doctors can set dynamic treatment options for patients
- [ ] Patients can view treatment on their dashboard
- [ ] Archive conversations when patient changes doctor
- [ ] Provide text reminders to log data for patients
- [ ] Multiple sessions

### Bonus Phase 1: Conversations

**Objective:** Patients and Doctors can communicate via conversations

- [ ] create `Conversation` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for logs (`ConversationsController`)
- implement each conversation component, building out the flux loop as needed.
  - [ ] `PatientConversationDetailIndex`
  - [ ] `PatientConversationDetailItem`
  - [ ] `PatientConversationDetailForm`
  - [ ] `DoctorConversationDetailIndex`
  - [ ] `DoctorConversationDetailItem`
  - [ ] `DoctorConversationDetailForm`
  - [ ] `ReplyItem` for Doctor and Patient
  - [ ] `ReplyForm` for Doctor and Patient

### Bonus Phase 2: Long Term Treatments

**Objective:** Doctors can setup long term treatments for patients

- [ ] create `LongTermTreatment` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for logs (`LongTermTreatmentsController`)
- [ ] jBuilder views for treatments
- implement each treatment component, building out the flux loop as needed.
  - [ ] `SelectPatientTreatments`
  - [ ] `SelectPatientLTTreatment`
  - [ ] `PatientMedication` to include LT treatment
- [ ] test that LT treatment logic holds with log data

### Bonus Phase 3: Short Term Treatments

**Objective:** Doctors can setup short term treatments for patients

- [ ] create `ShortTermTreatment` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for logs (`ShortTermTreatmentsController`)
- [ ] jBuilder views for treatments
- implement each treatment component, building out the flux loop as needed.
  - [ ] `SelectPatientSTTreatment`
  - [ ] `PatientMedication` to include ST treatment
- [ ] test that ST treatment logic holds with log data

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
