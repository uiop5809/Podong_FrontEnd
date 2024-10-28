import React, { useState } from 'react';
import styled from 'styled-components';
import { requestPayment } from './PGpay';

const Payment = () => {
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [deliveryNote, setDeliveryNote] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [points, setPoints] = useState(0);  // 사용 가능한 포인트
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(''); // 모달에서 선택된 옵션
    const [textInputForEntrance, setTextInputForEntrance] = useState('');  // 공동현관 비밀번호 입력값
    const [textInputForOther, setTextInputForOther] = useState('');  // 기타 입력값

    // 결제 방법 선택 시 실행되는 함수
    const handlePaymentChange = (method) => {
        setPaymentMethod(method);
        if (method === '카드&간편결제') {
        requestPayment();  // 카드&간편결제 선택 시 requestPayment 함수 호출
        }
    };

    // 옵션 선택 시 실행되는 함수
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);  // 선택된 옵션을 상태에 저장
    };

    // 공동현관 비밀번호 입력 시 실행되는 함수
    const handleEntranceTextInputChange = (e) => {
        setTextInputForEntrance(e.target.value);  // 공동현관 비밀번호 값을 상태에 저장
    };

    // 기타 입력 시 실행되는 함수
    const handleOtherTextInputChange = (e) => {
        setTextInputForOther(e.target.value);  // 기타 값을 상태에 저장
    };

    // 모달 닫기 및 저장
    const saveAndCloseModal = () => {
        // '공동현관 비밀번호' 옵션이 선택된 경우 해당 TextInput 값을 deliveryMethod에 반영
        if (selectedOption === '공동현관 비밀번호') {
            setDeliveryMethod(`공동현관 비밀번호 : ${textInputForEntrance}`);  // 공동현관 비밀번호 값 저장
        } 
        // '기타' 옵션이 선택된 경우 해당 TextInput 값을 deliveryMethod에 반영
        else if (selectedOption === '기타') {
            setDeliveryMethod(`기타 : ${textInputForOther}`);  // 기타 값 저장
        } 
        // 다른 옵션이 선택된 경우 해당 라디오 버튼 값을 저장
        else {
            setDeliveryMethod(selectedOption);
        }
            setIsModalOpen(false);  // 모달 닫기
    };
        // 모달 열기
    const openModal = () => {
        setIsModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <PaymentPage>
        <Header>
            <BackButton>{'<'}</BackButton> {/* 뒤로가기 버튼 */}
            <Title>주문 / 결제</Title>
        </Header>
        
        <Section>
            <SectionTitle>주문자 | 배송지</SectionTitle>
            <AddressDetails>
            <p><strong>고창준</strong> <DefaultBadge>기본배송지</DefaultBadge> <EditButton>변경</EditButton></p>
            <p>경기 성남시 엘지구 엘지로 101 (엘지동) 엘지마을, 엘지아파트 104동 1004호</p>
            <p>고창준 010-1111-1111</p>
            </AddressDetails>

            <InputGroup>
            <LabelWrapper>
                <label>배송지 출입방법 *</label>
            </LabelWrapper>
            <InputWrapper>
                <Input 
                type="text" 
                value={deliveryMethod}  // 선택된 옵션이 input에 반영됨
                readOnly
                placeholder="공동현관 비밀번호 #1234" 
                />
                <EditButton onClick={openModal}>변경</EditButton> {/* 변경 버튼 클릭 시 모달 열기 */}
            </InputWrapper>
            </InputGroup>

            <InputGroup>
            <LabelWrapper>
                <label>배송지 메모</label>
            </LabelWrapper>
            <InputWrapper>
                <Input 
                type="text" 
                value={deliveryNote} 
                onChange={(e) => setDeliveryNote(e.target.value)} 
                placeholder="메모를 입력해주세요." 
                />
                <EditButton>변경</EditButton>
            </InputWrapper>
            </InputGroup>
        </Section>

        {/* 모달 팝업 */}
        {isModalOpen && (
            <ModalOverlay>
            <ModalContent>
                <ModalHeader>
                <ModalTitle>배송지 출입방법</ModalTitle>
                <CloseButton onClick={closeModal}>×</CloseButton>
                </ModalHeader>
                <ModalBody>
                <p>배송 안내사항을 꼭 확인해 주세요!</p>
                <Instruction>
                    <ul>
                    <li>받으실 곳은 배송지 메모에 작성해주세요.</li>
                    <li>배송지 출입 방법이 정확하지 않을 경우, 1층 또는 경비실 앞에 배송될 수 있습니다.</li>
                    </ul>
                </Instruction>
                <div>
                    <Option>
                    <input 
                        type="radio" 
                        name="delivery" 
                        value="공동현관 비밀번호"  // 옵션 값 설정
                        onChange={handleOptionChange}  // 라디오 버튼 선택 시 호출
                    />
                    <label>공동현관 비밀번호</label>
                    <TextInput 
                        placeholder="예: #1234" 
                        value={textInputForEntrance}  // 공동현관 비밀번호 값을 상태로 관리
                        onChange={handleEntranceTextInputChange}  // TextInput 변경 시 호출
                    />
                    </Option>
                    <Option>
                    <input 
                        type="radio" 
                        name="delivery" 
                        value="자유출입 가능 & 공동현관 없음"  // 옵션 값 설정
                        onChange={handleOptionChange}  // 라디오 버튼 선택 시 호출
                    />
                    <label>자유출입 가능 & 공동현관 없음</label>
                    </Option>
                    <Option>
                    <input 
                        type="radio" 
                        name="delivery" 
                        value="경비실 호출"  // 옵션 값 설정
                        onChange={handleOptionChange}  // 라디오 버튼 선택 시 호출
                    />
                    <label>경비실 호출</label>
                    </Option>
                    <Option>
                    <input 
                        type="radio" 
                        name="delivery" 
                        value="기타"  // '기타' 옵션 선택
                        onChange={handleOptionChange}  // 라디오 버튼 선택 시 호출
                    />
                    <label>기타</label>
                    <TextInput 
                        placeholder="직접 입력" 
                        value={textInputForOther}  // 기타 값을 상태로 관리
                        onChange={handleOtherTextInputChange}  // TextInput 변경 시 호출
                    />
                    </Option>
                </div>
                </ModalBody>
                <ModalFooter>
                <SaveButton onClick={saveAndCloseModal}>저장</SaveButton> {/* 저장 버튼 클릭 시 옵션 반영 */}
                </ModalFooter>
            </ModalContent>
            </ModalOverlay>
        )}

        <Section>
            <SectionTitle>포인트</SectionTitle>
            <PointsBox>
            <Input readOnly value={`사용 가능한 포인트 ${points.toLocaleString()} P`} />
            <Button>전액사용</Button>
            </PointsBox>
        </Section>

        <Section>
            <SectionTitle>결제수단</SectionTitle>
            <PaymentMethods>
            <label>
                <input 
                type="radio" 
                name="payment" 
                value="카드&간편결제" 
                onChange={() => handlePaymentChange('카드&간편결제')}
                />
                카드&간편결제
            </label>
            <label>
                <input 
                type="radio" 
                name="payment" 
                value="무통장입금" 
                onChange={() => handlePaymentChange('무통장입금')}
                />
                무통장입금
            </label>
            <label>
                <input 
                type="radio" 
                name="payment" 
                value="핸드폰" 
                onChange={() => handlePaymentChange('핸드폰')}
                />
                핸드폰
            </label>
            </PaymentMethods>
        </Section>

        <Section>
            <SectionTitle>결제금액</SectionTitle>
            <OrderSummary>
            <p>총 상품 금액: <span>37,000원</span></p>
            <p>배송비: <span>0원</span></p>
            <p>쿠폰 사용: <span>0원</span></p>
            <p>포인트 사용: <span>0원</span></p>
            </OrderSummary>
            <FinalAmount>
            <p>최종 결제 금액: <span>37,000원</span></p>
            <p>37 P 적립 예정</p>
            </FinalAmount>
        </Section>

        <Section>
            <TermsLabel>
            <input type="checkbox" />
            주문 내용을 확인했으며 결제에 동의합니다. (필수)
            </TermsLabel>
            <TermsLabel>
            <input type="checkbox" />
            개인정보 수집 이용 및 제 3자 제공 동의 (필수)
            </TermsLabel>
        </Section>

        <PaymentButton>
            37,000원 결제하기
        </PaymentButton>
        </PaymentPage>
    );
};

