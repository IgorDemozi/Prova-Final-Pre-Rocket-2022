(function () {

   var $tabela = document.querySelector('#emprestimos--tabela');
   var $aluno = document.querySelector('#filtro-aluno');
   var $turma = document.querySelector('#filtro-turma');
   var $livro = document.querySelector('#filtro-livro');
   var $retirada = document.querySelector('#filtro-retirada');
   var $entrega = document.querySelector('#filtro-entrega');

   var dados;
   var emprestimos = [];
   var titulos = [];

   fetch('./data.json').then(response => {
      return response.json();
   }).then(body => {
      dados = body.data;

      dados.books.forEach(item => {
         preencherLista(item, $aluno.value, $turma.value, $livro.value,
            $retirada.value, $entrega.value);
      });

      preencherTela($aluno.value, $turma.value, $livro.value,
         $retirada.value, $entrega.value);
   });

   $aluno.addEventListener('input', function () {

      limparTela();

      dados.books.forEach(item => {
         preencherLista(item, $aluno.value, $turma.value, $livro.value,
            $retirada.value, $entrega.value);
      });

      preencherTela($aluno.value, $turma.value, $livro.value,
         $retirada.value, $entrega.value);

      console.log(emprestimos);
      console.log(titulos);
   });

   $turma.addEventListener('input', function () {

      limparTela();

      dados.books.forEach(item => {
         preencherLista(item, $aluno.value, $turma.value, $livro.value,
            $retirada.value, $entrega.value);
      });

      preencherTela($aluno.value, $turma.value, $livro.value,
         $retirada.value, $entrega.value);

   });

   $livro.addEventListener('input', function () {

      limparTela();

      dados.books.forEach(item => {
         preencherLista(item, $aluno.value, $turma.value, $livro.value,
            $retirada.value, $entrega.value);
      });

      preencherTela($aluno.value, $turma.value, $livro.value,
         $retirada.value, $entrega.value);

   });

   $retirada.addEventListener('input', function () {

      limparTela();

      dados.books.forEach(item => {
         preencherLista(item, $aluno.value, $turma.value, $livro.value,
            $retirada.value, $entrega.value);
      });

      preencherTela($aluno.value, $turma.value, $livro.value,
         $retirada.value, $entrega.value);

   });

   $entrega.addEventListener('input', function () {

      limparTela();

      dados.books.forEach(item => {
         preencherLista(item, $aluno.value, $turma.value, $livro.value,
            $retirada.value, $entrega.value);
      });

      preencherTela($aluno.value, $turma.value, $livro.value,
         $retirada.value, $entrega.value);

   });

   function limparTela() {

      emprestimos = [];
      titulos = [];

      var elementos = document.querySelectorAll('tr');
      for (var i = 2; i < elementos.length; i++) {
         elementos[i].parentNode.removeChild(elementos[i]);
      }
   }

   function preencherLista(item, aluno, turma, livro, retirada, entrega) {

      if (item.rentHistory.length > 0) {

         var aluno = aluno.toLowerCase();
         var turma = turma.toString().toLowerCase();
         var livro = livro.toLowerCase();
         var retirada = retirada.toString();
         var entrega = entrega.toString();

         item.rentHistory.forEach(emprestimo => {
            if (emprestimo.studentName.toLowerCase().includes(aluno) &&
               emprestimo.class.toLowerCase().includes(turma) &&
               item.title.toLowerCase().includes(livro) &&
               emprestimo.withdrawalDate.includes(retirada) &&
               emprestimo.deliveryDate.includes(entrega)) {
               emprestimos.push(emprestimo);
               titulos.push(item.title);
            }
         });
      }
   }

   function preencherTela() {

      var i=0;

      emprestimos.forEach(elemento => {

         var $nova_linha = document.createElement('tr');
         $tabela.appendChild($nova_linha);

         var $nova_coluna_aluno = document.createElement('td');
         $nova_coluna_aluno.innerHTML = '<p>' + elemento.studentName + '</p>';
         $nova_linha.appendChild($nova_coluna_aluno);

         var $nova_coluna_turma = document.createElement('td');
         $nova_coluna_turma.innerHTML = '<p>' + elemento.class + '</p>';
         $nova_linha.appendChild($nova_coluna_turma);

         var $nova_coluna_livro = document.createElement('td');
         $nova_coluna_livro.innerHTML = '<p>' + titulos[i] + '</p>';
         $nova_linha.appendChild($nova_coluna_livro);

         var $nova_coluna_retirada = document.createElement('td');
         $nova_coluna_retirada.innerHTML = '<p>' + elemento.withdrawalDate + '</p>';
         $nova_linha.appendChild($nova_coluna_retirada);

         var $nova_coluna_entrega = document.createElement('td');
         $nova_coluna_entrega.innerHTML = '<p>' + elemento.deliveryDate + '</p>';
         $nova_linha.appendChild($nova_coluna_entrega);

         i++;
      });
   }
})()