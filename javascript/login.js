(function () {
   $email = document.querySelector('.campo-email');
   $senha = document.querySelector('.campo-senha');
   $botao_entrar = document.querySelector('#login--botao');

   var dados;

   fetch('./data.json').then(response => {
      return response.json();
   }).then(body => { 
      dados = body.data;
   });

   $botao_entrar.addEventListener('click', function login() {

      if ($email.value == '' || $senha.value == ''){
         alert('Informe E-Mail e senha');
         return;
      }

      dados.login.forEach(item => {
         
         if ($email.value == item.email && $senha.value == item.password){
            window.location.href = './index.html';
            localStorage.setItem('atual-usuario', item.email);
         }
      });

   });
})()