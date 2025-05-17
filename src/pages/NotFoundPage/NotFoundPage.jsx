import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={css.wrapper}>
      <button className={css.btn} onClick={() => navigate('/')}>
        <FaArrowAltCircleLeft /> Go Home
      </button>
      <p className={css.text}>404... Page not found...</p>
    </div>
  );
}
