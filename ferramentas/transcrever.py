#!/usr/bin/env python3
"""Transcreve uma narração com tempo por palavra (Whisper, roda no computador, sem custo).

Uso: python3 ferramentas/transcrever.py gravacoes/tratadas/audio.wav saida.json [modelo]
"""
import json
import subprocess
import sys

import numpy as np

from faster_whisper import WhisperModel

entrada, saida = sys.argv[1], sys.argv[2]
modelo = sys.argv[3] if len(sys.argv) > 3 else "medium"

# O áudio é decodificado pelo ffmpeg (16 kHz, mono), que aceita qualquer formato.
bruto = subprocess.run(
    ["ffmpeg", "-v", "error", "-i", entrada, "-f", "f32le", "-ac", "1", "-ar", "16000", "-"],
    check=True,
    capture_output=True,
).stdout
audio = np.frombuffer(bruto, dtype=np.float32)

segmentos, _ = WhisperModel(modelo, device="cpu", compute_type="int8").transcribe(
    audio, language="pt", word_timestamps=True, vad_filter=True
)
palavras = [
    {"texto": p.word.strip(), "inicio": round(p.start, 3), "fim": round(p.end, 3)}
    for s in segmentos
    for p in s.words
]
with open(saida, "w", encoding="utf-8") as f:
    json.dump(palavras, f, ensure_ascii=False, indent=1)
print(" ".join(p["texto"] for p in palavras))
