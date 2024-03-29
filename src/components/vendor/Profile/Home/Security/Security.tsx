import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';

import { Card } from '@/components/common';
import { Input } from '@/components/forms';

import { HttpService } from '@/services';

import styles from './Security.module.scss';

interface ICredential {
  password: string;
  confirm: string;
}

export interface ISecurity {
  className?: string;
}

const initialCredential: ICredential = {
  password: '',
  confirm: '',
};

export function Security({ className = '' }: ISecurity) {
  const [credential, setCredential] = useState<ICredential>(initialCredential);
  const [isPassShow, setIsPassShow] = useState(false);
  const [isConfirmShow, setIsConfirmShow] = useState(false);

  const onPassChange =
    (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setCredential({
        ...credential,
        [field]: e.target.value,
      });
    };

  const onPassToggleClick = () => {
    setIsPassShow(!isPassShow);
  };

  const onConfirmToggleClick = () => {
    setIsConfirmShow(!isConfirmShow);
  };

  const onPassUpdate = () => {
    HttpService.post('/user/vendor/update-password', { password: credential.password})
  };

  return (
    <Card title="Security" className={clsx(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.control}>
            <p>Password</p>
            <Input
              type={isPassShow ? 'text' : 'password'}
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Password"
              value={credential.password}
              updateValue={onPassChange('password')}
              adornment={{
                position: 'right',
                content: (
                  <p className={styles.showButton} onClick={onPassToggleClick}>
                    {isPassShow ? 'Hide' : 'Show'}
                  </p>
                ),
                isText: true,
              }}
            />
          </div>
          <div className={styles.control}>
            <p>Confirm Password</p>
            <Input
              type={isConfirmShow ? 'text' : 'password'}
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Confirm Password"
              value={credential.confirm}
              updateValue={onPassChange('confirm')}
              adornment={{
                position: 'right',
                content: (
                  <p
                    className={styles.showButton}
                    onClick={onConfirmToggleClick}
                  >
                    {isConfirmShow ? 'Hide' : 'Show'}
                  </p>
                ),
                isText: true,
              }}
            />
          </div>
        </div>
        <div className={styles.buttonBar}>
          <button onClick={onPassUpdate}>Update</button>
        </div>
      </div>
    </Card>
  );
}
