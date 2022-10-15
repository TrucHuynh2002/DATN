document.querySelector("#show-login").addEventListener("click", function(){
    document.querySelector(".popup-dangky").classList.remove("active");
  
      document.querySelector(".popup").classList.add("active");
      
  });
  document.querySelector(".popup .close-btn").addEventListener("click", function(){
      document.querySelector(".popup").classList.remove("active");
      
  }); 
  
  
  
  
  
  
  
  document.querySelector("#show-login-dangky").addEventListener("click", function(){
    
  
      document.querySelector(".popup").classList.remove("active");
  
  
      document.querySelector(".popup-dangky").classList.add("active");
     
  
  
  });
  document.querySelector(".popup-dangky .close-btn").addEventListener("click", function(){
      document.querySelector(".popup-dangky").classList.remove("active");
  });