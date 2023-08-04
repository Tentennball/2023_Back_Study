console.log("회원가입 사이트");

const id = document.querySelector(".id");
const pw = document.querySelector(".pw");

const registerBtn = document.querySelector(".btn");


registerBtn.addEventListener("click", ()=>{
    const req = {  //입력 정보 저장
        id: id.value,
        pw: pw.value
    };
    console.log("회원가입 레스고");
    fetch("/register", {
        method : "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(req),  //json으로 변환
    });
});
