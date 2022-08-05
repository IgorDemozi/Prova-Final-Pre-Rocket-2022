(function () {

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

   $salvar.addEventListener('click', function salvar() {

      if ($titulo.value == '' || $sinopse.value == '' || $autor.value == '' 
      || $genero.value == '' || $data.value == ''){
         alert('Preencha todos os campos');
         return;
      }

      dados.books.push({ title: $titulo.value,
                         author:$autor.value,
                         genre: $genero.value,
                         status:{isActive: true, description:''},
                         image:'',
                         systemEntryDate: $data.value,
                         synopsis: $sinopse.value,
                         rentHistory: []
      })

      var a = '{ "data":' + JSON.stringify(dados, null, '\t') + '}';

      const save = async () => {
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

      save();
   });
})()