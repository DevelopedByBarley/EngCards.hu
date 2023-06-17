
import Alert from 'react-bootstrap/Alert';

export function FlashMessage({ message, variant }) {
  return (
    <Alert className={`text-center text-light bg-${variant}`} key={variant}>
      {message}
    </Alert>
  )
}