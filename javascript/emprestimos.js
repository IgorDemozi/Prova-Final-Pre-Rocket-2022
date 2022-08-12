(function () {

   $tabela = document.querySelector('#emprestimos--tabela');
   $aluno = document.querySelector('#filtro-aluno');
   $turma = document.querySelector('#filtro-turma');
   $livro = document.querySelector('#filtro-livro');
   $retirada = document.querySelector('#filtro-retirada');
   $entrega = document.querySelector('#filtro-entrega');

   var dados;
   var lista = [];

   fetch('./data.json').then(response => {
      return response.json();
   }).then(body => {
      dados = body.data;

      dados.books.forEach(item => {
         preencherTela(item, $aluno.value, $turma.value, $livro.value,
            $retirada.value, $entrega.value);
      });
   });

   $aluno.addEventListener('input', function () {

      limparTela();

      dados.books.forEach(item => {
         preencherTela(item, $aluno.value, $turma.value, $livro.value,
            $retirada.value, $entrega.value);
      });

   });

   $turma.addEventListener('input', function () {

      limparTela();

      dados.books.forEach(item => {
         preencherTela(item, $aluno.value, $turma.value, $livro.value,
            $retirada.value, $entrega.value);
      });

   });

   $livro.addEventListener('input', function () {

      limparTela();

      dados.books.forEach(item => {
         preencherTela(item, $aluno.value, $turma.value, $livro.value,
            $retirada.value, $entrega.value);
      });

   });

   $retirada.addEventListener('input', function () {

      limparTela();

      dados.books.forEach(item => {
         preencherTela(item, $aluno.value, $turma.value, $livro.value,
            $retirada.value, $entrega.value);
      });

   });

   $entrega.addEventListener('input', function () {

      limparTela();

      dados.books.forEach(item => {
         preencherTela(item, $aluno.value, $turma.value, $livro.value,
            $retirada.value, $entrega.value);
      });

   });

   function limparTela() {

      lista = [];

      var elementos = document.querySelectorAll('tr');
      for (var i = 2; i < elementos.length; i++) {
         elementos[i].parentNode.removeChild(elementos[i]);
      }
   }

   function preencherTela(item, aluno, turma, livro, retirada, entrega) {

      if (item.rentHistory != '') {

         var aluno = aluno.toLowerCase();
         var turma = turma.toString().toLowerCase();
         var livro = livro.toLowerCase();
         var retirada = retirada.toString();
         var entrega = entrega.toString();;

         item.rentHistory.forEach(emprestimo => {
            if (emprestimo.studentName.toLowerCase().includes(aluno) &&
               emprestimo.class.toLowerCase().includes(turma) &&
               item.title.toLowerCase().includes(livro) &&
               emprestimo.withdrawalDate.includes(retirada) &&
               emprestimo.deliveryDate.includes(entrega)) {
               lista.push(emprestimo);
            }
         })

         lista.forEach(emprestimo => {

            var $nova_linha = document.createElement('tr');
            $tabela.appendChild($nova_linha);

            var $nova_coluna_aluno = document.createElement('td');
            $nova_coluna_aluno.innerHTML = '<p>' + emprestimo.studentName + '</p>';
            $nova_linha.appendChild($nova_coluna_aluno);

            var $nova_coluna_turma = document.createElement('td');
            $nova_coluna_turma.innerHTML = '<p>' + emprestimo.class + '</p>';
            $nova_linha.appendChild($nova_coluna_turma);

            var $nova_coluna_livro = document.createElement('td');
            $nova_coluna_livro.innerHTML = '<p>' + item.title + '</p>';
            $nova_linha.appendChild($nova_coluna_livro);

            var $nova_coluna_retirada = document.createElement('td');
            $nova_coluna_retirada.innerHTML = '<p>' + emprestimo.withdrawalDate + '</p>';
            $nova_linha.appendChild($nova_coluna_retirada);

            var $nova_coluna_entrega = document.createElement('td');
            $nova_coluna_entrega.innerHTML = '<p>' + emprestimo.deliveryDate + '</p>';
            $nova_linha.appendChild($nova_coluna_entrega);
         });
      }
   }
})()