export default Payment;

const PaymentPage = styled.div`
    width: 100%;
    max-width: 500px;
    margin: 64px auto;
    font-family: Arial, sans-serif;
    padding: 20px;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    padding-bottom: 16px;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    flex: 1;
    text-align : center;
`;

const BackButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
`;

const Section = styled.section`
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
    margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
    font-weight : bold;
`;

const AddressDetails = styled.div`
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    font-size: 14px;
`;

const DefaultBadge = styled.span`
    color: #ff7f50;
    background-color: #fff0e1;
    border-radius: 4px;
    margin-left : 5px;
    padding: 2px 5px;
    font-size: 11px;
`;

const EditButton = styled.button`
    background-color: #ffefef;
    color: #ff6e00;
    padding: 6px 14px;
    border: none;
    border-radius: 4px;
    margin-left : 4px;
    font-size: 10px;
    cursor: pointer;
    font-weight : bold;
`;

const InputGroup = styled.div`
    margin-top: 20px;
`;

const LabelWrapper = styled.div`
    margin-bottom: 5px;
    font-weight: bold;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    width: calc(100% - 70px);
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    margin-right: 10px;
`;

const PointsBox = styled.div`
    display: flex;
    align-items: center;
`;

const Button = styled.button`
    background-color: #ff6e00;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 10px;

    &:hover {
        background-color: #ff6e00;
    }
