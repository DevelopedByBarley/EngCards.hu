import { ClipLoader } from 'react-spinners';

export const Spinner = () => {
  return (
    <div className='d-flex align-items-center justify-content-center' style={{minHeight: "90vh"}}>
      <ClipLoader size={40} />
    </div>
  )
}