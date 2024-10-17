
const input = document.getElementById('input-busca');
const ulElement = document.querySelector('.playlist-caixa');
const liElement = ulElement.querySelectorAll('li');
const videoURLs = [
    './video/video1.mp4',
    './video/video2.mp4',
    './video/video4.mp4',
    './video/video6.mp4',
    './video/video7.mp4',
    './video/video8.mp4',
    './video/video10.mp4',
    './videos/12467351_1920_1080_30fps.mp4',
    './videos/3779636-hd_1920_1080_25fps.mp4',
    './videos/5736027-uhd_3840_2160_24fps.mp4',
    './videos/6024944-hd_1920_1080_25fps.mp4',
    './videos/6252535-hd_1920_1080_25fps.mp4',
    './videos/857040-hd_1920_1080_25fps.mp4',
    ];
const musicas = [
    {titulo: 'Aurora on the Boulevard', src: './musicas/Aurora on the Boulevard - National Sweetheart.mp3', img: './imagens/pexels-caleboquendo-2927080.jpg'},
    {titulo: 'Bailando con el Viento', src: './musicas/Bailando con el Viento - Luna Cantina.mp3', img: './imagens/pexels-cottonbro-3171812.jpg'},
    {titulo: 'Ducky Funk', src: './musicas/Ducky Funk - Quincas Moreira.mp3', img: './imagens/pexels-pixabay-159613.jpg'},
    {titulo: 'Everybody Get Up', src: './musicas/Everybody Get Up - Everet Almond.mp3', img: './imagens/pexels-caleboquendo-2927080.jpg'},
    {titulo: 'Funk AF', src: './musicas/Funk AF - Everet Almond.mp3', img: './imagens/pexels-pixabay-159613.jpg'},
    {titulo: 'In Dreams', src: './musicas/In Dreams - Lish Grooves.mp3', img: './imagens/pexels-cottonbro-4709822.jpg'},
    {titulo: 'Lazy Laura', src: './musicas/Lazy Laura - Quincas Moreira.mp3', img: './imagens/pexels-manei-2272854.jpg'},
    {titulo: 'Miss U', src: './musicas/Miss U - Everet Almond.mp3', img: './imagens/pexels-juanpphotoandvideo-1246437.jpg'},
    {titulo: 'Read my lips Time To Party', src: './musicas/Read My Lips Time To Party - Everet Almond.mp3', img: './imagens/pexels-victorfreitas-733767.jpg'},
    {titulo: 'Today Remains Sweet', src: './musicas/Today Remains Sweet - Lish Grooves.mp3', img: './imagens/pexels-bclarkphoto-1135995.jpg'},
    {titulo: 'World Song desde Mexico', src: './musicas/World Song desde Mexico - Cumbia Deli.mp3', img: './imagens/pexels-pixabay-33597.jpg'},
];

//Variáveis
    let musica = document.querySelector('audio');
    let indexMusica = 0;
    let imagem = document.querySelector('.img');
    let nomeMusica = document.querySelector('.descricao');
    renderizarMusica(indexMusica);

    //Eventos
    document.querySelector('.play').addEventListener('click', tocarMusica);
    document.querySelector('.pause').addEventListener('click', pausarMusica);

    document.querySelector('.anterior').addEventListener('click',() => {
        indexMusica--;
        renderizarMusica(indexMusica);
    });

    document.querySelector('.proxima').addEventListener('click',() => {
        indexMusica++;
        renderizarMusica(indexMusica);
    });

    //Funções
    
    function tocarMusica(){
        musica.play();
    }

    function pausarMusica(){
        musica.pause();
    }

    function renderizarMusica(index){
        musica.setAttribute('src', musicas[index].src);
        musica.addEventListener('loadeddata', () =>{
            nomeMusica.textContent = musicas[index].titulo;
            imagem.src = musicas[index].img;
        });
    }

