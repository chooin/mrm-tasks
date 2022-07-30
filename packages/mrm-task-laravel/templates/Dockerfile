FROM php:8.1
ARG ENV
RUN sed -i "s/deb.debian.org/mirrors.aliyun.com/g" `grep deb.debian.org -rl /etc/apt/sources.list`
RUN sed -i "s/security.debian.org/mirrors.aliyun.com/g" `grep security.debian.org -rl /etc/apt/sources.list`
RUN apt-get update
RUN apt-get install zip unzip git libpng-dev -y -qq
RUN apt-get autoremove -y
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN docker-php-ext-install pdo pdo_mysql gd bcmath
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
RUN ln -s ./laravel.ini /usr/local/etc/php/conf.d/laravel.ini
WORKDIR /app
COPY . .
RUN composer install --optimize-autoloader --no-dev
RUN php artisan optimize:clear
RUN php artisan optimize --env=$ENV
