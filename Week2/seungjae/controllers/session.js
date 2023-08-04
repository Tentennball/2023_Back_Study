console.log("세션 로그인 사이트");

const id = document.querySelector(".id");
const pw = document.querySelector(".pw");

const loginBtn = document.querySelector(".btn");


loginBtn.addEventListener("click", ()=>{
    const req = {  //입력 정보 저장
        id: id.value,
        pw: pw.value
    };

    fetch("/login", {
        method : "POST",
        headers: {
            "Content-Type":"application/json",
            //"Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(req),  //json으로 변환
        
    })    
});