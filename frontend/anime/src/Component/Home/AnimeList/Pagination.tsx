import ReactPaginate from 'react-paginate';
import styles from './styles.module.scss';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch } from '../../../redux/hook';
import { getAnimeListThunk } from '../../../redux/slices/Anime';
import { RefObject, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link, animateScroll as scroll } from 'react-scroll';
interface PaginationProps {
  AnimeContainerRef: RefObject<HTMLDivElement>;
}
const Pagination: React.FC<PaginationProps> = ({ AnimeContainerRef }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isPhoneScreen = useMediaQuery({ query: '(max-width: 461px)' }); // замените на свою логику для определения размера экрана
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' }); // замените на свою логику для определения размера экрана
  const isMiddleScreen = useMediaQuery({ query: '(max-width: 963px)' }); // замените на свою логику для определения размера экрана
  const isBigScreen = useMediaQuery({ query: '(max-width: 1200px)' }); // замените на свою логику для определения размера экрана
  const [firstRender, setFirstRender] = useState(true);
  const hasDataLoaded = localStorage.getItem('hasDataLoaded09');
  const storedSliderData = hasDataLoaded !== null ? JSON.parse(hasDataLoaded) : [];
  const urlParams = new URLSearchParams(window.location.search);
  const currentPage = parseInt(urlParams.get('page') || '1', 10);
  const navigate = useNavigate();
  const [AnimeContainerTop, setAnimeContainerTop] = useState(0);
  useEffect(() => {
    if (AnimeContainerRef.current) {
      const rect = AnimeContainerRef.current.getBoundingClientRect();
      if (rect) {
        const { top } = rect;

        setAnimeContainerTop(top);
      }
    }
  }, [AnimeContainerRef.current]);
  useEffect(() => {
    // Обработка изменений параметров URL при навигации вперед/назад
    const updatedPage = parseInt(urlParams.get('page') || '1', 10);
    const limit = isPhoneScreen ? 11 : isSmallScreen ? 11 : 15;
    console.log(updatedPage, 'here in useEffects', currentPage);

    dispatch(
      getAnimeListThunk({
        currPage: updatedPage,
        limit,
      }),
    );
    if (!firstRender) {
      scroll.scrollTo(AnimeContainerTop, {
        duration: 500, // Продолжительность анимации в миллисекундах
        smooth: 'easeInOutQuad', // тип анимации
      });
    } else {
      setFirstRender(false);
    }
  }, [location.search]);

  function handlePageSelect(selectedPage: { selected: number }) {
    const newPage = selectedPage.selected + 1;
    const limit = isPhoneScreen ? 11 : isSmallScreen ? 11 : 15;

    navigate(`?page=${newPage}&limit=${limit}`);

    if (!firstRender) {
      scroll.scrollTo(AnimeContainerTop, {
        duration: 500, // Продолжительность анимации в миллисекундах
        smooth: 'easeInOutQuad', // тип анимации
      });
    } else {
      setFirstRender(false);
    }
  }

  const pageRangeDisplayed = isPhoneScreen
    ? 3
    : isSmallScreen
    ? 6
    : isMiddleScreen
    ? 8
    : isBigScreen
    ? 10
    : 15;

  return (
    <div style={{ marginRight: isPhoneScreen ? '50px' : '' }}>
      <ReactPaginate
        pageCount={1735}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={0}
        previousLabel={null}
        nextLabel={null}
        breakLabel={null}
        nextLinkClassName={styles.hidden_next_button}
        previousLinkClassName={styles.hidden_next_button}
        onPageChange={handlePageSelect}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        initialPage={currentPage - 1}
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default Pagination;
