#!/bin/bash

# Clear Laravel's config cache, route cache, and view cache
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Ensure symbolic link to storage is created
php artisan storage:link

# Now, start the Apache server
apache2-foreground
