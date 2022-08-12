(function () {

   var $texto = document.querySelector('#biblioteca--pesquisa-texto');
   var $bt_buscar = document.querySelector('#biblioteca--pesquisa-botao');
   var $filtro = document.querySelector('#biblioteca--pesquisa-filtro');
   var $itens = document.querySelector('#biblioteca--itens');
   var $bt_fechar = document.querySelector('#livro--fechar-menu');

   var $menu = document.querySelector('#biblioteca--menu-livro');
   var $livro_capa = document.querySelector('#livro-capa');
   var $livro_titulo = document.querySelector('#livro-titulo');
   var $livro_sinopse = document.querySelector('#livro-sinopse');
   var $livro_autor = document.querySelector('#livro-autor');
   var $livro_genero = document.querySelector('#livro-genero');
   var $livro_entrada = document.querySelector('#livro-entrada');
   var $bt_emprestar = document.querySelector('#livro--botao-emprestar');

   var $bt_fechar_emprestimo = document.querySelector('#menu-emprestar--fechar-menu');
   var $menu_emprestar = document.querySelector('#menu-emprestar');
   var $bt_emprestar_2 = document.querySelector('#menu-emprestar--botao-emprestar');
   var $aluno = document.querySelector('#menu-emprestar--aluno');
   var $turma = document.querySelector('#menu-emprestar--turma');
   var $retirada = document.querySelector('#menu-emprestar--retirada');
   var $devolucao = document.querySelector('#menu-emprestar--devolucao');

   var dados;
   var lista = [];
   var index = 0;

   fetch('./data.json').then(response => {
      return response.json();
   }).then(body => {
      dados = body.data;
   });

   $bt_fechar.addEventListener('click', function fecharMenu() {
      $menu.setAttribute('style', 'display: none;');
   });

   $bt_emprestar.addEventListener('click', function exibirMenuEmprestar() {
      tituloDoLivro = $livro_titulo.textContent;
      $menu.setAttribute('style', 'display: none;');
      $menu_emprestar.removeAttribute('style');
   });

   $bt_fechar_emprestimo.addEventListener('click', function fecharMenu() {
      $menu_emprestar.setAttribute('style', 'display: none;');
      $aluno.value = '';
      $turma.value = '';
      $retirada.value = '';
      $devolucao.value = ''
      $menu.removeAttribute('style');
   });

   $bt_emprestar_2.addEventListener('click', function emprestar(e) {

      if ($aluno.value == '' || $turma.value == '' || $retirada.value == '' || $devolucao.value == '') {
         alert('Preencha todos os campos');
         return;
      }

      var data_r = $retirada.value;
      var data_d = $retirada.value;
      data_r = data_r.split("-").reverse().join("/");
      data_d = data_d.split("-").reverse().join("/");

      dados.books[index].rentHistory.push({
         studentName: $aluno.value,
         class: $turma.value,
         withdrawalDate: data_r,
         deliveryDate: data_d
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
      
      e.preventDefault();
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
            lista[i] = item;
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
      $nova_div.setAttribute('id', dados.books.indexOf(item));
      $itens.appendChild($nova_div);

      var $nova_span_img = document.createElement('span');
      $nova_span_img.innerHTML = '<img src="' + item.image + '"></img>';
      $nova_div.appendChild($nova_span_img);

      var $nova_span_ttl = document.createElement('span');
      $nova_span_ttl.innerHTML = '<p>' + item.title + '</p>';
      $nova_div.appendChild($nova_span_ttl);

      $nova_div.addEventListener('click', function mostraMenu() {
         index = this.getAttribute('id');
         $menu.removeAttribute('style');
         $livro_capa.setAttribute('src', item.image);
         $livro_titulo.textContent = item.title;
         $livro_sinopse.textContent = item.synopsis;
         $livro_autor.textContent = item.author;
         $livro_genero.textContent = item.genre;
         $livro_entrada.textContent = item.systemEntryDate;
      })
   }
})()