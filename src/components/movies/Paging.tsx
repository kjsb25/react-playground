import Pagination from 'react-bootstrap/Pagination';

type Props = {
  onPageSelect: (newPage: number) => void;
  numPages?: number;
  activeKey: number;
};

const defaultNumPages = 10;

function Paging(props: Props) {
  function onClick(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log(e.currentTarget);
    if (Number(e.currentTarget.textContent)) {
      props.onPageSelect(Number(e.currentTarget.textContent));
    }
  }

  const numPages = props.numPages ? props.numPages : defaultNumPages;

  return (
    <Pagination size="lg">
      {[...Array(numPages)].map((value, index) => {
        let page = index + 1 + props.activeKey - numPages / 2;
        if (page >= 1) {
          return (
            <Pagination.Item
              key={page}
              active={page === props.activeKey}
              onClick={onClick}
            >
              {page}
            </Pagination.Item>
          );
        } else {
          return <></>;
        }
      })}
    </Pagination>
  );
}

export default Paging;
