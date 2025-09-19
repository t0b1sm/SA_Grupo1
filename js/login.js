function login(){
    window.location.href = "index.html";

    var senha = document.getElementById("senha").value;
    var email = document.getElementById("email").value;

    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha)
}