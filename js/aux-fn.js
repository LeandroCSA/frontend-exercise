var RandomGenerator = function () {
	var alphabet = 'abcdefghijklmnopqrstuvwxyz';

	this.getWord = function (size, firstCapitalLetter) {
		var str = '';
		for (var i = 0; i < size; i++) {
			var rIdx = this.getNumber(alphabet.length - 1);
			str += alphabet[rIdx];
		}
		if (firstCapitalLetter) str = str[0].toUpperCase() + str.substring(1);
		
		return str;
	};

	this.getParagraph = function (words) {
		var p = '';
		for (var i = 0; i < words; i++) {
			var wordSize = this.getNumber(10);
			p += this.getWord(wordSize) + ' ';
		}
		return p;
	};

	this.getNumber = function (max) {
		return Math.floor((Math.random() * max) + 1);
	}
};

var carregarMais = function (n, fn) {
	var ofertas = [];
	var gen = new RandomGenerator();

	for (var i = 0; i < n; i++) {
		ofertas.push({
			nome: gen.getWord(8, true),
			discount: gen.getNumber(60),
			description: gen.getParagraph(10),
			location: 'Local: ' + gen.getWord(5, true)
		});
	}

	if (fn) fn(ofertas);
};

var enquete = {
	votos: {
		'gostei': 150,
		'não gostei': 50
	},

	porcentagem: function () {
		var gostei = enquete.votos['gostei'], 
			naoGostei = enquete.votos['não gostei'],
			total = gostei + naoGostei;
		return {
			'Gostei': parseFloat((gostei / total).toFixed(2)),
			'Não Gostei': parseFloat((naoGostei / total).toFixed(2))
		};
	},

	responder: function (resposta) {
		var answ = resposta.toLowerCase();
		if (answ !== 'gostei' && answ !== 'não gostei')
			throw "Não é uma resposta válida"

		enquete.votos[answ]++;
		
		return enquete.porcentagem();
	}
};

$(document).ready(onReady);

function onReady(){
	//Clicar para carregar demais itens
	size_li = $("#myList li").size();
    x=5;
    $('#myList li:lt('+x+')').show();
    
	$('.carregamais').click(function () {
        x= (x+5 <= size_li) ? x+5 : size_li;
        $('#myList li:lt('+x+')').fadeIn("fast");
		
		if(x == size_li){
            $('.carregamais').hide();
        }
		
		return false;
    });
	
	// Clica para substituir a imagem Maior, via thumbnail
	$('.galeriaThumb').on('click', function (){
		var IDnt = $(this).attr('data-color');
		var linK = "images/pilates-"+IDnt+"-big.jpg";
		
		$('.image-bigger').fadeOut().attr('src', linK).fadeIn();
		
		return false;
	});
	
	// Clicar para enviar o voto na enquete
	$('.enviarBtn').on('click', function (){ 
		var value = $("input:radio[name=exampleRadios]:checked").val();
		
		if($("input:radio[name=exampleRadios]").is(':checked')){
			
			// Apresenta a Validação
			validacao('Você votou em: <strong>"'+ value +'"</strong>', "#E6FBF8", 0);
			
			$('label').fadeOut();
			$('.barra-voto').fadeIn(150);
			$(this).fadeOut(150);
			window.setTimeout(function() {				
				$("#sim").delay(320).animate({width: "85%"});
				$("#nao").delay(350).animate({width: "15%"});
			}, 500);			
				
		}else{
			validacao('Escolha uma opção', "#FBE9E6", 1500);
		}
		return false;
	});
		
	// Apresenta a validação
	function validacao(t, c, tm){
		if(tm==0){
			$('#escolha').fadeIn().css({"background":c,"display":"block"}).html(t);
		}else{
			$('#escolha').fadeIn().css({"background":c,"display":"block"}).html(t).delay(tm).fadeOut();
		}
	}
}
