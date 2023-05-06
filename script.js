// Carregue a API do IFrame Player do YouTube
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Crie uma variável para armazenar o player do YouTube
var player;

// Função chamada pela API do IFrame Player do YouTube quando estiver pronta
function onYouTubeIframeAPIReady() {
    // Crie um novo player do YouTube
    player = new YT.Player('youtubePlayer', {
        height: '390',
        width: '640',
        videoId: '',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// Função chamada quando o player do YouTube estiver pronto
function onPlayerReady(event) {
    // Adicione um ouvinte de evento ao botão "Load YouTube Video"
    document.getElementById("loadYoutubeVideo").addEventListener("click", function() {
        // Obtenha o URL do vídeo do YouTube a partir do campo de entrada de texto
        var youtubeUrl = document.getElementById("youtubeUrl").value;
        // Extraia o ID do vídeo do URL do YouTube
        var videoId = youtubeUrl.split('v=')[1];
        var ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition != -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }
        // Carregue o vídeo no player do YouTube
        player.loadVideoById(videoId);
    });
}

// Função chamada quando o estado do player do YouTube mudar
function onPlayerStateChange(event) {
    // Faça algo aqui se necessário
}

const video = document.getElementById('video');
const fileInput = document.getElementById('fileInput');
const startInput = document.getElementById('start');
const endInput = document.getElementById('end');
const durationSpan = document.getElementById('duration');
const campo1 = document.getElementById('campo1');
const campo2 = document.getElementById('campo2');
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const url = URL.createObjectURL(file);
  video.setAttribute('src', url);
});
startInput.addEventListener('change', () => {
  const time = startInput.value;
  video.currentTime = parseTime(time);
});
endInput.addEventListener('change', () => {
  const time = endInput.value;
  video.pause();
  video.currentTime = parseTime(time);
});
video.addEventListener('timeupdate', () => {
  const start = parseTime(startInput.value);
  const end = parseTime(endInput.value);
  if (video.currentTime < start || video.currentTime > end) {
    video.currentTime = start;
  }
  const duration = end - start;
  durationSpan.textContent = formatTime(duration);
});
function parseTime(timeString) {
  const [hours, minutes, seconds] = timeString.split(':').map(parseFloat);
  const milliseconds = parseFloat(timeString.split('.').pop());
  return (hours * 60 * 60) + (minutes * 60) + seconds + (milliseconds / 1000);
}
function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  const milliseconds = Math.floor((time * 1000) % 1000);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

const bCampo1 = document.getElementById('bCampo1');
bCampo1.addEventListener('click', () => {
  navigator.clipboard.writeText(campo1.value);
});

const bCampo2 = document.getElementById('bCampo2');
bCampo2.addEventListener('click', () => {
  navigator.clipboard.writeText(campo2.value);
});


const bStart = document.getElementById('bStart');
const start = document.getElementById('start');
bStart.addEventListener('click', () => {
  navigator.clipboard.writeText(start.value);
});

const bEnd = document.getElementById('bEnd');
const end = document.getElementById('end');
bEnd.addEventListener('click', () => {
  navigator.clipboard.writeText(end.value);
});


video.setAttribute('controlsList', 'nodownload');

window.onbeforeunload = function () {
  return "Tem certeza de que deseja sair desta página? Você pode perder dados não salvos.";
};
