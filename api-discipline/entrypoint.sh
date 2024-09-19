#!/bin/sh

echo "Running Database Migrations"
cd api_discipline
python manage.py makemigrations
python manage.py migrate
printf "\033[36mAll set! your application is running at http://localhost:8000\033[0m\n"

exec "$@"