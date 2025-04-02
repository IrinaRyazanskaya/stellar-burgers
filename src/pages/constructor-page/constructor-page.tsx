import { FC } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import {
  BurgerIngredients,
  IngredientDetails,
  BurgerConstructor
} from '@components';
import { Preloader } from '@ui';
import { selectBurgerIngredientsIsLoading } from '@slices';
import { useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

export const ConstructorPage: FC = () => {
  const navigate = useNavigate();

  const goToConstructor = () => navigate('/');

  const isIngredientsLoading = useSelector(selectBurgerIngredientsIsLoading);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
          <Routes>
            <Route
              path='ingredients/:id'
              element={<IngredientDetails onClose={goToConstructor} />}
            />
          </Routes>
        </main>
      )}
    </>
  );
};
