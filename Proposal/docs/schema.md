# Schema Information

## patients
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
first_name      | string    | not null, indexed
last_name       | string    | not null, indexed
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## logs
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
patient_id      | integer   | not null, foreign key (references users), indexed
glucose         | integer   | not null
carbs           | integer   | custom validation (if using short term treatment w/ carb ratio)
meal_type       | string    | not null, in: ["breakfast", "lunch", "dinner"]
meal_taken?     | boolean   | not null, default: true, in: [true, false]
comments        | text      |

## doctors
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
first_name      | string    | not null, indexed
last_name       | string    | not null, indexed
work phone      | string    | not null
practice_id     | integer   | not null, foreign key (references practices)
education       | string    | not null
background      | text      |
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## practices
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null, indexed
address         | string    | not null
office phone    | string    |

## patient_doctors (join table)
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
doctor_id       | integer   | not null, foreign key (references doctors), indexed
patient_id      | integer   | not null, foreign key (references patients), [patient_id, doctor_id]: unique index, indexed

#Schema Details For Bonus Content

## conversations
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
author_id       | integer   | not null, indexed, foreign key (references author_type - polymorphic)
author_type     | string    | not null, in: ["doctor", "patient"]
recipient_id    | integer   | not null, indexed, foreign key (references recipient_type - polymorphic)
recipient_type  | string    | not null, in: ["doctor", "patient"]
parent_id       | integer   | foreign key (references conversations)
subject         | string    | not null
body            | text      | not null

## long_term_treatments
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
doctor_id       | integer   | not null, foreign key (references doctors), indexed
patient_id      | integer   | not null, foreign key (references patients), [patient_id, doctor_id]: unique index, indexed
min_glucose     | integer   |
max_glucose     | integer   | not null, must be higher than min_glucose if present
dosage          | integer   | not null
increment       | integer   | not null
interval        | integer   | not null
drug_name       | string    | not null

## short_term_treatments
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
doctor_id       | integer   | not null, foreign key (references doctors), indexed
patient_id      | integer   | not null, foreign key (references patients), [patient_id, doctor_id]: unique index, indexed
carb_ratio?     | boolean   | not null, default: false, in: [true, false]
drug_name       | string    | not null

## short_term_treatments_dosage
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
st_treatment_id | integer   | not null, foreign key (references short_term_treatments), unique, indexed
meal_type       | string    | not null, in: ["breakfast", "lunch", "dinner"]
base_dosage     | integer   | not null if st_treatment has carb_ratio? value of false
carb_ratio_val  | float     | not null if st_treatment has carb_ratio? value of true

##short_term_treatments_increment
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
st_treatment_id | integer   | not null, foreign key (references short_term_treatments), indexed
min_glucose     | integer   | not null, unique
max_glucose     | integer   | not null, must be greater than min_glucose, unique
increment_dosage| integer   | not null
