let audioEl: HTMLAudioElement | null = null;

export function registerMusicAudio(el: HTMLAudioElement) {
  audioEl = el;
}

export function playBackgroundMusic() {
  audioEl?.play().catch(() => {});
}
