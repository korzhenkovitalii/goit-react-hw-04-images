import { BallTriangle } from 'react-loader-spinner';
import css from 'components/Loader/Loader.module.css'

export const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4550a7"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
};
