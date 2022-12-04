import React from 'react';

function HeartRoom() {

    // xu ly ty
    const handleClick = (e) => {
      var btnColor = document.querySelector(".btn_heart");
      if(btnColor.style.color === 'red'){
        btnColor.style.color = 'white'
      }
      else{
        btnColor.style.color = 'red'
      }
    };

  return (
    <i onClick ={(e) => handleClick(e)} className='btn_heart bx bxs-heart'></i>
  )
}

export default HeartRoom