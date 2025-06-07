// src/hooks/useRedirection.ts
import { useNavigate } from 'react-router';

export function Redirection() {
  const navigate = useNavigate();

  const redirectTo = (path: string) => {
    navigate(path);
  };

  return redirectTo;
}
