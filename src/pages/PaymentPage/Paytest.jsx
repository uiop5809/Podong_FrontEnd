import React, { useState } from 'react';
import axios from 'axios';

function OrdersPage() {
    const [cartIds, setCartIds] = useState('');
    const [postCode, setPostCode] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [ordererName, setOrdererName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [payMethod, setPayMethod] = useState('CARD');

    const axiosInstance = axios.create({ withCredentials: true }); // 세션값을 저장하고 사용하기 위해 호출

    // 장바구니 -> 주문하기 api 호출 : 세션에 주문정보 저장하는 함수 필요

    // 결제하기 누르면 사용자 입력 + 세션 저장값 -> 주문 테이블 -> 결제 함수 호출
    async function completeOrder() { 
        try { // 세션값 사용해야 하므로 axiosInstance 사용
            const response = await axiosInstance.post('http://localhost:8080/api/v1/order/done', {
                postCode, 
                address,
                detailAddress,
                ordererName,
                phoneNumber,
                payMethod // CARD, TRANS, VBANK, PHONE 중 하나로
            });
            console.log(response.data);
            handlePayment(response.data);  // 결제 함수 호출 - 리턴값을 파라미터로
            
        } catch (error) {
            console.error('Error completing order:', error);
        }
    }