# Phase 1: Backend setup and Patient and Doctor Authentication (1 day)

## Rails
### Models
* Patient
* Doctor

### Controllers
* Api::PatientsController (create, new, update, show)
* Api::DoctorsController (create, new, update, show)
* Api::SessionsController (create, new, destroy)

### Views

* patients/show.json.jbuilder
* doctors/show.json.jbuilder

## Flux
### Views (React Components)

* Navbar (basic)
* Footer (basic)
* SplashPage
* AccountForms

### Stores

* Patient
* Doctor

### Actions

* PATIENT_CREATED
* DOCTOR_CREATED

### ApiUtil

* create_patient
* create_doctor
* create_session

## Gems/Libraries
* BCrypt (Gem)
