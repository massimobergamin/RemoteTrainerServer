TABLES

TRAINER
username
email
uid
clients (through their uid)
exercises
appointments

CLIENT
username
email
uid
trainer
plans
appointments

PLANS
client uid
JSON: days, exercises, notes from trainer & client
date of plan

EXERCISES
muscle group
Name of exercise
image
