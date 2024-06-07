'use client';

import { type ReactElement, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { toast } from 'sonner';

import Button from '@/app/components/button';

import { FcGoogle } from 'react-icons/fc';
import { BiLogoGithub } from 'react-icons/bi';
import scss from './scss/oauth-buttons.module.scss';

type ErrorCode = {
  code: string;
  message: string;
};

const errorCodes: ErrorCode[] = [
  {
    code: '403',
    message: 'User has been deactivated.',
  },
  {
    code: 'access_denied',
    message: 'Authentication cancelled.',
  },
];

type AuthProvider = {
  name: 'google' | 'github';
  svgIcon: ReactElement;
  actionText?: string;
};

const authProviders: AuthProvider[] = [
  {
    name: 'google',
    svgIcon: <FcGoogle size={18} />,
    actionText: 'Continue with Google',
  },
  {
    name: 'github',
    svgIcon: <BiLogoGithub size={19} />,
    actionText: 'Continue with GitHub',
  },
];

export default function OuathButtons() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const [loading, setLoading] = useState<Record<AuthProvider['name'], boolean>>({
    google: false,
    github: false,
  });

  const handleLoading = (provider: AuthProvider['name'], state: boolean) => {
    setLoading((prev) => ({ ...prev, [provider]: state }));
  };

  const handleErrorAlert = (message: string) => {
    toast.error(message, {
      position: 'top-right',
      duration: 9000,
    });
  };

  useEffect(() => {
    if (error) {
      const errorCode = errorCodes.find((item) => item.code === error);

      router.replace('/sign-in');

      if (errorCode) {
        return () => {
          handleErrorAlert(errorCode.message);
        };
      }
    }
  }, [error]);

  return (
    <>
      <div className={scss.buttons}>
        {authProviders.map((provider, index) => (
          <Button
            key={index}
            type="button"
            load={loading[provider.name]}
            redirect={`${process.env.NEXT_PUBLIC_API_URL}/${provider.name}/callback`}
            onClick={() => handleLoading(provider.name, true)}
          >
            {provider.svgIcon} {provider.actionText}
          </Button>
        ))}
      </div>
    </>
  );
}
