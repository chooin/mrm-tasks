import { Toast } from 'antd-mobile';
import { match, P } from 'ts-pattern';
import type { ValidationError } from 'yup';

const error = (e: ValidationError | Error): Promise<void> => {
  return new Promise((resolve) => {
    const {
      message,
      afterClose,
    }: {
      message: string;
      afterClose?: () => void;
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

    Toast.show({
      content: message,
      position: 'center',
      maskClickable: true,
      duration: Math.min(message.length * 300, 8000),
      afterClose: () => {
        resolve();
        afterClose?.();
      },
    });
  });
};

export default {
  error,
};
