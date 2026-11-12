#!/usr/bin/env bash
# Trata uma gravação de narração: corta o silêncio das pontas, reduz ruído de fundo,
# remove grave inútil, comprime de leve e nivela o volume no padrão do YouTube (-14 LUFS).
# Uso: ferramentas/tratar_audio.sh gravacoes/brutas/entrada.m4a gravacoes/tratadas/saida.wav
set -euo pipefail
entrada="$1"; saida="$2"
MARGEM=0.15  # silêncio mantido antes da primeira e depois da última palavra

corte="silenceremove=start_periods=1:start_threshold=-35dB:start_silence=${MARGEM}"
filtro="highpass=f=80,afftdn=nr=10:nf=-45,acompressor=threshold=-20dB:ratio=3:attack=10:release=150:makeup=2,loudnorm=I=-14:TP=-1.5:LRA=7,aresample=48000"

# corta o começo, inverte, corta o fim, desinverte; depois trata
ffmpeg -hide_banner -loglevel error -y -i "$entrada" \
  -af "${corte},areverse,${corte},areverse,${filtro}" \
  -ac 1 -c:a pcm_s16le "$saida"
echo "ok: $saida ($(ffprobe -v error -show_entries format=duration -of csv=p=0 "$saida") s)"
