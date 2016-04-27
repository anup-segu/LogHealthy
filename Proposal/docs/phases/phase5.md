# Phase 5: Doctor Viewing Patients (1.5 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* PatientsIndex
* PatientsIndexItem
* PatientsIndexDetail
* PatientsSearchbar
* SelectPatientDetail
* SelectPatientLogs
* SelectPatientProgress

### Stores
* Doctor

### Actions
* ApiActions.receiveAllPatients -> triggered by ApiUtil
* ApiActions.receiveSinglePatient
* ApiActions.deletePatient
* DoctorActions.fetchAllPatients -> triggers ApiUtil
* DoctorActions.fetchSinglePatient

### ApiUtil
* ApiUtil.fetchAllPatients
* ApiUtil.fetchSinglePatient


## Gems/Libraries
* react (npm)
* Flux Dispatcher (npm)
* Twitter Bootstrap
