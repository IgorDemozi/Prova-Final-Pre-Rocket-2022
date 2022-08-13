(function () {

   if (localStorage.getItem("atual-usuario") === null) {
      window.location.href = './login.html';
   }

   $atual_usuario = document.querySelector('#atual-usuario');
   $atual_usuario.textContent = localStorage.getItem('atual-usuario');

   $indicador_usuario = document.querySelector('#index--usuario');
   $sair = document.querySelector('#index--usuario-sair');

   var mostrando = false;

   $indicador_usuario.addEventListener('click', function exibirSair() {

      if (mostrando == false) {
         $sair.setAttribute('style', 'cursor: pointer;');

         $sair.addEventListener('click', function sair() {
            localStorage.setItem('atual-usuario', null);
            window.location.href = './login.html';
         })

         mostrando = true;
      } else {
         $sair.setAttribute('style', 'visibility: hidden;');
         mostrando = false;
      }
   })
})()