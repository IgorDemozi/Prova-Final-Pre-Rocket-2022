(function () {

   $imagem = document.querySelector('#imagem');
   $img_tag = document.querySelector('#img-tag');
   $img_txt = document.querySelector('#cadastro--nova-capa-texto');
   $titulo = document.querySelector('#titulo');
   $sinopse = document.querySelector('#sinopse');
   $autor = document.querySelector('#autor');
   $genero = document.querySelector('#genero');
   $data = document.querySelector('#data');
   $cancelar = document.querySelector('#cadastro--botao-cancelar');
   $salvar = document.querySelector('#cadastro--botao-salvar');

   var dados;
   var idDoLivro = JSON.parse(localStorage.getItem('id-do-livro'));
   idDoLivro = parseInt(idDoLivro);

   fetch('./data.json').then(response => {
      return response.json();
   }).then(body => {
      dados = body.data;
   });

   var livroParaEditar = JSON.parse(localStorage.getItem('livro-para-editar'));

   if (document.URL.includes('editar.html')) {

      var data = livroParaEditar.systemEntryDate;
      data = data.split("/").reverse().join("-");

      if (livroParaEditar.image == '') {
         $img_tag.src = "/imagens/Caminho 261.svg";
         $img_txt.removeAttribute('style');
      } else {
         $img_txt.setAttribute('style', 'display:none;');
         $img_tag.src = livroParaEditar.image;
      }

      $titulo.value = livroParaEditar.title;
      $sinopse.value = livroParaEditar.synopsis;
      $autor.value = livroParaEditar.author;
      $genero.value = livroParaEditar.genre;
      $data.value = data;
   }

   $salvar.addEventListener('click', function salvarLivro() {

      if ($titulo.value == '' || $sinopse.value == '' || $autor.value == ''
         || $genero.value == '' || $data.value == '') {
         alert('Preencha todos os campos');
         return;
      }

      var data = $data.value;
      data = data.split("-").reverse().join("/");

      if ($imagem.value == '' && document.URL.includes('editar.html')) {
         dados.books[idDoLivro].title = $titulo.value;
         dados.books[idDoLivro].author = $autor.value;
         dados.books[idDoLivro].genre = $genero.value;
         dados.books[idDoLivro].image = livroParaEditar.image;
         dados.books[idDoLivro].systemEntryDate = data;
         dados.books[idDoLivro].synopsis = $sinopse.value;

         var a = '{ "data":' + JSON.stringify(dados, null, '\t') + '}';

         const salvar = async () => {
            const criar = await showSaveFilePicker({
               suggestedName: 'data.json',

               types: [{
                  description: 'JSON',
                  accept: { 'application/json': ['.json'], },
               }],
            });
            const escrever = await criar.createWritable();
            await escrever.write(a);
            await escrever.close();
         }

         salvar();
         e.preventdefault();

      } else if ($imagem.value != '' && document.URL.includes('editar.html')) {

         var leitor = new FileReader();

         if ($imagem.files[0]) {
            leitor.readAsDataURL($imagem.files[0]);
         } else {
            $img_tag.src = "imagens/Caminho 261.svg";
            $img_txt.removeAttribute('style');
         }

         leitor.onloadend = function () {
            dados.books[idDoLivro].title = $titulo.value;
            dados.books[idDoLivro].author = $autor.value;
            dados.books[idDoLivro].genre = $genero.value;
            dados.books[idDoLivro].image = leitor.result;
            dados.books[idDoLivro].systemEntryDate = data;
            dados.books[idDoLivro].synopsis = $sinopse.value;

            var a = '{ "data":' + JSON.stringify(dados, null, '\t') + '}';

            const salvar = async () => {
               const criar = await showSaveFilePicker({
                  suggestedName: 'data.json',

                  types: [{
                     description: 'JSON',
                     accept: { 'application/json': ['.json'], },
                  }],
               });
               const escrever = await criar.createWritable();
               await escrever.write(a);
               await escrever.close();
            }

            salvar();
         }

      } else {

         var leitor = new FileReader();

         if ($imagem.files[0]) {
            leitor.readAsDataURL($imagem.files[0]);
         } else {
            $img_tag.src = "imagens/Caminho 261.svg";
            $img_txt.removeAttribute('style');
         }

         leitor.onloadend = function () {

            dados.books.push({
               title: $titulo.value,
               author: $autor.value,
               genre: $genero.value,
               status: { isActive: true, description: '' },
               image: leitor.result,
               systemEntryDate: data,
               synopsis: $sinopse.value,
               rentHistory: []
            });

            var a = '{ "data":' + JSON.stringify(dados, null, '\t') + '}';

            const salvar = async () => {
               const criar = await showSaveFilePicker({
                  suggestedName: 'data.json',

                  types: [{
                     description: 'JSON',
                     accept: { 'application/json': ['.json'], },
                  }],
               });
               const escrever = await criar.createWritable();
               await escrever.write(a);
               await escrever.close();
            }

            salvar();
         }
      }
   });

   $cancelar.addEventListener('click', function limpar() {
      $imagem.value = '';
      $img_tag.setAttribute('src', 'imagens/Caminho 261.svg');
      $img_txt.removeAttribute('style');
      $titulo.value = '';
      $sinopse.value = '',
      $autor.value = '',
      $genero.value = '',
      $data.value = '';
   });

   $imagem.addEventListener('change', function carregarImagem() {

      var leitor = new FileReader();

      leitor.onloadend = function () {
         $img_tag.src = leitor.result;
      }

      if ($imagem.files[0]) {
         leitor.readAsDataURL($imagem.files[0]);
      } else {
         $img_tag.src = "imagens/Caminho 261.svg";
         $img_txt.removeAttribute('style');
      }

      $img_txt.setAttribute('style', 'display:none;');

   });
})()