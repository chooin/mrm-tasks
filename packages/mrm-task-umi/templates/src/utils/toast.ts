import { match, P } from 'ts-pattern';
import type { ValidationError } from 'yup';

const error = (e: ValidationError | Error): Promise<void> => {
  return new Promise((resolve) => {
    const {
      message,
    }: {
      message: string;
    } = match(e)
      // yup 校验异常
      .with({ errors: P.select() }, (_) => {
        return {
          message: _[0],
        };
      })
      // Error 异常处理
      .with({ message: P.string }, (_) => {
        return {
          message: _.message,
        };
      })
      .otherwise(() => {
        return {
          message: '未知错误',
        };
      });

    window.alert(message);
  });
};

export default {
  error,
};
