import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div>
            <h1>안녕</h1>
            <div>메인페이지</div>
            <Link to="/login">
                <button>로그인 페이지 가기</button>
            </Link>
        </div>
    );
};

export default MainPage;