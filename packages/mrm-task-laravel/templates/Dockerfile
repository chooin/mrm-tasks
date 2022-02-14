FROM php:8
WORKDIR /app
COPY . /app
COPY ./laravel.ini /usr/local/etc/php/conf.d/laravel.ini
RUN docker-php-ext-install pdo pdo_mysql mbstring gd
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --profile
