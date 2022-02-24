import { Toast } from 'antd-mobile';
import { match, select, __ } from 'ts-pattern';
import { ValidationError } from 'yup';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

export const error = (
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
      .with({ errorFields: [{ errors: [select()] }] }, (_) => {
        return {
          message: _[0][0],
        };
      })
      // yup 校验异常
      .with({ errors: [select()] }, (_) => {
        return {
          message: _[0],
        };
      })
      // Error 异常处理
      .with({ message: __.string }, (_) => {
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
