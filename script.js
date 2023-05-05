  const video = document.getElementById('video');
  const fileInput = document.getElementById('fileInput');
  const startInput = document.getElementById('start');
  const endInput = document.getElementById('end');
  const durationSpan = document.getElementById('duration');
  const field1 = document.getElementById('field1');
  const field2 = document.getElementById('field2');
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

const copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(field1.value);
});

const copyField2 = document.getElementById('copyField2');
copyField2.addEventListener('click', () => {
  navigator.clipboard.writeText(field2.value);
});


const copycomeco = document.getElementById('copycomeco');
const start = document.getElementById('start');
copycomeco.addEventListener('click', () => {
  navigator.clipboard.writeText(start.value);
});

const copyfim = document.getElementById('copyfim');
const end = document.getElementById('end');
copyfim.addEventListener('click', () => {
  navigator.clipboard.writeText(end.value);
});


video.setAttribute('controlsList', 'nodownload');

window.onbeforeunload = function() {
  return "Tem certeza de que deseja sair desta página? Você pode perder dados não salvos.";
};
