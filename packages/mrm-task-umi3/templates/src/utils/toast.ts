import { Toast } from 'antd-mobile';
import { match, P } from 'ts-pattern';
import type { ValidationError } from 'yup';
import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';

const error = (
  e: ValidateErrorEntity | ValidationError | Error,
): Promise<void> => {
  return new Promise((resolve) => {
    const {
      message,
      afterClose,
    }: {
      message: string;
      afterClose?: () => void;
    } = match(e)
      // 表单验证异常
      .with({ errorFields: [{ errors: [P.select()] }] }, (_) => {
        return {
          message: _[0][0],
        };
      })
      // yup 校验异常
      .with({ errors: [P.select()] }, (_) => {
        return {
          message: _?.[0] ?? _,
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
