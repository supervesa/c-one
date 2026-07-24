import './css/buttons.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'action';
  label: string;
}

export function Button({ variant = 'primary', label, className = '', ...props }: ButtonProps) {
  const baseClass = variant === 'primary' ? 'brutal-btn-primary' : 'brutal-btn-action';
  return (
    <button className={"brutal-btn-base " + baseClass + " " + className} {...props}>
      {variant === 'action' ? "[ " + label + " ]" : label}
    </button>
  );
}