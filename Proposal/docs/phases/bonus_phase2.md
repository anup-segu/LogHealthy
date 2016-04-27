# Bonus Phase 2: Long Term Treatments

## Rails
### Models
* LongTermTreatment

### Controllers
* Api::LongTermTreatmentsController, create, update, destroy

### Views
* long_term_treatments/show.json.jbuilder

## Flux
### Views (React Components)
* SelectPatientTreatments
* SelectPatientLTTreatment
* PatientMedication

### Stores
* LongTermTreatment

### Actions
* ApiActions.receiveLTTreatment
* ApiActions.deleteLTTreatment
* LTTreatmentActions.fetchTreatment -> triggers ApiUtil
* LTTreatmentActions.updateTreatment -> triggers ApiUtil

### ApiUtil
* ApiUtil.fetchLTTreatment
* ApiUtil.updateLTTreatment


## Gems/Libraries
* react (npm)
* Flux Dispatcher (npm)
* Twitter Bootstrap
