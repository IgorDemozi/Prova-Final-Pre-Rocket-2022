(function () {

   var $texto = document.querySelector('#biblioteca--pesquisa-texto');
   var $bt_buscar = document.querySelector('#biblioteca--pesquisa-botao');
   var $filtro = document.querySelector('#biblioteca--pesquisa-filtro');
   var $itens = document.querySelector('#biblioteca--itens');

   var dados;
   var lista = [];

   fetch('./data.json').then(response => {
      return response.json();
   }).then(body => {
      dados = body.data;
   });

   $bt_buscar.addEventListener('click', function buscar(e) {

      $itens.innerHTML = '';

      lista = [];      
      var i = 0;

      dados.books.forEach(item => {
         var txt = $texto.value.toLowerCase();

         if (item.title.toLowerCase().includes(txt)) {
            $itens.classList.remove('invisivel');
            criarElementos(item);
            lista [i] = item;
            i++;
         }
      })

      e.preventDefault();
   })

   $filtro.addEventListener('change', function ordenar() {

      if ($filtro.value == 'genero') {
         lista.sort((a, b) => a.genre.localeCompare(b.genre));
      } else if ($filtro.value == 'autor') {
         lista.sort((a, b) => a.author.localeCompare(b.author));
      } else if ($filtro.value == 'data') {
         lista.sort(function (a, b) {
            var data1 = a.systemEntryDate.split("/").reverse().join("-");
            var data2 = b.systemEntryDate.split("/").reverse().join("-");
            return new Date(data1) - new Date(data2);
         });
      }
      else {
         return;
      }

      $itens.innerHTML = '';

      lista.forEach(item => {
         criarElementos(item);
      })
   })

   function criarElementos(item) {
      var $nova_div = document.createElement('div');
      $nova_div.classList.add('item');
      $itens.appendChild($nova_div);

      var $nova_span_img = document.createElement('span');
      $nova_span_img.innerHTML = '<img src="' + item.image + '"></img>';
      $nova_div.appendChild($nova_span_img);

      var $nova_span_ttl = document.createElement('span');
      $nova_span_ttl.innerHTML = '<p>' + item.title + '</p>';
      $nova_div.appendChild($nova_span_ttl);
   }
})()