function obterVideosAleatorios(array){
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function recarregarVideosNaTela(){
    const videoElement = document.querySelector('.video');
    const videoSource = document.getElementById('video-source');
    const randomVideoURL = obterVideosAleatorios(videoURLs);

    if(videoElement && videoSource){
        videoSource.src = randomVideoURL;

        videoElement.load();
    }
}

function movimentoInput(inputValue){
    const visibility =  input.style.visibility;
    
    inputValue && procurarCidade(inputValue);

    visibility == 'hidden' ?  abrirInput() : fecharInput();
    }

function botaoDeBusca() {
        const inputValue = input.value;   
        movimentoInput(inputValue);
    }

function fecharInput(){
    input.style.visibility = 'hidden';
    input.style.width = '40px'; 
    input.style.padding = '0.5rem 0.5rem 0.5rem 2.6rem';
    input.style.transition= 'all 0.5s ease-in-out 0s';
    input.value="";
}

function abrirInput(){
    input.style.visibility = 'visible';
    input.style.width = '300px'; 
    input.style.padding = '0.5rem 0.5rem 0.5rem 3.1rem'; 
    input.style.transition= 'all 0.5s ease-in-out 0s';
    input.value="";
}

function mostrarEnvelope() {
    document.querySelector('.envelope').style.visibility = 'visible';
    document.querySelector('.caixa').style.alignItems = 'end';
    document.querySelector('.procura').style.alignItems = 'initial';
    }

input.addEventListener('keyup', function(event){
if(event.keyCode == 13){
    const valorInput = input.value;
    movimentoInput(valorInput)
}
})

document.addEventListener('DOMContentLoaded', () => {
    fecharInput();
    recarregarVideosNaTela();
    })

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}    

const apiKey = '6b0ba527db532c7b5b47b0bada808b59'
async function procurarCidade(city){
    try{
const dados = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`);
        
        if(dados.status == 200){
            const resultado = await dados.json()

            obterTopAlbunsPorPais(resultado.sys.country);       
            mostrarClimaNaTela(resultado);
            mostrarEnvelope();
            recarregarVideosNaTela();

    }else{
        throw new Error
    }
    }catch{
        alert('A pesquisa por cidade deu errado!');
            }
        }
        function mostrarClimaNaTela(resultado){

            document.querySelector('.icone-tempo').src = `./assets/${resultado.weather[0].icon}.png`

            document.querySelector('.nome-cidade').innerHTML = `${resultado.name}`;
            document.querySelector('.temperatura').innerHTML = `${resultado.main.temp.toFixed(0)}°C`;
            document.querySelector('.maxTemperatura').innerHTML = `máx: ${resultado.main.temp_max.toFixed(0)}°C`;
            document.querySelector('.minTemperatura').innerHTML = `mín: ${resultado.main.temp_min.toFixed(0)}°C`;
        }

        const clientId ='e8590e527d8a47babd8eb73976821ab4';
        const clientSecret = 'b10cfc315f304863afd4d1fb67a55ad5';
        
async function obterAcessoToken(){
const credentials = `${clientId}:${clientSecret}`;
const encodedCredentials = btoa(credentials);
const response = await fetch('https://accounts.spotify.com/api/token',{
    method: 'POST',
    headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials',
});

const data = await response.json()
return data.access_token;
}

async function obterTopAlbunsPorPais(br){
try{
    const accessToken= await obterAcessoToken();

    const url = `https://api.spotify.com/v1/browse/featured-playlists?locale=${br}&limit=3`
    
    const resultado = await fetch (`${url}`,{
        headers: {
            'Authorization': `Bearer ${accessToken}` 
        },
    });

    if(resultado.status == 200){
    const data = await resultado.json()
    const result = data.playlists.items.map(item =>({
        name: item.name,
        image: item.images[0].url
    }))

    mostrarMusicaNaTela(result);

    }else{
        throw new Error
    }
}catch{

}
}









