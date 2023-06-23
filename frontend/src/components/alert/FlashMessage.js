import '../../public/css/FlashMessage.css';
import Alert from 'react-bootstrap/Alert';

export function FlashMessage({ message, variant }) {
  return (
    <div id="flash-message">
      <Alert className={`text-center text-light bg-${variant}`} key={variant}>
        {message}
      </Alert>
    </div>
  );
}
