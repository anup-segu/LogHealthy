# Phase 2: Logs Feature (1 day)

## Rails
### Models
* Log

### Controllers
* Api::LogsController, (create, new, update, show, index)

### Views
* logs/show.json.jbuilder
* logs/index.json.jbuilder

## Flux
### Views (React Components)
* LogsDetailIndex
  - LogsDetailItem
* LogsDetailForm

### Stores
* Logs

### Actions
* ApiActions.receiveAllLogs -> triggered by ApiUtil
* ApiActions.receiveSingleLog
* LogActions.fetchAllLogs -> triggers ApiUtil
* LogActions.fetchSingleLog
* LogActions.createLog
* LogActions.editLog

### ApiUtil
* ApiUtil.fetchAllLogs
* ApiUtil.fetchSingleLog
* ApiUtil.createLog
* ApiUtil.editLog

## Gems/Libraries
* Flux Dispatcher (npm)
* Twitter Bootstrap
