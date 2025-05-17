import css from './SearchForm.module.css';

import { FaSearch } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';

export default function SearchForm({ onSearch }) {
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const topic = form.elements.topic.value;

    if (form.elements.topic.value.trim() === '') {
      toast('Please fill the field', { position: 'top-right', icon: '❌' });
      return;
    }

    onSearch(topic);
    form.reset();
  };

  return (
    <div className={css.container}>
      <Toaster />
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.wrapper}>
          <FaSearch className={css.icon} />
          <input type="text" name="topic" className={css.input} />
        </div>
        <button className={css.btn}>Search</button>
      </form>
    </div>
  );
}
