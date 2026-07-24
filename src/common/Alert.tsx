import './css/alerts.css';

export function Alert({ message, type = 'sys' }: { message: string, type?: 'success' | 'error' | 'sys' }) {
  return (
    <div className={"brutal-alert " + type}>
      [ {type.toUpperCase()}_MSG ] // {message}
    </div>
  );
}