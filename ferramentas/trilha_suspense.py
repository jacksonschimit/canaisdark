#!/usr/bin/env python3
"""Gera uma trilha de suspense discreta e um efeito de impacto, do zero, por síntese.

Som 100% próprio: não usa gravação de ninguém, então não há risco de reivindicação de direitos.
É uma trilha simples, pensada para ficar bem baixa atrás da narração.

Uso: python3 ferramentas/trilha_suspense.py DURACAO_EM_SEGUNDOS pasta_de_saida
"""
import sys
import wave

import numpy as np

SR = 48000
dur, pasta = float(sys.argv[1]), sys.argv[2]
rng = np.random.default_rng(7)


def salvar(nome, x, pico_db):
    x = x / np.max(np.abs(x)) * 10 ** (pico_db / 20)
    with wave.open(f"{pasta}/{nome}", "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype("<i2").tobytes())


def suave(n, k):  # passa-baixa simples por média móvel
    return np.convolve(n, np.ones(k) / k, mode="same")


# ── Trilha: acorde grave de ré menor que "respira" + pulso lento, tipo batimento ──
t = np.arange(int(dur * SR)) / SR
trilha = np.zeros_like(t)
# (frequência, volume, velocidade da respiração, fase)
for f, vol, lfo, fase in [
    (73.42, 1.00, 0.050, 0.0),  # ré
    (73.42 * 1.004, 0.80, 0.043, 1.3),  # ré levemente desafinado: cria movimento
    (110.00, 0.55, 0.071, 2.1),  # lá
    (146.83, 0.35, 0.090, 0.7),  # ré uma oitava acima
    (174.61, 0.22, 0.060, 3.0),  # fá: dá o tom menor, sombrio
    # médios: sem eles a trilha some no alto-falante do celular, que não reproduz grave
    (220.00, 0.80, 0.083, 1.9),
    (293.66, 0.70, 0.110, 4.2),
    (349.23, 0.50, 0.067, 0.4),
    (440.00, 0.25, 0.097, 2.6),
]:
    respira = 0.6 + 0.4 * np.sin(2 * np.pi * lfo * t + fase)
    trilha += vol * respira * np.sin(2 * np.pi * f * t + fase)

# pulso duplo a cada 2 segundos (tum-tum)
pulso = np.zeros_like(t)
for inicio in np.arange(0.0, dur, 2.0):
    for atraso, forca in [(0.0, 1.0), (0.32, 0.6)]:
        i = int((inicio + atraso) * SR)
        n = min(int(0.5 * SR), len(t) - i)
        if n <= 0:
            continue
        tt = np.arange(n) / SR
        freq = 48 + 30 * np.exp(-tt * 30)
        fase = 2 * np.pi * np.cumsum(freq) / SR
        pulso[i : i + n] += forca * np.exp(-tt * 9) * (np.sin(fase) + 0.4 * np.sin(3 * fase))
trilha = trilha / np.max(np.abs(trilha)) + 0.55 * pulso

# ar: ruído bem filtrado, quase imperceptível
trilha += 0.04 * suave(rng.standard_normal(len(t)), 240) * 12

# entra e sai suavemente
envelope = np.minimum(1, t / 1.5) * np.minimum(1, (dur - t) / 2.0)
salvar("trilha-suspense.wav", trilha * envelope, pico_db=-9)

# ── Impacto: batida grave que desce de tom + estalo curto de ruído ──
ti = np.arange(int(1.8 * SR)) / SR
freq = 38 + 70 * np.exp(-ti * 14)
impacto = np.exp(-ti * 3.2) * np.sin(2 * np.pi * np.cumsum(freq) / SR)
impacto += 0.35 * np.exp(-ti * 28) * suave(rng.standard_normal(len(ti)), 24) * 4
salvar("impacto.wav", impacto, pico_db=-4)
print("ok: trilha-suspense.wav, impacto.wav")
