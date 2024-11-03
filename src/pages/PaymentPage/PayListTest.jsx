import { useState, useEffect } from 'react';
import axios from 'axios';

const PayListTest = () => {
    const userId = 1; // userId가 상수로 선언되어 1로 설정
    const [paymentLogs, setPaymentLogs] = useState([]); // 데이터를 배열로 초기화

    useEffect(() => {
        const fetchPaymentLogs = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/payment/list/${userId}`);
                console.log(response.data); // 응답 데이터 확인
                setPaymentLogs(response.data); // 응답 데이터가 배열인 경우에 데이터를 상화에 저장
            } catch (error) {
                console.error("Error fetching payment logs:", error);
            }
        };

        fetchPaymentLogs();
    }, [userId]);

    return (
        <div>
            <h2>결제내역</h2>
            <ul>
                {paymentLogs.map((log, index) => (
                    <li key={index}>
                        <p><strong>User ID(유저ID) :</strong> {log.userId}</p>
                        <p><strong>Merchant ID(구매자ID) :</strong> {log.merchantId}</p>
                        <p><strong>IMP UID(결제번호) :</strong> {log.impUid}</p>
                        <p><strong>Created At(생성일) :</strong> {new Date(log.createdAt).toLocaleString()}</p>
                        <p><strong>Card Name(카드명) :</strong> {log.cardName}</p>
                        <p><strong>Card Number(카드번호) :</strong> {log.cardNumber}</p>
                        <p><strong>Approval Number(카드승인번호) :</strong> {log.approvalNumber}</p>
                        <p><strong>Installment Months(할부개월수) :</strong> {log.installmentMonths}</p>
                        <p><strong>Pay Name(결제명) :</strong> {log.payName}</p>
                        <p><strong>Pay Amount(결제금액) :</strong> {log.payAmount}</p>
                        <p><strong>Pay Method(결제방법) :</strong> {log.payMethod}</p>
                        <p><strong>Pay Status(결제상태) :</strong> {log.payStatus}</p>
                        <p><strong>PG(PG사명) :</strong> {log.pg}</p>
                        <p><strong>Updated At(수정일) :</strong> {new Date(log.updatedAt).toLocaleString()}</p>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PayListTest;
