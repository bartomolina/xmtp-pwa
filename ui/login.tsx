interface LoginProps {
  address: string;
}

export function Login({ address }: LoginProps) {
  return <>Logged in: ${address}</>;
}
