import { Link } from 'react-router-dom';

export default function AuthForm({
  title,
  onSubmit,
  buttonText,
  linkText,
  linkPath,
  children,
}) {
  return (
    <form onSubmit={onSubmit} className="auth-form">
      <h2>{title}</h2>
      <div className="form-group">
        {children}
      </div>
      <button type="submit" className="auth-button">
        {buttonText}
      </button>
      <div className="auth-link">
        <Link to={linkPath}>{linkText}</Link>
      </div>
    </form>
  );
}