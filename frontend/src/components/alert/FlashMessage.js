
import Alert from 'react-bootstrap/Alert';

export function FlashMessage({ message, variant }) {
  return (
    <Alert className={`text-center text-light bg-${variant} fixed-top`} key={variant}>
      {message}
    </Alert>
  )
}