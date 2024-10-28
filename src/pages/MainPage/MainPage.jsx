import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import styled from 'styled-components';
import dummyData from '../../dummy.json';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [activeTab, setActiveTab] = useState('댕댕이');
  const [activeCategory, setActiveCategory] = useState('전체');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageRange, setPageRange] = useState([1]);
  const [searchQuery, setSearchQuery] = useState('');
  const useDummyData = true;
  const itemsPerPage = 8;

  const tabs = ['댕댕이', '고냥이'];
  const categories = ['전체', '사료', '간식', '영양제', '용품'];

  const shoppingData = async () => {
    if (useDummyData) {
      const filteredData = dummyData.items.filter(item => item.title.includes(searchQuery));
      setData(filteredData);
      updatePageRange(filteredData.length);
      console.log('Using dummy data:', filteredData);
    } else {
      const URL = '/v1/search/shop.json';
      const ClientID = 'pbrU5z9Fz5jVwPM575m5';
      const ClientSecret = 'En9XTv8UVY';

      const categoryQuery = activeCategory === '전체' ? '' : ` ${activeCategory}`;
      const finalQuery = `강아지${categoryQuery}${searchQuery ? ` ${searchQuery}` : ''}`;
      console.log('Final Query:', finalQuery);

      try {
        const response = await axios.get(URL, {
          params: {
            query: finalQuery,
            display: 50,
          },
          headers: {
            'X-Naver-Client-Id': ClientID,
            'X-Naver-Client-Secret': ClientSecret,
          },
        });
        console.log('Response Data:', response.data.items);
        setData(response.data.items || []);
        updatePageRange(response.data.items.length); // 검색된 데이터 길이에 따라 페이지 범위 업데이트
      } catch (error) {
        console.error('Error fetching shopping data:', error);
        setData([]);
        updatePageRange(0); // 데이터가 없을 경우 페이지 범위를 초기화
      }
    }
  };

  const updatePageRange = dataLength => {
    const totalPageCount = Math.ceil(dataLength / itemsPerPage);
    const newRange = Array.from({ length: Math.min(totalPageCount, 5) }, (_, idx) => idx + 1);
    setPageRange(newRange);
    setPage(1); // 검색 시 첫 페이지로 이동
  };

  useEffect(() => {
    shoppingData();
  }, [activeCategory, searchQuery]);

  const paginatedData = data.length > 0 ? data.slice((page - 1) * itemsPerPage, page * itemsPerPage) : [];

  const handlePageChange = newPage => {
    setPage(newPage);
  };

  const handleSearch = () => {
    shoppingData();
  };

  const handleNextPageRange = () => {
    const maxPage = Math.ceil(data.length / itemsPerPage);
    if (pageRange[pageRange.length - 1] < maxPage) {
      const nextRangeStart = pageRange[pageRange.length - 1] + 1;
      const newRange = Array.from(
        { length: Math.min(5, maxPage - nextRangeStart + 1) },
        (_, idx) => nextRangeStart + idx,
      );
      setPageRange(newRange);
      setPage(nextRangeStart);
    }
  };

  const handlePrevPageRange = () => {
    if (pageRange[0] > 1) {
      const prevRangeStart = pageRange[0] - 5;
      const newRange = Array.from({ length: 5 }, (_, idx) => prevRangeStart + idx);
      setPageRange(newRange);
      setPage(prevRangeStart);
    }
  };

  return (
    <>
      <MainCarousel>캐러셀</MainCarousel>
      <TextWrap>
        <TextSm>
          <MainTextColor>사랑하는 우리응애</MainTextColor>
          용품 한 곳에서 해결하세요!
        </TextSm>
        <SearchBarWrap>
          <SearchInputWrap>
            <SearchInput
              type="text"
              placeholder="검색어 입력"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <SearchIcon onClick={handleSearch} />
          </SearchInputWrap>
        </SearchBarWrap>
      </TextWrap>
      <TabWrap>
        {tabs.map(tab => (
          <Tab key={tab} $active={activeTab === tab} onClick={() => setActiveTab(tab)}>
            {tab}
          </Tab>
        ))}
      </TabWrap>
      <CategoryWrap>
        {categories.map(category => (
          <Category key={category} $active={activeCategory === category} onClick={() => setActiveCategory(category)}>
            {category}
          </Category>
        ))}
      </CategoryWrap>

      <ProductGrid>
        {paginatedData.map(product => (
          <ProductWrap key={product.productId}>
            <Link to={`/shoppingDetail/${product.productId}`} state={{ product }}>
              <ProductImage src={product.image} alt={product.title} />
              <ProductTitle>{product.title.replace(/<b>/g, '').replace(/<\/b>/g, '')}</ProductTitle>
              <ProductPrice>{Number(product.lprice).toLocaleString()}원</ProductPrice>
            </Link>
          </ProductWrap>
        ))}
      </ProductGrid>

      <Pagination>
        <PageButton onClick={handlePrevPageRange} disabled={pageRange[0] === 1}>
          <MdKeyboardDoubleArrowLeft size={15} />
        </PageButton>
        {pageRange.map(p => (
          <PageButton key={p} onClick={() => handlePageChange(p)} $active={page === p}>
            {p}
          </PageButton>
        ))}
        <PageButton
          onClick={handleNextPageRange}
          disabled={pageRange[pageRange.length - 1] >= Math.ceil(data.length / itemsPerPage)}>
          <MdKeyboardDoubleArrowRight size={15} />
        </PageButton>
      </Pagination>
    </>
  );
};

export default MainPage;

const MainCarousel = styled.div`
  width: 100%;
  height: 140px;
  background-color: #d9d9d9;
  margin-top: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TextSm = styled.div`
  font-size: 11px;
  font-weight: bold;
  display: flex;
  padding: 0 0 0 16px;
`;

const MainTextColor = styled.div`
  color: #ff6e00;
  margin-right: 4px;
`;

const SearchBarWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

const SearchInputWrap = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 0px 8px 12px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  outline: none;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #888;
    font-size: 12px;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 10px;
`;

const TabWrap = styled.div`
  display: flex;
  justify-content: start;
  padding: 0 12px;
  width: 100%;
`;

const Tab = styled.div`
  font-size: 14px;
  font-weight: bold;
  padding: 8px 4px;
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#ff6e00' : '#888')};
  border-bottom: ${({ $active }) => ($active ? '3px solid #ff6e00' : 'none')};
  transition: color 0.3s ease;

  &:hover {
    color: #ff6e00;
  }
`;

const CategoryWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
`;

const Category = styled.div`
  font-size: 12px;
  text-align: center;
  width: 56px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${({ $active }) => ($active ? '#ff6e00' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#fff' : '#000')};
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #ff6e00;
    color: #fff;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 0 16px 16px 16px;
`;

const ProductWrap = styled.div`
  width: 100%;
  padding: 8px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  background-image: cover;
`;

const ProductTitle = styled.div`
  margin: 8px 0;
  width: 140px;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductPrice = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 80px 0;
`;

const PageButton = styled.button`
  display: flex;
  align-items: center;
  margin: 0 4px;
  padding: 8px;
  font-weight: bold;
  color: ${({ $active }) => ($active ? '#ff6e00' : '#818181')};
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    color: #ff6e00;
  }
`;
