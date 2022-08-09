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

   fetch('./data.json').then(response => {
      return response.json();
   }).then(body => {
      dados = body.data;
   });

   $salvar.addEventListener('click', function salvar(e) {

      if ($titulo.value == '' || $sinopse.value == '' || $autor.value == '' 
      || $genero.value == '' || $data.value == ''){
         alert('Preencha todos os campos');
         return;
      }

      var data = $data.value;
      data = data.split("-").reverse().join("/");

      dados.books.push({ title: $titulo.value,
                         author:$autor.value,
                         genre: $genero.value,
                         status:{isActive: true, description:''},
                         image:'',
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
              accept: {'application/json': ['.json'], },
            }],
         });
         const escrever = await criar.createWritable();
         await escrever.write(a);
         await escrever.close();
      }

      salvar();

      e.preventDefault();
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
         $img_tag.src = "";
      }

      $img_txt.setAttribute('style', 'display:none;');

   })

})()