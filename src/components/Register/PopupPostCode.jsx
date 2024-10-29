import React, { useEffect } from 'react';
import DaumPostcode from "react-daum-postcode";

const PopupPostCode = ({ onClose, setAddress, setZoneCode }) => {
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setAddress(fullAddress);
        setZoneCode(data.zonecode);
        onClose(); 
    };

    // 클릭 외부 감지
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest('.popup-container')) return; 
            onClose(); 
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "30%",
        left: "50%", 
        transform: "translateX(-50%)", 
        width: "400px",
        height: "500px",
        padding: "10px", 
        backgroundColor: "#fff", 
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", 
        borderRadius: "8px",
        zIndex: 1000, 
        overflow: "auto", 
    };

    return (
        <div className="popup-container">
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
            <button type='button' onClick={onClose} className='postCode_btn'>닫기</button>
        </div>
    );
}

export default PopupPostCode;
