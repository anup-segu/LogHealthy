# Bonus Phase 3: Short Term Treatments

## Rails
### Models
* ShortTermTreatment

### Controllers
* Api::ShortTermTreatmentsController, create, update, destroy

### Views
* short_term_treatments/show.json.jbuilder

## Flux
### Views (React Components)
* SelectPatientSTTreatment
* PatientMedication

### Stores
* ShortTermTreatment

### Actions
* ApiActions.receiveSTTreatment
* ApiActions.deleteSTTreatment
* STTreatmentActions.fetchTreatment -> triggers ApiUtil
* STTreatmentActions.updateTreatment -> triggers ApiUtil

### ApiUtil
* ApiUtil.fetchSTTreatment
* ApiUtil.updateSTTreatment


## Gems/Libraries
* react (npm)
* Flux Dispatcher (npm)
* Twitter Bootstrap