`;

const PaymentMethods = styled.div`
    label {
        display: flex;
        align-items: center;
        font-size: 16px;
        margin: 10px 0;
    }

    input {
        margin-right: 10px;
    }
`;

const OrderSummary = styled.div`
    p {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
    }
`;

const FinalAmount = styled.div`
    p {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        font-size: 16px;
        color: #ff6e00;
    }
`;

const TermsLabel = styled.label`
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-bottom: 10px;
`;

const PaymentButton = styled.button`
    width: 100%;
    background-color: #ff6e00;
    color: white;
    padding: 15px;
    border: none;
    border-radius: 4px;
    font-size: 18px;
    cursor: pointer;

    &:hover {
        background-color: #ff6e00;
    }
`;

/* 모달 관련 스타일 */
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const ModalContent = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
`;

const ModalTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
`;

const ModalBody = styled.div`
    p {
        font-size: 14px;
        margin-bottom: 10px;
        font-weight: bold;
    }
`;

const Instruction = styled.div`
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 15px;
    font-size: 14px;
    margin-bottom: 20px;
    color: #666;

    ul {
        padding-left: 20px;
        margin-top: 10px;
    }

    li {
        list-style: disc;
        margin-bottom: 8px;
    }
`;

const Option = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    [type="radio"], span {
    vertical-align: middle;
    }

    [type="radio"] {
    appearance: none;
    border: max(2px, 0.1em) solid gray;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    transition: border 0.1s ease-in-out;
    }

    [type="radio"]:checked {
    border: 0.4em solid tomato;
    }

    [type="radio"]:focus-visible {
    outline-offset: max(2px, 0.1em);
    outline: max(2px, 0.1em) dotted tomato;
    }

    [type="radio"]:hover {
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
    cursor: pointer;
    }

    [type="radio"]:hover + span {
    cursor: pointer;
    }

    [type="radio"]:disabled {
    background-color: lightgray;
    box-shadow: none;
    opacity: 0.7;
    cursor: not-allowed;
    }

    [type="radio"]:disabled + span {
    opacity: 0.7;
    cursor: not-allowed;
    }

    label {
        font-size: 16px;
        font-weight: bold;
    }
`;

const TextInput = styled.input`
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-left: 12px;
    font-size: 14px;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const SaveButton = styled.button`
    width: 100%;
    background-color: #ff7f50;
    color: white;
    padding: 15px 0;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background-color: #ff6347;
    }
`;
