import './styles.scss';
type CollectionItemProps = {
  CollectionName: string;
  images: any;
};
const CollectionItem: React.FC<CollectionItemProps> = ({ CollectionName, images }) => {
  return (
    <>
      <div className="collection_title_container">
        <span className="collection_title">The Best</span>
        <span className="collection_title">{`${CollectionName} Anime`}</span>
      </div>
      <div className="fan-container">
        <img
          src={images[0]}
          alt="Image 1"
          className="fan-image"
          style={{ transform: 'rotate(350deg)', zIndex: 1 }}
        />
        <img
          src={images[1]}
          alt="Image 2"
          className="fan-image"
          style={{ transform: 'rotate(-2deg)', zIndex: 2, marginLeft: '-40px' }}
        />
        <img
          src={images[2]}
          alt="Image 3"
          className="fan-image"
          style={{
            transform: 'rotate(17deg)',
            zIndex: 3,
            marginLeft: '-84px',
            marginTop: '-35px',
            marginBottom: '-100px',
          }}
        />
      </div>
    </>
  );
};

export default CollectionItem;
