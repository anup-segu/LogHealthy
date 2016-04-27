# Bonus Phase 1: Conversations (1 day)

## Rails
### Models
* Comment

### Controllers
* Api::CommentsController, create, index, show

### Views
* comments/show.json.jbuilder
* comments/index.json.jbuilder

## Flux
### Views (React Components)
* PatientConversationDetailIndex
* PatientConversationDetailItem
* PatientConversationDetailForm
* DoctorConversationDetailIndex
* DoctorConversationDetailItem
* DoctorConversationDetailForm
* ReplyItem for Doctor and Patient
* ReplyForm for Doctor and Patient

### Stores
* Comment

### Actions
* ApiActions.receiveAllComments -> triggered by ApiUtil
* ApiActions.receiveSingleComment
* ApiActions.deleteComment
* DoctorActions.fetchAllComments -> triggers ApiUtil
* DoctorActions.fetchSingleComment

### ApiUtil
* ApiUtil.fetchAllComments
* ApiUtil.fetchSingleComment


## Gems/Libraries
* react (npm)
* Flux Dispatcher (npm)
* Twitter Bootstrap
