FROM node:14-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn --frozen-lockfile
RUN yarn build

FROM node:14-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime
RUN echo $TZ > /etc/timezone
COPY --from=builder /app .
EXPOSE 3000
CMD ['yarn', 'start']
