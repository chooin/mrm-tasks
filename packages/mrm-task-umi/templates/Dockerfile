FROM node:14-alpine
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime
RUN echo $TZ > /etc/timezone
EXPOSE 3000
CMD ['yarn', 'start']
