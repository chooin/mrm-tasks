FROM php:8.1
ARG ENV
RUN sed -i "s/deb.debian.org/mirrors.aliyun.com/g" `grep deb.debian.org -rl /etc/apt/sources.list`
RUN sed -i "s/security.debian.org/mirrors.aliyun.com/g" `grep security.debian.org -rl /etc/apt/sources.list`
RUN apt-get update
RUN apt-get install openssl zip unzip git libonig-dev zlib1g-dev libpng-dev -y -qq
RUN apt-get clean
RUN docker-php-ext-install pdo pdo_mysql gd
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
WORKDIR /app
COPY . .
RUN ln -s ./laravel.ini /usr/local/etc/php/conf.d/laravel.ini
RUN composer install
RUN php artisan optimize --env=$ENV
